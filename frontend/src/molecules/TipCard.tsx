import React from "react";
import Icon from "@/atoms/Icon";
import * as Icons from "react-icons/fa";

// Define the type for valid icon names
type IconName = keyof typeof Icons;

interface TipCardProps {
  icon: IconName;
  text: string;
}

const TipCard: React.FC<TipCardProps> = ({ icon, text }) => {
  return (
    <div className="flex items-center p-4 bg-cloudWhite border border-tertiary rounded-lg shadow-sm">
      <Icon name={icon} size={20} color="#47B881" className="mr-3" />
      <p className="text-deepSlate text-base font-medium">{text}</p>
    </div>
  );
};

export default TipCard;
