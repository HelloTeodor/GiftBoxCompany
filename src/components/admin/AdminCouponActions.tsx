'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function AdminCouponActions({ couponId }: { couponId: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Delete this coupon? This cannot be undone.')) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/coupons/${couponId}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Coupon deleted');
        router.refresh();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Failed to delete');
      }
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <Link href={`/admin/coupons/${couponId}/edit`} className="p-1.5 text-gray-400 hover:text-gold-600 inline-flex">
        <Edit size={15} />
      </Link>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="p-1.5 text-gray-400 hover:text-red-600 disabled:opacity-40"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
