import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { useCars } from '@/contexts/CarContext';
import { carService } from '@/services';
import { getCarById } from '@/data/cars';
import { Button } from '@/components/common/Button';
import { Input, Textarea, Select } from '@/components/common/Field';
import { ImageUploader } from '@/components/common/ImageUploader';
import { Loader } from '@/components/common/Feedback';
import { BRANDS, BODY_TYPES, FUEL_TYPES, TRANSMISSIONS, DRIVETRAINS, CONDITIONS } from '@/constants';
import type { Car, CarStatus, BodyType, FuelType, TransmissionType, Drivetrain } from '@/types';
import { slugify } from '@/lib/format';

const num = z.number();
const schema = z.object({
  brand: z.string().min(1, 'Required'),
  model: z.string().min(1, 'Required'),
  year: num.min(1990, 'Must be 1990+').max(2030, 'Too far in the future'),
  price: num.min(1, 'Enter a price'),
  mileage: num.min(0, 'Cannot be negative'),
  bodyType: z.string().min(1, 'Required'),
  fuelType: z.string().min(1, 'Required'),
  transmission: z.string().min(1, 'Required'),
  drivetrain: z.string().min(1, 'Required'),
  engineSize: num.min(0),
  horsepower: num.min(1),
  topSpeed: num.min(1),
  acceleration: num.min(0.1),
  seats: num.min(1).max(9),
  doors: num.min(2).max(5),
  color: z.string().min(1, 'Required'),
  interiorColor: z.string().min(1, 'Required'),
  condition: z.string().min(1, 'Required'),
  status: z.string().min(1, 'Required'),
  description: z.string().min(20, 'Add at least 20 characters').max(1000),
  features: z.string(),
  featured: z.boolean(),
});
type FormValues = z.infer<typeof schema>;

const defaults: FormValues = {
  brand: '', model: '', year: 2024, price: 50000, mileage: 0,
  bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', drivetrain: 'AWD',
  engineSize: 2.0, horsepower: 250, topSpeed: 200, acceleration: 6.0, seats: 5, doors: 4,
  color: '', interiorColor: '', condition: 'New', status: 'available',
  description: '', features: '', featured: false,
};

interface Props { mode: 'create' | 'edit' }

export function AdminCarForm({ mode }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { refresh } = useCars();
  const existing = mode === 'edit' && id ? getCarById(id) : undefined;
  const [images, setImages] = useState<string[]>(existing?.images || []);
  const [loading, setLoading] = useState(mode === 'edit' && !existing);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
  });

  useEffect(() => {
    if (mode === 'edit' && existing) {
      reset({
        brand: existing.brand, model: existing.model, year: existing.year, price: existing.price,
        mileage: existing.mileage, bodyType: existing.bodyType, fuelType: existing.fuelType,
        transmission: existing.transmission, drivetrain: existing.drivetrain, engineSize: existing.engineSize,
        horsepower: existing.horsepower, topSpeed: existing.topSpeed, acceleration: existing.acceleration,
        seats: existing.seats, doors: existing.doors, color: existing.color, interiorColor: existing.interiorColor,
        condition: existing.condition, status: existing.status, description: existing.description,
        features: existing.features.join(', '), featured: existing.featured,
      });
      setImages(existing.images);
      setLoading(false);
    }
  }, [mode, existing, reset]);

  const onSubmit = async (v: FormValues) => {
    if (images.length === 0) { toast.error('Add at least one image'); return; }
    setSaving(true);
    const payload = {
      brand: v.brand, model: v.model, year: v.year, price: v.price, mileage: v.mileage,
      bodyType: v.bodyType as BodyType, fuelType: v.fuelType as FuelType,
      transmission: v.transmission as TransmissionType, drivetrain: v.drivetrain as Drivetrain,
      engineSize: v.engineSize, horsepower: v.horsepower, topSpeed: v.topSpeed, acceleration: v.acceleration,
      seats: v.seats, doors: v.doors, color: v.color, interiorColor: v.interiorColor,
      condition: v.condition as Car['condition'], status: v.status as CarStatus,
      description: v.description, features: v.features.split(',').map((s) => s.trim()).filter(Boolean),
      featured: v.featured, images,
    };
    try {
      if (mode === 'edit' && existing) {
        await carService.update(existing.id, payload);
        toast.success('Vehicle updated');
      } else {
        const slug = slugify(`${v.brand}-${v.model}-${v.year}`);
        await carService.create({ ...payload, slug } as Omit<Car, 'id' | 'slug' | 'createdAt' | 'updatedAt'>);
        toast.success('Vehicle created');
      }
      await refresh();
      navigate('/admin/cars');
    } catch {
      toast.error('Could not save vehicle');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader label="Loading vehicle…" />;

  return (
    <>
      <Helmet><title>{mode === 'create' ? 'New car' : 'Edit car'} — Marque Admin</title></Helmet>
      <div className="flex items-center justify-between">
        <div>
          <Link to="/admin/cars" className="flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-900"><ArrowLeft className="h-4 w-4" /> Back to inventory</Link>
          <h1 className="mt-2 font-display text-2xl font-bold text-ink-950">{mode === 'create' ? 'Add a new vehicle' : `Edit ${existing?.brand} ${existing?.model}`}</h1>
        </div>
        {mode === 'edit' && existing && (
          <Link to={`/cars/${existing.slug}`} target="_blank"><Button variant="ghost" leftIcon={<Eye className="h-4 w-4" />}>View listing</Button></Link>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <Section title="Basic information" subtitle="Identity and listing basics">
          <div className="grid gap-4 sm:grid-cols-2">
            <Select label="Brand *" {...register('brand')} options={BRANDS.map((b) => ({ value: b.name, label: b.name }))} placeholder="Select brand" error={errors.brand?.message} />
            <Input label="Model *" {...register('model')} error={errors.model?.message} placeholder="M4 Competition" />
            <Input label="Year *" type="number" {...register('year', { valueAsNumber: true })} error={errors.year?.message} />
            <Select label="Condition *" {...register('condition')} options={CONDITIONS.map((c) => ({ value: c, label: c }))} error={errors.condition?.message} />
          </div>
        </Section>

        <Section title="Pricing & status" subtitle="How the car shows up in inventory">
          <div className="grid gap-4 sm:grid-cols-3">
            <Input label="Price (USD) *" type="number" {...register('price', { valueAsNumber: true })} error={errors.price?.message} />
            <Input label="Mileage *" type="number" {...register('mileage', { valueAsNumber: true })} error={errors.mileage?.message} />
            <Select label="Status *" {...register('status')} options={[{ value: 'available', label: 'Available' }, { value: 'reserved', label: 'Reserved' }, { value: 'sold', label: 'Sold' }]} error={errors.status?.message} />
          </div>
          <label className="mt-4 flex items-center gap-2.5 text-sm text-ink-700">
            <input type="checkbox" {...register('featured')} className="h-4 w-4 rounded border-ink-300 text-gold-500 focus:ring-gold-400" />
            Feature this vehicle on the homepage
          </label>
        </Section>

        <Section title="Specifications" subtitle="Performance and physical attributes">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Select label="Body type *" {...register('bodyType')} options={BODY_TYPES.map((b) => ({ value: b, label: b }))} error={errors.bodyType?.message} />
            <Select label="Fuel *" {...register('fuelType')} options={FUEL_TYPES.map((f) => ({ value: f, label: f }))} error={errors.fuelType?.message} />
            <Select label="Transmission *" {...register('transmission')} options={TRANSMISSIONS.map((t) => ({ value: t, label: t }))} error={errors.transmission?.message} />
            <Select label="Drivetrain *" {...register('drivetrain')} options={DRIVETRAINS.map((d) => ({ value: d, label: d }))} error={errors.drivetrain?.message} />
            <Input label="Engine size (L)" type="number" step="0.1" {...register('engineSize', { valueAsNumber: true })} error={errors.engineSize?.message} />
            <Input label="Horsepower *" type="number" {...register('horsepower', { valueAsNumber: true })} error={errors.horsepower?.message} />
            <Input label="Top speed (mph)" type="number" {...register('topSpeed', { valueAsNumber: true })} error={errors.topSpeed?.message} />
            <Input label="0–60 mph (s)" type="number" step="0.1" {...register('acceleration', { valueAsNumber: true })} error={errors.acceleration?.message} />
            <Input label="Seats" type="number" {...register('seats', { valueAsNumber: true })} error={errors.seats?.message} />
            <Input label="Doors" type="number" {...register('doors', { valueAsNumber: true })} error={errors.doors?.message} />
            <Input label="Exterior color *" {...register('color')} error={errors.color?.message} placeholder="Alpine White" />
            <Input label="Interior color *" {...register('interiorColor')} error={errors.interiorColor?.message} placeholder="Black Leather" />
          </div>
        </Section>

        <Section title="Description & features" subtitle="What buyers read">
          <Textarea label="Description *" {...register('description')} error={errors.description?.message} placeholder="A meticulously maintained…" />
          <div className="mt-4">
            <Input label="Features (comma separated)" {...register('features')} placeholder="Adaptive cruise control, Heated seats, Panoramic roof" />
            <p className="mt-1.5 text-xs text-ink-400">Separate each feature with a comma.</p>
          </div>
        </Section>

        <Section title="Images" subtitle="First image is the cover">
          <ImageUploader value={images} onChange={setImages} />
        </Section>

        <div className="flex items-center justify-end gap-3 pb-4">
          <Link to="/admin/cars"><Button type="button" variant="subtle">Cancel</Button></Link>
          <Button type="submit" loading={saving} leftIcon={<Save className="h-4 w-4" />}>{mode === 'create' ? 'Create vehicle' : 'Save changes'}</Button>
        </div>
      </form>
    </>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="card p-6">
      <div className="mb-5">
        <h2 className="font-display text-base font-semibold text-ink-900">{title}</h2>
        {subtitle && <p className="text-xs text-ink-400">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
