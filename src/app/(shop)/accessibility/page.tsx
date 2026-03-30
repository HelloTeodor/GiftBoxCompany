import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accessibility | Giftora',
  description: 'Our commitment to making Giftora accessible to everyone.',
};

export default function AccessibilityPage() {
  return (
    <div>
      <div className="bg-cream-50 border-b border-cream-200 py-16 text-center">
        <p className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-3">Accessibility</p>
        <h1 className="font-serif text-4xl font-bold text-navy-950 mb-3">Accessibility Statement</h1>
        <p className="text-cream-500">Last updated: January 2025</p>
      </div>

      <div className="section-padding py-16 max-w-3xl mx-auto space-y-10 text-cream-700 text-sm leading-relaxed">
        <section>
          <h2 className="font-serif text-2xl font-bold text-navy-950 mb-4">Our Commitment</h2>
          <p>
            Giftora is committed to ensuring our website is accessible to all users, including those with
            disabilities. We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-navy-950 mb-4">What We Do</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Use semantic HTML to support screen readers</li>
            <li>Provide sufficient colour contrast for text and interactive elements</li>
            <li>Ensure all images have descriptive alt text</li>
            <li>Make the full site navigable by keyboard alone</li>
            <li>Use clear, consistent navigation and heading structure</li>
            <li>Avoid content that flashes more than 3 times per second</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-navy-950 mb-4">Known Issues</h2>
          <p>
            We are continuously working to improve accessibility across all areas of our website. If you encounter
            any barriers, please let us know and we will prioritise fixing them.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-navy-950 mb-4">Feedback</h2>
          <p className="mb-4">
            We welcome your feedback on the accessibility of our website. If you experience difficulty accessing
            any content or functionality, please contact us:
          </p>
          <ul className="space-y-2">
            <li>Email: <a href="mailto:hello@giftora.com" className="text-gold-600 hover:underline">hello@giftora.com</a></li>
            <li>Or use our <Link href="/contact" className="text-gold-600 hover:underline">Contact page</Link></li>
          </ul>
          <p className="mt-4">
            We aim to respond to accessibility feedback within 2 business days.
          </p>
        </section>
      </div>
    </div>
  );
}
