'use client';

import { useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { setPageType, ClarityEvents } from '@/lib/clarity';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  useEffect(() => {
    setPageType('search');
    if (query) ClarityEvents.searchPerformed();
  }, [query]);

  const results = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.includes(q)
    );
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          {query ? (
            <>
              &ldquo;{query}&rdquo; 검색 결과
              <span className="text-komma-gray font-normal text-lg ml-2">({results.length})</span>
            </>
          ) : '검색'}
        </h1>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {results.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-komma-gray mb-4">&ldquo;{query}&rdquo;에 대한 검색 결과가 없습니다.</p>
          <Link href="/" className="text-primary-500 hover:underline text-sm">홈으로 돌아가기</Link>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-komma-gray">검색어를 입력해주세요</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center text-komma-gray">검색 중...</div>}>
      <SearchResults />
    </Suspense>
  );
}
