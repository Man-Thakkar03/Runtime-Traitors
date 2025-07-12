import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
};

const Loader = ({ children, className = '' }: Props) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {children}
    </div>
  );
};

export default Loader;