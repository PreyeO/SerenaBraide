"use client";

import React from "react";
import { Star } from "lucide-react";

interface ReviewProps {
  reviewer: string;
  rating: number; // 1-5
  comment: string;
  date?: string;
}

const Review: React.FC<ReviewProps> = ({ reviewer, rating, comment, date }) => {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        fill={i < rating ? "#FBBF24" : "none"}
        stroke={i < rating ? "#FBBF24" : "#D1D5DB"}
      />
    ));
  };

  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <div className="flex items-center gap-2">
        <span className="font-medium text-sm">{reviewer}</span>
        <div className="flex items-center gap-1">{renderStars()}</div>
        {date && <span className="text-xs text-gray-400 ml-auto">{date}</span>}
      </div>
      <p className="text-sm text-gray-600 mt-1">{comment}</p>
    </div>
  );
};

export default Review;
