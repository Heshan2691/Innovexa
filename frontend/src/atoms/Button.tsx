import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  className = "",
}) => {
  const baseStyles = "px-4 py-2 rounded-lg font-semibold text-white";
  const variantStyles = {
    primary: "bg-primary hover:bg-primary/90",
    secondary: "bg-secondary hover:bg-secondary/90",
    tertiary: "bg-tertiary hover:bg-tertiary/90",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
