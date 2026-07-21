import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Compass } from 'lucide-react';
import { Button } from '@/components/common/Button';

export function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <Helmet><title>Page not found — Marque Motors</title></Helmet>
      <Compass className="h-12 w-12 text-gold-400" />
      <p className="mt-6 font-display text-6xl font-bold text-ink-950">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-ink-900">This page took a wrong turn</h1>
      <p className="mt-2 max-w-md text-ink-500">The page you're looking for doesn't exist or may have been moved.</p>
      <div className="mt-6 flex gap-3">
        <Link to="/"><Button>Back home</Button></Link>
        <Link to="/inventory"><Button variant="ghost">Browse inventory</Button></Link>
      </div>
    </div>
  );
}
