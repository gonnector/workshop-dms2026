export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CategorySlug;
  price: number;
  originalPrice?: number; // for sale items
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  tags: ('new' | 'best' | 'sale')[];
  options?: {
    colors?: string[];
    sizes?: string[];
  };
  stock: number;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export type CategorySlug = 'beauty' | 'fashion' | 'living' | 'food' | 'tech';

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  content: string;
  helpful: number;
}

export const categories: Category[] = [
  { slug: 'beauty', name: '뷰티', description: '스킨케어, 메이크업, 헤어케어', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop', productCount: 9 },
  { slug: 'fashion', name: '패션', description: '의류, 가방, 액세서리', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop', productCount: 9 },
  { slug: 'living', name: '리빙', description: '홈데코, 주방, 수납', image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&h=400&fit=crop', productCount: 9 },
  { slug: 'food', name: '푸드', description: '건강식품, 간식, 음료', image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&h=400&fit=crop', productCount: 9 },
  { slug: 'tech', name: '테크', description: '가전, 디지털, 스마트기기', image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=400&fit=crop', productCount: 9 },
];

const img = (id: string, w = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${w}&fit=crop&auto=format&q=80`;

export const products: Product[] = [
  // ========== BEAUTY (9) ==========
  { id: 'b1', name: '시카 리페어 세럼 50ml', brand: '코마랩', category: 'beauty', price: 32000, rating: 4.7, reviewCount: 284, image: img('1620916566398-39f1143ab7be'), images: [img('1620916566398-39f1143ab7be',600), img('1620916566398-39f1143ab7be',600)], description: '손상된 피부 장벽을 빠르게 회복시켜주는 고농축 시카 세럼입니다. 병풀추출물 92% 함유.', tags: ['best'], options: { sizes: ['30ml', '50ml'] }, stock: 120 },
  { id: 'b2', name: '비타민C 브라이트닝 앰플', brand: '글로우업', category: 'beauty', price: 28000, originalPrice: 35000, rating: 4.5, reviewCount: 156, image: img('1620916566398-39f1143ab7be'), images: [img('1620916566398-39f1143ab7be',600)], description: '순수 비타민C 15% 함유 브라이트닝 앰플. 칙칙한 피부톤을 환하게.', tags: ['sale'], stock: 85 },
  { id: 'b3', name: '히알루론산 수분크림', brand: '코마랩', category: 'beauty', price: 38000, rating: 4.8, reviewCount: 412, image: img('1556228578-8c89e6adf883'), images: [img('1556228578-8c89e6adf883',600)], description: '5중 히알루론산으로 72시간 깊은 보습. 겨울철 필수 아이템.', tags: ['best'], stock: 200 },
  { id: 'b4', name: '선스틱 SPF50+ PA++++', brand: '선가드', category: 'beauty', price: 18000, rating: 4.3, reviewCount: 89, image: img('1556228578-8c89e6adf883'), images: [img('1556228578-8c89e6adf883',600)], description: '휴대 간편한 스틱형 선크림. 자외선 완벽 차단.', tags: ['new'], stock: 300 },
  { id: 'b5', name: '올인원 클렌징 밤', brand: '글로우업', category: 'beauty', price: 22000, originalPrice: 28000, rating: 4.6, reviewCount: 178, image: img('1608248543803-ba4f8c70ae0b'), images: [img('1608248543803-ba4f8c70ae0b',600)], description: '셰어버터 베이스 클렌징 밤. 메이크업부터 선크림까지 한 번에.', tags: ['sale'], stock: 150 },
  { id: 'b6', name: '레티놀 안티에이징 크림', brand: '코마랩', category: 'beauty', price: 52000, rating: 4.4, reviewCount: 67, image: img('1571781926291-c477ebfd024b'), images: [img('1571781926291-c477ebfd024b',600)], description: '캡슐화 레티놀 0.3% 함유. 주름 개선 기능성 화장품.', tags: [], stock: 80 },
  { id: 'b7', name: '립 앤 치크 틴트', brand: '블러썸', category: 'beauty', price: 15000, rating: 4.2, reviewCount: 203, image: img('1586495777744-4413f21062fa'), images: [img('1586495777744-4413f21062fa',600)], description: '입술과 볼에 자연스러운 혈색을. 6가지 컬러.', tags: ['new'], options: { colors: ['로즈', '코랄', '피치', '베리', '브릭', '누드'] }, stock: 500 },
  { id: 'b8', name: '녹차 토너패드 60매', brand: '그린달', category: 'beauty', price: 16000, originalPrice: 20000, rating: 4.5, reviewCount: 321, image: img('1598440947619-2c35fc9aa908'), images: [img('1598440947619-2c35fc9aa908',600)], description: '제주 유기농 녹차 추출물 함유. 닦고 붙이는 2-WAY 패드.', tags: ['sale', 'best'], stock: 250 },
  { id: 'b9', name: '프로폴리스 영양 마스크팩 10매', brand: '그린달', category: 'beauty', price: 12000, rating: 4.1, reviewCount: 95, image: img('1596755389378-c31d6a492227'), images: [img('1596755389378-c31d6a492227',600)], description: '프로폴리스 추출물이 지친 피부에 깊은 영양을.', tags: [], stock: 400 },

  // ========== FASHION (9) ==========
  { id: 'f1', name: '오버사이즈 울 코트', brand: '모드나인', category: 'fashion', price: 189000, rating: 4.6, reviewCount: 142, image: img('1539533113208-f6df8cc8b543'), images: [img('1539533113208-f6df8cc8b543',600)], description: '프리미엄 울 혼방 오버핏 코트. 클래식한 디자인.', tags: ['best'], options: { colors: ['블랙', '베이지', '그레이'], sizes: ['S', 'M', 'L', 'XL'] }, stock: 45 },
  { id: 'f2', name: '캐시미어 니트 풀오버', brand: '소프트웨어', category: 'fashion', price: 79000, originalPrice: 120000, rating: 4.8, reviewCount: 89, image: img('1576566588028-4147f3842f27'), images: [img('1576566588028-4147f3842f27',600)], description: '몽골리안 캐시미어 100%. 부드러운 촉감의 기본 니트.', tags: ['sale'], options: { colors: ['아이보리', '네이비', '버건디'], sizes: ['S', 'M', 'L'] }, stock: 30 },
  { id: 'f3', name: '와이드 데님 팬츠', brand: '모드나인', category: 'fashion', price: 68000, rating: 4.4, reviewCount: 256, image: img('1542272604-787c3835535d'), images: [img('1542272604-787c3835535d',600)], description: '하이웨스트 와이드 핏 데님. 편안하면서 스타일리시한.', tags: ['best'], options: { sizes: ['S', 'M', 'L', 'XL'] }, stock: 100 },
  { id: 'f4', name: '미니멀 레더 토트백', brand: '바이에르', category: 'fashion', price: 128000, rating: 4.7, reviewCount: 67, image: img('1548036328-c007a0603b23'), images: [img('1548036328-c007a0603b23',600)], description: '이탈리안 소가죽 토트백. 노트북 수납 가능한 실용 사이즈.', tags: ['new'], options: { colors: ['블랙', '탄', '그린'] }, stock: 25 },
  { id: 'f5', name: '릴렉스핏 맨투맨', brand: '어반베이직', category: 'fashion', price: 39000, rating: 4.3, reviewCount: 178, image: img('1556821840-3a63f95609a7'), images: [img('1556821840-3a63f95609a7',600)], description: '460g 헤비 코튼 맨투맨. 기모 안감으로 따뜻한.', tags: [], options: { colors: ['블랙', '그레이', '네이비', '크림'], sizes: ['M', 'L', 'XL', 'XXL'] }, stock: 200 },
  { id: 'f6', name: '울 블렌드 머플러', brand: '소프트웨어', category: 'fashion', price: 45000, originalPrice: 58000, rating: 4.5, reviewCount: 134, image: img('1520903920243-00d872a2d1c9'), images: [img('1520903920243-00d872a2d1c9',600)], description: '울 70% 캐시미어 30% 블렌드. 부드럽고 보온성 뛰어난.', tags: ['sale'], options: { colors: ['카멜', '그레이', '블랙', '버건디'] }, stock: 80 },
  { id: 'f7', name: '스트릿 카고 팬츠', brand: '어반베이직', category: 'fashion', price: 55000, rating: 4.2, reviewCount: 92, image: img('1517438476312-10d79c077509'), images: [img('1517438476312-10d79c077509',600)], description: '멀티 포켓 카고 팬츠. 스트릿 무드의 필수 아이템.', tags: ['new'], options: { colors: ['블랙', '카키', '베이지'], sizes: ['S', 'M', 'L', 'XL'] }, stock: 120 },
  { id: 'f8', name: '볼캡 유니섹스', brand: '어반베이직', category: 'fashion', price: 25000, rating: 4.1, reviewCount: 305, image: img('1588850561407-ed78c334e67a'), images: [img('1588850561407-ed78c334e67a',600)], description: '코튼 트윌 소재 볼캡. 조절 가능한 스트랩.', tags: [], options: { colors: ['블랙', '화이트', '네이비', '베이지'] }, stock: 500 },
  { id: 'f9', name: '실크 스카프 55x55', brand: '바이에르', category: 'fashion', price: 48000, rating: 4.6, reviewCount: 43, image: img('1584917865442-de89df76afd3'), images: [img('1584917865442-de89df76afd3',600)], description: '100% 실크 트윌 스카프. 핸드롤 마감.', tags: ['new'], options: { colors: ['플로럴', '지오메트릭', '페이즐리'] }, stock: 35 },

  // ========== LIVING (9) ==========
  { id: 'l1', name: '세라믹 디퓨저 세트', brand: '홈무드', category: 'living', price: 35000, rating: 4.5, reviewCount: 198, image: img('1602928321679-560bb453f190'), images: [img('1602928321679-560bb453f190',600)], description: '핸드메이드 세라믹 용기 + 리드스틱 + 디퓨저 오일 200ml.', tags: ['best'], options: { colors: ['라벤더', '유칼립투스', '자스민', '시더우드'] }, stock: 150 },
  { id: 'l2', name: '오가닉 코튼 이불세트', brand: '슬립웰', category: 'living', price: 128000, originalPrice: 168000, rating: 4.7, reviewCount: 87, image: img('1631049307264-da0ec9d70304'), images: [img('1631049307264-da0ec9d70304',600)], description: 'GOTS 인증 유기농 면 100%. 이불커버+베개커버 2개.', tags: ['sale'], options: { sizes: ['싱글', '퀸', '킹'] }, stock: 40 },
  { id: 'l3', name: '모듈형 수납 선반', brand: '스토리지', category: 'living', price: 45000, rating: 4.3, reviewCount: 321, image: img('1595428774223-ef52624120d2'), images: [img('1595428774223-ef52624120d2',600)], description: '자유롭게 조합하는 큐브 수납 선반. 확장 가능.', tags: ['best'], options: { colors: ['화이트', '내추럴', '월넛'] }, stock: 200 },
  { id: 'l4', name: '스테인리스 텀블러 473ml', brand: '에코리빙', category: 'living', price: 28000, rating: 4.4, reviewCount: 156, image: img('1602143407151-7111542de6e8'), images: [img('1602143407151-7111542de6e8',600)], description: '진공 이중 단열 텀블러. 12시간 보온/24시간 보냉.', tags: ['new'], options: { colors: ['실버', '블랙', '올리브', '핑크'] }, stock: 300 },
  { id: 'l5', name: '아로마 캔들 200g', brand: '홈무드', category: 'living', price: 22000, originalPrice: 28000, rating: 4.6, reviewCount: 234, image: img('1602607225586-a3e9fd0a3684'), images: [img('1602607225586-a3e9fd0a3684',600)], description: '소이왁스 100% 아로마 캔들. 40시간 연소.', tags: ['sale'], options: { colors: ['바닐라', '피그', '앰버', '우드세이지'] }, stock: 180 },
  { id: 'l6', name: '리넨 쿠션커버 45x45', brand: '슬립웰', category: 'living', price: 18000, rating: 4.2, reviewCount: 112, image: img('1584100936595-c0654b55a2e2'), images: [img('1584100936595-c0654b55a2e2',600)], description: '워싱 리넨 소재 쿠션커버. 자연스러운 주름 텍스처.', tags: [], options: { colors: ['아이보리', '차콜', '세이지', '테라코타'] }, stock: 250 },
  { id: 'l7', name: '대나무 도마 세트', brand: '에코리빙', category: 'living', price: 32000, rating: 4.5, reviewCount: 78, image: img('1544441893-d83f130b23ae'), images: [img('1544441893-d83f130b23ae',600)], description: '항균 대나무 도마 3종 세트 (S/M/L). 주스홈 포함.', tags: [], stock: 100 },
  { id: 'l8', name: '무선 LED 무드등', brand: '홈무드', category: 'living', price: 25000, rating: 4.4, reviewCount: 267, image: img('1513506003901-1e6a229e2d15'), images: [img('1513506003901-1e6a229e2d15',600)], description: 'USB 충전식 무드등. 밝기 3단계 조절. 터치 온오프.', tags: ['best'], stock: 350 },
  { id: 'l9', name: '핸드메이드 라탄 바구니', brand: '스토리지', category: 'living', price: 38000, rating: 4.3, reviewCount: 56, image: img('1519710164239-da123dc03ef4'), images: [img('1519710164239-da123dc03ef4',600)], description: '인도네시아 장인이 수작업으로 만든 라탄 수납 바구니.', tags: ['new'], options: { sizes: ['S', 'M', 'L'] }, stock: 60 },

  // ========== FOOD (9) ==========
  { id: 'd1', name: '유기농 콤부차 12입', brand: '발효공방', category: 'food', price: 24000, rating: 4.4, reviewCount: 189, image: img('1563227812-0ea4c22e6cc8'), images: [img('1563227812-0ea4c22e6cc8',600)], description: '국내산 유기농 녹차로 발효한 프리미엄 콤부차.', tags: ['best'], stock: 200 },
  { id: 'd2', name: '수제 그래놀라 450g', brand: '모닝팜', category: 'food', price: 15000, originalPrice: 18000, rating: 4.6, reviewCount: 234, image: img('1517093602195-b40af9688fcc'), images: [img('1517093602195-b40af9688fcc',600)], description: '메이플시럽으로 구운 통곡물 그래놀라. 견과류 40%.', tags: ['sale', 'best'], stock: 300 },
  { id: 'd3', name: '프로틴 에너지바 12입', brand: '핏밀', category: 'food', price: 28000, rating: 4.3, reviewCount: 156, image: img('1622484212850-eb596d769edc'), images: [img('1622484212850-eb596d769edc',600)], description: '유청단백질 20g 함유. 운동 전후 간편한 영양 보충.', tags: [], stock: 250 },
  { id: 'd4', name: '제주 감귤칩 5봉', brand: '섬스낵', category: 'food', price: 12000, rating: 4.5, reviewCount: 312, image: img('1597714228943-d00fca1ae38d'), images: [img('1597714228943-d00fca1ae38d',600)], description: '제주 노지감귤을 동결건조한 바삭한 과일칩.', tags: ['best'], stock: 400 },
  { id: 'd5', name: '콜드브루 원액 500ml', brand: '브루잇', category: 'food', price: 16000, originalPrice: 20000, rating: 4.7, reviewCount: 178, image: img('1461023058943-07fcbe16d735'), images: [img('1461023058943-07fcbe16d735',600)], description: '에티오피아 예가체프 싱글오리진. 24시간 저온추출.', tags: ['sale'], stock: 150 },
  { id: 'd6', name: '유기농 꿀 500g', brand: '모닝팜', category: 'food', price: 32000, rating: 4.8, reviewCount: 67, image: img('1587049352846-4a222e784d38'), images: [img('1587049352846-4a222e784d38',600)], description: '지리산 유기농 인증 아카시아꿀. 생꿀 그대로.', tags: ['new'], stock: 80 },
  { id: 'd7', name: '건조 과일 믹스 300g', brand: '섬스낵', category: 'food', price: 14000, rating: 4.2, reviewCount: 98, image: img('1604570982197-d4dbae4a1107'), images: [img('1604570982197-d4dbae4a1107',600)], description: '망고, 파인애플, 바나나, 딸기 건조 과일 믹스.', tags: [], stock: 200 },
  { id: 'd8', name: '하루견과 30일분', brand: '핏밀', category: 'food', price: 26000, originalPrice: 32000, rating: 4.5, reviewCount: 445, image: img('1599599810694-b5b37304c041'), images: [img('1599599810694-b5b37304c041',600)], description: '아몬드, 호두, 캐슈넛, 크랜베리 소분 포장.', tags: ['sale', 'best'], stock: 500 },
  { id: 'd9', name: '말차 라떼 파우더 200g', brand: '브루잇', category: 'food', price: 18000, rating: 4.3, reviewCount: 123, image: img('1515823064-d6e0c04616a7'), images: [img('1515823064-d6e0c04616a7',600)], description: '일본 우지 말차 + 유기농 코코넛밀크 파우더 블렌드.', tags: ['new'], stock: 180 },

  // ========== TECH (9) ==========
  { id: 't1', name: '무선 블루투스 이어버드', brand: '사운드웨이브', category: 'tech', price: 89000, rating: 4.5, reviewCount: 342, image: img('1606220588913-b3aacb4d2f46'), images: [img('1606220588913-b3aacb4d2f46',600)], description: 'ANC 노이즈캔슬링. 8시간 재생. IPX4 방수.', tags: ['best'], options: { colors: ['블랙', '화이트', '네이비'] }, stock: 100 },
  { id: 't2', name: '접이식 무선 키보드', brand: '타입랩', category: 'tech', price: 65000, originalPrice: 85000, rating: 4.4, reviewCount: 156, image: img('1587829741301-dc798b83add3'), images: [img('1587829741301-dc798b83add3',600)], description: '블루투스 5.0 접이식 키보드. 멀티페어링 3대.', tags: ['sale'], stock: 60 },
  { id: 't3', name: '4K 웹캠 오토포커스', brand: '비전프로', category: 'tech', price: 78000, rating: 4.6, reviewCount: 89, image: img('1596566197093-1f69bc10e4ba'), images: [img('1596566197093-1f69bc10e4ba',600)], description: '4K UHD 오토포커스 웹캠. 내장 마이크. 화상회의 필수.', tags: ['new'], stock: 45 },
  { id: 't4', name: 'USB-C 7in1 허브', brand: '커넥트잇', category: 'tech', price: 42000, rating: 4.3, reviewCount: 267, image: img('1625723286346-75ad47a15809'), images: [img('1625723286346-75ad47a15809',600)], description: 'HDMI 4K + USB3.0x2 + SD/TF + PD 100W + RJ45.', tags: ['best'], stock: 200 },
  { id: 't5', name: '무선 충전 패드 듀얼', brand: '커넥트잇', category: 'tech', price: 35000, originalPrice: 45000, rating: 4.2, reviewCount: 178, image: img('1591815302525-756a9bcc3425'), images: [img('1591815302525-756a9bcc3425',600)], description: '폰+이어버드 동시 충전. Qi 15W 고속 충전 지원.', tags: ['sale'], stock: 150 },
  { id: 't6', name: '스마트 체중계 BIA', brand: '헬스기어', category: 'tech', price: 48000, rating: 4.5, reviewCount: 134, image: img('1576243345927-3bbb62cde8f5'), images: [img('1576243345927-3bbb62cde8f5',600)], description: '체지방, 근육량 등 13가지 신체 지표 측정. 앱 연동.', tags: [], stock: 120 },
  { id: 't7', name: '미니 포터블 프로젝터', brand: '비전프로', category: 'tech', price: 298000, rating: 4.7, reviewCount: 56, image: img('1478720568477-152d9b164e26'), images: [img('1478720568477-152d9b164e26',600)], description: 'Full HD 휴대용 프로젝터. 넷플릭스/유튜브 내장. 배터리 3시간.', tags: ['new'], stock: 20 },
  { id: 't8', name: '노이즈캔슬링 헤드폰', brand: '사운드웨이브', category: 'tech', price: 158000, originalPrice: 198000, rating: 4.8, reviewCount: 213, image: img('1505740420928-5e560c06d30e'), images: [img('1505740420928-5e560c06d30e',600)], description: '액티브 노이즈캔슬링 오버이어 헤드폰. 30시간 재생.', tags: ['sale', 'best'], stock: 35 },
  { id: 't9', name: '스마트 공기질 측정기', brand: '헬스기어', category: 'tech', price: 55000, rating: 4.3, reviewCount: 78, image: img('1558618666-fcd25c85f82e'), images: [img('1558618666-fcd25c85f82e',600)], description: 'PM2.5, CO2, 온습도 실시간 측정. E-ink 디스플레이.', tags: [], stock: 90 },
];

// Helper functions
export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  return products.filter(p => p.category === category);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.tags.includes('best')).slice(0, 8);
}

export function getNewProducts(): Product[] {
  return products.filter(p => p.tags.includes('new')).slice(0, 8);
}

export function getSaleProducts(): Product[] {
  return products.filter(p => p.tags.includes('sale')).slice(0, 8);
}

export function formatPrice(price: number): string {
  return price.toLocaleString('ko-KR') + '원';
}

export function getDiscountRate(price: number, originalPrice?: number): number {
  if (!originalPrice) return 0;
  return Math.round((1 - price / originalPrice) * 100);
}

// Reviews data
export const reviews: Review[] = [
  { id: 'r1', productId: 'b1', author: '피부좋아지고싶은사람', rating: 5, date: '2026-03-15', content: '시카 세럼 중에 최고예요! 트러블이 확실히 빨리 가라앉아요. 2통째 구매합니다.', helpful: 24 },
  { id: 'r2', productId: 'b1', author: '뷰티러버', rating: 4, date: '2026-03-10', content: '순하고 좋은데 양이 좀 적은 것 같아요. 가성비는 보통.', helpful: 8 },
  { id: 'r3', productId: 'b1', author: '건성피부맘', rating: 5, date: '2026-03-08', content: '건조한 피부인데 이거 바르고 확실히 촉촉해졌어요. 향도 없어서 좋아요.', helpful: 15 },
  { id: 'r4', productId: 'b3', author: '수분폭탄', rating: 5, date: '2026-03-18', content: '진짜 보습 끝판왕. 아침에 바르면 저녁까지 촉촉합니다.', helpful: 32 },
  { id: 'r5', productId: 'b3', author: '민감성피부', rating: 5, date: '2026-03-12', content: '민감한 피부에도 자극 없이 잘 맞아요. 겨울 필수템!', helpful: 19 },
  { id: 'r6', productId: 'f1', author: '패션피플', rating: 5, date: '2026-03-16', content: '핏이 정말 예뻐요. M사이즈 입었는데 오버핏으로 딱 좋습니다.', helpful: 28 },
  { id: 'r7', productId: 'f1', author: '코트수집가', rating: 4, date: '2026-03-11', content: '울 함량 대비 가격이 합리적. 다만 단추가 좀 약해보여요.', helpful: 12 },
  { id: 'r8', productId: 't1', author: '음질매니아', rating: 5, date: '2026-03-17', content: 'ANC 성능이 이 가격대에서 최고입니다. 통화 품질도 만족.', helpful: 45 },
  { id: 'r9', productId: 't1', author: '운동러', rating: 4, date: '2026-03-14', content: '운동할 때 써요. 방수 되고 잘 안빠져서 좋은데, 귀 큰 사람은 좀 아플 수도.', helpful: 16 },
  { id: 'r10', productId: 't8', author: '재택근무자', rating: 5, date: '2026-03-19', content: '노이즈캔슬링이 역대급. 집에서 일할 때 진짜 집중 잘 됩니다.', helpful: 38 },
  { id: 'r11', productId: 'd2', author: '아침형인간', rating: 5, date: '2026-03-13', content: '그래놀라 여러 개 먹어봤는데 이게 진짜 맛있어요. 견과류가 많아서 좋습니다.', helpful: 22 },
  { id: 'r12', productId: 'l1', author: '집순이', rating: 5, date: '2026-03-15', content: '라벤더 향이 은은해서 좋아요. 세라믹 용기도 예쁘고 인테리어 효과도 있네요.', helpful: 14 },
];

export function getReviewsByProductId(productId: string): Review[] {
  return reviews.filter(r => r.productId === productId);
}
