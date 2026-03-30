import { Star, Quote } from 'lucide-react';
import Image from 'next/image';
import { getInitials } from '@/lib/utils';

interface Testimonial {
  id: string;
  rating: number;
  title?: string | null;
  body: string;
  createdAt: Date;
  user: { name?: string | null; avatar?: string | null };
}

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  const avgRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  return (
    <section className="py-16 lg:py-24 bg-cream-50">
      <div className="section-padding">
        <div className="text-center mb-12">
          <p className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-3">Customer Love</p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy-950 mb-4">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="text-gold-500 fill-gold-500" />
              ))}
            </div>
            <span className="text-navy-700 font-semibold">{avgRating.toFixed(1)} out of 5</span>
            <span className="text-cream-500 text-sm">· {testimonials.length} review{testimonials.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((t) => (
            <div key={t.id} className="card-premium p-6 relative">
              <Quote size={24} className="text-gold-200 absolute top-4 right-4" />
              <div className="flex mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < t.rating ? 'text-gold-500 fill-gold-500' : 'text-cream-200'}
                  />
                ))}
              </div>
              {t.title && (
                <h4 className="font-serif font-semibold text-navy-950 mb-2">{t.title}</h4>
              )}
              <p className="text-cream-600 text-sm leading-relaxed mb-4 line-clamp-3">{t.body}</p>
              <div className="flex items-center gap-3 pt-3 border-t border-cream-100">
                <div className="w-8 h-8 rounded-full bg-navy-950 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {t.user.avatar ? (
                    <Image src={t.user.avatar} alt={t.user.name || ''} width={32} height={32} className="rounded-full" />
                  ) : (
                    getInitials(t.user.name)
                  )}
                </div>
                <div>
                  <p className="text-navy-800 font-medium text-sm">{t.user.name || 'Anonymous'}</p>
                  <p className="text-cream-400 text-xs">Verified Purchase</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
