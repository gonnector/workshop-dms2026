'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { categories, getFeaturedProducts, getNewProducts, getSaleProducts } from '@/data/products';
import { setPageType, ClarityEvents } from '@/lib/clarity';

const heroBanners = [
  { title: '2026 Spring Collection', subtitle: '봄을 맞이하는 새로운 스타일', cta: '컬렉션 보기', link: '/category/fashion', bg: 'from-amber-50 to-orange-50', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&h=500&fit=crop&auto=format&q=80' },
  { title: 'Beauty Week', subtitle: '인기 뷰티 아이템 최대 30% OFF', cta: '할인 보기', link: '/category/beauty', bg: 'from-pink-50 to-rose-50', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1400&h=500&fit=crop&auto=format&q=80' },
  { title: 'Tech Essentials', subtitle: '스마트한 일상을 위한 테크 아이템', cta: '추천 제품', link: '/category/tech', bg: 'from-blue-50 to-indigo-50', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&h=500&fit=crop&auto=format&q=80' },
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
      <section className="relative overflow-hidden h-[320px] md:h-[420px] transition-all duration-500">
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={banner.image} alt="" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
              {banner.title}
            </h1>
            <p className="text-lg text-white/80 mb-8 drop-shadow">{banner.subtitle}</p>
            <Link href={banner.link} className="btn-primary inline-block shadow-lg" onClick={() => ClarityEvents.bannerClicked()}>
              {banner.cta}
            </Link>
          </div>
          {/* Banner dots */}
          <div className="flex gap-2 mt-8">
            {heroBanners.map((_, i) => (
              <button
                key={i}
                onClick={() => handleBannerClick(i)}
                className={`w-3 h-3 rounded-full transition-colors shadow ${i === currentBanner ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">카테고리</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 md:gap-6">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 left-4 text-white font-bold text-lg drop-shadow-sm">{cat.name}</span>
              </div>
              <p className="text-sm text-komma-gray px-1">{cat.description}</p>
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
