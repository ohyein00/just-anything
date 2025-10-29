type HexColor = `#${string}`;

interface ReviewInfo {
  text: string;
  types: string[];
  size: number;
  color: HexColor;
  colorWeb: HexColor;
  bgColor: HexColor;
  bgColorWeb: HexColor;
}

export interface Product {
  uuid: string;
  image: string;
  productName: string;
  artistName: string;
  saleRate: number;
  price: number;
  reviewInfo: ReviewInfo[];
  reviewRate: number;
  reviewCount: number;
}

// 최상위 블록
export interface ReviewResponse {
  title: ReviewInfo[];
  products: Product[];
}
