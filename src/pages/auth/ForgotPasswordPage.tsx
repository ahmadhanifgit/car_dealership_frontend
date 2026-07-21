import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { Mail, ArrowLeft, CheckCircle2, KeyRound, Lock } from 'lucide-react';
import { authService } from '@/services';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Field';

const requestSchema = z.object({ email: z.string().email('Enter a valid email') });
const resetSchema = z.object({
  token: z.string().min(4, 'Enter the token from your email'),
  password: z.string().min(6, 'Use at least 6 characters'),
  confirm: z.string().min(6, 'Confirm your password'),
}).refine((d) => d.password === d.confirm, { message: 'Passwords do not match', path: ['confirm'] });

export function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<{ email: string }>({ resolver: zodResolver(requestSchema) });

  const onSubmit = async (v: { email: string }) => {
    try {
      await authService.requestReset(v.email);
      setSent(true);
      toast.success('Reset link sent');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not send reset link');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-50 px-6 py-12">
      <div className="w-full max-w-sm">
        <Helmet><title>Forgot password — Marque Admin</title></Helmet>
        <Link to="/login" className="flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900">
          <ArrowLeft className="h-4 w-4" /> Back to sign in
        </Link>
        <div className="mt-6 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-950 font-display text-lg font-bold text-gold-400">M</div>
          <span className="font-display text-lg font-bold text-ink-950">Marque Admin</span>
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold text-ink-950">Reset your password</h1>
        {sent ? (
          <div className="mt-4 rounded-xl border border-success-100 bg-success-50 p-4 text-sm text-success-700">
            <p className="flex items-center gap-2 font-semibold"><CheckCircle2 className="h-4 w-4" /> Check your inbox</p>
            <p className="mt-1 text-success-600">If an account exists for that email, a reset link is on its way.</p>
            <Link to="/reset-password" className="mt-3 inline-block font-semibold text-gold-600 hover:text-gold-700">I have a token →</Link>
          </div>
        ) : (
          <>
            <p className="mt-1.5 text-sm text-ink-500">Enter your email and we'll send you a reset link.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <Input label="Email" type="email" leftIcon={<Mail className="h-4 w-4" />} {...register('email')} error={errors.email?.message} placeholder="you@example.com" />
              <Button type="submit" fullWidth loading={isSubmitting}>Send reset link</Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export function ResetPasswordPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof resetSchema>>({ resolver: zodResolver(resetSchema) });
  const [done, setDone] = useState(false);

  const onSubmit = async (v: z.infer<typeof resetSchema>) => {
    try {
      await authService.resetPassword(v.token, v.password);
      setDone(true);
      toast.success('Password updated');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not reset password');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-50 px-6 py-12">
      <div className="w-full max-w-sm">
        <Helmet><title>Reset password — Marque Admin</title></Helmet>
        <Link to="/login" className="flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900">
          <ArrowLeft className="h-4 w-4" /> Back to sign in
        </Link>
        <div className="mt-6 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-950 font-display text-lg font-bold text-gold-400">M</div>
          <span className="font-display text-lg font-bold text-ink-950">Marque Admin</span>
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold text-ink-950">Set a new password</h1>
        {done ? (
          <div className="mt-4 rounded-xl border border-success-100 bg-success-50 p-4 text-sm text-success-700">
            <p className="flex items-center gap-2 font-semibold"><CheckCircle2 className="h-4 w-4" /> Password updated</p>
            <p className="mt-1 text-success-600">You can now sign in with your new password.</p>
            <Link to="/login" className="mt-3 inline-block font-semibold text-gold-600 hover:text-gold-700">Sign in →</Link>
          </div>
        ) : (
          <>
            <p className="mt-1.5 text-sm text-ink-500">Enter the token from your email and choose a new password.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <Input label="Reset token" leftIcon={<KeyRound className="h-4 w-4" />} {...register('token')} error={errors.token?.message} placeholder="abc123" />
              <Input label="New password" type="password" leftIcon={<Lock className="h-4 w-4" />} {...register('password')} error={errors.password?.message} placeholder="••••••••" />
              <Input label="Confirm password" type="password" leftIcon={<Lock className="h-4 w-4" />} {...register('confirm')} error={errors.confirm?.message} placeholder="••••••••" />
              <Button type="submit" fullWidth loading={isSubmitting}>Update password</Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
