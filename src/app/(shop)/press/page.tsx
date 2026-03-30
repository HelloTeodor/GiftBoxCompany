import Link from 'next/link';
import { Mail, Download } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Press | Giftora',
  description: 'Press resources, brand assets, and media contact for Giftora.',
};

export default function PressPage() {
  return (
    <div>
      <div className="bg-cream-50 border-b border-cream-200 py-16 text-center">
        <p className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-3">Media & Press</p>
        <h1 className="font-serif text-4xl font-bold text-navy-950 mb-3">Press Room</h1>
        <p className="text-cream-500 max-w-lg mx-auto">
          Brand assets, company information, and media contact details for Giftora.
        </p>
      </div>

      <div className="section-padding py-16 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card-premium p-8">
            <h2 className="font-serif text-xl font-bold text-navy-950 mb-4">About Giftora</h2>
            <p className="text-cream-600 text-sm leading-relaxed mb-4">
              Giftora is a premium gift box company based in Dublin, Ireland. We curate beautifully designed
              gift boxes for every occasion — from corporate gifting to personal milestones like births,
              birthdays, and Christmas.
            </p>
            <p className="text-cream-600 text-sm leading-relaxed">
              Founded with the belief that the best gifts are thoughtfully curated, we partner with artisan
              producers and premium brands to fill every box with products that delight.
            </p>
          </div>

          <div className="card-premium p-8">
            <h2 className="font-serif text-xl font-bold text-navy-950 mb-4">Media Contact</h2>
            <p className="text-cream-600 text-sm mb-6">
              For press enquiries, interview requests, or partnership opportunities, please reach out to our
              team directly.
            </p>
            <a
              href="mailto:press@giftora.com"
              className="btn-gold inline-flex items-center gap-2"
            >
              <Mail size={16} /> press@giftora.com
            </a>
          </div>
        </div>

        <div className="card-premium p-8">
          <h2 className="font-serif text-xl font-bold text-navy-950 mb-6">Brand Assets</h2>
          <p className="text-cream-500 text-sm mb-6">
            Please use our official brand assets when featuring Giftora in press coverage.
            Do not alter, distort, or recolor the logo.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {['Logo (SVG)', 'Logo (PNG)', 'Brand Guidelines'].map((asset) => (
              <div key={asset} className="border border-cream-200 rounded-xl p-4 text-center">
                <div className="w-10 h-10 bg-cream-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Download size={18} className="text-cream-400" />
                </div>
                <p className="text-sm font-medium text-navy-700">{asset}</p>
                <Link href="/contact" className="text-xs text-gold-600 hover:underline mt-1 block">
                  Request access
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
