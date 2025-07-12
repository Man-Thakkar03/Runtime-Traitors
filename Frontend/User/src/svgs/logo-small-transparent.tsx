export const LogoSmallTransparent = () => {
  return (
    <svg
      width="170"
      height="40"
      viewBox="0 0 170 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(10, 20)">
        {/* Ripple Wave */}
        <path
          d="M0 0 C10 -8, 20 8, 30 0 C40 -8, 50 8, 60 0"
          stroke="#7B90FF"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Hub Dot */}
        <circle
          cx="63"
          cy="0"
          r="3"
          fill="#7B90FF"
        />
        
        {/* Brand Text */}
        <text
          x="70"
          y="4"
          fontFamily="Segoe UI, sans-serif"
          fontWeight="600"
          fontSize="16"
          fill="#7B90FF"
        >
          Ripple†
        </text>
      </g>
    </svg>
  );
};
