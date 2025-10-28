// Badge 타입 정의
export interface Badge {
  displayType: "RECTANGLE";
  label: string;
  colorFont: string;
  colorBackground: string;
  image: string | null;
}

// Promotion Label 타입 정의
export interface PromotionLabel {
  types: string[];
  text: string;
  colorFont: string;
  size: number;
}

// Promotion 타입 정의
export interface Promotion {
  colorBackground: string;
  labels: PromotionLabel[];
}

// Review 타입 정의
export interface Review {
  count: number;
  rate: number;
  rateLabel: string;
  contents: string;
  starFull: boolean;
}

// Item 타입 정의
export interface Item {
  uuid: string;
  name: string;
  image: string;
  artistUuid: string;
  artistName: string;
  salePrice: number;
  discountRate: number;
  review: Review;
  badges: Badge[];
  promotion: Promotion;
  isAdBadgeVisible: boolean;
  artistId: number;
}

// Pagination 타입 정의
export interface Pagination {
  total: number;
  current: number;
  pageSize: number;
  itemSize: number;
}

// 전체 응답 타입 정의
export interface ItemsResponse {
  items: Item[];
  pagination: Pagination;
}
