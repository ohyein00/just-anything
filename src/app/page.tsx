import Image from "next/image";
import "./globals.scss";
import Card, { CardSkeleton } from "@/components/_shared/Card/BaseCard";
import { fetchItems } from "@/lib/fetch/items";
import { ItemsResponse } from "@/app/api/items/route.type";
import dynamic from "next/dynamic";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { fetchShortcut } from "@/lib/fetch/shortcurt";
import Shortcut from "@/components/Shortcut";
import InfiniteCardList from "@/components/InfiniteCardList";
import { fetchGift } from "@/lib/fetch/gift";
import GiftList from "@/components/GiftList";


export default async function Home({ children }: { children: React.ReactNode }) {
  const [itemsRes, shortcutRes,giftRes] = await Promise.allSettled([
    fetchItems(1),   
    fetchShortcut(),   
    fetchGift()
  ]);
  
  const itemListData = itemsRes.status==='fulfilled' ? itemsRes.value : null
  const shortcutData = shortcutRes.status==='fulfilled' ? shortcutRes.value : null
  const giftListData = giftRes.status==='fulfilled' ? giftRes.value : null

  return (
    <main className="main-container">
      <div>
        <InfiniteCardList
          itemListData={itemListData}
          insertsNodes={{
            4: <Shortcut shortcutData={shortcutData}/>,
            8: giftListData ? <GiftList giftListData={giftListData}/> : null,
            12: <div>구매 후 이런점이 좋았대요</div>,
          }}
        />
      </div>
    </main>
  );
}
