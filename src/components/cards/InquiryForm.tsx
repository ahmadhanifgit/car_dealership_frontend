import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Calendar, Info, Tag, Banknote } from 'lucide-react';
import type { Car } from '@/types';
import { Button } from '@/components/common/Button';
import { Input, Textarea } from '@/components/common/Field';
import { inquiryService } from '@/services';
import { classNames } from '@/lib/format';

const schema = z.object({
  name: z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  message: z.string().min(10, 'Tell us a bit more (10+ characters)').max(500),
});

type FormValues = z.infer<typeof schema>;

const INQUIRY_TYPES = [
  { key: 'test_drive', label: 'Test drive', icon: Calendar },
  { key: 'info', label: 'More info', icon: Info },
  { key: 'offer', label: 'Make an offer', icon: Tag },
  { key: 'financing', label: 'Financing', icon: Banknote },
] as const;

export function InquiryForm({ car }: { car: Car }) {
  const [type, setType] = useState<typeof INQUIRY_TYPES[number]['key']>('test_drive');
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      await inquiryService.create({
        carId: car.id,
        carTitle: `${car.brand} ${car.model} ${car.year}`,
        type,
        ...values,
      });
      toast.success('Inquiry sent — we will reach out within one business hour.');
      reset();
    } catch {
      toast.error('Could not send inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <p className="field-label">I want to</p>
        <div className="grid grid-cols-2 gap-2">
          {INQUIRY_TYPES.map((t) => {
            const Ico = t.icon;
            const active = type === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setType(t.key)}
                className={classNames(
                  'flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors',
                  active ? 'border-ink-950 bg-ink-950 text-white' : 'border-ink-200 text-ink-700 hover:border-ink-400',
                )}
              >
                <Ico className="h-4 w-4" /> {t.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Full name" {...register('name')} error={errors.name?.message} placeholder="Jane Doe" />
        <Input label="Phone" type="tel" {...register('phone')} error={errors.phone?.message} placeholder="(415) 555-0100" />
      </div>
      <Input label="Email" type="email" {...register('email')} error={errors.email?.message} placeholder="jane@example.com" />
      <Textarea
        label="Message"
        {...register('message')}
        error={errors.message?.message}
        placeholder={`I'm interested in the ${car.brand} ${car.model}. When can I come in for a test drive?`}
      />
      <Button type="submit" fullWidth loading={submitting}>Send inquiry</Button>
      <p className="text-center text-xs text-ink-400">We typically respond within one business hour.</p>
    </form>
  );
}
