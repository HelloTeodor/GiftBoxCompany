import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { CouponForm } from '@/components/admin/CouponForm';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Edit Coupon | Admin' };

export default async function EditCouponPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const coupon = await prisma.coupon.findUnique({ where: { id } });
  if (!coupon) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-gray-900">Edit Coupon</h1>
        <p className="text-gray-500 text-sm mt-1">Update coupon code: {coupon.code}</p>
      </div>
      <CouponForm coupon={{
        ...coupon,
        value: Number(coupon.value),
        minOrderAmount: coupon.minOrderAmount !== null ? Number(coupon.minOrderAmount) : null,
        maxDiscount: coupon.maxDiscount !== null ? Number(coupon.maxDiscount) : null,
      }} />
    </div>
  );
}
