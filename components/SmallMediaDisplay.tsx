import styles from './UserHome.module.css'
import useHover from '../utils/useHover'
import Image from "next/image"
import React, { useState } from 'react';

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
    const [hide, setHide] = useState(true)
    let removeMedia:(id:number)=> void;
    let placeholderDate
    let dateDisplay
    

    if(removeMovie !== undefined){
        removeMedia = removeMovie
    }else if(removeShow !== undefined){
        removeMedia = removeShow
    }else{
        throw Error("Something went wrong. smallMediaDisplay type unclear")
    }

    if(placeholderDate){
        dateDisplay = <input className={styles.listItemLastSeen} value={placeholderDate} type={"date"}/>
    }else if(hide){
        dateDisplay = <p className={styles.listItemLastSeenFacade} onClick={() => setHide(!hide)}>last watched?</p>
    }else{
        dateDisplay = <input className={styles.listItemLastSeen} value={placeholderDate} autoFocus type={"date"}/>
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
                        <div className={styles.listItemLastSeenContainer}>
                            {dateDisplay}
                        </div>
                        <p className={styles.listItemRemove} onClick={()=> removeMedia(id)}>X</p>
                    </div>
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