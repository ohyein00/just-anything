import { GiftResponse } from "@/app/api/gift/route.type"
import dynamic from "next/dynamic";
import { CardSkeleton } from "@/components/_shared/Card/BaseCard";
import { DynamicCard } from "@/components/_shared/Card/DynamicCard";
import styles from "./index.module.scss"

interface GiftListProps{
    giftListData:GiftResponse;
}
export default function GiftList({giftListData}:GiftListProps){

    return(
        <div className={
            styles.giftContainer
        }>
            <div>
            {
                giftListData.title.map((item)=>(
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
            <div className="title-2">
                {giftListData.themeTitle}
            </div>
            <div className={styles.giftListGrid}>
            {
                giftListData.items.map((item)=>
                    <DynamicCard 
                    key={item.artistUuid}
                    >
                        <DynamicCard.Thumb
                        image={item.thumbImageUrl}
                        name={item.name}
                        thumbRadius={10}
                        />
                        <DynamicCard.Title
                        name={item.name}
                        ellipsisRow={2}
                        />
                        <DynamicCard.SalePrice
                        salePrice={item.priceSale}
                        discountRate={item.saleRate}
                        />
                    </DynamicCard>
                )
            }
            </div>
        </div>

    )

}