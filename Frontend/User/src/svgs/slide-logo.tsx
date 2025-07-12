import React from "react";

export const SlideLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      width="160"
      height="40"
      viewBox="0 0 160 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0" y1="0" x2="100%" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      
      {/* The "S" shape with gradient */}
      <path 
        d="M20 10C26 10 30 13 30 18C30 23 26 25 20 25C14 25 10 22 10 17"
        stroke="url(#logoGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* "Slide" text */}
      <text
        x="40"
        y="25"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700"
        fontSize="22"
        fill="white"
      >
        Slide
      </text>
    </svg>
  );
};
