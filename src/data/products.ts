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
  { slug: 'food', name: '푸드', description: '건강식품, 간식, 음료', image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&h=400&fit=crop', productCount: 9 },
  { slug: 'tech', name: '테크', description: '가전, 디지털, 스마트기기', image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=400&fit=crop', productCount: 9 },
];

const img = (id: string, w = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${w}&fit=crop&auto=format&q=80`;

export const products: Product[] = [
  // ========== BEAUTY (9) ==========
  // b1: High rating + Many reviews (safe bet)
  { id: 'b1', name: '시카 리페어 세럼 50ml', brand: '코마랩', category: 'beauty', price: 32000, rating: 4.7, reviewCount: 284, image: img('1620916566398-39f1143ab7be'), images: [img('1620916566398-39f1143ab7be',600), img('1620916566398-39f1143ab7be',600)], description: '손상된 피부 장벽을 빠르게 회복시켜주는 고농축 시카 세럼입니다. 병풀추출물 92% 함유.', tags: ['best'], options: { sizes: ['30ml', '50ml'] }, stock: 120 },
  // b2: Middle range
  { id: 'b2', name: '비타민C 브라이트닝 앰플', brand: '글로우업', category: 'beauty', price: 28000, originalPrice: 35000, rating: 4.2, reviewCount: 98, image: img('1620916566398-39f1143ab7be'), images: [img('1620916566398-39f1143ab7be',600)], description: '순수 비타민C 15% 함유 브라이트닝 앰플. 칙칙한 피부톤을 환하게.', tags: ['sale'], stock: 85 },
  // b3: High rating + Many reviews (safe bet)
  { id: 'b3', name: '히알루론산 수분크림', brand: '코마랩', category: 'beauty', price: 38000, rating: 4.8, reviewCount: 412, image: img('1556228578-8c89e6adf883'), images: [img('1556228578-8c89e6adf883',600)], description: '5중 히알루론산으로 72시간 깊은 보습. 겨울철 필수 아이템.', tags: ['best'], stock: 200 },
  // b4: High rating + Few reviews (hidden gem)
  { id: 'b4', name: '선스틱 SPF50+ PA++++', brand: '선가드', category: 'beauty', price: 18000, rating: 4.6, reviewCount: 32, image: img('1556228578-8c89e6adf883'), images: [img('1556228578-8c89e6adf883',600)], description: '휴대 간편한 스틱형 선크림. 자외선 완벽 차단.', tags: ['new'], stock: 300 },
  // b5: Middle range
  { id: 'b5', name: '올인원 클렌징 밤', brand: '글로우업', category: 'beauty', price: 22000, originalPrice: 28000, rating: 4.3, reviewCount: 105, image: img('1608248543803-ba4f8c70ae0b'), images: [img('1608248543803-ba4f8c70ae0b',600)], description: '셰어버터 베이스 클렌징 밤. 메이크업부터 선크림까지 한 번에.', tags: ['sale'], stock: 150 },
  // b6: Low rating + Many reviews (known problem)
  { id: 'b6', name: '레티놀 안티에이징 크림', brand: '코마랩', category: 'beauty', price: 52000, rating: 3.0, reviewCount: 187, image: img('1571781926291-c477ebfd024b'), images: [img('1571781926291-c477ebfd024b',600)], description: '캡슐화 레티놀 0.3% 함유. 주름 개선 기능성 화장품.', tags: [], stock: 80 },
  // b7: Low rating + Few reviews (uncertain)
  { id: 'b7', name: '립 앤 치크 틴트', brand: '블러썸', category: 'beauty', price: 15000, rating: 3.8, reviewCount: 28, image: img('1586495777744-4413f21062fa'), images: [img('1586495777744-4413f21062fa',600)], description: '입술과 볼에 자연스러운 혈색을. 6가지 컬러.', tags: ['new'], options: { colors: ['로즈', '코랄', '피치', '베리', '브릭', '누드'] }, stock: 500 },
  // b8: High rating + Many reviews (safe bet)
  { id: 'b8', name: '녹차 토너패드 60매', brand: '그린달', category: 'beauty', price: 16000, originalPrice: 20000, rating: 4.5, reviewCount: 321, image: img('1598440947619-2c35fc9aa908'), images: [img('1598440947619-2c35fc9aa908',600)], description: '제주 유기농 녹차 추출물 함유. 닦고 붙이는 2-WAY 패드.', tags: ['sale', 'best'], stock: 250 },
  // b9: Low rating + Many reviews (known problem)
  { id: 'b9', name: '프로폴리스 영양 마스크팩 10매', brand: '그린달', category: 'beauty', price: 12000, rating: 2.8, reviewCount: 165, image: img('1570172619644-dfd03ed5d881'), images: [img('1570172619644-dfd03ed5d881',600)], description: '프로폴리스 추출물이 지친 피부에 깊은 영양을.', tags: [], stock: 400 },

  // ========== FASHION (9) ==========
  // f1: High rating + Many reviews (safe bet)
  { id: 'f1', name: '오버사이즈 울 코트', brand: '모드나인', category: 'fashion', price: 189000, rating: 4.6, reviewCount: 198, image: img('1539533113208-f6df8cc8b543'), images: [img('1539533113208-f6df8cc8b543',600)], description: '프리미엄 울 혼방 오버핏 코트. 클래식한 디자인.', tags: ['best'], options: { colors: ['블랙', '베이지', '그레이'], sizes: ['S', 'M', 'L', 'XL'] }, stock: 45 },
  // f2: Middle range
  { id: 'f2', name: '캐시미어 니트 풀오버', brand: '소프트웨어', category: 'fashion', price: 79000, originalPrice: 120000, rating: 4.1, reviewCount: 89, image: img('1576566588028-4147f3842f27'), images: [img('1576566588028-4147f3842f27',600)], description: '몽골리안 캐시미어 100%. 부드러운 촉감의 기본 니트.', tags: ['sale'], options: { colors: ['아이보리', '네이비', '버건디'], sizes: ['S', 'M', 'L'] }, stock: 30 },
  // f3: High rating + Many reviews (safe bet)
  { id: 'f3', name: '와이드 데님 팬츠', brand: '모드나인', category: 'fashion', price: 68000, rating: 4.5, reviewCount: 256, image: img('1542272604-787c3835535d'), images: [img('1542272604-787c3835535d',600)], description: '하이웨스트 와이드 핏 데님. 편안하면서 스타일리시한.', tags: ['best'], options: { sizes: ['S', 'M', 'L', 'XL'] }, stock: 100 },
  // f4: High rating + Few reviews (hidden gem)
  { id: 'f4', name: '미니멀 레더 토트백', brand: '바이에르', category: 'fashion', price: 128000, rating: 4.7, reviewCount: 28, image: img('1590874103328-eac38a683ce7'), images: [img('1590874103328-eac38a683ce7',600)], description: '이탈리안 소가죽 토트백. 노트북 수납 가능한 실용 사이즈.', tags: ['new'], options: { colors: ['블랙', '탄', '그린'] }, stock: 25 },
  // f5: Low rating + Many reviews (known problem)
  { id: 'f5', name: '릴렉스핏 맨투맨', brand: '어반베이직', category: 'fashion', price: 39000, rating: 3.2, reviewCount: 178, image: img('1556821840-3a63f95609a7'), images: [img('1556821840-3a63f95609a7',600)], description: '460g 헤비 코튼 맨투맨. 기모 안감으로 따뜻한.', tags: [], options: { colors: ['블랙', '그레이', '네이비', '크림'], sizes: ['M', 'L', 'XL', 'XXL'] }, stock: 200 },
  // f6: Middle range
  { id: 'f6', name: '울 블렌드 머플러', brand: '소프트웨어', category: 'fashion', price: 45000, originalPrice: 58000, rating: 4.0, reviewCount: 134, image: img('1520903920243-00d872a2d1c9'), images: [img('1520903920243-00d872a2d1c9',600)], description: '울 70% 캐시미어 30% 블렌드. 부드럽고 보온성 뛰어난.', tags: ['sale'], options: { colors: ['카멜', '그레이', '블랙', '버건디'] }, stock: 80 },
  // f7: Low rating + Few reviews (uncertain)
  { id: 'f7', name: '스트릿 카고 팬츠', brand: '어반베이직', category: 'fashion', price: 55000, rating: 3.6, reviewCount: 35, image: img('1517438476312-10d79c077509'), images: [img('1517438476312-10d79c077509',600)], description: '멀티 포켓 카고 팬츠. 스트릿 무드의 필수 아이템.', tags: ['new'], options: { colors: ['블랙', '카키', '베이지'], sizes: ['S', 'M', 'L', 'XL'] }, stock: 120 },
  // f8: Low rating + Many reviews (known problem)
  { id: 'f8', name: '볼캡 유니섹스', brand: '어반베이직', category: 'fashion', price: 25000, rating: 3.1, reviewCount: 205, image: img('1556306535-0f09a537f0a3'), images: [img('1556306535-0f09a537f0a3',600)], description: '코튼 트윌 소재 볼캡. 조절 가능한 스트랩.', tags: [], options: { colors: ['블랙', '화이트', '네이비', '베이지'] }, stock: 500 },
  // f9: High rating + Few reviews (hidden gem)
  { id: 'f9', name: '실크 스카프 55x55', brand: '바이에르', category: 'fashion', price: 48000, rating: 4.8, reviewCount: 18, image: img('1584917865442-de89df76afd3'), images: [img('1584917865442-de89df76afd3',600)], description: '100% 실크 트윌 스카프. 핸드롤 마감.', tags: ['new'], options: { colors: ['플로럴', '지오메트릭', '페이즐리'] }, stock: 35 },

  // ========== LIVING (9) ==========
  // l1: High rating + Many reviews (safe bet)
  { id: 'l1', name: '세라믹 디퓨저 세트', brand: '홈무드', category: 'living', price: 35000, rating: 4.6, reviewCount: 198, image: img('1602928321679-560bb453f190'), images: [img('1602928321679-560bb453f190',600)], description: '핸드메이드 세라믹 용기 + 리드스틱 + 디퓨저 오일 200ml.', tags: ['best'], options: { colors: ['라벤더', '유칼립투스', '자스민', '시더우드'] }, stock: 150 },
  // l2: Middle range
  { id: 'l2', name: '오가닉 코튼 이불세트', brand: '슬립웰', category: 'living', price: 128000, originalPrice: 168000, rating: 4.3, reviewCount: 87, image: img('1631049307264-da0ec9d70304'), images: [img('1631049307264-da0ec9d70304',600)], description: 'GOTS 인증 유기농 면 100%. 이불커버+베개커버 2개.', tags: ['sale'], options: { sizes: ['싱글', '퀸', '킹'] }, stock: 40 },
  // l3: Middle range
  { id: 'l3', name: '모듈형 수납 선반', brand: '스토리지', category: 'living', price: 45000, rating: 4.1, reviewCount: 121, image: img('1595428774223-ef52624120d2'), images: [img('1595428774223-ef52624120d2',600)], description: '자유롭게 조합하는 큐브 수납 선반. 확장 가능.', tags: ['best'], options: { colors: ['화이트', '내추럴', '월넛'] }, stock: 200 },
  // l4: Low rating + Few reviews (uncertain)
  { id: 'l4', name: '스테인리스 텀블러 473ml', brand: '에코리빙', category: 'living', price: 28000, rating: 3.7, reviewCount: 22, image: img('1602143407151-7111542de6e8'), images: [img('1602143407151-7111542de6e8',600)], description: '진공 이중 단열 텀블러. 12시간 보온/24시간 보냉.', tags: ['new'], options: { colors: ['실버', '블랙', '올리브', '핑크'] }, stock: 300 },
  // l5: Low rating + Few reviews (uncertain)
  { id: 'l5', name: '아로마 캔들 200g', brand: '홈무드', category: 'living', price: 22000, originalPrice: 28000, rating: 3.9, reviewCount: 31, image: img('1603006905003-be475563bc59'), images: [img('1603006905003-be475563bc59',600)], description: '소이왁스 100% 아로마 캔들. 40시간 연소.', tags: ['sale'], options: { colors: ['바닐라', '피그', '앰버', '우드세이지'] }, stock: 180 },
  // l6: Low rating + Many reviews (known problem)
  { id: 'l6', name: '리넨 쿠션커버 45x45', brand: '슬립웰', category: 'living', price: 18000, rating: 2.9, reviewCount: 172, image: img('1584100936595-c0654b55a2e2'), images: [img('1584100936595-c0654b55a2e2',600)], description: '워싱 리넨 소재 쿠션커버. 자연스러운 주름 텍스처.', tags: [], options: { colors: ['아이보리', '차콜', '세이지', '테라코타'] }, stock: 250 },
  // l7: High rating + Few reviews (hidden gem)
  { id: 'l7', name: '대나무 도마 세트', brand: '에코리빙', category: 'living', price: 32000, rating: 4.7, reviewCount: 24, image: img('1605478371310-a9f1e96b4ff4'), images: [img('1605478371310-a9f1e96b4ff4',600)], description: '항균 대나무 도마 3종 세트 (S/M/L). 주스홈 포함.', tags: [], stock: 100 },
  // l8: High rating + Many reviews (safe bet)
  { id: 'l8', name: '무선 LED 무드등', brand: '홈무드', category: 'living', price: 25000, rating: 4.5, reviewCount: 267, image: img('1513506003901-1e6a229e2d15'), images: [img('1513506003901-1e6a229e2d15',600)], description: 'USB 충전식 무드등. 밝기 3단계 조절. 터치 온오프.', tags: ['best'], stock: 350 },
  // l9: High rating + Few reviews (hidden gem)
  { id: 'l9', name: '핸드메이드 라탄 바구니', brand: '스토리지', category: 'living', price: 38000, rating: 4.8, reviewCount: 15, image: img('1519710164239-da123dc03ef4'), images: [img('1519710164239-da123dc03ef4',600)], description: '인도네시아 장인이 수작업으로 만든 라탄 수납 바구니.', tags: ['new'], options: { sizes: ['S', 'M', 'L'] }, stock: 60 },

  // ========== FOOD (9) ==========
  // d1: Middle range
  { id: 'd1', name: '유기농 콤부차 12입', brand: '발효공방', category: 'food', price: 24000, rating: 4.0, reviewCount: 89, image: img('1563227812-0ea4c22e6cc8'), images: [img('1563227812-0ea4c22e6cc8',600)], description: '국내산 유기농 녹차로 발효한 프리미엄 콤부차.', tags: ['best'], stock: 200 },
  // d2: High rating + Many reviews (safe bet)
  { id: 'd2', name: '수제 그래놀라 450g', brand: '모닝팜', category: 'food', price: 15000, originalPrice: 18000, rating: 4.6, reviewCount: 234, image: img('1525351484163-7529414344d8'), images: [img('1525351484163-7529414344d8',600)], description: '메이플시럽으로 구운 통곡물 그래놀라. 견과류 40%.', tags: ['sale', 'best'], stock: 300 },
  // d3: Low rating + Many reviews (known problem)
  { id: 'd3', name: '프로틴 에너지바 12입', brand: '핏밀', category: 'food', price: 28000, rating: 3.3, reviewCount: 156, image: img('1622484212850-eb596d769edc'), images: [img('1622484212850-eb596d769edc',600)], description: '유청단백질 20g 함유. 운동 전후 간편한 영양 보충.', tags: [], stock: 250 },
  // d4: High rating + Many reviews (safe bet)
  { id: 'd4', name: '제주 감귤칩 5봉', brand: '섬스낵', category: 'food', price: 12000, rating: 4.5, reviewCount: 312, image: img('1611080626919-7cf5a9dbab5b'), images: [img('1611080626919-7cf5a9dbab5b',600)], description: '제주 노지감귤을 동결건조한 바삭한 과일칩.', tags: ['best'], stock: 400 },
  // d5: Middle range
  { id: 'd5', name: '콜드브루 원액 500ml', brand: '브루잇', category: 'food', price: 16000, originalPrice: 20000, rating: 4.4, reviewCount: 78, image: img('1461023058943-07fcbe16d735'), images: [img('1461023058943-07fcbe16d735',600)], description: '에티오피아 예가체프 싱글오리진. 24시간 저온추출.', tags: ['sale'], stock: 150 },
  // d6: High rating + Few reviews (hidden gem)
  { id: 'd6', name: '유기농 꿀 500g', brand: '모닝팜', category: 'food', price: 32000, rating: 4.8, reviewCount: 22, image: img('1587049352846-4a222e784d38'), images: [img('1587049352846-4a222e784d38',600)], description: '지리산 유기농 인증 아카시아꿀. 생꿀 그대로.', tags: ['new'], stock: 80 },
  // d7: Low rating + Many reviews (known problem)
  { id: 'd7', name: '건조 과일 믹스 300g', brand: '섬스낵', category: 'food', price: 14000, rating: 3.0, reviewCount: 168, image: img('1610832958506-aa56368176cf'), images: [img('1610832958506-aa56368176cf',600)], description: '망고, 파인애플, 바나나, 딸기 건조 과일 믹스.', tags: [], stock: 200 },
  // d8: High rating + Many reviews (safe bet)
  { id: 'd8', name: '하루견과 30일분', brand: '핏밀', category: 'food', price: 26000, originalPrice: 32000, rating: 4.5, reviewCount: 445, image: img('1599599810694-b5b37304c041'), images: [img('1599599810694-b5b37304c041',600)], description: '아몬드, 호두, 캐슈넛, 크랜베리 소분 포장.', tags: ['sale', 'best'], stock: 500 },
  // d9: Low rating + Few reviews (uncertain)
  { id: 'd9', name: '말차 라떼 파우더 200g', brand: '브루잇', category: 'food', price: 18000, rating: 3.5, reviewCount: 18, image: img('1515823064-d6e0c04616a7'), images: [img('1515823064-d6e0c04616a7',600)], description: '일본 우지 말차 + 유기농 코코넛밀크 파우더 블렌드.', tags: ['new'], stock: 180 },

  // ========== TECH (9) ==========
  // t1: High rating + Many reviews (safe bet)
  { id: 't1', name: '무선 블루투스 이어버드', brand: '사운드웨이브', category: 'tech', price: 89000, rating: 4.5, reviewCount: 342, image: img('1606220588913-b3aacb4d2f46'), images: [img('1606220588913-b3aacb4d2f46',600)], description: 'ANC 노이즈캔슬링. 8시간 재생. IPX4 방수.', tags: ['best'], options: { colors: ['블랙', '화이트', '네이비'] }, stock: 100 },
  // t2: Middle range
  { id: 't2', name: '접이식 무선 키보드', brand: '타입랩', category: 'tech', price: 65000, originalPrice: 85000, rating: 4.2, reviewCount: 56, image: img('1587829741301-dc798b83add3'), images: [img('1587829741301-dc798b83add3',600)], description: '블루투스 5.0 접이식 키보드. 멀티페어링 3대.', tags: ['sale'], stock: 60 },
  // t3: High rating + Few reviews (hidden gem)
  { id: 't3', name: '4K 웹캠 오토포커스', brand: '비전프로', category: 'tech', price: 78000, rating: 4.7, reviewCount: 19, image: img('1611532736597-de2d4265fba3'), images: [img('1611532736597-de2d4265fba3',600)], description: '4K UHD 오토포커스 웹캠. 내장 마이크. 화상회의 필수.', tags: ['new'], stock: 45 },
  // t4: Low rating + Few reviews (uncertain)
  { id: 't4', name: 'USB-C 7in1 허브', brand: '커넥트잇', category: 'tech', price: 42000, rating: 3.8, reviewCount: 25, image: img('1633174524827-db00a6b7bc74'), images: [img('1633174524827-db00a6b7bc74',600)], description: 'HDMI 4K + USB3.0x2 + SD/TF + PD 100W + RJ45.', tags: ['best'], stock: 200 },
  // t5: Low rating + Few reviews (uncertain)
  { id: 't5', name: '무선 충전 패드 듀얼', brand: '커넥트잇', category: 'tech', price: 35000, originalPrice: 45000, rating: 3.7, reviewCount: 30, image: img('1591815302525-756a9bcc3425'), images: [img('1591815302525-756a9bcc3425',600)], description: '폰+이어버드 동시 충전. Qi 15W 고속 충전 지원.', tags: ['sale'], stock: 150 },
  // t6: Low rating + Many reviews (known problem)
  { id: 't6', name: '스마트 체중계 BIA', brand: '헬스기어', category: 'tech', price: 48000, rating: 3.2, reviewCount: 184, image: img('1535914254981-b5012eebbd15'), images: [img('1535914254981-b5012eebbd15',600)], description: '체지방, 근육량 등 13가지 신체 지표 측정. 앱 연동.', tags: [], stock: 120 },
  // t7: High rating + Few reviews (hidden gem)
  { id: 't7', name: '미니 포터블 프로젝터', brand: '비전프로', category: 'tech', price: 298000, rating: 4.7, reviewCount: 16, image: img('1478720568477-152d9b164e26'), images: [img('1478720568477-152d9b164e26',600)], description: 'Full HD 휴대용 프로젝터. 넷플릭스/유튜브 내장. 배터리 3시간.', tags: ['new'], stock: 20 },
  // t8: High rating + Many reviews (safe bet)
  { id: 't8', name: '노이즈캔슬링 헤드폰', brand: '사운드웨이브', category: 'tech', price: 158000, originalPrice: 198000, rating: 4.8, reviewCount: 213, image: img('1505740420928-5e560c06d30e'), images: [img('1505740420928-5e560c06d30e',600)], description: '액티브 노이즈캔슬링 오버이어 헤드폰. 30시간 재생.', tags: ['sale', 'best'], stock: 35 },
  // t9: Low rating + Few reviews (uncertain)
  { id: 't9', name: '스마트 공기질 측정기', brand: '헬스기어', category: 'tech', price: 55000, rating: 3.6, reviewCount: 19, image: img('1585771724684-38269d6639fd'), images: [img('1585771724684-38269d6639fd',600)], description: 'PM2.5, CO2, 온습도 실시간 측정. E-ink 디스플레이.', tags: [], stock: 90 },
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
  // ========== b1: 시카 리페어 세럼 (High rating, safe bet) ==========
  { id: 'r1', productId: 'b1', author: '피부좋아지고싶은사람', rating: 5, date: '2026-03-15', content: '시카 세럼 중에 최고예요! 트러블이 확실히 빨리 가라앉아요. 2통째 구매합니다.', helpful: 24 },
  { id: 'r2', productId: 'b1', author: '뷰티러버', rating: 4, date: '2026-03-10', content: '순하고 좋은데 양이 좀 적은 것 같아요. 그래도 효과는 확실합니다.', helpful: 8 },
  { id: 'r3', productId: 'b1', author: '건성피부맘', rating: 5, date: '2026-03-08', content: '건조한 피부인데 이거 바르고 확실히 촉촉해졌어요. 향도 없어서 좋아요. 재구매 의사 100%.', helpful: 15 },
  { id: 'r4', productId: 'b1', author: '시카덕후', rating: 5, date: '2026-02-28', content: '병풀 성분이 92%라 그런지 진정 효과가 빠릅니다. 가성비 최고에요.', helpful: 19 },

  // ========== b2: 비타민C 브라이트닝 앰플 (Middle) ==========
  { id: 'r5', productId: 'b2', author: '브라이트닝중', rating: 5, date: '2026-03-12', content: '한 달 쓰니까 확실히 피부톤이 밝아졌어요. 비타민C 앰플 중에서 자극도 적은 편.', helpful: 12 },
  { id: 'r6', productId: 'b2', author: '지성피부남', rating: 3, date: '2026-03-05', content: '효과는 있는 것 같은데 지성 피부에는 좀 끈적거려요. 여름에는 쓰기 힘들 듯.', helpful: 7 },
  { id: 'r7', productId: 'b2', author: '뷰티초보', rating: 4, date: '2026-02-20', content: '세일 때 사서 가성비 좋았어요. 꾸준히 쓰면 효과 볼 수 있을 것 같습니다.', helpful: 3 },

  // ========== b3: 히알루론산 수분크림 (High rating, safe bet) ==========
  { id: 'r8', productId: 'b3', author: '수분폭탄', rating: 5, date: '2026-03-18', content: '진짜 보습 끝판왕. 아침에 바르면 저녁까지 촉촉합니다. 재구매 5번째!', helpful: 32 },
  { id: 'r9', productId: 'b3', author: '민감성피부', rating: 5, date: '2026-03-12', content: '민감한 피부에도 자극 없이 잘 맞아요. 겨울 필수템! 선물용으로도 좋습니다.', helpful: 19 },
  { id: 'r10', productId: 'b3', author: '화장품연구원', rating: 5, date: '2026-03-01', content: '5중 히알루론산 처방이 정말 차이를 만들어내네요. 성분 좋은 수분크림 찾으시면 이거 추천.', helpful: 28 },
  { id: 'r11', productId: 'b3', author: '건조지옥탈출', rating: 4, date: '2026-02-18', content: '보습력은 최고인데 여름에는 좀 무거울 수 있어요. 겨울에 진가를 발휘합니다.', helpful: 11 },
  { id: 'r12', productId: 'b3', author: '엄마추천템', rating: 5, date: '2026-02-10', content: '엄마한테 선물했더니 너무 좋다고 하셔서 저도 구매했어요. 품질 우수합니다.', helpful: 16 },

  // ========== b4: 선스틱 (Hidden gem) ==========
  { id: 'r13', productId: 'b4', author: '자외선전사', rating: 5, date: '2026-03-14', content: '스틱형이라 덧바르기 편하고, 백탁도 없어요. 숨은 명품 선크림 찾은 기분!', helpful: 9 },
  { id: 'r14', productId: 'b4', author: '등산러', rating: 5, date: '2026-03-02', content: '등산할 때 들고 다니기 좋아요. SPF50+ 이 가격이면 가성비 최고.', helpful: 6 },
  { id: 'r15', productId: 'b4', author: '출퇴근용', rating: 4, date: '2026-02-22', content: '가방에 넣어다니면서 수시로 바를 수 있어서 좋습니다. 촉촉한 편이에요.', helpful: 4 },

  // ========== b5: 올인원 클렌징 밤 (Middle) ==========
  { id: 'r16', productId: 'b5', author: '클렌징마스터', rating: 5, date: '2026-03-16', content: '메이크업 지우는 데 이것만한 게 없어요. 셰어버터라 세안 후에도 안 당겨요.', helpful: 14 },
  { id: 'r17', productId: 'b5', author: '귀차니스트', rating: 4, date: '2026-03-08', content: '한 번에 다 지워져서 편해요. 다만 딥클렌징은 따로 해줘야 해요.', helpful: 6 },
  { id: 'r18', productId: 'b5', author: '화장떡칠러', rating: 4, date: '2026-02-25', content: '풀메이크업도 잘 지워집니다. 세일 때 사면 가성비 좋아요.', helpful: 5 },

  // ========== b6: 레티놀 안티에이징 크림 (Known problem, 3.0) ==========
  { id: 'r19', productId: 'b6', author: '안티에이징도전', rating: 2, date: '2026-03-17', content: '레티놀이라 자극이 있을 줄 알았는데 너무 심해요. 피부가 벌겋게 됐습니다. 가격 대비 품질이 낮음.', helpful: 28 },
  { id: 'r20', productId: 'b6', author: '실망고객', rating: 2, date: '2026-03-11', content: '52,000원짜리인데 효과를 전혀 못 느꼈어요. 기대에 못 미침. 다른 레티놀 제품이 훨씬 낫습니다.', helpful: 22 },
  { id: 'r21', productId: 'b6', author: '피부트러블', rating: 3, date: '2026-03-03', content: '사진과 실물이 다름... 텍스처가 사진처럼 크리미하지 않고 묽어요. 가격이 아깝습니다.', helpful: 18 },
  { id: 'r22', productId: 'b6', author: '주름고민녀', rating: 4, date: '2026-02-15', content: '저는 민감하지 않아서 괜찮았어요. 한 달 쓰니 잔주름이 좀 줄어든 것 같기도?', helpful: 10 },
  { id: 'r23', productId: 'b6', author: '환불각', rating: 1, date: '2026-02-08', content: '바른 다음날 피부가 완전히 뒤집어졌어요. 민감성 피부는 절대 사지 마세요. 환불 요청했습니다.', helpful: 35 },

  // ========== b7: 립 앤 치크 틴트 (Uncertain, 3.8) ==========
  { id: 'r24', productId: 'b7', author: '틴트수집가', rating: 4, date: '2026-03-10', content: '코랄 색상 예쁜데 지속력이 좀 아쉬워요. 점심 먹으면 거의 사라져요.', helpful: 5 },
  { id: 'r25', productId: 'b7', author: '뷰티학생', rating: 4, date: '2026-02-28', content: '가격 대비 색감이 예뻐요. 다만 입술이 건조한 편이면 각질이 올라올 수 있어요.', helpful: 3 },
  { id: 'r26', productId: 'b7', author: '데일리메이크업', rating: 3, date: '2026-02-14', content: '발색은 괜찮은데 시간이 지나면 색이 좀 변해요. 이 가격이면 그럭저럭.', helpful: 2 },

  // ========== b8: 녹차 토너패드 (High rating, safe bet) ==========
  { id: 'r27', productId: 'b8', author: '토너패드매니아', rating: 5, date: '2026-03-19', content: '제주 녹차 추출물이라 그런지 진정 효과가 좋아요. 2-WAY라 팩처럼도 쓸 수 있어서 가성비 최고!', helpful: 21 },
  { id: 'r28', productId: 'b8', author: '아침루틴', rating: 5, date: '2026-03-13', content: '아침에 세안 대신 이거로 닦으면 끝. 간편하고 피부 결도 정돈되는 느낌. 재구매 의사 있습니다.', helpful: 15 },
  { id: 'r29', productId: 'b8', author: '세일사냥꾼', rating: 4, date: '2026-03-06', content: '세일할 때 2개 샀어요. 순하고 좋은데 60매가 생각보다 빨리 소진돼요.', helpful: 8 },
  { id: 'r30', productId: 'b8', author: '올리브영단골', rating: 5, date: '2026-02-21', content: '여러 브랜드 토너패드 써봤는데 이게 가장 촉촉해요. 선물용으로도 좋습니다.', helpful: 13 },

  // ========== b9: 프로폴리스 영양 마스크팩 (Known problem, 2.8) ==========
  { id: 'r31', productId: 'b9', author: '마스크팩러버', rating: 2, date: '2026-03-16', content: '시트가 너무 얇아서 에센스가 다 흘러내려요. 가격 대비 품질이 낮음. 다른 마스크팩을 사세요.', helpful: 20 },
  { id: 'r32', productId: 'b9', author: '피부관리중', rating: 1, date: '2026-03-09', content: '프로폴리스 함량이 거의 없는 것 같아요. 사진과 실물이 다름. 향도 인공적이고 실망입니다.', helpful: 26 },
  { id: 'r33', productId: 'b9', author: '혼합성피부', rating: 3, date: '2026-03-01', content: '가격이 저렴해서 기대를 안 했는데 역시나... 보습은 좀 되지만 영양감은 못 느꼈어요.', helpful: 12 },
  { id: 'r34', productId: 'b9', author: '마스크팩10매', rating: 4, date: '2026-02-19', content: '10매에 이 가격이면 나쁘지 않아요. 대단한 효과는 없지만 수분 보충용으로 괜찮아요.', helpful: 5 },
  { id: 'r35', productId: 'b9', author: '솔직리뷰어', rating: 2, date: '2026-02-11', content: '시트 핏도 안 맞고 에센스도 별로예요. 기대에 못 미침. 12,000원이면 차라리 다른 거 사세요.', helpful: 18 },

  // ========== f1: 오버사이즈 울 코트 (High rating, safe bet) ==========
  { id: 'r36', productId: 'f1', author: '패션피플', rating: 5, date: '2026-03-16', content: '핏이 정말 예뻐요. M사이즈 입었는데 오버핏으로 딱 좋습니다. 재구매 의사 100%.', helpful: 28 },
  { id: 'r37', productId: 'f1', author: '코트수집가', rating: 4, date: '2026-03-11', content: '울 함량 대비 가격이 합리적. 클래식한 디자인이라 오래 입을 수 있어요.', helpful: 12 },
  { id: 'r38', productId: 'f1', author: '겨울코디왕', rating: 5, date: '2026-02-28', content: '베이지 색상 구매했는데 어떤 옷에도 잘 어울려요. 선물용으로도 좋습니다.', helpful: 17 },
  { id: 'r39', productId: 'f1', author: '직장인패션', rating: 5, date: '2026-02-15', content: '출퇴근용으로 구매했어요. 품질 우수하고 따뜻합니다. 강추!', helpful: 9 },

  // ========== f2: 캐시미어 니트 풀오버 (Middle) ==========
  { id: 'r40', productId: 'f2', author: '니트러버', rating: 4, date: '2026-03-14', content: '캐시미어 100%라 촉감이 좋아요. 다만 세탁 관리가 좀 까다롭습니다.', helpful: 8 },
  { id: 'r41', productId: 'f2', author: '세일마니아', rating: 5, date: '2026-03-05', content: '할인가에 사서 너무 좋아요! 캐시미어 이 가격이면 진짜 득템.', helpful: 11 },
  { id: 'r42', productId: 'f2', author: '보풀고민', rating: 3, date: '2026-02-20', content: '2주 입었는데 보풀이 좀 생기네요. 캐시미어라 어쩔 수 없는 건지... 관리가 필요해요.', helpful: 14 },

  // ========== f3: 와이드 데님 팬츠 (High rating, safe bet) ==========
  { id: 'r43', productId: 'f3', author: '데님중독', rating: 5, date: '2026-03-17', content: '하이웨스트라 다리가 길어 보여요! 데님인데 편한 게 최고. 재구매 의사 있습니다.', helpful: 23 },
  { id: 'r44', productId: 'f3', author: '와이드팬츠파', rating: 5, date: '2026-03-09', content: '실루엣이 정말 예쁩니다. 키 작아도 잘 어울려요. 가성비 최고에요.', helpful: 18 },
  { id: 'r45', productId: 'f3', author: '데일리룩', rating: 4, date: '2026-02-26', content: 'M사이즈 딱 맞아요. 와이드핏이 유행인데 이 가격에 이 퀄리티면 만족입니다.', helpful: 10 },
  { id: 'r46', productId: 'f3', author: '패션블로거', rating: 4, date: '2026-02-12', content: '와이드 데님 여러 개 비교해봤는데 핏은 여기가 가장 좋아요. 색감도 예뻐요.', helpful: 15 },

  // ========== f4: 미니멀 레더 토트백 (Hidden gem) ==========
  { id: 'r47', productId: 'f4', author: '미니멀리스트', rating: 5, date: '2026-03-13', content: '소가죽 질감이 정말 좋아요. 노트북도 들어가고 실용적입니다. 가성비 최고!', helpful: 7 },
  { id: 'r48', productId: 'f4', author: '직장인가방', rating: 5, date: '2026-02-27', content: '출근용으로 딱이에요. 디자인이 깔끔해서 어떤 옷에도 맞고, 가죽 향도 좋습니다.', helpful: 5 },
  { id: 'r49', productId: 'f4', author: '탄색상구매', rating: 4, date: '2026-02-10', content: '탄 색상 예뻐서 샀는데 기대 이상이에요. 수납력도 좋습니다.', helpful: 3 },

  // ========== f5: 릴렉스핏 맨투맨 (Known problem, 3.2) ==========
  { id: 'r50', productId: 'f5', author: '사이즈불만', rating: 2, date: '2026-03-18', content: 'L사이즈 샀는데 실측이 XL 같아요. 사이즈가 맞지 않음. 교환하려니 배송비도 부담.', helpful: 25 },
  { id: 'r51', productId: 'f5', author: '보풀지옥', rating: 2, date: '2026-03-11', content: '세탁 한 번 했더니 보풀이 장난 아니에요. 460g 헤비 코튼이라더니 품질이 기대 이하.', helpful: 30 },
  { id: 'r52', productId: 'f5', author: '색상불만', rating: 3, date: '2026-03-04', content: '사진과 실물이 다름. 네이비 샀는데 실물은 거의 블랙이에요. 실물 색상이 아쉽습니다.', helpful: 19 },
  { id: 'r53', productId: 'f5', author: '기모좋아', rating: 4, date: '2026-02-22', content: '따뜻하긴 한데 기모가 빨래하면서 뭉쳐요. 가격 대비 품질이 낮음.', helpful: 8 },
  { id: 'r54', productId: 'f5', author: '솔직후기', rating: 3, date: '2026-02-06', content: '39,000원짜리 맨투맨 치고 평범해요. 특별히 추천할 포인트가 없습니다.', helpful: 5 },

  // ========== f6: 울 블렌드 머플러 (Middle) ==========
  { id: 'r55', productId: 'f6', author: '머플러매니아', rating: 4, date: '2026-03-15', content: '캐시미어 블렌드라 부드럽고 따뜻해요. 카멜 색상이 세련됐습니다.', helpful: 10 },
  { id: 'r56', productId: 'f6', author: '겨울필수', rating: 4, date: '2026-03-02', content: '세일해서 샀는데 보온성 좋고 디자인도 깔끔해요. 선물용으로 좋습니다.', helpful: 7 },
  { id: 'r57', productId: 'f6', author: '촉감중시', rating: 3, date: '2026-02-17', content: '울 70%라 약간 따갑기도 해요. 민감한 분은 참고하세요. 디자인은 예뻐요.', helpful: 9 },

  // ========== f7: 스트릿 카고 팬츠 (Uncertain, 3.6) ==========
  { id: 'r58', productId: 'f7', author: '스트릿패션', rating: 4, date: '2026-03-07', content: '디자인은 좋은데 포켓이 너무 불룩해져요. 물건 넣으면 실루엣이 좀 깨집니다.', helpful: 4 },
  { id: 'r59', productId: 'f7', author: '카고팬츠첫구매', rating: 3, date: '2026-02-25', content: '기대했는데 원단이 좀 얇아요. 봄가을에는 괜찮겠지만 겨울에는 추울 것 같아요.', helpful: 5 },
  { id: 'r60', productId: 'f7', author: '사이즈고민', rating: 4, date: '2026-02-12', content: '사이즈는 평소대로 하면 돼요. 카키색 예쁘네요. 포켓이 실용적입니다.', helpful: 2 },

  // ========== f8: 볼캡 유니섹스 (Known problem, 3.1) ==========
  { id: 'r61', productId: 'f8', author: '모자수집가', rating: 2, date: '2026-03-19', content: '형태가 금방 무너져요. 몇 번 안 썼는데 빨래하니까 헝클어짐. 가격 대비 품질이 낮음.', helpful: 22 },
  { id: 'r62', productId: 'f8', author: '실망구매자', rating: 1, date: '2026-03-12', content: '사진과 실물이 다름. 스트랩이 너무 약해서 한 달 만에 끊어졌어요. 절대 비추.', helpful: 35 },
  { id: 'r63', productId: 'f8', author: '볼캡매일착용', rating: 4, date: '2026-03-01', content: '이 가격에 뭘 바라나 싶지만... 그래도 기본 디자인은 괜찮아요. 소모품으로 쓰세요.', helpful: 6 },
  { id: 'r64', productId: 'f8', author: '자외선차단용', rating: 3, date: '2026-02-18', content: '챙이 좀 짧은 편이에요. 자외선 차단 목적이면 아쉬울 수 있어요.', helpful: 8 },
  { id: 'r65', productId: 'f8', author: '색상실물', rating: 2, date: '2026-02-05', content: '화이트 샀는데 누런 아이보리색이에요. 사진과 실물이 다릅니다. 반품했어요.', helpful: 16 },

  // ========== f9: 실크 스카프 (Hidden gem) ==========
  { id: 'r66', productId: 'f9', author: '스카프컬렉터', rating: 5, date: '2026-03-14', content: '핸드롤 마감이 정말 고급스러워요. 실크 촉감이 최고! 선물용으로도 좋습니다.', helpful: 6 },
  { id: 'r67', productId: 'f9', author: '엄마선물', rating: 5, date: '2026-02-28', content: '엄마 생신 선물로 드렸더니 너무 좋아하셨어요. 플로럴 패턴이 화사합니다.', helpful: 8 },
  { id: 'r68', productId: 'f9', author: '실크매니아', rating: 5, date: '2026-02-15', content: '이 가격에 100% 실크라니. 숨겨진 명품이에요. 지오메트릭 패턴도 세련됐어요.', helpful: 4 },

  // ========== l1: 세라믹 디퓨저 세트 (High rating, safe bet) ==========
  { id: 'r69', productId: 'l1', author: '집순이', rating: 5, date: '2026-03-15', content: '라벤더 향이 은은해서 좋아요. 세라믹 용기도 예쁘고 인테리어 효과도 있네요.', helpful: 14 },
  { id: 'r70', productId: 'l1', author: '홈카페족', rating: 5, date: '2026-03-08', content: '집 분위기가 확 바뀌었어요! 유칼립투스 향이 청량하고 지속력도 좋습니다. 재구매 의사 있어요.', helpful: 18 },
  { id: 'r71', productId: 'l1', author: '선물마스터', rating: 4, date: '2026-02-25', content: '집들이 선물로 샀어요. 포장도 예쁘고 받는 사람도 좋아했어요. 선물용으로 좋습니다.', helpful: 9 },
  { id: 'r72', productId: 'l1', author: '향기덕후', rating: 5, date: '2026-02-11', content: '자스민 향 구매했는데 은은하면서도 고급스러운 향이에요. 가성비 최고!', helpful: 12 },

  // ========== l2: 오가닉 코튼 이불세트 (Middle) ==========
  { id: 'r73', productId: 'l2', author: '잠이보약', rating: 5, date: '2026-03-13', content: 'GOTS 인증이라 안심하고 쓸 수 있어요. 촉감도 부드럽고 세탁 후에도 좋습니다.', helpful: 11 },
  { id: 'r74', productId: 'l2', author: '신혼부부', rating: 4, date: '2026-02-27', content: '세일가에 구매. 퀸사이즈 딱 맞아요. 유기농 면이라 피부에 안심되고요.', helpful: 7 },
  { id: 'r75', productId: 'l2', author: '수면퀄리티', rating: 4, date: '2026-02-14', content: '나쁘지 않은데 128,000원 생각하면 더 좋을 수 있을 것 같아요. 그래도 유기농이니까.', helpful: 5 },

  // ========== l3: 모듈형 수납 선반 (Middle) ==========
  { id: 'r76', productId: 'l3', author: '정리왕', rating: 4, date: '2026-03-17', content: '모듈형이라 자유롭게 조합할 수 있어서 좋아요. 다만 조립이 좀 까다롭습니다.', helpful: 13 },
  { id: 'r77', productId: 'l3', author: '원룸살이', rating: 4, date: '2026-03-05', content: '작은 방에 딱이에요. 화이트 색상 깔끔하고 확장 가능한 게 장점.', helpful: 8 },
  { id: 'r78', productId: 'l3', author: '가구조립초보', rating: 3, date: '2026-02-20', content: '설명서가 좀 불친절해요. 조립하는 데 2시간 걸렸습니다. 완성 후에는 만족.', helpful: 10 },

  // ========== l4: 스테인리스 텀블러 (Uncertain, 3.7) ==========
  { id: 'r79', productId: 'l4', author: '텀블러수집', rating: 4, date: '2026-03-12', content: '보온 성능은 좋은 편인데 뚜껑 잠금이 좀 아쉬워요. 가방에 넣으면 살짝 새요.', helpful: 3 },
  { id: 'r80', productId: 'l4', author: '에코라이프', rating: 3, date: '2026-02-28', content: '디자인은 예쁜데 무게가 좀 있어요. 텀블러치고 무거운 편이라 휴대성이 떨어져요.', helpful: 4 },
  { id: 'r81', productId: 'l4', author: '커피중독', rating: 4, date: '2026-02-15', content: '보온 12시간은 좀 과장이지만 6-7시간은 충분히 따뜻해요. 핑크 색상 귀엽습니다.', helpful: 2 },

  // ========== l5: 아로마 캔들 (Uncertain, 3.9) ==========
  { id: 'r82', productId: 'l5', author: '캔들매니아', rating: 4, date: '2026-03-10', content: '바닐라 향 좋은데 연소 시간이 40시간까지는 안 되는 것 같아요. 30시간 정도?', helpful: 5 },
  { id: 'r83', productId: 'l5', author: '힐링타임', rating: 4, date: '2026-02-26', content: '피그 향 구매했는데 은은해서 좋아요. 소이왁스라 그을음도 적고요.', helpful: 3 },
  { id: 'r84', productId: 'l5', author: '양실망', rating: 3, date: '2026-02-10', content: '200g이라 생각보다 작아요. 가격 대비 양이 좀 아쉽습니다. 향은 괜찮아요.', helpful: 6 },

  // ========== l6: 리넨 쿠션커버 (Known problem, 2.9) ==========
  { id: 'r85', productId: 'l6', author: '인테리어초보', rating: 2, date: '2026-03-18', content: '사진과 실물이 다름. 색상이 훨씬 칙칙해요. 세이지 샀는데 거의 회색이에요.', helpful: 24 },
  { id: 'r86', productId: 'l6', author: '세탁후변형', rating: 1, date: '2026-03-11', content: '세탁 한 번 했더니 줄어들어서 쿠션에 안 맞아요. 리넨이라 줄어드는 건 알지만 이건 너무 심해요.', helpful: 30 },
  { id: 'r87', productId: 'l6', author: '봉제불량', rating: 2, date: '2026-03-03', content: '실밥이 풀려서 왔어요. 가격 대비 품질이 낮음. 18,000원이면 더 좋은 거 많아요.', helpful: 18 },
  { id: 'r88', productId: 'l6', author: '쿠션커버교체', rating: 4, date: '2026-02-18', content: '아이보리 색상은 사진이랑 비슷해요. 질감도 나쁘지 않고요. 색상마다 차이가 큰 것 같아요.', helpful: 6 },
  { id: 'r89', productId: 'l6', author: '배송파손', rating: 2, date: '2026-02-04', content: '배송 중 파손되어 왔는데 포장이 너무 부실해요. 교환받긴 했지만 불편했습니다.', helpful: 15 },

  // ========== l7: 대나무 도마 세트 (Hidden gem) ==========
  { id: 'r90', productId: 'l7', author: '요리사랑', rating: 5, date: '2026-03-14', content: '대나무 도마라 칼자국이 적어요. 3종 세트라 용도별로 쓰기 좋습니다. 가성비 최고!', helpful: 5 },
  { id: 'r91', productId: 'l7', author: '주방용품덕후', rating: 5, date: '2026-02-25', content: '주스홈이 있어서 과일 자를 때 즙이 안 흘러요. 세척도 편하고 위생적입니다.', helpful: 4 },
  { id: 'r92', productId: 'l7', author: '친환경주방', rating: 4, date: '2026-02-08', content: '항균 대나무라 냄새도 안 배고 좋아요. L사이즈가 생각보다 커서 좋네요.', helpful: 3 },

  // ========== l8: 무선 LED 무드등 (High rating, safe bet) ==========
  { id: 'r93', productId: 'l8', author: '분위기메이커', rating: 5, date: '2026-03-19', content: '터치 온오프가 편하고 밝기 조절도 돼서 좋아요! USB 충전이라 선 걱정 없어요. 재구매 의사 있습니다.', helpful: 16 },
  { id: 'r94', productId: 'l8', author: '침실인테리어', rating: 5, date: '2026-03-10', content: '은은한 조명이 수면에 도움돼요. 디자인도 미니멀해서 어디에든 어울립니다.', helpful: 13 },
  { id: 'r95', productId: 'l8', author: '캠핑러', rating: 4, date: '2026-02-28', content: '캠핑 갈 때 들고 가요. 배터리 오래 가고 가벼워서 좋아요. 가성비 최고에요.', helpful: 9 },
  { id: 'r96', productId: 'l8', author: '선물고민', rating: 5, date: '2026-02-14', content: '친구 생일 선물로 샀는데 너무 좋아했어요. 선물용으로 좋습니다!', helpful: 7 },

  // ========== l9: 핸드메이드 라탄 바구니 (Hidden gem) ==========
  { id: 'r97', productId: 'l9', author: '라탄인테리어', rating: 5, date: '2026-03-16', content: '수작업이라 하나하나 다 다른 게 매력이에요. 인테리어 소품으로 완벽합니다.', helpful: 4 },
  { id: 'r98', productId: 'l9', author: '수납고민', rating: 5, date: '2026-02-27', content: '블랭킷 넣어두니까 거실 분위기가 확 살아요! M사이즈 추천합니다.', helpful: 3 },
  { id: 'r99', productId: 'l9', author: '자연소재파', rating: 5, date: '2026-02-10', content: '인도네시아 장인 수작업이라 그런지 퀄리티가 남달라요. 숨은 명품 발견한 기분!', helpful: 5 },

  // ========== d1: 유기농 콤부차 (Middle) ==========
  { id: 'r100', productId: 'd1', author: '건강지킴이', rating: 4, date: '2026-03-15', content: '유기농이라 안심하고 마실 수 있어요. 탄산감도 적당하고 맛있습니다.', helpful: 8 },
  { id: 'r101', productId: 'd1', author: '다이어터', rating: 4, date: '2026-03-03', content: '탄산음료 대신 마시고 있어요. 칼로리 낮고 속이 편해요.', helpful: 5 },
  { id: 'r102', productId: 'd1', author: '맛평가단', rating: 3, date: '2026-02-20', content: '콤부차 특유의 신맛이 좀 강한 편이에요. 호불호 갈릴 수 있습니다.', helpful: 9 },

  // ========== d2: 수제 그래놀라 (High rating, safe bet) ==========
  { id: 'r103', productId: 'd2', author: '아침형인간', rating: 5, date: '2026-03-13', content: '그래놀라 여러 개 먹어봤는데 이게 진짜 맛있어요. 견과류가 많아서 좋습니다. 재구매 의사 100%.', helpful: 22 },
  { id: 'r104', productId: 'd2', author: '요거트필수', rating: 5, date: '2026-03-06', content: '요거트에 뿌려먹으면 최고! 메이플 향이 은은하고 바삭해요. 가성비 최고입니다.', helpful: 16 },
  { id: 'r105', productId: 'd2', author: '건강식단', rating: 5, date: '2026-02-22', content: '견과류 40%라 포만감도 좋고 영양도 챙길 수 있어요. 선물용으로도 좋습니다.', helpful: 12 },
  { id: 'r106', productId: 'd2', author: '그래놀라비교', rating: 4, date: '2026-02-10', content: '맛은 최고인데 양이 좀 아쉬워요. 450g이 금방 없어집니다. 그래도 또 살 거예요.', helpful: 8 },

  // ========== d3: 프로틴 에너지바 (Known problem, 3.3) ==========
  { id: 'r107', productId: 'd3', author: '헬스인', rating: 2, date: '2026-03-17', content: '유청단백질 20g이라는데 맛이 너무 인공적이에요. 기대에 못 미침. 다른 에너지바가 훨씬 나아요.', helpful: 20 },
  { id: 'r108', productId: 'd3', author: '운동후간식', rating: 3, date: '2026-03-09', content: '단백질 함량은 좋은데 너무 달아요. 설탕 함량 확인해보니까 꽤 높네요.', helpful: 15 },
  { id: 'r109', productId: 'd3', author: '맛없어도참는중', rating: 3, date: '2026-02-26', content: '프로틴바니까 맛은 기대 안 했는데... 그래도 이건 좀 심하게 맛없어요. 질감도 딱딱하고.', helpful: 12 },
  { id: 'r110', productId: 'd3', author: '성분체크', rating: 4, date: '2026-02-13', content: '성분표 보면 괜찮은 편이에요. 맛은 취향이니까. 운동 후 빠르게 보충하기엔 좋아요.', helpful: 6 },
  { id: 'r111', productId: 'd3', author: '배송불만', rating: 2, date: '2026-02-03', content: '배송 중 파손돼서 부서져 왔어요. 포장이 너무 부실합니다. 맛도 별로고 이중으로 실망.', helpful: 18 },

  // ========== d4: 제주 감귤칩 (High rating, safe bet) ==========
  { id: 'r112', productId: 'd4', author: '감귤사랑', rating: 5, date: '2026-03-18', content: '바삭바삭하고 달콤새콤해서 중독성 있어요! 아이들 간식으로도 최고입니다. 재구매 의사 100%.', helpful: 25 },
  { id: 'r113', productId: 'd4', author: '건강간식', rating: 5, date: '2026-03-10', content: '동결건조라 영양소 손실 없이 먹을 수 있어서 좋아요. 제주 감귤 향이 그대로!', helpful: 18 },
  { id: 'r114', productId: 'd4', author: '다이어트간식', rating: 4, date: '2026-02-27', content: '5봉이면 금방 먹어요. 양이 좀 더 많았으면... 맛은 정말 좋습니다.', helpful: 10 },
  { id: 'r115', productId: 'd4', author: '선물세트', rating: 5, date: '2026-02-15', content: '외국 친구한테 선물했더니 엄청 좋아했어요! 한국 과일칩 최고라고. 선물용으로 좋습니다.', helpful: 14 },

  // ========== d5: 콜드브루 원액 (Middle) ==========
  { id: 'r116', productId: 'd5', author: '커피매니아', rating: 5, date: '2026-03-14', content: '예가체프 싱글오리진이라 풍미가 깊어요. 원액이라 취향대로 농도 조절 가능.', helpful: 11 },
  { id: 'r117', productId: 'd5', author: '아이스커피파', rating: 4, date: '2026-03-01', content: '우유랑 섞어 마시면 맛있어요. 다만 500ml가 생각보다 빨리 소진됩니다.', helpful: 7 },
  { id: 'r118', productId: 'd5', author: '카페인중독', rating: 5, date: '2026-02-18', content: '카페 콜드브루보다 훨씬 경제적이에요. 맛도 뒤지지 않습니다. 가성비 최고!', helpful: 9 },

  // ========== d6: 유기농 꿀 (Hidden gem) ==========
  { id: 'r119', productId: 'd6', author: '꿀맛인생', rating: 5, date: '2026-03-16', content: '지리산 아카시아꿀이라 향이 정말 좋아요. 생꿀 특유의 결정화도 매력적입니다.', helpful: 5 },
  { id: 'r120', productId: 'd6', author: '유기농매니아', rating: 5, date: '2026-02-28', content: '유기농 인증이라 안심되고, 꿀 자체의 질이 다르네요. 아이들한테도 안심하고 줄 수 있어요.', helpful: 4 },
  { id: 'r121', productId: 'd6', author: '선물추천', rating: 5, date: '2026-02-10', content: '부모님 선물로 드렸더니 좋아하셨어요. 고급스러운 포장도 좋고, 품질 우수합니다.', helpful: 3 },

  // ========== d7: 건조 과일 믹스 (Known problem, 3.0) ==========
  { id: 'r122', productId: 'd7', author: '과일간식', rating: 2, date: '2026-03-18', content: '사진과 실물이 다름. 과일이 쪼그라들어 있고 색도 칙칙해요. 기대에 못 미침.', helpful: 22 },
  { id: 'r123', productId: 'd7', author: '달다달아', rating: 2, date: '2026-03-11', content: '설탕 범벅이에요. 건조 과일인데 이렇게 달 필요가 있나... 건강 간식이 아닙니다.', helpful: 25 },
  { id: 'r124', productId: 'd7', author: '실망스러운맛', rating: 3, date: '2026-03-02', content: '딸기는 괜찮은데 망고, 바나나가 맛이 좀 이상해요. 가격 대비 품질이 낮음.', helpful: 14 },
  { id: 'r125', productId: 'd7', author: '건과일비교', rating: 4, date: '2026-02-19', content: '맛은 보통인데 300g이면 양은 괜찮아요. 요거트 토핑으로 먹기엔 나쁘지 않습니다.', helpful: 5 },
  { id: 'r126', productId: 'd7', author: '배송불만2', rating: 2, date: '2026-02-05', content: '포장이 터져서 과일이 쏟아져 왔어요. 배송 중 파손. 교환받기도 번거로웠습니다.', helpful: 19 },

  // ========== d8: 하루견과 30일분 (High rating, safe bet) ==========
  { id: 'r127', productId: 'd8', author: '직장인간식', rating: 5, date: '2026-03-17', content: '소분 포장이라 매일 하나씩 먹기 좋아요. 견과류 구성도 알차고 맛있습니다. 재구매 의사 있어요.', helpful: 20 },
  { id: 'r128', productId: 'd8', author: '건강견과', rating: 5, date: '2026-03-08', content: '아몬드, 호두 품질이 좋아요. 30일분이라 한 달 간식 해결! 가성비 최고입니다.', helpful: 15 },
  { id: 'r129', productId: 'd8', author: '크랜베리러버', rating: 4, date: '2026-02-25', content: '크랜베리가 들어있어서 새콤달콤해요. 다만 소분 양이 좀 적은 느낌.', helpful: 8 },
  { id: 'r130', productId: 'd8', author: '대량구매', rating: 5, date: '2026-02-12', content: '세일 때 3개 샀어요. 가족 다같이 먹기 좋고 신선합니다. 선물용으로도 좋습니다.', helpful: 11 },

  // ========== d9: 말차 라떼 파우더 (Uncertain, 3.5) ==========
  { id: 'r131', productId: 'd9', author: '말차러버', rating: 4, date: '2026-03-12', content: '우지 말차라 풍미가 좋아요. 다만 코코넛밀크 때문에 순수 말차맛을 기대하면 아쉬울 수 있어요.', helpful: 3 },
  { id: 'r132', productId: 'd9', author: '홈카페', rating: 3, date: '2026-02-27', content: '뜨거운 물에 잘 안 녹아요. 덩어리가 좀 져서 아쉽습니다. 맛 자체는 괜찮아요.', helpful: 5 },
  { id: 'r133', productId: 'd9', author: '라떼매일', rating: 3, date: '2026-02-10', content: '코코넛 향이 너무 강해서 말차 맛이 묻혀요. 말차 라떼보다는 코코넛 음료 같아요.', helpful: 4 },

  // ========== t1: 무선 블루투스 이어버드 (High rating, safe bet) ==========
  { id: 'r134', productId: 't1', author: '음질매니아', rating: 5, date: '2026-03-17', content: 'ANC 성능이 이 가격대에서 최고입니다. 통화 품질도 만족. 재구매 의사 있어요.', helpful: 45 },
  { id: 'r135', productId: 't1', author: '운동러', rating: 4, date: '2026-03-14', content: '운동할 때 써요. 방수 되고 잘 안빠져서 좋은데, 귀 큰 사람은 좀 아플 수도.', helpful: 16 },
  { id: 'r136', productId: 't1', author: '출퇴근필수', rating: 5, date: '2026-03-05', content: '지하철에서 ANC 켜면 세상이 달라져요. 배터리도 8시간 충분합니다. 가성비 최고!', helpful: 28 },
  { id: 'r137', productId: 't1', author: '이어폰비교왕', rating: 5, date: '2026-02-20', content: '10만원 이하 이어버드 중 음질 최상급이에요. 블랙 색상 고급스러워요.', helpful: 20 },

  // ========== t2: 접이식 무선 키보드 (Middle) ==========
  { id: 'r138', productId: 't2', author: '디지털노마드', rating: 4, date: '2026-03-15', content: '카페에서 작업할 때 좋아요. 접으면 정말 작아져서 휴대성 최고.', helpful: 8 },
  { id: 'r139', productId: 't2', author: '아이패드유저', rating: 5, date: '2026-03-02', content: '아이패드랑 멀티페어링해서 써요. 타건감도 괜찮고 세일가에 사면 가성비 좋아요.', helpful: 6 },
  { id: 'r140', productId: 't2', author: '키보드수집가', rating: 3, date: '2026-02-18', content: '접이식이라 키감이 좀 얇은 편이에요. 장시간 타이핑에는 손가락이 좀 아파요.', helpful: 10 },

  // ========== t3: 4K 웹캠 오토포커스 (Hidden gem) ==========
  { id: 'r141', productId: 't3', author: '재택근무자2', rating: 5, date: '2026-03-13', content: '4K라 화상회의할 때 화질이 확실히 다릅니다. 오토포커스도 빠르고 정확해요. 가성비 최고!', helpful: 5 },
  { id: 'r142', productId: 't3', author: '유튜버지망', rating: 5, date: '2026-02-25', content: '이 가격에 4K 오토포커스 웹캠이라니. 영상 촬영용으로도 충분합니다.', helpful: 4 },
  { id: 'r143', productId: 't3', author: '화상회의매일', rating: 4, date: '2026-02-08', content: '내장 마이크 품질도 괜찮고 설치도 간편해요. 저조도에서 약간 노이즈가 있긴 합니다.', helpful: 3 },

  // ========== t4: USB-C 7in1 허브 (Uncertain, 3.8) ==========
  { id: 'r144', productId: 't4', author: '맥북유저', rating: 4, date: '2026-03-11', content: '필요한 포트가 다 있어서 좋아요. 다만 장시간 사용하면 좀 뜨거워집니다.', helpful: 4 },
  { id: 'r145', productId: 't4', author: '허브비교', rating: 3, date: '2026-02-26', content: 'HDMI 4K 출력은 좋은데 가끔 연결이 끊겨요. 안정성이 좀 아쉽습니다.', helpful: 5 },
  { id: 'r146', productId: 't4', author: '재택셋업', rating: 4, date: '2026-02-10', content: 'PD 100W 충전 되는 허브 중에서 가격이 합리적이에요. 디자인도 깔끔합니다.', helpful: 2 },

  // ========== t5: 무선 충전 패드 듀얼 (Uncertain, 3.7) ==========
  { id: 'r147', productId: 't5', author: '충전패드매일', rating: 4, date: '2026-03-09', content: '폰이랑 이어버드 동시 충전 편해요. 다만 위치를 정확히 맞춰야 충전되는 게 좀 불편.', helpful: 4 },
  { id: 'r148', productId: 't5', author: '고속충전기대', rating: 3, date: '2026-02-22', content: '15W라는데 체감상 그렇게 빠르진 않아요. 기대에 못 미침. 유선이 훨씬 빠릅니다.', helpful: 6 },
  { id: 'r149', productId: 't5', author: '심플라이프', rating: 4, date: '2026-02-06', content: '책상이 깔끔해지는 효과는 확실히 있어요. 세일가에 사면 나쁘지 않습니다.', helpful: 2 },

  // ========== t6: 스마트 체중계 BIA (Known problem, 3.2) ==========
  { id: 'r150', productId: 't6', author: '다이어트도전', rating: 2, date: '2026-03-18', content: '체지방률이 매번 달라요. 같은 시간에 재도 오차가 크니까 신뢰가 안 됩니다. 기대에 못 미침.', helpful: 28 },
  { id: 'r151', productId: 't6', author: '앱연동실패', rating: 2, date: '2026-03-10', content: '앱 연동이 자꾸 끊겨요. 블루투스 연결이 불안정합니다. 이 가격이면 좀 더 나아야지.', helpful: 32 },
  { id: 'r152', productId: 't6', author: '헬스장다니는중', rating: 3, date: '2026-03-02', content: '인바디 결과랑 비교하면 수치가 많이 달라요. 참고용으로만 쓸 만합니다.', helpful: 20 },
  { id: 'r153', productId: 't6', author: '디자인좋음', rating: 4, date: '2026-02-16', content: '디자인은 깔끔하고 예뻐요. 정확도는 좀 아쉽지만 추이를 보는 용도로는 괜찮아요.', helpful: 8 },
  { id: 'r154', productId: 't6', author: '환불고민', rating: 3, date: '2026-02-03', content: '가격 대비 품질이 낮음. 13가지 지표라는데 정확도가 떨어지면 의미가 없어요.', helpful: 15 },

  // ========== t7: 미니 포터블 프로젝터 (Hidden gem) ==========
  { id: 'r155', productId: 't7', author: '홈시네마', rating: 5, date: '2026-03-16', content: '작은 크기에 Full HD라 놀랐어요. 넷플릭스 내장이라 별도 기기 없이 바로 볼 수 있습니다.', helpful: 5 },
  { id: 'r156', productId: 't7', author: '캠핑프로젝터', rating: 5, date: '2026-02-28', content: '캠핑 갈 때 가져가면 분위기 최고! 배터리 3시간이면 영화 한 편은 충분합니다.', helpful: 4 },
  { id: 'r157', productId: 't7', author: '가성비프로젝터', rating: 4, date: '2026-02-12', content: '이 가격에 이 성능이면 가성비 최고에요. 밝은 곳에서는 좀 흐려지지만 어두운 곳에서는 완벽.', helpful: 3 },

  // ========== t8: 노이즈캔슬링 헤드폰 (High rating, safe bet) ==========
  { id: 'r158', productId: 't8', author: '재택근무자', rating: 5, date: '2026-03-19', content: '노이즈캔슬링이 역대급. 집에서 일할 때 진짜 집중 잘 됩니다. 재구매 의사 있어요.', helpful: 38 },
  { id: 'r159', productId: 't8', author: '음악감상', rating: 5, date: '2026-03-12', content: '음질이 정말 좋아요. 30시간 배터리도 충분하고, 착용감도 편합니다. 품질 우수!', helpful: 25 },
  { id: 'r160', productId: 't8', author: '비행기필수', rating: 5, date: '2026-03-01', content: '비행기에서 이거 끼면 엔진 소음이 거의 안 들려요. 장거리 여행 필수템입니다.', helpful: 30 },
  { id: 'r161', productId: 't8', author: '헤드폰업그레이드', rating: 4, date: '2026-02-18', content: '이전 헤드폰에서 업그레이드했는데 ANC 차이가 확연해요. 세일가에 사면 가성비 최고.', helpful: 14 },
  { id: 'r162', productId: 't8', author: '카페작업러', rating: 5, date: '2026-02-05', content: '카페에서 이거 쓰면 도서관급 조용함을 얻을 수 있어요. 선물용으로도 좋습니다.', helpful: 19 },

  // ========== t9: 스마트 공기질 측정기 (Uncertain, 3.6) ==========
  { id: 'r163', productId: 't9', author: '공기질신경쓰는맘', rating: 4, date: '2026-03-14', content: 'E-ink 디스플레이라 눈이 편하고 항상 켜놔도 부담 없어요. PM2.5 측정이 빠릅니다.', helpful: 3 },
  { id: 'r164', productId: 't9', author: '미세먼지체크', rating: 3, date: '2026-02-26', content: 'CO2 수치가 좀 부정확한 것 같아요. 환기하면 바로 떨어지긴 하는데 기준값이 의심스러워요.', helpful: 4 },
  { id: 'r165', productId: 't9', author: '스마트홈', rating: 4, date: '2026-02-10', content: '디자인은 깔끔한데 앱 연동 기능이 좀 부실해요. 단독으로 쓰기엔 나쁘지 않습니다.', helpful: 2 },
];

export function getReviewsByProductId(productId: string): Review[] {
  return reviews.filter(r => r.productId === productId);
}
