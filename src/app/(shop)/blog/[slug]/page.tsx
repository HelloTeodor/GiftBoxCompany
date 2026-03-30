import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, CalendarDays, User } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} | Giftora Blog`,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
  });
  if (!post) notFound();

  return (
    <div>
      {/* Header */}
      <div className="bg-cream-50 border-b border-cream-200 py-12">
        <div className="section-padding max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-cream-500 hover:text-gold-600 text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          {post.tags[0] && (
            <span className="text-gold-600 text-xs font-semibold uppercase tracking-wide mb-3 block">
              {post.tags[0]}
            </span>
          )}
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-navy-950 mb-4">{post.title}</h1>
          {post.excerpt && <p className="text-cream-500 text-lg mb-6">{post.excerpt}</p>}
          <div className="flex items-center gap-6 text-sm text-cream-400">
            <span className="flex items-center gap-1.5"><User size={14} /> {post.authorName}</span>
            {post.publishedAt && (
              <span className="flex items-center gap-1.5"><CalendarDays size={14} /> {formatDate(post.publishedAt)}</span>
            )}
          </div>
        </div>
      </div>

      {/* Cover image */}
      {post.image && (
        <div className="section-padding max-w-3xl mx-auto mt-8">
          <div className="aspect-video rounded-2xl overflow-hidden">
            <Image src={post.image} alt={post.title} width={900} height={506} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="section-padding max-w-3xl mx-auto py-12">
        <div
          className="prose prose-navy prose-sm lg:prose-base max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-cream-200">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-cream-100 text-cream-600 text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-10 pt-8 border-t border-cream-200">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gold-600 hover:underline text-sm">
            <ArrowLeft size={14} /> All posts
          </Link>
        </div>
      </div>
    </div>
  );
}
