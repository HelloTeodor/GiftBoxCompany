import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProductCard } from '@/components/shop/ProductCard';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const col = await prisma.collection.findUnique({ where: { slug } });
  if (!col) return { title: 'Collection Not Found' };
  return { title: `${col.name} | Giftora Collections` };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = await prisma.collection.findUnique({
    where: { slug, isActive: true },
    include: {
      products: {
        where: { status: 'ACTIVE' },
        include: {
          images: { orderBy: { sortOrder: 'asc' } },
          category: true,
        },
      },
    },
  });
  if (!collection) notFound();

  const products = collection.products.map((p) => ({
    ...p,
    basePrice: Number(p.basePrice),
    salePrice: p.salePrice ? Number(p.salePrice) : null,
    costPrice: p.costPrice ? Number(p.costPrice) : null,
    rating: Number(p.rating),
  }));

  return (
    <div>
      <div className="bg-cream-50 border-b border-cream-200 py-16 text-center">
        <Link href="/collections" className="inline-flex items-center gap-2 text-cream-500 hover:text-gold-600 text-sm mb-6 transition-colors">
          <ArrowLeft size={14} /> All Collections
        </Link>
        <p className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-3">Collection</p>
        <h1 className="font-serif text-4xl font-bold text-navy-950 mb-3">{collection.name}</h1>
        {collection.description && (
          <p className="text-cream-500 max-w-lg mx-auto">{collection.description}</p>
        )}
      </div>

      <div className="section-padding py-12">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-xl text-navy-950 mb-3">No products in this collection yet</p>
            <Link href="/products" className="text-gold-600 hover:underline text-sm">Browse all products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
