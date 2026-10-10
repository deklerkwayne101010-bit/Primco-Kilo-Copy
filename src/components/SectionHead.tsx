import React, { ReactNode } from 'react';

export interface SectionHeadProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'start' | 'center' | 'between';
  action?: ReactNode;
  className?: string;
  titleId?: string;
}

export const SectionHead: React.FC<SectionHeadProps> = ({
  eyebrow,
  title,
  description,
  align = 'start',
  action,
  className = '',
  titleId
}) => {
  const isCenter = align === 'center';
  const isBetween = align === 'between';

  return (
    <div className={`mb-12 ${isBetween ? 'flex flex-col md:flex-row md:items-end md:justify-between gap-6' : ''} ${className}`}>
      <div className={`${isCenter ? 'text-center mx-auto max-w-3xl flex flex-col items-center' : 'max-w-2xl'}`}>
        {eyebrow && (
          <div className="eyebrow">
            <span className="eyebrow-line" />
            <span>{eyebrow}</span>
          </div>
        )}
        <h2 id={titleId} className="text-[var(--bright)] mb-3">
          {title}
        </h2>
        {description && (
          <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed mt-2">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className={`mt-4 md:mt-0 ${isCenter ? 'flex justify-center mt-6' : 'shrink-0'}`}>
          {action}
        </div>
      )}
    </div>
  );
};
