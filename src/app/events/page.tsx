'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getSaleProducts, products } from '@/data/products';
import { setPageType, ClarityEvents } from '@/lib/clarity';

export default function EventsPage() {
  const saleProducts = getSaleProducts();
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 32, seconds: 17 });

  // Top 3 highest-discount products for time deal
  const timeDealProducts = products
    .filter(p => p.originalPrice)
    .sort((a, b) => {
      const discA = 1 - a.price / (a.originalPrice || a.price);
      const discB = 1 - b.price / (b.originalPrice || b.price);
      return discB - discA;
    })
    .slice(0, 3);

  useEffect(() => {
    setPageType('event');
    ClarityEvents.bannerClicked();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">이벤트/프로모션</h1>

      {/* Time Deal */}
      <section className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-8 mb-12 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">TIME DEAL</span>
            <h2 className="text-2xl font-bold mt-2">오늘만 이 가격!</h2>
            <p className="text-white/80 text-sm mt-1">놓치면 후회할 특가 상품</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            {[
              { value: timeLeft.hours, label: '시간' },
              { value: timeLeft.minutes, label: '분' },
              { value: timeLeft.seconds, label: '초' },
            ].map((t, i) => (
              <div key={i} className="bg-white/20 backdrop-blur rounded-lg px-3 py-2 text-center min-w-[3.5rem]">
                <div className="text-2xl font-bold font-mono">{String(t.value).padStart(2, '0')}</div>
                <div className="text-[10px] text-white/70">{t.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {timeDealProducts.map(product => (
            <Link key={product.id} href={`/product/${product.id}`} className="bg-white rounded-xl p-4 flex gap-4 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.image} alt={product.name} className="w-20 h-20 rounded-lg bg-gray-100 object-cover" />
              <div className="flex-1 text-komma-black">
                <p className="text-xs text-komma-gray">{product.brand}</p>
                <h3 className="text-sm font-medium group-hover:text-primary-500 transition-colors line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-red-500 font-bold">{Math.round((1 - product.price / (product.originalPrice || product.price)) * 100)}%</span>
                  <span className="font-bold">{product.price.toLocaleString()}원</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Welcome Coupon Banner */}
      <section className="bg-gradient-to-r from-primary-50 to-amber-50 rounded-2xl p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="text-5xl">🎫</div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-bold mb-1">신규 회원 10% 할인</h2>
            <p className="text-komma-gray text-sm">첫 구매 시 모든 상품 10% 할인 쿠폰을 드려요!</p>
          </div>
          <div className="bg-white border-2 border-dashed border-primary-300 rounded-lg px-6 py-3 text-center">
            <p className="text-xs text-komma-gray mb-1">쿠폰 코드</p>
            <p className="text-primary-600 font-bold text-xl tracking-widest">WELCOME10</p>
          </div>
        </div>
      </section>

      {/* Sale Products */}
      <section>
        <h2 className="text-xl font-bold mb-6">세일 상품 🏷️</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {saleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
