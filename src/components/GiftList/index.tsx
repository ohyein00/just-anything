import { GiftResponse } from "@/app/api/gift/route.type";
import Card from "@/components/_shared/Card";
import styles from "./index.module.scss";

interface GiftListProps {
  giftListData: GiftResponse;
}
export default function GiftList({ giftListData }: GiftListProps) {
  return (
    <div className={styles.giftContainer}>
      <div>
        {giftListData.title.map(item => (
          <span
            key={item.text}
            style={{
              fontSize: item.size,
              color: item.color,
              fontWeight: item.types[0] ?? "normal",
              ...(item.bgColor && { background: item.bgColor }),
            }}
          >
            {item.text}
          </span>
        ))}
      </div>
      <div className="title-2">{giftListData.themeTitle}</div>
      <div className={styles.giftListGrid}>
        {giftListData.items.map(item => (
          <Card key={item.artistUuid}>
            <Card.Thumb
              id={item.artistUuid}
              image={item.thumbImageUrl}
              name={item.name}
              thumbRadius={10}
            />
            <Card.Content>
              <Card.Content.Title name={item.name} ellipsisRow={2} />
              <Card.Content.SalePrice salePrice={item.priceSale} discountRate={item.saleRate} />
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
}
