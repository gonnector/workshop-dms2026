'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CartItem, getCart, removeFromCart, updateCartQuantity, getCartTotal } from '@/lib/cart';
import { formatPrice } from '@/data/products';
import { setPageType, setCartValue, setFunnelStage, ClarityEvents } from '@/lib/clarity';

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    setPageType('cart');
    setFunnelStage('decision');
    const updateCart = () => {
      const c = getCart();
      setCart(c);
      setCartValue(getCartTotal(c));
    };
    updateCart();
    window.addEventListener('cart-updated', updateCart);
    return () => window.removeEventListener('cart-updated', updateCart);
  }, []);

  const total = getCartTotal(cart);
  const shipping = total >= 50000 ? 0 : 3000;
  const discount = couponApplied ? Math.round(total * 0.1) : 0;
  const finalTotal = total - discount + shipping;

  const handleRemove = (item: CartItem) => {
    removeFromCart(item.product.id, item.selectedColor, item.selectedSize);
  };

  const handleQuantityChange = (item: CartItem, newQty: number) => {
    updateCartQuantity(item.product.id, newQty, item.selectedColor, item.selectedSize);
  };

  const handleApplyCoupon = () => {
    setCouponError('');
    if (couponCode.toUpperCase() === 'WELCOME10') {
      setCouponApplied(true);
      ClarityEvents.couponApplied();
    } else {
      setCouponError('유효하지 않은 쿠폰 코드입니다.');
    }
  };

  const handleCheckout = () => {
    ClarityEvents.checkoutStarted();
    window.location.href = '/ecommerce/checkout';
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold mb-2">장바구니가 비어있습니다</h1>
        <p className="text-komma-gray mb-6">마음에 드는 상품을 담아보세요!</p>
        <Link href="/ecommerce" className="btn-primary inline-block">쇼핑 계속하기</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">장바구니 ({cart.length})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, i) => (
            <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${i}`} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover rounded-lg bg-gray-100" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-komma-gray">{item.product.brand}</p>
                    <h3 className="font-medium text-sm line-clamp-1">{item.product.name}</h3>
                    {(item.selectedColor || item.selectedSize) && (
                      <p className="text-xs text-komma-gray mt-0.5">
                        {[item.selectedColor, item.selectedSize].filter(Boolean).join(' / ')}
                      </p>
                    )}
                  </div>
                  <button onClick={() => handleRemove(item)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center border border-gray-200 rounded">
                    <button onClick={() => handleQuantityChange(item, item.quantity - 1)} className="px-2 py-1 text-sm hover:bg-gray-50">-</button>
                    <span className="px-3 py-1 text-sm border-x border-gray-200">{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item, item.quantity + 1)} className="px-2 py-1 text-sm hover:bg-gray-50">+</button>
                  </div>
                  <span className="font-bold text-sm">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-xl p-6 sticky top-32">
            <h2 className="font-bold mb-4">주문 요약</h2>

            {/* Coupon */}
            <div className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="쿠폰 코드"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-500"
                />
                <button onClick={handleApplyCoupon} className="px-4 py-2 bg-komma-black text-white text-sm rounded-lg hover:bg-komma-dark transition-colors">
                  적용
                </button>
              </div>
              {couponApplied && <p className="text-xs text-green-600 mt-1">✓ WELCOME10 쿠폰 적용됨 (10% 할인)</p>}
              {couponError && <p className="text-xs text-red-500 mt-1">{couponError}</p>}
            </div>

            <div className="space-y-3 text-sm border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="text-komma-gray">상품 금액</span>
                <span>{formatPrice(total)}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-red-500">
                  <span>쿠폰 할인</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-komma-gray">배송비</span>
                <span>{shipping === 0 ? '무료' : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-primary-500">{formatPrice(50000 - total)} 더 담으면 무료배송!</p>
              )}
              <div className="flex justify-between font-bold text-base border-t border-gray-200 pt-3">
                <span>총 결제 금액</span>
                <span className="text-primary-500">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <button onClick={handleCheckout} className="btn-primary w-full mt-6">
              주문하기
            </button>
            <Link href="/ecommerce" className="block text-center text-sm text-komma-gray hover:text-primary-500 mt-3 transition-colors">
              쇼핑 계속하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
