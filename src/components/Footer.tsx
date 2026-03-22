import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-komma-black text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-white text-xl font-bold mb-3">KOMMA</h3>
            <p className="text-sm leading-relaxed">
              한국 라이프스타일을 담은<br />프리미엄 이커머스
            </p>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">고객센터</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-white font-medium">1588-0000</span></li>
              <li>평일 09:00 - 18:00</li>
              <li>점심 12:00 - 13:00</li>
              <li>주말/공휴일 휴무</li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">쇼핑 안내</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/mypage" className="hover:text-white transition-colors">마이페이지</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">장바구니</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">이벤트</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">회사 정보</h4>
            <ul className="space-y-2 text-sm">
              <li>상호: (주)코마</li>
              <li>대표: 홍길동</li>
              <li>사업자등록번호: 000-00-00000</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
          <p>&copy; 2026 KOMMA. All rights reserved.</p>
          <p className="text-gray-600">
            DMS 2026 Workshop Demo Site — This is a sample site for educational purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
