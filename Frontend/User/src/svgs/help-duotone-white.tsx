import React from 'react';

type HelpDuoToneWhiteProps = React.SVGProps<SVGSVGElement>;

const HelpDuoToneWhite: React.FC<HelpDuoToneWhiteProps> = ({ className, ...props }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" fill="rgba(255, 255, 255, 0.2)" stroke="currentColor" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" />
      <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" />
    </svg>
  );
};

export default HelpDuoToneWhite;