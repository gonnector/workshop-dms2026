'use client';

import { Product } from '@/data/products';
import { setWishlistCount, setCartItemCount } from '@/lib/clarity';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

const CART_KEY = 'komma_cart';
const WISHLIST_KEY = 'komma_wishlist';

function getStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function setStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

// Cart functions
export function getCart(): CartItem[] {
  return getStorage<CartItem[]>(CART_KEY, []);
}

export function addToCart(product: Product, quantity = 1, selectedColor?: string, selectedSize?: string): CartItem[] {
  const cart = getCart();
  const existingIndex = cart.findIndex(
    item => item.product.id === product.id && item.selectedColor === selectedColor && item.selectedSize === selectedSize
  );

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ product, quantity, selectedColor, selectedSize });
  }

  setStorage(CART_KEY, cart);
  setCartItemCount(cart.length);
  window.dispatchEvent(new Event('cart-updated'));
  return cart;
}

export function removeFromCart(productId: string, selectedColor?: string, selectedSize?: string): CartItem[] {
  let cart = getCart();
  cart = cart.filter(
    item => !(item.product.id === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
  );
  setStorage(CART_KEY, cart);
  setCartItemCount(cart.length);
  window.dispatchEvent(new Event('cart-updated'));
  return cart;
}

export function updateCartQuantity(productId: string, quantity: number, selectedColor?: string, selectedSize?: string): CartItem[] {
  const cart = getCart();
  const item = cart.find(
    i => i.product.id === productId && i.selectedColor === selectedColor && i.selectedSize === selectedSize
  );
  if (item) {
    item.quantity = Math.max(1, quantity);
  }
  setStorage(CART_KEY, cart);
  window.dispatchEvent(new Event('cart-updated'));
  return cart;
}

export function clearCart(): void {
  setStorage(CART_KEY, []);
  window.dispatchEvent(new Event('cart-updated'));
}

export function getCartTotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function getCartItemCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Wishlist functions
export function getWishlist(): string[] {
  return getStorage<string[]>(WISHLIST_KEY, []);
}

export function toggleWishlist(productId: string): string[] {
  const wishlist = getWishlist();
  const index = wishlist.indexOf(productId);
  if (index >= 0) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(productId);
  }
  setStorage(WISHLIST_KEY, wishlist);
  setWishlistCount(wishlist.length);
  window.dispatchEvent(new Event('wishlist-updated'));
  return wishlist;
}

export function isInWishlist(productId: string): boolean {
  return getWishlist().includes(productId);
}
