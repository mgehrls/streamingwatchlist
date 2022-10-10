import styles from './UserHome.module.css'
import useHover from '../utils/useHover'
import Image from "next/image"

interface SmallDisplayProps{
    removeMovie?: (id: number) => void;
    removeShow?: (id: number) => void;
    title:string;
    backdropPath?:string;
    posterPath?:string;
    id:number;
}

const SmallMediaDisplay = ({title, backdropPath, posterPath, removeMovie, removeShow, id}: SmallDisplayProps)=>{
    const [hoverRef, isHovered] = useHover()
    let removeMedia:(id:number)=> void;

    if(removeMovie !== undefined){
        removeMedia = removeMovie
    }else if(removeShow !== undefined){
        removeMedia = removeShow
    }else{
        throw Error("Something went wrong. smallMediaDisplay type unclear")
    }

    if(posterPath !== undefined){
        return (
            <div ref={hoverRef} className={styles.listItemContainer}>
                <div className={styles.listItemDisplay}>
                    <Image
                        className={styles.listItemPoster}
                        src={posterPath}
                        alt="poster"
                        width={100}
                        height={150}/>
                    <div className={styles.listItemInfoContainer}>
                        <p className={styles.listItemRank}>{"-"}</p>
                        <h3 className={styles.listItemTitle}>{title}</h3>
                        <p className={styles.listItemLastSeen}>last seen</p>
                        <p className={styles.listItemTags}>tags</p>
                    </div>
                </div>
                <div className={styles.listItemOptionsContainer}>
                    <p>edit</p>
                    <p onClick={()=> removeMedia(id)}>remove</p>
                </div>
            </div>
    )}else{
        return(
            <div ref={hoverRef} style={{backgroundColor: "pink" }} className={styles.listItem}>
            <h3 className={styles.listItemTitle}>{posterPath}</h3>
        </div>
        )
    }
}
    

export default SmallMediaDisplay