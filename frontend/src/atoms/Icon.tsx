import React from "react";
import * as Icons from "react-icons/fa"; // Example: FontAwesome icons

interface IconProps {
  name: keyof typeof Icons;
  size?: number;
  color?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  color = "#47B881", // Default to tertiary
  className = "",
}) => {
  const IconComponent = Icons[name];
  return <IconComponent size={size} color={color} className={className} />;
};

export default Icon;
