interface Items {
  id: number;
  imageUrl: string;
  label: string;
  webUrl: string;
}

export interface ShortcutResponse {
  title: string;
  items: Array<Items>;
}
