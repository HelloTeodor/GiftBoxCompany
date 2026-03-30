import Link from 'next/link';
import { DollarSign, Users, BarChart2, Gift } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate Program | Giftora',
  description: 'Earn commission by referring customers to Giftora.',
};

const benefits = [
  { icon: DollarSign, title: 'Competitive Commission', desc: 'Earn up to 10% commission on every referred sale.' },
  { icon: Users, title: 'No Minimum Audience', desc: 'Anyone can join — bloggers, influencers, or just fans.' },
  { icon: BarChart2, title: 'Real-Time Dashboard', desc: 'Track clicks, conversions, and earnings instantly.' },
  { icon: Gift, title: 'Exclusive Perks', desc: 'Get early access to new products and special discount codes.' },
];

export default function AffiliatePage() {
  return (
    <div>
      <div className="bg-navy-gradient py-20 text-center text-white">
        <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-3">Partner With Us</p>
        <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4">Affiliate Program</h1>
        <p className="text-cream-300 max-w-xl mx-auto text-lg">
          Love Giftora? Share it with your audience and earn commission on every sale you drive.
        </p>
      </div>

      <div className="section-padding py-16">
        <h2 className="font-serif text-3xl font-bold text-navy-950 text-center mb-3">Why Join?</h2>
        <p className="text-cream-500 text-center mb-12">Simple, transparent, rewarding.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map(({ icon: Icon, title, desc }) => (
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
          <h2 className="font-serif text-2xl font-bold text-navy-950 mb-3">Ready to Partner?</h2>
          <p className="text-cream-600 mb-6">
            Our affiliate programme is launching soon. Register your interest and we&apos;ll be in touch
            with your unique referral link and onboarding details.
          </p>
          <Link href="/contact" className="btn-gold">
            Register Interest
          </Link>
        </div>
      </div>
    </div>
  );
}
