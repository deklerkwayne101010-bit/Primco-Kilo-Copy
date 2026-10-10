import React, { ReactNode } from 'react';

export interface SectionProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  background?: 'none' | 'wash' | 'surface';
  borderBlock?: boolean;
  className?: string;
  id?: string;
  'aria-labelledby'?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  size = 'md',
  background = 'none',
  borderBlock = false,
  className = '',
  id,
  'aria-labelledby': ariaLabelledBy
}) => {
  const sizeMap = {
    sm: 'py-12',
    md: 'py-20',
    lg: 'py-28'
  };

  const bgMap = {
    none: 'bg-transparent',
    wash: 'bg-[var(--grad-brand-wash)]',
    surface: 'bg-[var(--grad-surface)]'
  };

  const borderStyles = borderBlock ? 'border-y border-[#1b2026]' : '';

  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`relative ${sizeMap[size]} ${bgMap[background]} ${borderStyles} ${className}`}
    >
      <div className="container">
        {children}
      </div>
    </section>
  );
};
