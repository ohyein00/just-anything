'use client'

interface FavoriteProps{
    id:string;
    defaultChecked?:boolean;
}
export default function Favorite({id,defaultChecked=falseß}:FavoriteProps){
    const [checked,setChecked]=useState<boolean>(defaultChecked)
    return(
        <button onClick={()=>{}}>

        </button>
    )
}