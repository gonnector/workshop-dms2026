'use client';

import { useEffect, useState } from 'react';
import { CartItem, getCart, getCartTotal, clearCart } from '@/lib/cart';
import { formatPrice } from '@/data/products';
import { setPageType, setFunnelStage, ClarityEvents } from '@/lib/clarity';

type PaymentMethod = 'card' | 'easy-pay' | 'bank';

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    addressDetail: '',
    zipcode: '',
    memo: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setPageType('checkout');
    setFunnelStage('purchase');
    ClarityEvents.checkoutStarted();
    setCart(getCart());
  }, []);

  const total = getCartTotal(cart);
  const shipping = total >= 50000 ? 0 : 3000;
  const finalTotal = total + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = '이름을 입력해주세요';
    if (!formData.phone.trim()) newErrors.phone = '연락처를 입력해주세요';
    if (!formData.address.trim()) newErrors.address = '주소를 입력해주세요';
    if (!formData.zipcode.trim()) newErrors.zipcode = '우편번호를 입력해주세요';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    ClarityEvents.purchaseCompleted();
    clearCart();
    window.location.href = '/ecommerce/order-complete';
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-komma-gray">주문할 상품이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">주문/결제</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Shipping info */}
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h2 className="font-bold mb-4">배송 정보</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">이름 *</label>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleInputChange}
                    className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 ${errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-primary-500 focus:border-primary-500'}`}
                    placeholder="홍길동"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">연락처 *</label>
                  <input
                    type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                    className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 ${errors.phone ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-primary-500 focus:border-primary-500'}`}
                    placeholder="010-0000-0000"
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">우편번호 *</label>
                    <input
                      type="text" name="zipcode" value={formData.zipcode} onChange={handleInputChange}
                      className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 ${errors.zipcode ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-primary-500 focus:border-primary-500'}`}
                      placeholder="06000"
                    />
                    {errors.zipcode && <p className="text-xs text-red-500 mt-1">{errors.zipcode}</p>}
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">주소 *</label>
                    <input
                      type="text" name="address" value={formData.address} onChange={handleInputChange}
                      className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 ${errors.address ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-primary-500 focus:border-primary-500'}`}
                      placeholder="서울특별시 강남구..."
                    />
                    {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">상세주소</label>
                  <input
                    type="text" name="addressDetail" value={formData.addressDetail} onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="아파트 동/호수"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">배송 메모</label>
                  <select name="memo" value={formData.memo} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500">
                    <option value="">선택해주세요</option>
                    <option value="door">문 앞에 놓아주세요</option>
                    <option value="security">경비실에 맡겨주세요</option>
                    <option value="call">배송 전 연락 부탁드립니다</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white border border-gray-100 rounded-xl p-6">
              <h2 className="font-bold mb-4">결제 수단</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'card' as PaymentMethod, label: '💳 카드 결제', desc: '신용/체크카드' },
                  { value: 'easy-pay' as PaymentMethod, label: '📱 간편결제', desc: '카카오페이 등' },
                  { value: 'bank' as PaymentMethod, label: '🏦 무통장입금', desc: '가상계좌' },
                ].map(method => (
                  <button
                    key={method.value}
                    type="button"
                    onClick={() => setPaymentMethod(method.value)}
                    className={`p-4 rounded-xl border-2 text-center transition-colors ${paymentMethod === method.value ? 'border-primary-500 bg-primary-50' : 'border-gray-100 hover:border-gray-300'}`}
                  >
                    <div className="text-lg mb-1">{method.label.split(' ')[0]}</div>
                    <div className="text-xs text-komma-gray">{method.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-32">
              <h2 className="font-bold mb-4">주문 상품 ({cart.length})</h2>
              <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                {cart.map((item, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.product.image} alt="" className="w-12 h-12 rounded bg-gray-200 object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="line-clamp-1">{item.product.name}</p>
                      <p className="text-komma-gray text-xs">수량: {item.quantity}</p>
                    </div>
                    <span className="font-medium whitespace-nowrap">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm border-t border-gray-200 pt-4">
                <div className="flex justify-between"><span className="text-komma-gray">상품 금액</span><span>{formatPrice(total)}</span></div>
                <div className="flex justify-between"><span className="text-komma-gray">배송비</span><span>{shipping === 0 ? '무료' : formatPrice(shipping)}</span></div>
                <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-3 mt-3">
                  <span>총 결제 금액</span>
                  <span className="text-primary-500">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full mt-6 text-lg py-4">
                {formatPrice(finalTotal)} 결제하기
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
