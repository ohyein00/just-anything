import "./globals.scss";
import { fetchItems } from "@/lib/fetch/items";
import { fetchShortcut } from "@/lib/fetch/shortcurt";
import Shortcut from "@/components/Shortcut";
import InfiniteCardList from "@/components/InfiniteCardList";
import { fetchGift } from "@/lib/fetch/gift";
import GiftList from "@/components/GiftList";
import { fetchReview } from "@/lib/fetch/review";
import ReviewList from "@/components/ReviewList";

export default async function Home({}: { children: React.ReactNode }) {
  const [itemsRes, shortcutRes, giftRes, reviewData] = await Promise.allSettled([
    fetchItems(1),
    fetchShortcut(),
    fetchGift(),
    fetchReview(),
  ]);

  const itemListData = itemsRes.status === "fulfilled" ? itemsRes.value : null;
  const shortcutData = shortcutRes.status === "fulfilled" ? shortcutRes.value : null;
  const giftListData = giftRes.status === "fulfilled" ? giftRes.value : null;
  const reviewListData = reviewData.status === "fulfilled" ? reviewData.value : null;

  return (
    <main className="main-container">
      <div>
        <InfiniteCardList
          itemListData={itemListData}
          insertsNodes={{
            4: shortcutData ? <Shortcut shortcutData={shortcutData} /> : null,
            8: giftListData ? <GiftList giftListData={giftListData} /> : null,
            12: reviewListData ? <ReviewList reviewListData={reviewListData} /> : null,
          }}
        />
      </div>
    </main>
  );
}
