type HexColor = `#${string}`;

export interface GiftTitle {
  text: string;
  types: Array<"BOLD" | "NORMAL">;
  size: number;
  color: HexColor;
  colorWeb: HexColor;
  bgColor: HexColor | null;
  bgColorWeb: HexColor | null;
}

export interface GiftItem {
  uuid: string;
  name: string;
  artistId: number;
  artistUuid: string;
  saleRate: number;
  priceSale: number;
  thumbImageUrl: string;
}

export interface GiftResponse {
  id: string;
  icon: string;
  targetId: string;
  title: GiftTitle[];
  themeTitle: string;
  items: GiftItem[];
}
