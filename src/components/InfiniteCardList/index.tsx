"use client";

import { Fragment } from "react";
import { ItemsResponse } from "@/app/api/items/route.type";
import styles from "./index.module.scss";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { fetchItems } from "@/lib/fetch";
import Card from "@/components/_shared/Card";

const getItemList = async (page = 1) => {
  return await fetchItems(page);
};

interface InfiniteCardListProps {
  itemListData: ItemsResponse | null;
  insertsNodes?: Record<number, React.ReactNode>;
}
export default function InfiniteCardList({ insertsNodes, itemListData }: InfiniteCardListProps) {
  const { data, isError, isLoading, sentinelRef, loadMore } = useInfiniteScroll<
    ItemsResponse["items"][number]
  >({
    fetcher: getItemList,
    ...(itemListData && { initialData: itemListData }),
  });

  const onClickRetryButton = async () => {
    try {
      await loadMore();
    } catch (e) {
      console.log("InfiniteCardList LoadMore Error", e);
    }
  };
  return (
    <>
      <div className={styles.productListContainer}>
        {data?.map((item, i) => {
          const row = i + 1;
          return (
            <Fragment key={item.uuid}>
              <div className={styles.productCardArea}>
                <Card key={item.uuid}>
                  <Card.Thumb
                    id={item.uuid}
                    image={item.image}
                    name={item.name}
                    promotion={item.promotion}
                  />
                  <Card.Content>
                    <Card.Content.Title
                      name={item.name}
                      ellipsisRow={2}
                      artistName={item.artistName}
                      isAdBadgeVisible={item.isAdBadgeVisible}
                    />
                    <Card.Content.SalePrice
                      salePrice={item.salePrice}
                      discountRate={item.discountRate}
                    />
                    <Card.Content.Badge badges={item.badges} />
                    <Card.Content.Review review={item.review} />
                  </Card.Content>
                </Card>
              </div>
              {insertsNodes?.[row] ? (
                <div className={styles.fullGrid}>{insertsNodes[row]}</div>
              ) : null}
            </Fragment>
          );
        })}
      </div>
      <div
        ref={sentinelRef}
        style={{
          margin: "10px 0",
          padding: 10,
          textAlign: "center",
        }}
      >
        {isLoading && <div style={{ padding: "20px" }}>✌️Loading✌️</div>}
        {!isLoading && isError && (
          <div>
            <p>로딩에 실패하였습니다 😢</p>
            <button
              onClick={onClickRetryButton}
              disabled={isLoading}
              style={{
                fontStyle: "#313131",
                background: "#f8ecec",
                padding: "8px 15px",
                fontSize: "0.9rem",
                marginTop: "8px",
                borderRadius: "5px",
              }}
            >
              다시 불러오기
            </button>
          </div>
        )}
      </div>
    </>
  );
}
