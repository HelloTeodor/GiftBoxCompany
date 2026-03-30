import Link from 'next/link';
import { Briefcase, Heart, Zap, Globe } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers | Giftora',
  description: 'Join the Giftora team and help us make gifting unforgettable.',
};

const values = [
  { icon: Heart, title: 'People First', desc: 'We build a culture where everyone feels valued and heard.' },
  { icon: Zap, title: 'Move Fast', desc: 'We ship quickly, learn from feedback, and keep improving.' },
  { icon: Globe, title: 'Remote Friendly', desc: 'Work from anywhere — we care about output, not location.' },
  { icon: Briefcase, title: 'Grow With Us', desc: 'Regular reviews, learning budgets, and clear progression paths.' },
];

export default function CareersPage() {
  return (
    <div>
      <div className="bg-navy-gradient py-20 text-center text-white">
        <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-3">Join Our Team</p>
        <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">Build the Future of Gifting</h1>
        <p className="text-cream-300 max-w-xl mx-auto text-lg">
          We&apos;re a passionate team based in Dublin making every gift moment unforgettable. Come work with us.
        </p>
      </div>

      <div className="section-padding py-16">
        <h2 className="font-serif text-3xl font-bold text-navy-950 text-center mb-12">Our Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-premium p-6 text-center">
              <div className="w-12 h-12 bg-gold-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon size={22} className="text-gold-600" />
              </div>
              <h3 className="font-serif font-semibold text-navy-950 mb-2">{title}</h3>
              <p className="text-cream-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto text-center bg-cream-50 rounded-2xl p-12 border border-cream-200">
          <h2 className="font-serif text-2xl font-bold text-navy-950 mb-3">No Open Roles Right Now</h2>
          <p className="text-cream-600 mb-6">
            We don&apos;t have any open positions at the moment, but we&apos;re always interested in hearing from talented people.
            Send us your CV and tell us how you&apos;d contribute.
          </p>
          <Link href="/contact" className="btn-gold">
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
