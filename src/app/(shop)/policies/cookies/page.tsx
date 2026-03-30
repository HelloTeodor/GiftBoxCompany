import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | Giftora',
  description: 'How Giftora uses cookies and similar technologies.',
};

export default function CookiePolicyPage() {
  return (
    <div>
      <div className="bg-cream-50 border-b border-cream-200 py-16 text-center">
        <p className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-3">Policies</p>
        <h1 className="font-serif text-4xl font-bold text-navy-950 mb-3">Cookie Policy</h1>
        <p className="text-cream-500">Last updated: January 2025</p>
      </div>

      <div className="section-padding py-16 max-w-3xl mx-auto space-y-10 text-cream-700 text-sm leading-relaxed">
        <section>
          <h2 className="font-serif text-2xl font-bold text-navy-950 mb-4">What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your device when you visit our website. They help us
            provide you with a better experience by remembering your preferences and understanding how you use our site.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-navy-950 mb-4">Types of Cookies We Use</h2>
          <div className="space-y-4">
            {[
              { name: 'Essential Cookies', desc: 'Required for the website to function. These include session cookies for login, shopping cart data, and security tokens. You cannot opt out of these.' },
              { name: 'Analytics Cookies', desc: 'Help us understand how visitors interact with our website. We use this data to improve our pages and user experience. These can be disabled.' },
              { name: 'Preference Cookies', desc: 'Remember your settings and preferences such as language, currency, and layout choices to personalise your experience.' },
              { name: 'Marketing Cookies', desc: 'Used to deliver relevant advertisements and track ad campaign effectiveness. We only use these with your consent.' },
            ].map(({ name, desc }) => (
              <div key={name} className="border border-cream-200 rounded-xl p-5">
                <h3 className="font-semibold text-navy-800 mb-1">{name}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-navy-950 mb-4">Managing Cookies</h2>
          <p className="mb-3">
            You can control cookies through your browser settings. Most browsers allow you to refuse cookies or
            delete existing ones. Please note that disabling certain cookies may affect the functionality of our website.
          </p>
          <p>
            For more information on managing cookies in your browser, visit{' '}
            <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-gold-600 hover:underline">
              www.aboutcookies.org
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-navy-950 mb-4">Contact Us</h2>
          <p>
            If you have any questions about our use of cookies, please contact us at{' '}
            <a href="mailto:hello@giftora.com" className="text-gold-600 hover:underline">hello@giftora.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
