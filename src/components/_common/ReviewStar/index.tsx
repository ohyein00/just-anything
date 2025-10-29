import ReviewStarSvg from "@/assets/icon/review-star.svg";
import styles from "./index.module.scss";

interface ReviewStarProps {
  rate: number;
  count: number;
}

export default function ReviewStar({ rate, count }: ReviewStarProps) {
  return (
    <div className={styles.reviewStar}>
      <ReviewStarSvg width={18} height={18} viewBox="0 0 24 24" />
      <b>{rate}</b> ({count})
    </div>
  );
}
