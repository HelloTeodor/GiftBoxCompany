import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Star } from 'lucide-react';
import { formatDate, formatPrice } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Customer Detail | Admin' };

export default async function AdminCustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const customer = await prisma.user.findUnique({
    where: { id },
    include: {
      orders: {
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
      reviews: {
        include: { product: { select: { name: true, slug: true } } },
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
      _count: { select: { orders: true, reviews: true } },
    },
  });

  if (!customer || customer.role === 'ADMIN') notFound();

  const totalSpent = customer.orders
    .filter(o => o.paymentStatus === 'PAID')
    .reduce((s, o) => s + Number(o.total), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/customers" className="p-2 text-gray-400 hover:text-gray-600">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">{customer.name || 'Guest'}</h1>
          <p className="text-gray-500 text-sm">{customer.email}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        {[
          { label: 'Total Orders', value: customer._count.orders.toString() },
          { label: 'Total Spent', value: formatPrice(totalSpent) },
          { label: 'Reviews', value: customer._count.reviews.toString() },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-card">
            <p className="text-sm text-gray-500 mb-1">{label}</p>
            <p className="font-serif text-2xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Orders */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <ShoppingBag size={18} className="text-gray-400" />
            <h2 className="font-semibold text-gray-900">Recent Orders</h2>
          </div>
          {customer.orders.length === 0 ? (
            <p className="text-gray-400 text-sm">No orders yet</p>
          ) : (
            <div className="space-y-3">
              {customer.orders.map(order => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <Link href={`/admin/orders/${order.id}`} className="font-medium text-gray-900 text-sm hover:text-gold-600">
                      #{order.orderNumber}
                    </Link>
                    <p className="text-xs text-gray-400">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{formatPrice(Number(order.total))}</p>
                    <p className="text-xs text-gray-400">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Star size={18} className="text-gray-400" />
            <h2 className="font-semibold text-gray-900">Reviews</h2>
          </div>
          {customer.reviews.length === 0 ? (
            <p className="text-gray-400 text-sm">No reviews yet</p>
          ) : (
            <div className="space-y-3">
              {customer.reviews.map(review => (
                <div key={review.id}>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`text-xs ${i < review.rating ? 'text-gold-500' : 'text-gray-200'}`}>★</span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">{review.product.name}</span>
                  </div>
                  {review.body && <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{review.body}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-card p-6 text-sm text-gray-500 space-y-1">
        <p><span className="font-medium text-gray-700">Email verified:</span> {customer.emailVerified ? formatDate(customer.emailVerified) : 'No'}</p>
        <p><span className="font-medium text-gray-700">Member since:</span> {formatDate(customer.createdAt)}</p>
        {customer.phone && <p><span className="font-medium text-gray-700">Phone:</span> {customer.phone}</p>}
      </div>
    </div>
  );
}
