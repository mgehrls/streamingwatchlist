import React from 'react'
import type { SearchResult, UserData, ShowData, MovieData } from "../utils/interface"
import { faTriangleExclamation, faHeart } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import styles from './Result.module.css'
interface ResultProps{
    data: SearchResult;
    addMovie: (id: number, title: string, description:string, posterPath:string) => void;
    removeMovie: (id: number) => void;
    addShow: (id: number, title: string, description:string, posterPath:string) => void;
    removeShow: (id: number) => void;
    user: UserData;
}

const Result = ({data, addMovie, user, removeMovie, addShow, removeShow}: ResultProps) =>{
    let description:string = ""
    let title:string = ""
    let posterPath:string = ""
    let infoSection: JSX.Element
    let btnsection: JSX.Element
    
    //setting up variables based on media type so result page works out regardless of type.
    switch(data.media_type){
        case('movie'):
            if(data.title !== undefined){
                title = data.title
            }
            if(data.poster_path !== undefined){
                posterPath = "https://image.tmdb.org/t/p/w342/" + data.poster_path
            }
            if(user.movies.find(movie => movie.id === data.id)){
                btnsection = 
                <>
                <button onClick={() => removeMovie(data.id)} >{"Remove from Wishlist"}</button>
                <FontAwesomeIcon icon={faHeart} className={styles.favoriteIcon}/>
                </>
            }else{
                btnsection=
                <>
                <button onClick={() => addMovie(data.id, title, description, posterPath)} >{"Add to Wishlist"}</button>
                <FontAwesomeIcon icon={faHeart} className={styles.favoriteIcon}/>
                </>
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
            <div>
                <h2 className={styles.mediaTitle}>{title}</h2>
                <p className={styles.rating}>⭐{data.vote_average}</p>
                <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.btnCon}>
                {btnsection}
            </div>
            </>)
            break
        case("tv"):

            if(data.name !== undefined) title = data.name
            if(data.poster_path !== undefined) posterPath = "https://image.tmdb.org/t/p/w342/" + data.poster_path
            if(user.shows.find(show => show.id === data.id)){
                btnsection = 
                <>
                <button onClick={() => removeShow(data.id)} >{"Remove from Wishlist"}</button>
                <FontAwesomeIcon icon={faHeart} className={styles.favoriteIcon}/>
                </>
            }else{
                btnsection=
                <>
                <button onClick={() => addShow(data.id, title, description, posterPath)} >{"Add to Wishlist"}</button>
                <FontAwesomeIcon icon={faHeart} className={styles.favoriteIcon}/>
                </>
            }

            if(data.overview !== undefined && data.overview.length > 150){
                description = data.overview.slice(0, 150) + "..."
                }else if(data.overview !== undefined){
                    description = data.overview
                    }else{
                        description = "Movie Description Not Found"
            }

            infoSection = (
                <>
                <div>
                    <h2 className={styles.mediaTitle}>{title}</h2>
                    <p className={styles.rating}>⭐{data.vote_average}</p>
                    <p className={styles.description}>{description}</p>
                </div>
                <div className={styles.btnCon}>
                    {btnsection}
                </div>
                </>
                )
            break
        default:
            if(data.name !== undefined) title = data.name
            if(data.profile_path !== undefined) posterPath = data.profile_path
            
            if(data.overview !== undefined && data.overview.length > 150){
                description = data.overview.slice(0, 150) + "..."
                }else if(data.overview !== undefined){
                    description = data.overview
                    }else{
                        description = "Movie Description Not Found"
            }

            infoSection = (
                <>
                    <h2 className={styles.mediaTitle}>{title}</h2>
                    <p className={styles.description}>{data.media_type}</p>
                </>)
            break
    }
    if(data.media_type === "person"){
        return <></>
    }else{
        return(
            <div className={styles.mediaCon}>
                <div className={styles.pictureCon}>
                    {data.poster_path !== null ?
                        <div className={styles.pictureConCon}>
                            <img 
                                src={posterPath} 
                                alt="poster"
                                className={styles.realPoster}/>
                                <div className={styles.missingPosterCon}>
                                    <img 
                                        src={`/blank poster.jpg`} 
                                        alt="movie poster"
                                        className={styles.missingPoster}/>
                                    <FontAwesomeIcon 
                                        icon={faTriangleExclamation} 
                                        className={styles.missingPosterIcon} />
                                    <p className={styles.missingPosterText}>picture missing...</p>
                                    
                                </div> 
                        </div> :
                            <div className={styles.missingPosterCon}>
                            <img 
                                src={`/blank poster.jpg`} 
                                alt="movie poster"
                                className={styles.missingPoster}/>
                            <FontAwesomeIcon 
                                icon={faTriangleExclamation} 
                                className={styles.missingPosterIcon} />
                            <p className={styles.missingPosterText}>picture missing...</p>
                            
                        </div> 
                        }
                </div>
                <div className={styles.infoCon}>
                    {infoSection}
                </div>
            </div>
        )
    }}

export default Result