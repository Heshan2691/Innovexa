import express from 'express';
import multer from 'multer';
import { ClarifaiStub, grpc } from "clarifai-nodejs-grpc";
import axios from "axios";
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const router = express.Router();

// Environment variables for API keys
const CLARIFAI_PAT = process.env.CLARIFAI_PAT || "8586e42004c849e384b64113adc8c227";
const USDA_API_KEY = process.env.USDA_API_KEY || "mOUcsBU6vdIfQ4SraajGxDqk8u00hhHhQiWgnL3D";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, `food-${uniqueSuffix}${extension}`);
  }
});

// Configure file validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.');
    error.status = 400;
    return cb(error, false);
  }
  cb(null, true);
};

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
});

// Daily Value reference amounts
const dailyValues = {
  calories: 2000,
  protein: 50,
  carbohydrates: 275,
  fat: 78,
  fiber: 28
};

// Configure axios instance
const axiosInstance = axios.create({
  timeout: 8000,
  maxRedirects: 3
});

/**
 * Fetches nutrition data for a food item from USDA API
 * @param {string} foodName - Name of the food item to search
 * @returns {Object} Nutrition data with success status
 */
async function fetchNutritionData(foodName) {
  try {
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${USDA_API_KEY}&query=${encodeURIComponent(foodName)}&pageSize=1`;
    const response = await axiosInstance.get(url);
    
    if (!response.data.foods?.length) {
      console.log(`No nutrition data found for ${foodName}`);
      return { success: false };
    }

    const foodItem = response.data.foods[0];

    // Helper function to extract nutrient values
    const getNutrientValue = (names, unit) => {
      const nutrient = foodItem.foodNutrients.find(n =>
        names.some(name => n.nutrientName?.toLowerCase().includes(name)) &&
        n.unitName?.toLowerCase() === unit
      );
      return nutrient ? Number(nutrient.value) : 0;
    };

    // Extract raw nutrient values
    const rawValues = {
      calories: getNutrientValue(["energy"], "kcal"),
      protein: getNutrientValue(["protein"], "g"),
      carbohydrates: getNutrientValue(["carbohydrate", "carb"], "g"),
      fat: getNutrientValue(["total lipid", "fat"], "g"),
      fiber: getNutrientValue(["fiber", "dietary fiber"], "g")
    };

    // Calculate daily value percentages
    const dvPercentages = Object.fromEntries(
      Object.entries(rawValues).map(([key, value]) => [
        key,
        dailyValues[key] > 0 ? parseFloat((value / dailyValues[key] * 100).toFixed(1)) : 0
      ])
    );

    return { success: true, dvPercentages, rawValues };
  } catch (error) {
    console.error(`USDA API error for ${foodName}:`, error.message);
    return { success: false };
  }
}

/**
 * Analyze food image using Clarifai API
 * @param {Buffer} imageBuffer - Binary image data
 * @returns {Promise<Array>} Array of detected food items with confidence scores
 */
async function analyzeFoodImage(imageBuffer) {
  try {
    const base64Image = imageBuffer.toString('base64');
    
    // Set up Clarifai client
    const stub = ClarifaiStub.grpc();
    const metadata = new grpc.Metadata();
    metadata.set("authorization", "Key " + CLARIFAI_PAT);

    // Call Clarifai API
    return new Promise((resolve, reject) => {
      stub.PostModelOutputs(
        {
          user_app_id: { user_id: "clarifai", app_id: "main" },
          model_id: "food-item-v1-recognition",
          version_id: "dfebc169854e429086aceb8368662641",
          inputs: [{ data: { image: { base64: base64Image } } }]
        },
        metadata,
        (err, response) => {
          if (err) {
            return reject(new Error(`Clarifai API error: ${err.message}`));
          }
          
          if (response.status.code !== 10000) {
            return reject(new Error(`Clarifai API error: ${response.status.description}`));
          }
          
          // Extract and format food predictions
          const foods = response.outputs[0].data.concepts
            .filter(c => c.value > 0.15)
            .slice(0, 5)
            .map(c => ({
              name: c.name,
              confidence: parseFloat((c.value * 100).toFixed(1))
            }));
            
          resolve(foods);
        }
      );
    });
  } catch (error) {
    throw new Error(`Food analysis failed: ${error.message}`);
  }
}

// Food analysis endpoint
router.post('/food-analyzer', upload.single('foodImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    // Read uploaded file
    const imageBuffer = fs.readFileSync(req.file.path);
    
    // Get food predictions from Clarifai
    const foods = await analyzeFoodImage(imageBuffer);
    
    if (!foods.length) {
      return res.status(400).json({ 
        message: 'No food items detected in the image. Please upload a clearer image of food.'
      });
    }

    // Fetch nutrition data for each detected food
    const nutritionPromises = foods.map(food => fetchNutritionData(food.name));
    const nutritionResults = await Promise.allSettled(nutritionPromises);

    // Calculate weighted nutrition values
    const dvPercentageTotals = {
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fat: 0,
      fiber: 0
    };

    // Process successful results
    const successfulResults = nutritionResults
      .map((result, i) => result.status === 'fulfilled' && result.value.success ? {
        food: foods[i],
        nutrition: result.value.dvPercentages
      } : null)
      .filter(Boolean);

    const totalConfidence = successfulResults.reduce((sum, r) => sum + r.food.confidence, 0);

    // Weight nutrition values by confidence scores
    if (totalConfidence > 0) {
      successfulResults.forEach(({ food, nutrition }) => {
        const weight = food.confidence / totalConfidence;
        Object.keys(dvPercentageTotals).forEach(k => {
          dvPercentageTotals[k] += nutrition[k] * weight;
        });
      });
    }

    // Format final percentages
    Object.keys(dvPercentageTotals).forEach(k => {
      dvPercentageTotals[k] = parseFloat(dvPercentageTotals[k].toFixed(1));
    });

    // Return analysis results
    res.json({
      nutritionPercentages: dvPercentageTotals,
      foods,
      recognizedFoods: foods.map(f => f.name),
      imageUrl: `/uploads/${path.basename(req.file.path)}`
    });

    // Schedule cleanup of uploaded file after response is sent
    res.on('finish', () => {
      setTimeout(() => {
        try {
          fs.unlink(req.file.path, (err) => {
            if (err) console.error('Error deleting file:', err);
          });
        } catch (err) {
          console.error('Error in file cleanup:', err);
        }
      }, 3600000); // Clean up after 1 hour
    });

  } catch (error) {
    console.error("Analysis error:", error);
    
    // Clean up uploaded file if there was an error
    if (req.file?.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file after error:', unlinkError);
      }
    }
    
    // Send appropriate error response
    const statusCode = error.status || 500;
    res.status(statusCode).json({ 
      message: statusCode === 400 ? error.message : "Error processing image",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;