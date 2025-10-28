"use client";
import dynamic from "next/dynamic";
import { CardSkeleton } from "@/components/_shared/Card/BaseCard";
import { CardProps } from "@/components/_shared/Card/BaseCard";
import { Fragment, PropsWithChildren, ReactElement, useMemo } from "react";
import { ItemsResponse } from "@/app/api/items/route.type";
import { Children, isValidElement } from "react";
import styles from "./index.module.scss";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { fetchItems } from "@/lib/fetch/items";
import { DynamicCard } from "@/components/_shared/Card/DynamicCard";

const getItemList = async (page = 1) => {
  return await fetchItems(page);
};



interface InfiniteCardListProps {
  itemListData: ItemsResponse | null;
  insertsNodes?: Record<number, React.ReactNode>;
}
export default function InfiniteCardList({ insertsNodes, itemListData }: InfiniteCardListProps) {
  const { data, isError, isLoading, sentinelRef } = useInfiniteScroll<
    ItemsResponse["items"][number]
  >({
    fetcher: getItemList,
    ...(itemListData && { initialData: itemListData }),
  });
  return (
    <>
      <div className={styles.productListContainer}>
        {data?.map((item, i) => {
          const row = i + 1;
          return (
            <Fragment key={item.uuid} >
              <div className={styles.productCardArea}>
                  <DynamicCard 
                    key={item.uuid}
                    >
                        <DynamicCard.Thumb
                        image={item.image}
                        name={item.name}
                        promotion={item.promotion}
                        />
                        <DynamicCard.Content>
                          <DynamicCard.Content.Title
                          name={item.name}
                          ellipsisRow={2}
                          artistName={item.artistName}
                          />
                          <DynamicCard.Content.SalePrice
                          salePrice={item.salePrice}
                          discountRate={item.discountRate}
                          />
                          <DynamicCard.Content.Badge
                          badges={item.badges}
                          />
                          <DynamicCard.Content.Review
                          review={item.review}
                          />
                        </DynamicCard.Content>
                    </DynamicCard>
                  </div>
              {insertsNodes?.[row] ? (
                <div className={styles.fullGrid}>{insertsNodes[row]}</div>
              ) : null}
            </Fragment>
          );
        })};
      </div>
      {isLoading && (
        <>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </>
      )}
      {isError && <p>로딩에 실패하였습니다.</p>}
      <div ref={sentinelRef} style={{ height: 1 }} aria-hidden />
    </>
  );
}
