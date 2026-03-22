'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getProductById, getProductsByCategory, getReviewsByProductId, formatPrice, getDiscountRate, Product } from '@/data/products';
import { addToCart, toggleWishlist, isInWishlist } from '@/lib/cart';
import { setPageType, setCategoryInterest, setFunnelStage, ClarityEvents } from '@/lib/clarity';

type Tab = 'description' | 'reviews' | 'qa';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const product = getProductById(id);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState<Tab>('description');
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (product) {
      setPageType('product');
      setCategoryInterest(product.category);
      setFunnelStage('consideration');
      ClarityEvents.productViewed();
      setWishlisted(isInWishlist(product.id));

      if (product.options?.colors?.[0]) setSelectedColor(product.options.colors[0]);
      if (product.options?.sizes?.[0]) setSelectedSize(product.options.sizes[0]);
    }
  }, [product]);

  useEffect(() => {
    const handler = () => product && setWishlisted(isInWishlist(product.id));
    window.addEventListener('wishlist-updated', handler);
    return () => window.removeEventListener('wishlist-updated', handler);
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">상품을 찾을 수 없습니다</h1>
        <Link href="/ecommerce" className="text-primary-500 hover:underline">홈으로 돌아가기</Link>
      </div>
    );
  }

  const discount = getDiscountRate(product.price, product.originalPrice);
  const reviews = getReviewsByProductId(product.id);
  const relatedProducts = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setFunnelStage('decision');
    ClarityEvents.addToCart();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    ClarityEvents.addToCart();
    ClarityEvents.checkoutStarted();
    window.location.href = '/ecommerce/checkout';
  };

  const handleWishlist = () => {
    toggleWishlist(product.id);
    ClarityEvents.addToWishlist();
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === 'reviews') ClarityEvents.reviewRead();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-komma-gray mb-6">
        <Link href="/ecommerce" className="hover:text-primary-500">홈</Link>
        <span className="mx-2">/</span>
        <Link href={`/ecommerce/category/${product.category}`} className="hover:text-primary-500">
          {product.category === 'beauty' ? '뷰티' : product.category === 'fashion' ? '패션' : product.category === 'living' ? '리빙' : product.category === 'food' ? '푸드' : '테크'}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-komma-black">{product.name}</span>
      </nav>

      {/* Product main */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Images */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.images[currentImage] || product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === currentImage ? 'border-primary-500' : 'border-transparent'}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div>
          <p className="text-sm text-komma-gray mb-1">{product.brand}</p>
          <h1 className="text-2xl font-bold mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(star => (
                <svg key={star} className={`w-4 h-4 ${star <= Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-komma-gray">{product.rating} ({product.reviewCount}개 리뷰)</span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3 mb-6">
            {discount > 0 && <span className="text-2xl font-bold text-red-500">{discount}%</span>}
            <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-base text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <div className="border-t border-gray-100 pt-6 space-y-4">
            {/* Color options */}
            {product.options?.colors && (
              <div>
                <label className="text-sm font-medium mb-2 block">색상: {selectedColor}</label>
                <div className="flex gap-2">
                  {product.options.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg text-sm border transition-colors ${selectedColor === color ? 'border-komma-black bg-komma-black text-white' : 'border-gray-200 hover:border-gray-400'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size options */}
            {product.options?.sizes && (
              <div>
                <label className="text-sm font-medium mb-2 block">사이즈: {selectedSize}</label>
                <div className="flex gap-2">
                  {product.options.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg text-sm border transition-colors ${selectedSize === size ? 'border-komma-black bg-komma-black text-white' : 'border-gray-200 hover:border-gray-400'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium mb-2 block">수량</label>
              <div className="flex items-center border border-gray-200 rounded-lg w-fit">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-50 transition-colors">-</button>
                <span className="px-4 py-2 border-x border-gray-200 min-w-[3rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-gray-50 transition-colors">+</button>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-sm text-komma-gray">총 상품 금액</span>
              <span className="text-xl font-bold text-primary-500">{formatPrice(product.price * quantity)}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleWishlist}
              className={`p-3 rounded-lg border transition-colors ${wishlisted ? 'border-red-300 bg-red-50 text-red-500' : 'border-gray-200 hover:border-gray-400'}`}
            >
              <svg className={`w-5 h-5 ${wishlisted ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button onClick={handleAddToCart} className="btn-outline flex-1 relative">
              {addedToCart ? '✓ 담았습니다!' : '장바구니 담기'}
            </button>
            <button onClick={handleBuyNow} className="btn-primary flex-1">
              바로 구매
            </button>
          </div>

          {/* Shipping info */}
          <div className="mt-6 bg-gray-50 rounded-xl p-4 space-y-2 text-sm text-komma-gray">
            <p>📦 5만원 이상 무료배송 (미만 시 3,000원)</p>
            <p>🔄 7일 이내 무료 반품/교환</p>
            <p>💳 카드 무이자 최대 6개월</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16 border-t border-gray-200">
        <div className="flex">
          {[
            { key: 'description' as Tab, label: '상품 설명' },
            { key: 'reviews' as Tab, label: `리뷰 (${reviews.length})` },
            { key: 'qa' as Tab, label: 'Q&A' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`flex-1 py-4 text-sm font-medium text-center border-b-2 transition-colors ${
                activeTab === tab.key ? 'border-komma-black text-komma-black' : 'border-transparent text-komma-gray hover:text-komma-dark'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-8">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-komma-dark leading-relaxed">{product.description}</p>
              <div className="mt-6 bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold mb-3">상품 정보</h3>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <dt className="text-komma-gray">브랜드</dt><dd>{product.brand}</dd>
                  <dt className="text-komma-gray">카테고리</dt><dd>{product.category}</dd>
                  {product.options?.colors && <><dt className="text-komma-gray">색상</dt><dd>{product.options.colors.join(', ')}</dd></>}
                  {product.options?.sizes && <><dt className="text-komma-gray">사이즈</dt><dd>{product.options.sizes.join(', ')}</dd></>}
                  <dt className="text-komma-gray">재고</dt><dd>{product.stock > 0 ? `${product.stock}개` : '품절'}</dd>
                </dl>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {reviews.length > 0 ? reviews.map(review => (
                <div key={review.id} className="border-b border-gray-100 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(s => (
                        <svg key={s} className={`w-3.5 h-3.5 ${s <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-medium">{review.author}</span>
                    <span className="text-xs text-komma-gray">{review.date}</span>
                  </div>
                  <p className="text-sm text-komma-dark">{review.content}</p>
                  <button className="mt-2 text-xs text-komma-gray hover:text-primary-500 transition-colors">
                    👍 도움돼요 ({review.helpful})
                  </button>
                </div>
              )) : (
                <p className="text-center text-komma-gray py-8">아직 리뷰가 없습니다.</p>
              )}
            </div>
          )}

          {activeTab === 'qa' && (
            <div className="text-center text-komma-gray py-8">
              <p>등록된 Q&A가 없습니다.</p>
              <button className="mt-3 text-primary-500 hover:underline text-sm">질문하기</button>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12 pt-8 border-t border-gray-100">
          <h2 className="text-xl font-bold mb-6">관련 상품</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
