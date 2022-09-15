import React from 'react'
import type { SearchResult } from '../utils/interface'

interface MovieDisplayProps{
    data: SearchResult;
}

const MovieDisplay = ({data}: MovieDisplayProps) => {
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
    <div className='media-con'>
        <div className="poster-con">
            <img src={`https://image.tmdb.org/t/p/w342/${data.poster_path}`} alt="movie poster"/>
        </div>
        <div className="info-con">
            <div className="infotop">
                <h2 className="media-title">{data.title}</h2>
                <p className='rating'>⭐{data.vote_average}</p>
            </div>
            <div className='infobottom'>
                <p className="description">{description}</p>
            </div>
        </div>
    </div>
  )
}

export default MovieDisplay