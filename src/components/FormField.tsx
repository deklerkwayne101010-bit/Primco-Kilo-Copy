import React, { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react';

interface BaseFieldProps {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  full?: boolean;
  refHeader?: boolean;
  className?: string;
}

export type InputFieldProps = BaseFieldProps &
  InputHTMLAttributes<HTMLInputElement> & {
    as?: 'input';
  };

export type TextareaFieldProps = BaseFieldProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    as: 'textarea';
    rows?: number;
  };

export type SelectFieldProps = BaseFieldProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    as: 'select';
    children: ReactNode;
  };

export type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

export const FormField: React.FC<FormFieldProps> = (props) => {
  const {
    label,
    name,
    error,
    required = false,
    full = false,
    refHeader = false,
    className = '',
    ...rest
  } = props;

  const baseInputStyles = `
    w-full bg-[#0a0e13] text-[var(--bright)] border rounded-[var(--radius-sm)] px-3.5 py-2.5 text-sm
    placeholder:text-[var(--muted)]/60 transition-all duration-[var(--dur)]
    focus:outline-none focus:border-[var(--blue)] focus:ring-1 focus:ring-[var(--blue)] focus:shadow-[var(--glow-sm)]
    ${error ? 'border-red-500/80 bg-red-950/10' : 'border-[var(--line)] hover:border-[#3d4752]'}
  `;

  return (
    <div
      className={`flex flex-col gap-1.5 ${full ? 'col-span-full' : ''} ${
        refHeader ? 'pt-4 border-t border-[var(--line)] mt-2' : ''
      } ${className}`}
    >
      <label
        htmlFor={name}
        className="text-xs font-bold text-[var(--silver)] flex items-center gap-1"
      >
        <span>{label}</span>
        {required && <span className="text-[var(--blue)] font-bold">*</span>}
      </label>

      {props.as === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          rows={(props as TextareaFieldProps).rows || 4}
          aria-invalid={Boolean(error)}
          className={`${baseInputStyles} resize-y min-h-[90px]`}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : props.as === 'select' ? (
        <select
          id={name}
          name={name}
          aria-invalid={Boolean(error)}
          className={`${baseInputStyles} cursor-pointer`}
          {...(rest as SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {(props as SelectFieldProps).children}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          aria-invalid={Boolean(error)}
          className={baseInputStyles}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error && (
        <span className="text-[11px] text-red-400 font-medium mt-0.5 flex items-center gap-1">
          {error}
        </span>
      )}
    </div>
  );
};

export const FieldGrid: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      {children}
    </div>
  );
};
