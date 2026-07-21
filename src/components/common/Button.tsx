import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';
import { classNames } from '@/lib/format';

type Variant = 'primary' | 'ghost' | 'dark' | 'danger' | 'outline' | 'subtle';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

const variants: Record<Variant, string> = {
  primary: 'bg-gold-400 text-ink-950 hover:bg-gold-300 hover:shadow-glow',
  ghost: 'border border-ink-200 text-ink-800 hover:border-ink-900 hover:bg-ink-950 hover:text-white',
  dark: 'bg-ink-950 text-white hover:bg-ink-800 hover:shadow-lift',
  danger: 'bg-crimson-500 text-white hover:bg-crimson-600',
  outline: 'border border-white/20 text-white hover:bg-white/10',
  subtle: 'bg-ink-50 text-ink-800 hover:bg-ink-100',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', loading, leftIcon, rightIcon, fullWidth, className, children, disabled, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={classNames(
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
        sizes[size],
        variants[variant],
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
});
