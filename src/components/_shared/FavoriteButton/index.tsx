'use client'

import { MouseEvent, useState, useEffect, useCallback } from "react";
import favoriteOn from "@/assets/icon/favorite-on.png";
import favoriteOff from "@/assets/icon/favorite-off.png";
import styles from "./index.module.scss"

interface FavoriteProps{
    id:string;
    defaultChecked?:boolean;
}
export default function FavoriteButton({id,defaultChecked=false}:FavoriteProps){
    const [checked,setChecked] =useState<boolean>(defaultChecked)
    const localStorageKey = 'product-favorite-id-list'

    const onClickEvent = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        if (typeof window === "undefined") return;

        const stored = localStorage.getItem(localStorageKey);
        const list: string[] = stored ? JSON.parse(stored) as string[] : [];
        const setObjList = new Set(list)
        
        setChecked(prev => {
            const curChecked = !prev;
            if(!curChecked){
                setObjList.delete(id)
            }else{
                setObjList.add(id)
            }
            localStorage.setItem(localStorageKey, JSON.stringify([...setObjList]))
            return curChecked;
        });
    }, [id])

    //최초 셋팅
    useEffect(() => {
        if (typeof window === "undefined") return;
        const stored = localStorage.getItem(localStorageKey);
        if(!stored) return
        const favoriteList = JSON.parse(stored) as string[]
        if(favoriteList.indexOf(id)>-1){
            setChecked(true)
        }
      }, []);

    return(
        <button 
            onClick={onClickEvent} 
            className={styles.favoriteButton}
            style={{
                backgroundImage: `url(${checked ? favoriteOn.src : favoriteOff.src})`
            }}
        />
    )
}