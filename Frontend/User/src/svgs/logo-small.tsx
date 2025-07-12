export const LogoSmall = () => {
  return (
    <svg
      width="160"
      height="60"
      viewBox="0 0 160 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Gradient (Optional) */}
      <defs>
        <linearGradient id="bgGradient" x1="0" y1="0" x2="160" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1B143F" />
          <stop offset="100%" stopColor="#0E121A" />
        </linearGradient>
      </defs>
      <rect width="160" height="60" fill="url(#bgGradient)" rx="10" />

      {/* Ripple Wave */}
      <path
        d="M20 30 C30 15, 40 45, 50 30 C60 15, 70 45, 80 30"
        stroke="#7B90FF"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Hub Dot */}
      <circle
        cx="83"
        cy="30"
        r="4"
        fill="#7B90FF"
      />

      {/* Brand Text */}
      <text
        x="95"
        y="35"
        fontFamily="Segoe UI, sans-serif"
        fontWeight="600"
        fontSize="18"
        fill="#7B90FF"
      >
        Ripple†
      </text>
    </svg>
  );
};
