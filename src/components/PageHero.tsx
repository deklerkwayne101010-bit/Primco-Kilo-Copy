import React, { ReactNode } from 'react';
import { useVariant } from '../context/VariantContext';

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  description,
  children,
}) => {
  const { variant } = useVariant();

  // Version C — premium glass hero with aurora + gradient text
  if (variant === 'C') {
    return (
      <section className="relative overflow-hidden border-b border-[var(--line)]">
        <div className="aurora" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(120% 90% at 50% 0%, rgba(17,152,232,.16), transparent 60%)',
          }}
        />
        <div className="container relative py-14 lg:py-16">
          <div className="mx-auto max-w-3xl flex flex-col items-center text-center">
            {eyebrow && (
              <span className="metallic-badge text-[10px] font-extrabold tracking-[0.2em] uppercase text-[var(--gold)] px-3.5 py-1.5 rounded-full mb-5">
                {eyebrow}
              </span>
            )}
            <h1 className="premium-text text-3xl lg:text-4xl font-extrabold mb-4">
              {title}
            </h1>
            {description && (
              <p className="text-sm text-[var(--muted)] max-w-xl leading-relaxed">
                {description}
              </p>
            )}
            {children && (
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                {children}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Version B — centred, structured hero with dashed brand rule
  if (variant === 'B') {
    return (
      <section className="bg-[var(--grad-surface)] border-b border-[var(--line)] py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
            {eyebrow && (
              <div className="eyebrow justify-center mb-1">
                <span className="eyebrow-line" />
                <span>{eyebrow}</span>
                <span className="eyebrow-line" />
              </div>
            )}
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">
              {title}
            </h1>
            {description && (
              <p className="text-sm text-[var(--muted)] max-w-xl">{description}</p>
            )}
            {children && (
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                {children}
              </div>
            )}
            <div className="page-hero-rule h-[3px] w-24 rounded-full mt-6" />
          </div>
        </div>
      </section>
    );
  }

  // Version A — original left-aligned band
  return (
    <section className="bg-[var(--grad-surface)] border-b border-[var(--line)] py-12">
      <div className="container">
        <div className="max-w-3xl">
          {eyebrow && (
            <div className="eyebrow">
              <span className="eyebrow-line" />
              <span>{eyebrow}</span>
            </div>
          )}
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-2">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-[var(--muted)] max-w-xl">{description}</p>
          )}
          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>
    </section>
  );
};
