'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { categories, getFeaturedProducts, getNewProducts, getSaleProducts } from '@/data/products';
import { setPageType, ClarityEvents } from '@/lib/clarity';

const heroBanners = [
  { title: '2026 Spring Collection', subtitle: '봄을 맞이하는 새로운 스타일', cta: '컬렉션 보기', link: '/category/fashion', bg: 'from-amber-50 to-orange-50' },
  { title: 'Beauty Week', subtitle: '인기 뷰티 아이템 최대 30% OFF', cta: '할인 보기', link: '/category/beauty', bg: 'from-pink-50 to-rose-50' },
  { title: 'Tech Essentials', subtitle: '스마트한 일상을 위한 테크 아이템', cta: '추천 제품', link: '/category/tech', bg: 'from-blue-50 to-indigo-50' },
];

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const featured = getFeaturedProducts();
  const newProducts = getNewProducts();
  const saleProducts = getSaleProducts();

  useEffect(() => {
    setPageType('home');

    // Show popup after 2 seconds for first visit
    const hasSeenPopup = sessionStorage.getItem('komma_popup_seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => setShowPopup(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % heroBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleBannerClick = (index: number) => {
    ClarityEvents.bannerClicked();
    setCurrentBanner(index);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    sessionStorage.setItem('komma_popup_seen', 'true');
    ClarityEvents.popupInteracted();
  };

  const banner = heroBanners[currentBanner];

  return (
    <>
      {/* Hero Banner */}
      <section className={`bg-gradient-to-r ${banner.bg} transition-all duration-500`}>
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-komma-black mb-4 leading-tight">
              {banner.title}
            </h1>
            <p className="text-lg text-komma-gray mb-8">{banner.subtitle}</p>
            <Link href={banner.link} className="btn-primary inline-block" onClick={() => ClarityEvents.bannerClicked()}>
              {banner.cta}
            </Link>
          </div>
          {/* Banner dots */}
          <div className="flex gap-2 mt-8">
            {heroBanners.map((_, i) => (
              <button
                key={i}
                onClick={() => handleBannerClick(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === currentBanner ? 'bg-komma-black' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold mb-6">카테고리</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group text-center"
            >
              <div className="aspect-square bg-gray-100 rounded-2xl mb-2 flex items-center justify-center group-hover:bg-primary-50 transition-colors overflow-hidden">
                <span className="text-3xl">
                  {cat.slug === 'beauty' && '💄'}
                  {cat.slug === 'fashion' && '👗'}
                  {cat.slug === 'living' && '🏠'}
                  {cat.slug === 'food' && '🍽️'}
                  {cat.slug === 'tech' && '📱'}
                </span>
              </div>
              <span className="text-sm font-medium group-hover:text-primary-500 transition-colors">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">인기 상품 🔥</h2>
          <Link href="/category/beauty" className="text-sm text-komma-gray hover:text-primary-500 transition-colors">전체 보기 →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Sale Items */}
      <section className="bg-red-50 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-red-600">SALE 🏷️</h2>
            <Link href="/events" className="text-sm text-red-400 hover:text-red-600 transition-colors">전체 세일 →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {saleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">신상품 ✨</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {newProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={handlePopupClose}>
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-bold mb-2">첫 방문을 환영합니다!</h3>
            <p className="text-komma-gray text-sm mb-4">지금 가입하면 첫 구매 10% 할인 쿠폰을 드려요.</p>
            <div className="bg-primary-50 border-2 border-dashed border-primary-300 rounded-lg p-3 mb-6">
              <span className="text-primary-600 font-bold text-lg tracking-wider">WELCOME10</span>
            </div>
            <button onClick={handlePopupClose} className="btn-primary w-full">쿠폰 받기</button>
            <button onClick={handlePopupClose} className="mt-3 text-xs text-gray-400 hover:text-gray-600 transition-colors">
              다음에 할게요
            </button>
          </div>
        </div>
      )}
    </>
  );
}
