'use client'

import { ReviewResponse } from "@/app/api/review/route.type"
import styles from './index.module.scss'
import { DynamicCard } from "@/components/_shared/Card/DynamicCard"
import ReviewStar from "@/components/_common/ReviewStar"
import Card from "../_shared/Card/BaseCard"

interface ReviewProps{
    reviewListData:ReviewResponse
}

export default function ReviewList({reviewListData}:ReviewProps){
    const alertCardMessage = (title:string)=>{
        alert(`작품 상세페이지 이동 - ${title}`)
    }
    const onClickEvent=()=>{
        return alertCardMessage
    }
    return(
        <div className={
            styles.reviewContainer
        }>
            <div className={styles.sectionTitle}>
            {
                reviewListData.title.map((item)=>(
                    <span
                    key={item.text}
                    style={{
                        fontSize:item.size,
                        color:item.color,
                        fontWeight:item.types[0] ?? 'normal',
                        ...item.bgColor && ({background:item.bgColor})
                    }}
                    >{item.text}</span>
                ))
            }
            </div>
            <div className={styles.reviewSlideContainer}>
            {
                reviewListData.products.map((product)=>
                    <div className={styles.reviewSlide} key={product.uuid}>
                        <a onClick={()=>onClickEvent()(product.productName)} className={styles.reviewCardArea}>
                        <Card 
                        type='vertical'
                        >                          
                            <Card.Thumb
                            id={product.uuid}
                            image={product.image}
                            name={product.productName}
                            />
                            <Card.Content>
                                <Card.Content.Title
                                name={product.productName}
                                artistName={product.artistName}
                                ellipsisRow={2}
                                />
                                <Card.Content.SalePrice
                                salePrice={product.price}
                                discountRate={product.saleRate}
                                />
                            </Card.Content>
                        </Card>
                        </a>
                        <div className={styles.reviewContent}>
                            <p className="text-ellipsis ellipsis-row-3">
                            {product.reviewInfo[0].text}
                            </p>
                            <ReviewStar count={product.reviewCount} rate={product.reviewRate}/>
                        </div>
                    </div>
                )
            }
            </div>
        </div>

    )
}