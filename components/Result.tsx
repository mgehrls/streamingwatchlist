import React, { Dispatch, SetStateAction } from 'react'
import type { SearchResult, UserData } from "../utils/interface"
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import styles from './Result.module.css'
interface ResultProps{
    data: SearchResult;
    setUser: Dispatch<SetStateAction<UserData | null>>;
    user: UserData | null;
}

const Result = ({data}: ResultProps) =>{
    switch(data.media_type){
        case('movie'):
        let movieDescription = ""
        if(data.overview !== undefined && data.overview.length > 150){
            movieDescription = data.overview.slice(0, 150) + "..."
        }
       else if(data.overview !== undefined){
            movieDescription = data.overview
        }else{
            movieDescription = "Movie Description Not Found"
        }
    
      return (
        <div className={styles.mediaCon}>
            <div className={styles.pictureCon}>
               {data.poster_path !== null ? 
               <img 
                    src={`https://image.tmdb.org/t/p/w342/${data.poster_path}`} 
                    alt="movie poster"/> :
                    <div className={styles.missingPosterCon}> 
                        <FontAwesomeIcon 
                            icon={faTriangleExclamation} 
                            className={styles.missingPoster} />
                        <p className={styles.missingPosterText}>picture missing...</p>
                    </div>} 
            </div>
            <div className={styles.infoCon}>
                <h2 className={styles.mediaTitle}>{data.title}</h2>
                <p className={styles.rating}>⭐{data.vote_average}</p>
                <p className={styles.description}>{movieDescription}</p>
            </div>
        </div>
      )
        case("tv"):
            let description = ""
            if(data.overview !== undefined && data.overview.length > 150){
                description = data.overview.slice(0, 150) + "..."
            }
        else if(data.overview !== undefined){
                description = data.overview
            }else{
                description = "Movie Description Not Found"
            }
        
            return (
                <div className={styles.mediaCon}>
                    <div className={styles.pictureCon}>
                        {data.poster_path !== null ? 
                        <img 
                            src={`https://image.tmdb.org/t/p/w342/${data.poster_path}`} 
                            alt="movie poster"/> :
                            <div className={styles.missingPosterCon}> 
                                <FontAwesomeIcon 
                                    icon={faTriangleExclamation} 
                                    className={styles.missingPoster} />
                                <p className={styles.missingPosterText}>picture missing...</p>
                            </div>} 
                    </div>
                    <div className={styles.infoCon}>
                            <h2 className={styles.mediaTitle}>{data.name}</h2>
                            <p className={styles.rating}>⭐{data.vote_average}</p>
                            <p className={styles.description}>{description}</p>
                    </div>
                </div>
            )
        default:
            return (     
                <div className={styles.mediaCon}>
                    <div className={styles.pictureCon}>
                        {data.profile_path !== null ? 
                        <img 
                            src={`https://image.tmdb.org/t/p/w342${data.profile_path}`} 
                            alt="movie poster"/> :
                        <div className={styles.missingPosterCon}> 
                            <FontAwesomeIcon 
                                icon={faTriangleExclamation} 
                                className={styles.missingPoster} />
                            <p className={styles.missingPosterText}>picture missing...</p>
                        </div>} 
                    </div>          
                    <div className={styles.infoCon}>
                        <h2 className={styles.mediaTitle}>{data.name}</h2>
                        <p className={styles.role}>Actor</p>
                    </div>
                </div> 
            )
    }
}

export default Result