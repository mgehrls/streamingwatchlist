import React from 'react'
import type { SearchResult, UserData, ShowData, MovieData } from "../utils/interface"
import { faTriangleExclamation} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import styles from './Result.module.css'
import { url } from 'inspector'
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
    let btnsection: JSX.Element
    
    //setting up variables based on media type so result page works out regardless of type.
    switch(data.media_type){
        case('movie'):
            if(data.title !== undefined){
                title = data.title
            }
            if(data.backdrop_path !== undefined){
                backdropPath = "https://image.tmdb.org/t/p/w342/" + data.backdrop_path
            }
            if(user.movies.find(movie => movie.id === data.id)){
                btnsection = 
                <button onClick={() => removeMovie(data.id)} >{"Remove from Wishlist"}</button>
            }else{
                btnsection=
                <button onClick={() => addMovie(data.id, title, description, backdropPath)} >{"Add to Wishlist"}</button>
            }

            if(data.overview !== undefined && data.overview.length > 150){
                description = data.overview.slice(0, 150) + "..."
                } else if(data.overview !== undefined){
                    description = data.overview
                    }else{
                        description = "Movie Description Not Found"
            }

            infoSection = (
            <>
                <p className={styles.rating}>⭐{data.vote_average}</p>
                {btnsection}
                <h2 className={styles.mediaTitle}>{title}</h2>
            </>)
            break
        case("tv"):

            if(data.name !== undefined) title = data.name
            if(data.backdrop_path !== undefined) backdropPath = "https://image.tmdb.org/t/p/w342/" + data.backdrop_path
            if(user.shows.find(show => show.id === data.id)){
                btnsection = 
                <button onClick={() => removeShow(data.id)} >{"Remove from Wishlist"}</button>
            }else{
                btnsection=
                <button onClick={() => addShow(data.id, title, description, backdropPath)} >{"Add to Wishlist"}</button>
            }

            if(data.overview !== undefined && data.overview.length > 150){
                description = data.overview.slice(0, 150) + "..."
                }else if(data.overview !== undefined){
                    description = data.overview
                    }else{
                        description = "Movie Description Not Found"
            }

            infoSection = (
                <div className={styles.infoCon}>
                <div>
                    <h2 className={styles.mediaTitle}>{title}</h2>
                    <p className={styles.rating}>⭐{data.vote_average}</p>
                </div>
                <div className={styles.btnCon}>
                    {btnsection}
                </div>
                </div>
                )
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

            infoSection = <h2 className={styles.mediaTitle}>{title}</h2>

            break
    }
    if(data.media_type === "person"){
        return <></>
    }else{
        return(
            <div className={styles.mediaContainer} style={{background: `url(${backdropPath}) no-repeat`, }}>
                {infoSection}
            </div>
        )
    }}

export default Result