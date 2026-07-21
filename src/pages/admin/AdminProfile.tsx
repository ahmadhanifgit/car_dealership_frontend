import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { User, Mail, Shield, Save, Camera } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Field';
import { Badge } from '@/components/common/Feedback';
import { initials, formatDate } from '@/lib/format';

const profileSchema = z.object({
  name: z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email'),
});
const passwordSchema = z.object({
  current: z.string().min(4, 'Enter your current password'),
  next: z.string().min(6, 'Use at least 6 characters'),
  confirm: z.string().min(6, 'Confirm your password'),
}).refine((d) => d.next === d.confirm, { message: 'Passwords do not match', path: ['confirm'] });

export function AdminProfile() {
  const { user } = useAuth();
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const profile = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name || '', email: user?.email || '' },
  });
  const password = useForm<z.infer<typeof passwordSchema>>({ resolver: zodResolver(passwordSchema) });

  const onSaveProfile = async (v: z.infer<typeof profileSchema>) => {
    setSavingProfile(true);
    await new Promise((r) => setTimeout(r, 400));
    toast.success('Profile updated');
    setSavingProfile(false);
    void v;
  };
  const onSavePassword = async () => {
    setSavingPassword(true);
    await new Promise((r) => setTimeout(r, 400));
    toast.success('Password changed');
    password.reset();
    setSavingPassword(false);
  };

  return (
    <>
      <Helmet><title>Profile — Marque Admin</title></Helmet>
      <h1 className="font-display text-2xl font-bold text-ink-950">Profile</h1>
      <p className="text-sm text-ink-500">Manage your account details and security.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ink-950 font-display text-2xl font-bold text-gold-400">{user ? initials(user.name) : 'A'}</div>
              <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-gold-400 text-ink-950 shadow-soft hover:bg-gold-300" aria-label="Change avatar">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>
            <h2 className="mt-4 font-display text-lg font-semibold text-ink-900">{user?.name}</h2>
            <p className="text-sm text-ink-400">{user?.email}</p>
            <div className="mt-3"><Badge tone="gold"><Shield className="h-3 w-3" /> {user?.role}</Badge></div>
          </div>
          <div className="mt-6 space-y-3 border-t border-ink-100 pt-5 text-sm">
            <div className="flex items-center justify-between"><span className="text-ink-400">Member since</span><span className="font-medium text-ink-900">Mar 2024</span></div>
            <div className="flex items-center justify-between"><span className="text-ink-400">Last sign-in</span><span className="font-medium text-ink-900">{formatDate(new Date().toISOString())}</span></div>
            <div className="flex items-center justify-between"><span className="text-ink-400">Status</span><span className="flex items-center gap-1.5 font-medium text-success-600"><span className="h-2 w-2 rounded-full bg-success-500" /> Active</span></div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="font-display text-base font-semibold text-ink-900">Account details</h2>
            <form onSubmit={profile.handleSubmit(onSaveProfile)} className="mt-5 space-y-4">
              <Input label="Full name" leftIcon={<User className="h-4 w-4" />} {...profile.register('name')} error={profile.formState.errors.name?.message} />
              <Input label="Email" type="email" leftIcon={<Mail className="h-4 w-4" />} {...profile.register('email')} error={profile.formState.errors.email?.message} />
              <div className="flex justify-end"><Button type="submit" loading={savingProfile} leftIcon={<Save className="h-4 w-4" />}>Save changes</Button></div>
            </form>
          </div>

          <div className="card p-6">
            <h2 className="font-display text-base font-semibold text-ink-900">Change password</h2>
            <form onSubmit={password.handleSubmit(onSavePassword)} className="mt-5 space-y-4">
              <Input label="Current password" type="password" {...password.register('current')} error={password.formState.errors.current?.message} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="New password" type="password" {...password.register('next')} error={password.formState.errors.next?.message} />
                <Input label="Confirm new password" type="password" {...password.register('confirm')} error={password.formState.errors.confirm?.message} />
              </div>
              <div className="flex justify-end"><Button type="submit" variant="dark" loading={savingPassword}>Update password</Button></div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
