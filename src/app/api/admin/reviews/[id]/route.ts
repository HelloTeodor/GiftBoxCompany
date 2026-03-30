import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { isStaff } from '@/lib/utils';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session || !isStaff(session.user.role)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { status } = await req.json();
  const review = await prisma.review.update({
    where: { id: params.id },
    data: { status },
  });

  // Update product rating if approved/rejected
  if (status === 'APPROVED' || status === 'REJECTED') {
    const product = await prisma.review.aggregate({
      where: { productId: review.productId, status: 'APPROVED' },
      _avg: { rating: true },
      _count: true,
    });
    await prisma.product.update({
      where: { id: review.productId },
      data: {
        rating: product._avg.rating || 0,
        reviewCount: product._count,
      },
    });
  }

  return NextResponse.json({ data: review });
}
