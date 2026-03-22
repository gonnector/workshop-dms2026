import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CLARITY_PROJECT_ID } from '@/lib/clarity';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'KOMMA | 한국 라이프스타일 이커머스',
  description: 'DMS 2026 Workshop - 이커머스 행동 데이터 분석 샘플 사이트',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col">
        {/* Simulation notice banner - always visible */}
        <div className="bg-yellow-400 text-yellow-900 text-center py-2 px-4 text-sm font-medium sticky top-0 z-[60] shadow-sm">
          이 사이트는 실제 이커머스 사이트가 아니며, 고객 행동 데이터 분석을 위한 모의 시뮬레이션 사이트입니다.
        </div>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Microsoft Clarity */}
        {CLARITY_PROJECT_ID && (
          <Script id="clarity-script" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
