import { useRef } from 'react';
import { UploadCloud, X, ImageIcon } from 'lucide-react';
import { classNames } from '@/lib/format';

interface Props {
  value: string[];
  onChange: (urls: string[]) => void;
  max?: number;
}

export function ImageUploader({ value, onChange, max = 8 }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const canAdd = value.length < max;

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    const next = [...value];
    Array.from(files).slice(0, max - value.length).forEach((file) => {
      next.push(URL.createObjectURL(file));
    });
    onChange(next);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {value.map((url, i) => (
          <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-ink-200 bg-ink-50">
            <img src={url} alt={`Upload ${i + 1}`} className="h-full w-full object-cover" />
            {i === 0 && <span className="absolute left-2 top-2 rounded-full bg-ink-950/80 px-2 py-0.5 text-[10px] font-semibold text-white">Cover</span>}
            <button
              type="button"
              onClick={() => onChange(value.filter((_, idx) => idx !== i))}
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-ink-700 opacity-0 transition-opacity group-hover:opacity-100 hover:text-crimson-600"
              aria-label="Remove image"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
        {canAdd && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={classNames(
              'flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink-200 text-ink-400 transition-colors hover:border-gold-400 hover:text-gold-600',
            )}
          >
            <UploadCloud className="h-6 w-6" />
            <span className="text-xs font-medium">Add image</span>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => onFiles(e.target.files)}
      />
      <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-400">
        <ImageIcon className="h-3.5 w-3.5" /> {value.length}/{max} images · first image is the cover
      </p>
    </div>
  );
}
