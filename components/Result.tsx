import React from 'react'
import MovieDisplay from './MovieDisplay'
import TvDisplay from './TvDisplay'
import type { SearchResult } from "../utils/interface"

interface ResultProps{
    data: SearchResult;
}

const Result = ({data}: ResultProps) =>{
    switch(data.media_type){
        case('movie'):
            return <MovieDisplay data={data} />
        case("tv"):
            return <TvDisplay data={data}/>
        default:
            return (     
                <div className='media-con'>           
                    <div className="poster-con">
                        <img src={`https://image.tmdb.org/t/p/w342${data.profile_path}`} alt={`${data.name} headshot`} />
                    </div>
                    <div className="info-con">
                        <h2 className="media-title">{data.name}</h2>
                        <p className='role'>Actor</p>
                    </div>
                </div> 
            )
    }
}

export default Result