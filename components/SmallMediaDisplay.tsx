import styles from './SidebarList.module.css'
import useHover from '../utils/useHover'
import Image from "next/image"
import React, { useState } from 'react';

interface SmallDisplayProps{
    removeMovie?: (id: number) => void;
    updateMovieDate?: (id:number, lastSeen: string) => void;
    removeShow?: (id: number) => void;
    updateShowDate?: (id:number, lastSeen: string) => void;
    title:string;
    backdropPath?:string;
    posterPath?:string;
    id:number;
    lastSeen?: string | undefined;
}

const SmallMediaDisplay = ({title, backdropPath, posterPath, removeMovie, removeShow, id, updateMovieDate, updateShowDate, lastSeen}: SmallDisplayProps)=>{
    const [hoverRef, isHovered] = useHover()
    const [hide, setHide] = useState(true)
    let removeMedia:(id:number)=> void;
    let updateMedia:(id:number, lastSeen:string)=> void;
    let dateDisplay
    

    if(removeMovie !== undefined && updateMovieDate !== undefined){
        removeMedia = removeMovie
        updateMedia = updateMovieDate
    }else if(removeShow !== undefined && updateShowDate !== undefined){
        removeMedia = removeShow
        updateMedia = updateShowDate
    }else{
        throw Error("Something went wrong. smallMediaDisplay type unclear")
    }

    if(lastSeen !== undefined){
        dateDisplay = <input onChange={(e) => updateMedia(id, e.target.value)} className={styles.listItemLastSeen} value={lastSeen} type={"date"}/>
    }else if(hide){
        dateDisplay = <p className={styles.listItemLastSeenFacade} onClick={() => setHide(!hide)}>last watched?</p>
    }else{
        dateDisplay = <input onChange={(e) => updateMedia(id, e.target.value)} value={lastSeen} autoFocus className={styles.listItemLastSeen} type={"date"}/>
    }

    

    if(posterPath !== undefined){
        return (
            <div ref={hoverRef} className={styles.listItemContainer}>
                <Image
                    className={styles.listItemPoster}
                    src={posterPath}
                    alt="poster"
                    width={100}
                    height={150}/>
                <div className={styles.listItemDetails}>
                    <h3 className={styles.listItemTitle}>{title}</h3>
                    <div className={styles.listItemLastSeenContainer}>
                        {dateDisplay}
                    </div>
                    <p className={styles.listItemRemove} onClick={()=> removeMedia(id)}>remove</p>
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