'use client'

import { ShortcutResponse } from "@/app/api/shortcut/route.type";
import styles from "./index.module.scss"

interface ShortcutCategoryProps {
  shortcutData: ShortcutResponse | null
}

export default function ShortcutCategory({ shortcutData }: ShortcutCategoryProps) {

  
  const onClick = ()=>{
    alert('숏컷 상세 페이지 이동')
  }
  return (
    shortcutData && <div>
      <hr className="divider"/>
      <div className={styles.titleBox}>
      <p className="title-2">어떤 선물을 하나요?</p>
      </div>
      <div className={styles.shortcutContainer}>
      {shortcutData?.items.map(item => (
        //얼랏으로 대체
        <button onClick={onClick} key={item.label}>
          <div className={styles.box}>
            <img src={item.imageUrl} alt={item.label} />
            <p>{item.label}</p>
          </div>
        </button>
      ))}
      </div>
      <hr className="divider"/>
    </div>
  );
}
