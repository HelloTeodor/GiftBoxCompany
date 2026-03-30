import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Package, MapPin, User, CreditCard } from 'lucide-react';
import { formatDate, formatPrice } from '@/lib/utils';
import { AdminOrderStatusUpdater } from '@/components/admin/AdminOrderStatusUpdater';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Order Detail | Admin' };

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true, phone: true } },
      shippingAddress: true,
      items: {
        include: {
          product: {
            select: { name: true, sku: true, images: { take: 1, select: { url: true } } },
          },
        },
      },
    },
  });

  if (!order) notFound();

  const addr = order.shippingAddress;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/orders" className="p-2 text-gray-400 hover:text-gray-600">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">Order #{order.orderNumber}</h1>
          <p className="text-gray-500 text-sm">{formatDate(order.createdAt)}</p>
        </div>
        <div className="ml-auto">
          <AdminOrderStatusUpdater orderId={order.id} currentStatus={order.status} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: items + summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <Package size={18} className="text-gray-400" />
              <h2 className="font-semibold text-gray-900">Items ({order.items.length})</h2>
            </div>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-cream-100 rounded-xl overflow-hidden flex-shrink-0">
                    {item.product.images[0] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.product.images[0].url} alt={item.product.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{item.productName}</p>
                    <p className="text-xs text-gray-400">{item.sku}</p>
                    {item.variantName && <p className="text-xs text-gray-400">{item.variantName}</p>}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-gray-900">{formatPrice(Number(item.total))}</p>
                    <p className="text-xs text-gray-400">x{item.quantity} · {formatPrice(Number(item.price))}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order summary */}
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <CreditCard size={18} className="text-gray-400" />
              <h2 className="font-semibold text-gray-900">Payment Summary</h2>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span><span>{formatPrice(Number(order.subtotal))}</span>
              </div>
              {Number(order.discountAmount) > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount {order.couponCode && `(${order.couponCode})`}</span>
                  <span>-{formatPrice(Number(order.discountAmount))}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{Number(order.shippingCost) === 0 ? 'Free' : formatPrice(Number(order.shippingCost))}</span>
              </div>
              {Number(order.taxAmount) > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span><span>{formatPrice(Number(order.taxAmount))}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                <span>Total</span><span>{formatPrice(Number(order.total))}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
              <span className="text-gray-500">Payment status</span>
              <span className={`font-semibold ${order.paymentStatus === 'PAID' ? 'text-green-600' : 'text-amber-600'}`}>
                {order.paymentStatus}
              </span>
            </div>
            {order.paymentIntentId && (
              <p className="text-xs text-gray-400 mt-2">Payment ID: {order.paymentIntentId}</p>
            )}
          </div>
        </div>

        {/* Right: customer + shipping */}
        <div className="space-y-6">
          {/* Customer */}
          <div className="bg-white rounded-2xl shadow-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <User size={18} className="text-gray-400" />
              <h2 className="font-semibold text-gray-900">Customer</h2>
            </div>
            <p className="font-medium text-gray-900 text-sm">{order.user?.name || 'Guest'}</p>
            <p className="text-gray-500 text-sm">{order.user?.email || order.guestEmail}</p>
            {order.user?.phone && <p className="text-gray-500 text-sm">{order.user.phone}</p>}
          </div>

          {/* Shipping address */}
          {addr && (
            <div className="bg-white rounded-2xl shadow-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={18} className="text-gray-400" />
                <h2 className="font-semibold text-gray-900">Shipping Address</h2>
              </div>
              <div className="text-sm text-gray-600 space-y-0.5">
                <p className="font-medium text-gray-900">{addr.firstName} {addr.lastName}</p>
                {addr.company && <p>{addr.company}</p>}
                <p>{addr.addressLine1}</p>
                {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                <p>{addr.city}{addr.postalCode ? `, ${addr.postalCode}` : ''}</p>
                <p>{addr.country}</p>
                {addr.phone && <p>{addr.phone}</p>}
              </div>
            </div>
          )}

          {/* Gift message */}
          {order.giftMessage && (
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h2 className="font-semibold text-gray-900 mb-2">Gift Message</h2>
              <p className="text-sm text-gray-600 italic">&ldquo;{order.giftMessage}&rdquo;</p>
            </div>
          )}

          {/* Internal note */}
          {order.internalNote && (
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
              <h2 className="font-semibold text-amber-800 mb-2">Internal Note</h2>
              <p className="text-sm text-amber-700">{order.internalNote}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
