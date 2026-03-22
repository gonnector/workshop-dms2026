'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getWishlist } from '@/lib/cart';
import { getProductById, Product } from '@/data/products';
import { setPageType } from '@/lib/clarity';

type Tab = 'orders' | 'wishlist' | 'coupons';

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<Tab>('wishlist');
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);

  useEffect(() => {
    setPageType('mypage');
    const updateWishlist = () => {
      const ids = getWishlist();
      setWishlistProducts(ids.map(id => getProductById(id)).filter(Boolean) as Product[]);
    };
    updateWishlist();
    window.addEventListener('wishlist-updated', updateWishlist);
    return () => window.removeEventListener('wishlist-updated', updateWishlist);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">마이페이지</h1>

      {/* User summary */}
      <div className="bg-gradient-to-r from-primary-50 to-orange-50 rounded-xl p-6 mb-8 flex items-center gap-4">
        <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center text-2xl">👤</div>
        <div>
          <h2 className="font-bold text-lg">게스트 회원</h2>
          <p className="text-sm text-komma-gray">로그인 없이 이용 가능한 데모 사이트입니다</p>
        </div>
        <div className="ml-auto text-right hidden sm:block">
          <p className="text-sm text-komma-gray">보유 쿠폰</p>
          <p className="text-xl font-bold text-primary-500">1장</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {[
          { key: 'orders' as Tab, label: '주문 내역' },
          { key: 'wishlist' as Tab, label: `위시리스트 (${wishlistProducts.length})` },
          { key: 'coupons' as Tab, label: '쿠폰함' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key ? 'border-komma-black text-komma-black' : 'border-transparent text-komma-gray hover:text-komma-dark'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'orders' && (
        <div className="text-center py-12 text-komma-gray">
          <div className="text-4xl mb-3">📦</div>
          <p>주문 내역이 없습니다</p>
          <Link href="/" className="text-primary-500 hover:underline text-sm mt-2 inline-block">쇼핑하러 가기</Link>
        </div>
      )}

      {activeTab === 'wishlist' && (
        wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {wishlistProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-komma-gray">
            <div className="text-4xl mb-3">💝</div>
            <p>찜한 상품이 없습니다</p>
            <Link href="/" className="text-primary-500 hover:underline text-sm mt-2 inline-block">상품 둘러보기</Link>
          </div>
        )
      )}

      {activeTab === 'coupons' && (
        <div className="space-y-3">
          <div className="border-2 border-dashed border-primary-300 rounded-xl p-5 bg-primary-50">
            <div className="flex justify-between items-center">
              <div>
                <span className="badge-sale mb-1">신규</span>
                <h3 className="font-bold">첫 구매 10% 할인</h3>
                <p className="text-sm text-komma-gray mt-1">전 상품 적용 가능</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary-500">10%</p>
                <p className="text-xs text-komma-gray">코드: WELCOME10</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
