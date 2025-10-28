
import { ItemsResponse } from "@/app/api/items/route.type";
import styles from "./index.module.scss";
import { PropsWithChildren } from "react";
import ReviewStar from "@/components/_common/ReviewStar";
import FavoriteButton from "@/components/_shared/FavoriteButton";

 export interface CardProps {
  id:string;
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
  type?:'vertical'|'normal'
}

export function CardSkeleton() {
  return (
    <div className={styles.cardSkeleton}>
      <div className={styles.image} />
    </div>
  );
}
function CardRoot({
  children,
  type='normal'
}: PropsWithChildren<Pick<CardProps,'type'>>) {
  return (
    <div className={`${styles.cardWrapper} ${styles[type]} card-wrapper`}>
      {children}
    </div>
  );
}

function Badge({badges}:Required<Pick<CardProps,'badges'>>){
  return(
    <div className={`${styles.badgeArea}`}>
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
      <ReviewStar rate={review.rate} count={review.count}/>
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
function Thumb({image,name,thumbRadius=0,promotion,id}:Pick<CardProps,'id'|'image'|'name'|'thumbRadius'|'promotion'>){
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
       <FavoriteButton id={id} defaultChecked={false}/> 
    </div>
  )
}

function CardHead({children}:PropsWithChildren<{}>){
  return(
    <div className={`${styles.cardHead}`}>
    {children}  
    </div>
  )
}
function CardContent({children}:PropsWithChildren<{}>){
  return(
    <div className={`${styles.cardContent}`}>
    {children}  
    </div>
  )
}
const Content = Object.assign(CardContent,{Title, Review, Badge, SalePrice})
const Card = Object.assign(CardRoot, { Thumb, Content });

export default Card