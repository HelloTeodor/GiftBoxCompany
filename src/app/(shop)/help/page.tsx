import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help Center | Giftora',
  description: 'Find answers to common questions about orders, delivery, and returns.',
};

const faqs = [
  {
    category: 'Orders',
    items: [
      { q: 'How do I place an order?', a: 'Browse our shop, add items to your cart, and proceed to checkout. You can pay securely by card.' },
      { q: 'Can I modify or cancel my order?', a: 'Orders can be modified or cancelled within 1 hour of placing them. Contact us immediately at hello@giftora.com.' },
      { q: 'Do you offer gift wrapping?', a: 'All our gift boxes come beautifully packaged as standard. No extra gift wrap needed.' },
    ],
  },
  {
    category: 'Delivery',
    items: [
      { q: 'How long does delivery take?', a: 'Standard delivery takes 3–5 business days. Express delivery is available at checkout for 1–2 business days.' },
      { q: 'Do you ship internationally?', a: 'We currently ship within Ireland and the UK. International shipping is coming soon.' },
      { q: 'How do I track my order?', a: 'Once shipped, you\'ll receive a tracking link by email. You can also track your order on our Track Order page.' },
    ],
  },
  {
    category: 'Returns & Refunds',
    items: [
      { q: 'What is your returns policy?', a: 'We accept returns within 14 days of delivery for unopened, undamaged items. See our Returns Policy for full details.' },
      { q: 'My item arrived damaged. What do I do?', a: 'Contact us at hello@giftora.com with a photo of the damage within 48 hours and we\'ll send a replacement or refund.' },
      { q: 'How long do refunds take?', a: 'Approved refunds are processed within 5–7 business days back to your original payment method.' },
    ],
  },
  {
    category: 'Account',
    items: [
      { q: 'Do I need an account to order?', a: 'No, you can check out as a guest. However, creating an account lets you track orders and save your details.' },
      { q: 'How do I reset my password?', a: 'Click "Forgot password?" on the login page and we\'ll email you a reset link.' },
    ],
  },
];

export default function HelpPage() {
  return (
    <div>
      <div className="bg-cream-50 border-b border-cream-200 py-16 text-center">
        <p className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-3">Support</p>
        <h1 className="font-serif text-4xl font-bold text-navy-950 mb-3">Help Centre</h1>
        <p className="text-cream-500 max-w-lg mx-auto">
          Find answers to common questions. Can&apos;t find what you need?{' '}
          <Link href="/contact" className="text-gold-600 hover:underline">Contact us</Link>
        </p>
      </div>

      <div className="section-padding py-16 max-w-3xl mx-auto">
        {faqs.map((section) => (
          <div key={section.category} className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-navy-950 mb-5">{section.category}</h2>
            <div className="space-y-3">
              {section.items.map((item) => (
                <details key={item.q} className="card-premium p-5 group">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="font-medium text-navy-800 text-sm">{item.q}</span>
                    <ChevronDown size={16} className="text-cream-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                  </summary>
                  <p className="text-cream-600 text-sm mt-3 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-12 p-8 bg-navy-950 rounded-2xl text-white">
          <h2 className="font-serif text-xl font-bold mb-2">Still need help?</h2>
          <p className="text-cream-400 text-sm mb-6">Our team is available Monday–Friday, 9am–6pm (GMT).</p>
          <Link href="/contact" className="btn-gold">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
