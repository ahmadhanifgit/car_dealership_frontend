import { forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { classNames } from '@/lib/format';

interface FieldProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
}

const baseField = 'w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink-900 placeholder-ink-300 transition-all focus:ring-2 focus:ring-gold-400/30 disabled:bg-ink-50 disabled:text-ink-400';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & FieldProps>(
  function Input({ label, error, hint, leftIcon, className, id, ...rest }, ref) {
    const inputId = id || rest.name;
    return (
      <div>
        {label && <label htmlFor={inputId} className="field-label">{label}</label>}
        <div className="relative">
          {leftIcon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400">{leftIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={classNames(
              baseField,
              error ? 'border-crimson-400 focus:border-crimson-500 focus:ring-crimson-400/30' : 'border-ink-200 focus:border-gold-400',
              leftIcon && 'pl-10',              className,
            )}
            {...rest}
          />
        </div>
        {error ? <p className="mt-1.5 text-xs text-crimson-600">{error}</p> : hint ? <p className="mt-1.5 text-xs text-ink-400">{hint}</p> : null}
      </div>
    );
  },
);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & FieldProps>(
  function Textarea({ label, error, hint, className, id, ...rest }, ref) {
    const inputId = id || rest.name;
    return (
      <div>
        {label && <label htmlFor={inputId} className="field-label">{label}</label>}
        <textarea
          ref={ref}
          id={inputId}
          className={classNames(
            baseField,
            'min-h-[120px] resize-y',
            error ? 'border-crimson-400 focus:border-crimson-500 focus:ring-crimson-400/30' : 'border-ink-200 focus:border-gold-400',
            className,
          )}
          {...rest}
        />
        {error ? <p className="mt-1.5 text-xs text-crimson-600">{error}</p> : hint ? <p className="mt-1.5 text-xs text-ink-400">{hint}</p> : null}
      </div>
    );
  },
);

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, FieldProps {
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, hint, options, placeholder, className, id, ...rest },
  ref,
) {
  const inputId = id || rest.name;
  return (
    <div>
      {label && <label htmlFor={inputId} className="field-label">{label}</label>}
      <select
        ref={ref}
        id={inputId}
        className={classNames(
          baseField,
          'appearance-none bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10',
          error ? 'border-crimson-400' : 'border-ink-200 focus:border-gold-400',
          className,
        )}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b6b78' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
        }}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {error ? <p className="mt-1.5 text-xs text-crimson-600">{error}</p> : hint ? <p className="mt-1.5 text-xs text-ink-400">{hint}</p> : null}
    </div>
  );
});
