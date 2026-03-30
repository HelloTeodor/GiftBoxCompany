import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy | Giftora',
  description: 'Everything you need to know about our shipping options and delivery times.',
};

export default function ShippingPolicyPage() {
  return (
    <div>
      <div className="bg-cream-50 border-b border-cream-200 py-16 text-center">
        <p className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-3">Policies</p>
        <h1 className="font-serif text-4xl font-bold text-navy-950 mb-3">Shipping Policy</h1>
        <p className="text-cream-500">Last updated: January 2025</p>
      </div>

      <div className="section-padding py-16 max-w-3xl mx-auto prose prose-sm">
        <div className="space-y-10 text-cream-700">
          <section>
            <h2 className="font-serif text-2xl font-bold text-navy-950 mb-4">Delivery Options</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-cream-200 rounded-xl text-sm">
                <thead>
                  <tr className="bg-cream-50">
                    <th className="text-left px-4 py-3 font-semibold text-navy-800 border-b border-cream-200">Option</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy-800 border-b border-cream-200">Timeframe</th>
                    <th className="text-left px-4 py-3 font-semibold text-navy-800 border-b border-cream-200">Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-100">
                  <tr>
                    <td className="px-4 py-3">Standard Delivery (Ireland)</td>
                    <td className="px-4 py-3">3–5 business days</td>
                    <td className="px-4 py-3">€5.95 (free over €75)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Express Delivery (Ireland)</td>
                    <td className="px-4 py-3">1–2 business days</td>
                    <td className="px-4 py-3">€9.95</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Standard Delivery (UK)</td>
                    <td className="px-4 py-3">5–7 business days</td>
                    <td className="px-4 py-3">£7.95 (free over £85)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-navy-950 mb-4">Order Processing</h2>
            <p className="leading-relaxed mb-3">
              Orders placed before 2pm (GMT) on business days are processed the same day.
              Orders placed after 2pm or on weekends are processed the next business day.
            </p>
            <p className="leading-relaxed">
              During peak periods (Christmas, Valentine&apos;s Day), processing times may be extended by 1–2 days.
              We will notify you if your order is delayed.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-navy-950 mb-4">Tracking Your Order</h2>
            <p className="leading-relaxed">
              Once your order is dispatched, you will receive a shipping confirmation email with a tracking number.
              You can track your parcel directly with our courier or use the Track Order page on our website.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-navy-950 mb-4">Delivery Issues</h2>
            <p className="leading-relaxed mb-3">
              If your parcel has not arrived within the expected timeframe, please contact us at{' '}
              <a href="mailto:hello@giftora.com" className="text-gold-600 hover:underline">hello@giftora.com</a>{' '}
              with your order number. We will investigate with the courier.
            </p>
            <p className="leading-relaxed">
              Giftora is not responsible for delays caused by incorrect delivery addresses provided by the customer,
              adverse weather conditions, or other factors outside our control.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
