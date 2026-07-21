import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { Lock, Mail, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Field';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});
type Values = z.infer<typeof schema>;

export function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || '/admin';
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: 'admin@marquemotors.com', password: 'demo1234' },
  });

  if (user) return <Navigate to={from} replace />;

  const onSubmit = async (v: Values) => {
    try {
      await login(v.email, v.password);
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Login failed');
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/20" />
        <div className="absolute bottom-0 left-0 p-12 text-white">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-400 font-display text-lg font-bold text-ink-950">M</div>
            <span className="font-display text-lg font-bold">Marque Motors</span>
          </div>
          <p className="mt-4 max-w-sm text-ink-200">Manage inventory, inquiries, and listings from a single admin portal.</p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-ink-50 px-6 py-12">
        <div className="w-full max-w-sm">
          <Helmet><title>Sign in — Marque Admin</title></Helmet>
          <Link to="/" className="flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900">
            <ArrowLeft className="h-4 w-4" /> Back to site
          </Link>
          <div className="mt-8 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-950 font-display text-lg font-bold text-gold-400">M</div>
            <span className="font-display text-lg font-bold text-ink-950">Marque Admin</span>
          </div>
          <h1 className="mt-6 font-display text-2xl font-bold text-ink-950">Sign in to your account</h1>
          <p className="mt-1.5 text-sm text-ink-500">Enter your credentials to access the admin portal.</p>

          <div className="mt-4 rounded-xl bg-gold-50 border border-gold-200 p-3 text-xs text-gold-800">
            <p className="font-semibold">Demo credentials</p>
            <p className="mt-0.5">Email: admin@marquemotors.com · Password: demo1234</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <Input label="Email" type="email" leftIcon={<Mail className="h-4 w-4" />} {...register('email')} error={errors.email?.message} placeholder="you@example.com" />
            <Input label="Password" type="password" leftIcon={<Lock className="h-4 w-4" />} {...register('password')} error={errors.password?.message} placeholder="••••••••" />
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-ink-600">
                <input type="checkbox" className="h-4 w-4 rounded border-ink-300 text-gold-500 focus:ring-gold-400" defaultChecked /> Remember me
              </label>
              <Link to="/forgot-password" className="font-medium text-gold-600 hover:text-gold-700">Forgot password?</Link>
            </div>
            <Button type="submit" fullWidth loading={isSubmitting}>Sign in</Button>
          </form>

          <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-ink-400">
            <ShieldCheck className="h-3.5 w-3.5 text-success-600" /> Protected by 256-bit encryption
          </p>
        </div>
      </div>
    </div>
  );
}
