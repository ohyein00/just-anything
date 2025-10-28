// DynamicCard.tsx

import dynamic from 'next/dynamic';
import Card, { CardSkeleton } from '@/components/_shared/Card/BaseCard';


const DynamicBase = dynamic(async () => {
  const m = await import('@/components/_shared/Card/BaseCard');
  return m.default;
}, { loading: () => <CardSkeleton /> }) as any

DynamicBase.Thumb = dynamic(async () => {
  const m = await import('@/components/_shared/Card/BaseCard');
  return m.default.Thumb;
});

DynamicBase.Title = dynamic(async () => {
  const m = await import('@/components/_shared/Card/BaseCard');
  return m.default.Title;
});

DynamicBase.Badge = dynamic(async () => {
  const m = await import('@/components/_shared/Card/BaseCard');
  return m.default.Badge;
});

DynamicBase.Review = dynamic(async () => {
  const m = await import('@/components/_shared/Card/BaseCard');
  return m.default.Review;
});

DynamicBase.SalePrice = dynamic(async () => {
  const m = await import('@/components/_shared/Card/BaseCard');
  return m.default.SalePrice;
});

export const DynamicCard = DynamicBase as typeof Card;
