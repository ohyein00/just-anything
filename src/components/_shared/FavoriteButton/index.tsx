"use client";

import { MouseEvent, useState, useEffect, useCallback, startTransition } from "react";
import favoriteOn from "@/assets/icon/favorite-on.png";
import favoriteOff from "@/assets/icon/favorite-off.png";
import styles from "./index.module.scss";

interface FavoriteProps {
  id: string;
  defaultChecked?: boolean;
}
const localStorageKey = "product-favorite-id-list";
export default function FavoriteButton({ id }: FavoriteProps) {
  const [isChecked, setIsChecked] = useState<boolean>();

  const checkImgSrc = (): string => {
    return isChecked ? favoriteOn.src : favoriteOff.src;
  };

  const onClickEvent = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (typeof window === "undefined") return;

      const stored = localStorage.getItem(localStorageKey);
      const list: string[] = stored ? (JSON.parse(stored) as string[]) : [];
      const setObjList = new Set(list);

      setIsChecked(prev => {
        const curChecked = !prev;
        if (!curChecked) {
          setObjList.delete(id);
        } else {
          setObjList.add(id);
        }
        localStorage.setItem(localStorageKey, JSON.stringify([...setObjList]));
        return curChecked;
      });
      event.stopPropagation();
    },
    [id]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem(localStorageKey);
      const list = raw ? (JSON.parse(raw) as string[]) : [];
      const next = list.includes(id);
      startTransition(() => setIsChecked(next));
    }
  }, [id]);

  return (
    <button
      onClick={onClickEvent}
      className={styles.favoriteButton}
      style={{
        backgroundImage: `url(${checkImgSrc()})`,
      }}
    />
  );
}
