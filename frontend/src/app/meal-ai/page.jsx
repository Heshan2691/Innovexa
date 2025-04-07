"use client";

import { useState, useCallback } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import './FoodAnalyzer.css';

// Component for the nutrition progress bar
const NutritionBar = ({ label, percentage, colorClass }) => {
  const percentageValue = Math.min(percentage, 100);
  const displayPercentage = parseFloat(percentage).toFixed(1);
  
  // Determine the color class based on percentage value
  const getTextColorClass = (value) => {
    if (value < 15) return 'text-blue';
    if (value < 30) return 'text-green';
    if (value < 60) return 'text-yellow';
    return 'text-red';
  };

  return (
    <div className="nutrition-bar">
      <div className="nutrition-header">
        <span className="nutrition-label">{label}</span>
        <span className={getTextColorClass(percentage)}>
          {displayPercentage}% DV
        </span>
      </div>
      <div className="progress-bar-bg">
        <div 
          className={`progress-bar ${colorClass}`} 
          style={{ width: `${percentageValue}%` }}
        ></div>
      </div>
    </div>
  );
};

export default function FoodAnalyzer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const API_URL = process.env.NEXT_PUBLIC_URL || '';
  
  // Clear any errors when image changes
  const clearError = () => setError(null);

  const previewFile = useCallback((file) => {
    if (!file) return;
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.onerror = () => {
      setError("Failed to read the selected file. Please try another image.");
    };
    
    setSelectedFile(file);
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      previewFile(file);
      clearError();
    }
  }, [previewFile]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      previewFile(file);
      clearError();
    }
  }, [previewFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select an image to analyze');
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysisResults(null);

    const formData = new FormData();
    formData.append('foodImage', selectedFile);

    try {
      const response = await axios.post(`${API_URL}/food-ai/food-analyzer`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setAnalysisResults(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to analyze image. Please try again.';
      setError(errorMessage);
      console.error('Error analyzing food image:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setImagePreview(null);
    setAnalysisResults(null);
    setError(null);
    setSelectedFile(null);
  };

  return (
    <div className="food-analyzer-container">
      <Head>
        <title>Food Nutrition Analyzer</title>
        <meta name="description" content="Analyze nutritional content of food from images" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="content-wrapper">
        <h1 className="main-title">Food Nutrition Analyzer</h1>
        
        {error && (
          <div className="error-message" role="alert">
            <p>{error}</p>
          </div>
        )}
        
        <div className="analyzer-card">
          {!analysisResults ? (
            <div className="upload-section">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="foodImage">
                    Upload Food Image
                  </label>
                  <div 
                    className={`drop-zone ${dragActive ? 'drop-zone-active' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('foodImage').click()}
                    aria-label="Drop zone for food images"
                    role="button"
                    tabIndex={0}
                  >
                    {imagePreview ? (
                      <div className="image-preview">
                        <Image 
                          src={imagePreview} 
                          alt="Food preview"
                          fill
                          style={{objectFit: 'contain'}}
                        />
                      </div>
                    ) : (
                      <div className="upload-placeholder">
                        <svg className="upload-icon" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="upload-text">
                          Drag and drop an image here or click to select
                        </p>
                        <p className="upload-hint">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    )}
                  </div>
                  <input 
                    type="file" 
                    id="foodImage" 
                    name="foodImage"
                    onChange={handleImageChange}
                    accept="image/*" 
                    className="hidden-input" 
                    aria-label="Upload food image"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={loading || !imagePreview}
                  className={`submit-button ${loading || !imagePreview ? 'button-disabled' : ''}`}
                  aria-busy={loading}
                >
                  {loading ? (
                    <span className="loading-indicator">
                      <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </span>
                  ) : 'Analyze Nutrition'}
                </button>
              </form>
            </div>
          ) : (
            <div className="results-container">
              <div className="results-image-section">
                <div className="analyzed-image">
                  <Image 
                    src={imagePreview} 
                    alt="Analyzed food"
                    fill
                    style={{objectFit: 'contain'}}
                    className="rounded-image"
                  />
                </div>
                <div className="detected-foods">
                  <h3 className="section-title">Detected Foods:</h3>
                  <ul className="food-list">
                    {analysisResults.recognizedFoods.map((food, index) => (
                      <li key={index} className="food-item">
                        <span className="food-indicator"></span>
                        <span className="food-name">{food} </span>
                        <span className="food-confidence">
                          ({analysisResults.foods[index]?.confidence}%)
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="nutrition-section">
                <h2 className="nutrition-title">Nutritional Analysis</h2>
                <div className="nutrition-bars">
                  <NutritionBar 
                    label="Calories" 
                    percentage={analysisResults.nutritionPercentages.calories} 
                    colorClass="bar-blue" 
                  />
                  
                  <NutritionBar 
                    label="Protein" 
                    percentage={analysisResults.nutritionPercentages.protein} 
                    colorClass="bar-green" 
                  />
                  
                  <NutritionBar 
                    label="Carbohydrates" 
                    percentage={analysisResults.nutritionPercentages.carbohydrates} 
                    colorClass="bar-yellow" 
                  />
                  
                  <NutritionBar 
                    label="Fat" 
                    percentage={analysisResults.nutritionPercentages.fat} 
                    colorClass="bar-red" 
                  />
                  
                  <NutritionBar 
                    label="Fiber" 
                    percentage={analysisResults.nutritionPercentages.fiber} 
                    colorClass="bar-purple" 
                  />
                </div>
                
                <button
                  onClick={resetForm}
                  className="reset-button"
                >
                  Analyze Another Image
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}