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
DynamicBase.Content = dynamic(async () => {
  const m = await import('@/components/_shared/Card/BaseCard');
  return m.default.Content;
});
DynamicBase.Content.Title = dynamic(async () => {
  const m = await import('@/components/_shared/Card/BaseCard');
  return m.default.Content.Title;
});

DynamicBase.Content.Badge = dynamic(async () => {
  const m = await import('@/components/_shared/Card/BaseCard');
  return m.default.Content.Badge;
});

DynamicBase.Content.Review = dynamic(async () => {
  const m = await import('@/components/_shared/Card/BaseCard');
  return m.default.Content.Review;
});

DynamicBase.Content.SalePrice = dynamic(async () => {
  const m = await import('@/components/_shared/Card/BaseCard');
  return m.default.Content.SalePrice;
});

export const DynamicCard = DynamicBase as typeof Card;
