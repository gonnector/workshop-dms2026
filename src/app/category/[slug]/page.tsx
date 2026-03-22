'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getCategoryBySlug, getProductsByCategory, Product, CategorySlug } from '@/data/products';
import { setPageType, setCategoryInterest, ClarityEvents } from '@/lib/clarity';

type SortOption = 'popular' | 'price-low' | 'price-high' | 'newest' | 'rating';
type PriceRange = 'all' | 'under-20k' | '20k-50k' | '50k-100k' | 'over-100k';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = getCategoryBySlug(slug);
  const allProducts = getProductsByCategory(slug as CategorySlug);

  const [sort, setSort] = useState<SortOption>('popular');
  const [priceRange, setPriceRange] = useState<PriceRange>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');

  useEffect(() => {
    setPageType('category');
    if (slug) setCategoryInterest(slug as CategorySlug);
  }, [slug]);

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort);
    ClarityEvents.filterUsed();
  };

  const handlePriceFilter = (range: PriceRange) => {
    setPriceRange(range);
    ClarityEvents.filterUsed();
  };

  const filtered = useMemo(() => {
    let result = [...allProducts];

    // Price filter
    if (priceRange !== 'all') {
      result = result.filter(p => {
        switch (priceRange) {
          case 'under-20k': return p.price < 20000;
          case '20k-50k': return p.price >= 20000 && p.price < 50000;
          case '50k-100k': return p.price >= 50000 && p.price < 100000;
          case 'over-100k': return p.price >= 100000;
          default: return true;
        }
      });
    }

    // Tag filter
    if (tagFilter !== 'all') {
      result = result.filter(p => p.tags.includes(tagFilter as 'new' | 'best' | 'sale'));
    }

    // Sort
    switch (sort) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => (b.tags.includes('new') ? 1 : 0) - (a.tags.includes('new') ? 1 : 0)); break;
      default: result.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }

    return result;
  }, [allProducts, sort, priceRange, tagFilter]);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">카테고리를 찾을 수 없습니다</h1>
        <Link href="/ecommerce" className="text-primary-500 hover:underline">홈으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-komma-gray mb-6">
        <Link href="/ecommerce" className="hover:text-primary-500">홈</Link>
        <span className="mx-2">/</span>
        <span className="text-komma-black font-medium">{category.name}</span>
      </nav>

      {/* Category header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">{category.name}</h1>
        <p className="text-komma-gray">{category.description}</p>
      </div>

      {/* Filters & Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 pb-6 border-b border-gray-100">
        {/* Price filter */}
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'all' as PriceRange, label: '전체' },
            { value: 'under-20k' as PriceRange, label: '~2만원' },
            { value: '20k-50k' as PriceRange, label: '2~5만원' },
            { value: '50k-100k' as PriceRange, label: '5~10만원' },
            { value: 'over-100k' as PriceRange, label: '10만원~' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => handlePriceFilter(opt.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                priceRange === opt.value
                  ? 'bg-komma-black text-white'
                  : 'bg-gray-100 text-komma-gray hover:bg-gray-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Tag filter */}
        <div className="flex gap-2">
          {[
            { value: 'all', label: '전체' },
            { value: 'best', label: 'BEST' },
            { value: 'new', label: 'NEW' },
            { value: 'sale', label: 'SALE' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => { setTagFilter(opt.value); ClarityEvents.filterUsed(); }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                tagFilter === opt.value
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-komma-gray hover:bg-gray-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="md:ml-auto">
          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary-500"
          >
            <option value="popular">인기순</option>
            <option value="price-low">낮은 가격순</option>
            <option value="price-high">높은 가격순</option>
            <option value="rating">평점순</option>
            <option value="newest">최신순</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-komma-gray mb-4">{filtered.length}개 상품</p>

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-komma-gray">
          <p className="text-lg mb-2">조건에 맞는 상품이 없습니다</p>
          <button onClick={() => { setPriceRange('all'); setTagFilter('all'); }} className="text-primary-500 hover:underline text-sm">
            필터 초기화
          </button>
        </div>
      )}
    </div>
  );
}
