import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Input, Textarea, Select } from '@/components/common/Field';
import { inquiryService } from '@/services';
import { CONTACT_INFO } from '@/constants';

const schema = z.object({
  name: z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(7, 'Enter a valid phone'),
  subject: z.string().min(2, 'Pick a subject'),
  message: z.string().min(10, 'Tell us more (10+ characters)').max(800),
});
type Values = z.infer<typeof schema>;

const SUBJECTS = [
  { value: 'test_drive', label: 'Schedule a test drive' },
  { value: 'financing', label: 'Financing & pre-qualification' },
  { value: 'trade_in', label: 'Trade-in appraisal' },
  { value: 'general', label: 'General question' },
];

export function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async (v: Values) => {
    await inquiryService.create({
      carId: 'general',
      carTitle: v.subject,
      name: v.name,
      email: v.email,
      phone: v.phone,
      message: v.message,
      type: 'info',
    });
    toast.success('Message sent — we will reply within one business hour.');
    reset();
  };

  return (
    <>
      <Helmet>
        <title>Contact — Marque Motors</title>
        <meta name="description" content="Get in touch with Marque Motors — schedule a test drive, ask about financing, or request a trade-in appraisal." />
      </Helmet>

      <section className="border-b border-ink-100 bg-ink-50/50">
        <div className="container-px py-12">
          <span className="eyebrow"><span className="h-px w-8 bg-gold-500" /> Get in touch</span>
          <h1 className="mt-2 font-display text-3xl font-bold text-ink-950 sm:text-4xl">We're here to help</h1>
          <p className="mt-2 max-w-xl text-ink-500">Questions about a vehicle, financing, or a trade-in? Reach out and a concierge will respond within one business hour.</p>
        </div>
      </section>

      <div className="container-px py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            {[
              { icon: <MapPin className="h-5 w-5" />, label: 'Showroom', value: CONTACT_INFO.address },
              { icon: <Phone className="h-5 w-5" />, label: 'Phone', value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}` },
              { icon: <Mail className="h-5 w-5" />, label: 'Email', value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
              { icon: <Clock className="h-5 w-5" />, label: 'Hours', value: CONTACT_INFO.hours },
            ].map((c) => (
              <div key={c.label} className="card flex items-start gap-4 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-950 text-gold-400">{c.icon}</span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-ink-400">{c.label}</p>
                  {c.href ? <a href={c.href} className="text-sm font-semibold text-ink-900 hover:text-gold-600">{c.value}</a> : <p className="text-sm font-semibold text-ink-900">{c.value}</p>}
                </div>
              </div>
            ))}
            <div className="overflow-hidden rounded-2xl border border-ink-100">
              <iframe
                title="Marque Motors location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-122.42%2C37.76%2C-122.38%2C37.78&layer=mapnik"
                className="aspect-[4/3] w-full"
                loading="lazy"
              />
            </div>
          </div>

          <div className="card p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-ink-900">Send us a message</h2>
            <p className="mt-1 text-sm text-ink-500">Fields marked with * are required.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Full name *" {...register('name')} error={errors.name?.message} placeholder="Jane Doe" />
                <Input label="Phone *" type="tel" {...register('phone')} error={errors.phone?.message} placeholder="(415) 555-0100" />
              </div>
              <Input label="Email *" type="email" {...register('email')} error={errors.email?.message} placeholder="jane@example.com" />
              <Select label="Subject *" options={SUBJECTS} placeholder="Select a subject" {...register('subject')} error={errors.subject?.message} />
              <Textarea label="Message *" {...register('message')} error={errors.message?.message} placeholder="How can we help?" />
              <Button type="submit" loading={isSubmitting} leftIcon={<Send className="h-4 w-4" />}>Send message</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
