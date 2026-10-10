import React, { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'interactive' | 'image-top' | 'horizontal';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
  style
}) => {
  const paddingMap = {
    none: 'p-0',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  const variantMap = {
    default: 'bg-[var(--grad-surface)] border border-[var(--line)] rounded-[var(--radius-lg)] text-[var(--silver)]',
    elevated: 'bg-[var(--grad-surface)] border border-[var(--line)] rounded-[var(--radius-lg)] shadow-[var(--glow-sm)] text-[var(--silver)]',
    interactive: 'bg-[var(--grad-surface)] border border-[var(--line)] rounded-[var(--radius-lg)] cursor-pointer transition-all duration-[var(--dur)] ease-[var(--lift)] hover:-translate-y-1 hover:border-[var(--blue)] hover:shadow-[var(--glow-md)] text-[var(--silver)] relative overflow-hidden group',
    'image-top': 'bg-[var(--grad-surface)] border border-[var(--line)] rounded-[var(--radius-lg)] overflow-hidden transition-all duration-[var(--dur)] ease-[var(--lift)] hover:border-[var(--blue)] hover:shadow-[var(--glow-sm)] text-[var(--silver)] group',
    horizontal: 'bg-[var(--grad-surface)] border border-[var(--line)] rounded-[var(--radius-lg)] transition-all duration-[var(--dur)] ease-[var(--lift)] hover:-translate-y-0.5 hover:border-[var(--blue)] text-[var(--silver)]'
  };

  return (
    <div
      onClick={onClick}
      style={style}
      className={`${variantMap[variant]} ${paddingMap[padding]} ${className}`}
    >
      {children}
    </div>
  );
};
