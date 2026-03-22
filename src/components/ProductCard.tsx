'use client';

import Link from 'next/link';
import { Product, formatPrice, getDiscountRate } from '@/data/products';
import { toggleWishlist, isInWishlist } from '@/lib/cart';
import { ClarityEvents } from '@/lib/clarity';
import { useState, useEffect } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const discount = getDiscountRate(product.price, product.originalPrice);

  useEffect(() => {
    setWishlisted(isInWishlist(product.id));
    const handler = () => setWishlisted(isInWishlist(product.id));
    window.addEventListener('wishlist-updated', handler);
    return () => window.removeEventListener('wishlist-updated', handler);
  }, [product.id]);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    ClarityEvents.addToWishlist();
  };

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden mb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.tags.includes('new') && <span className="badge-new">NEW</span>}
          {product.tags.includes('best') && <span className="badge-best">BEST</span>}
          {discount > 0 && <span className="badge-sale">{discount}%</span>}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
        >
          <svg className={`w-4 h-4 ${wishlisted ? 'fill-red-500 text-red-500' : 'fill-none text-gray-600'}`} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <div className="space-y-1">
        <p className="text-xs text-komma-gray">{product.brand}</p>
        <h3 className="text-sm font-medium text-komma-dark group-hover:text-primary-500 transition-colors line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
          <span className="text-sm font-bold">{formatPrice(product.price)}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-komma-gray">
          <svg className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          <span>{product.rating}</span>
          <span className="text-gray-300">|</span>
          <span>리뷰 {product.reviewCount}</span>
        </div>
      </div>
    </Link>
  );
}
