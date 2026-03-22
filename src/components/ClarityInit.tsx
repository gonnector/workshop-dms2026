'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initDataSource } from '@/lib/clarity';

export default function ClarityInit() {
  const pathname = usePathname();

  useEffect(() => {
    initDataSource();
  }, [pathname]);

  return null;
}
