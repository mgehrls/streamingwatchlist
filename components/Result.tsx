import React from 'react'
import type { SearchResult, UserData, ShowData, MovieData } from "../utils/interface"
import { faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import styles from './Result.module.css'
import useHover from '../utils/useHover'

interface ResultProps{
    data: SearchResult;
    addMovie: (id: number, title: string, description:string, backdropPath:string) => void;
    removeMovie: (id: number) => void;
    addShow: (id: number, title: string, description:string, backdropPath:string) => void;
    removeShow: (id: number) => void;
    user: UserData;
}

const Result = ({data, addMovie, user, removeMovie, addShow, removeShow}: ResultProps) =>{
    let description:string = ""
    let title:string = ""
    let backdropPath:string = ""
    let infoSection: JSX.Element
    let btnsection: JSX.Element = <></>

    const [hoverRef, isHovered] = useHover()
    
    //setting up variables based on media type so result page works out regardless of type.
    switch(data.media_type){
        case('movie'):
            data.title !== undefined ? title = data.title : undefined
            data.backdrop_path !== undefined ? backdropPath =  "https://image.tmdb.org/t/p/w342/" + data.backdrop_path : undefined
            btnsection = user.movies.find(movie => movie.id === data.id) ?
                <div
                    className={styles.removeBtn}
                    onClick={() => 
                        removeMovie(data.id)} >
                    
                    <FontAwesomeIcon icon={faMinus} width={20}/>
                </div>
                :
                <div
                    className={styles.addBtn}
                    onClick={() => 
                        addMovie(data.id, title, description, backdropPath)} >
                    <FontAwesomeIcon icon={faPlus} width={20}/>
                </div>

            if(data.overview !== undefined && data.overview.length > 130){
                description = data.overview.slice(0, 130) + "..."
                } else if(data.overview !== undefined){
                    description = data.overview
                    }else{
                        description = "Movie Description Not Found"
            }
            break
        case("tv"):
            data.name !== undefined ? title = data.name : undefined
            data.backdrop_path !== undefined ? backdropPath =  "https://image.tmdb.org/t/p/w342/" + data.backdrop_path : undefined
            btnsection = user.shows.find(show => show.id === data.id) ?
            <div
                className={styles.removeBtn}
                onClick={() => 
                    removeShow(data.id)} >
                
                <FontAwesomeIcon icon={faMinus} width={20}/>
            </div>
            :
            <div
                className={styles.addBtn}
                onClick={() => 
                    addShow(data.id, title, description, backdropPath)} >
                <FontAwesomeIcon icon={faPlus} width={20}/>
            </div>

            if(data.overview !== undefined && data.overview.length > 150){
                description = data.overview.slice(0, 150) + "..."
                }else if(data.overview !== undefined){
                    description = data.overview
                    }else{
                        description = "Movie Description Not Found"
            }
            break
        default:
            if(data.name !== undefined) title = data.name
            if(data.profile_path !== undefined) backdropPath = data.profile_path
            
            if(data.overview !== undefined && data.overview.length > 150){
                description = data.overview.slice(0, 150) + "..."
                }else if(data.overview !== undefined){
                    description = data.overview
                    }else{
                        description = "Movie Description Not Found"
            }
            break
    }

    infoSection =(
        <div className={isHovered ? styles.infoConHovered : styles.infoCon}>
            <div className={isHovered ? styles.infoDetailsHovered : styles.infoDetails}>
                <div className={styles.infoTop}>
                    <p className={styles.rating}>⭐{data.vote_average}</p>
                    {btnsection}
                </div>
                <p className={styles.description}>{description}</p>
            </div>
            <h2 className={styles.mediaTitle}>{title}</h2>
        </div>
        )

    if(data.media_type === "person"){
        return <></>
    }else{
        return(
            <div ref={hoverRef} className={styles.mediaContainer} >
                <div style={{background:`url(${backdropPath}) no-repeat`, }}>
                    {infoSection}
                </div>
            </div>
        )
    }}

export default Result