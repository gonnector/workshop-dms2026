'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts } from '@/data/products';
import { setPageType, ClarityEvents } from '@/lib/clarity';

export default function OrderCompletePage() {
  const recommended = getFeaturedProducts().slice(0, 4);
  const orderId = `KM${Date.now().toString(36).toUpperCase()}`;

  useEffect(() => {
    setPageType('order-complete');
  }, []);

  const handleShare = () => {
    ClarityEvents.shareClicked();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h1 className="text-2xl font-bold mb-2">주문이 완료되었습니다!</h1>
      <p className="text-komma-gray mb-8">주문해 주셔서 감사합니다.</p>

      <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
        <h2 className="font-bold mb-3">주문 정보</h2>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-komma-gray">주문번호</dt>
            <dd className="font-mono font-medium">{orderId}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-komma-gray">결제 상태</dt>
            <dd className="text-green-600 font-medium">결제 완료</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-komma-gray">예상 배송일</dt>
            <dd>2~3일 이내</dd>
          </div>
        </dl>
      </div>

      <div className="flex gap-3 justify-center mb-12">
        <Link href="/mypage" className="btn-outline">주문 내역 보기</Link>
        <Link href="/" className="btn-primary">쇼핑 계속하기</Link>
      </div>

      {/* Share buttons */}
      <div className="flex justify-center gap-3 mb-12">
        <button onClick={handleShare} className="text-sm text-komma-gray hover:text-primary-500 transition-colors flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
          공유하기
        </button>
      </div>

      {/* Recommended */}
      <section className="text-left">
        <h2 className="text-lg font-bold mb-4">이런 상품은 어떠세요?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommended.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
