import { ItemsResponse } from "@/app/api/items/route.type";
import styles from "./index.module.scss";
import { PropsWithChildren } from "react";
import ReviewStarSvg from "@/assets/icon/review-star.svg"


// {"badges": [
//   {
//     "displayType": "RECTANGLE",
//     "label": "쿠폰",
//     "colorFont": "#ff4b50ff",
//     "colorBackground": "#fff2f4ff",
//     "image": null
//   }
// ],
// "promotion": {
//   "colorBackground": "#009ee7ff",
//   "labels": [
//     {
//       "types": ["BOLD"],
//       "text": "설 특가",
//       "colorFont": "#fffce3ff",
//       "size": 11
//     }
//   ]
// }}
// "badges": [
//         {
//           "displayType": "RECTANGLE",
//           "label": "살수록할인",
//           "colorFont": "#5f77a4ff",
//           "colorBackground": "#f5f7ffff",
//           "image": null
//         },
//         {
//           "displayType": "RECTANGLE",
//           "label": "쿠폰",
//           "colorFont": "#ff4b50ff",
//           "colorBackground": "#fff2f4ff",
  //"image": "https://cdn.idus.kr/static/common/images/20230608/080508_special_logo.png"
//         
//         }
//       
 export interface CardProps {
  name: string;
  image: string;
  artistName?: string;
  salePrice?: number;
  discountRate?: number;
  review?: ItemsResponse["items"][number]["review"];
  badges?: ItemsResponse["items"][number]["badges"];
  promotion?:ItemsResponse['items'][number]['promotion'];
  thumbRadius?:0|10;
  ellipsisRow?:1|2;
}

export function CardSkeleton() {
  return (
    <div className={styles.CardSkeleton}>
      <div className={styles.image} />
    </div>
  );
}
function CardRoot({
  children
}: PropsWithChildren<{}>) {
  return (
    <div className={styles.cardWrapper}>
      {children}
    </div>
  );
}

function Badge({badges}:Required<Pick<CardProps,'badges'>>){
  return(
    <div className={styles.badgeArea}>
        {badges?.map(badge => (
          <span key={badge.label}
          style={{
            color:badge.colorFont,
            background:badge.colorBackground,
          }}
          >
            {badge.image && <img src={badge.image} alt={badge.label}/>}
           {badge.label}</span>
        ))}
    </div>
  )
}
function Review({review}:Required<Pick<CardProps,'review'>>){
  return(
    <div className={styles.reviewArea}>
      <div className={styles.reviewStar}>
      <ReviewStarSvg width={18} height={18} viewBox="0 0 24 24"/>
      <b>{review.rate}</b> ({review.count})
      </div>
      <div className={styles.content}>
        <span>후기</span>
        <p className="text-ellipsis">{review.contents}</p>
      </div>
    </div>
  )
}
function SalePrice({salePrice,discountRate}:Pick<CardProps,'salePrice'|'discountRate'>){
  return(
    <div className={styles.salePriceArea}>
    {!!discountRate && discountRate > 0 && <p><strong><b>{discountRate}%</b></strong></p>}
    {salePrice && <p><b>{salePrice.toLocaleString()}</b>원</p>}
    </div>
  )
}

function Title({name,artistName,ellipsisRow=1}:Pick<CardProps,'name'|'artistName'|'ellipsisRow'>){
  return(
    <div className={
      `${styles.titleArea}`
    }>
      
      {artistName && <p className={`${styles.artistTitle} text-ellipsis`}>{artistName}</p>}
      <h3 className={`text-ellipsis ellipsis-row-${ellipsisRow}`}>{name}</h3>
    </div>
  )
}
function Thumb({image,name,thumbRadius,promotion}:Pick<CardProps,'image'|'name'|'thumbRadius'|'promotion'>){
  const label = promotion?.labels[0]
  return(
    <div className={`${styles.thumbArea} r-${thumbRadius}`}>
        <img src={image} alt={name} />
        {promotion && label && (
          <div className={styles.promotionArea}>
          <span
          style={{
            background:promotion.colorBackground, 
            display:'block',
            padding:'3px 8px',
            color:`${label.colorFont}`,
            fontSize:`${label.size}px`
            }}
          >
            {label.text}
          </span>
        </div>
        )}
        
    </div>
  )
}

const Card = Object.assign(CardRoot, { Thumb, Title, Review, Badge, SalePrice });

export default Card