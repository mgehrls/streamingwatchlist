import React, { useEffect } from 'react'
import { ResultPropTypes, SearchData, SearchResult, UserData } from '../utils/interface'
import Result from './Result'
import styles from './TrendingHero.module.css'
const apiKey = process.env.KEY;

interface TrendHeroPropTypes{
    addMovie: (id: number, title: string, description:string, backdropPath:string, posterPath:string) => void;
    removeMovie: (id: number) => void;
    addShow: (id: number, title: string, description:string, backdropPath:string, posterPath:string) => void;
    removeShow: (id: number) => void;
    user: UserData;
}

export default function TrendingHero({addMovie, addShow, removeMovie, removeShow, user}: TrendHeroPropTypes) {
    const [seriesTrendData, setSeriesTrendData] = React.useState<SearchData | null>(null)
    const [moviesTrendData, setMoviesTrendData] = React.useState<SearchData | null>(null)
    const ResultProps = {
      addMovie: addMovie,
      removeMovie: removeMovie,
      addShow: addShow,
      removeShow: removeShow,
      user: user
    }
    const trendingSeriesDisplay = trendingSeriesSearch(ResultProps)
    const trendingMoviesDisplay = trendingMoviesSearch(ResultProps)
    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/trending/tv/day?${apiKey}`)
            .then(res=> res.json())
            .then((data) => {
                if(data !== undefined){
                  setSeriesTrendData(data)
                }
            })
            .catch((err) => console.log(err))
            .finally(()=>{
                
            })
        fetch(`https://api.themoviedb.org/3/trending/movie/day?${apiKey}`)
        .then(res=> res.json())
        .then((data) => {
            if(data !== undefined){
              setMoviesTrendData(data)
            }
        })
        .catch((err) => console.log(err))
        .finally(()=>{
            
        })
      }, [])
    
    /* generating trending data results */
    function trendingSeriesSearch(ResultProps: ResultPropTypes){
        let trendingSeriesDisplay: JSX.Element[] | JSX.Element = []
        if(seriesTrendData !== null){
          trendingSeriesDisplay = seriesTrendData.results.map((result:SearchResult)=>{
          return(
            <Result key={result.id} data={result} {...ResultProps} />
          )
          })}
        return trendingSeriesDisplay
        }
    function trendingMoviesSearch(ResultProps: ResultPropTypes){
        let trendingMoviesDisplay: JSX.Element[] | JSX.Element = []
        if(moviesTrendData !== null){
          trendingMoviesDisplay = moviesTrendData.results.map((result:SearchResult)=>{
          return(
            <Result data={result} {...ResultProps} />
          )
          })}
        return trendingMoviesDisplay
        }

  return (
    <main className={styles.main}>
        <h2 className={styles.sectionTitle}>Trending Series</h2>
        <div className={styles.trendingSeriesContainer}>
            {trendingSeriesDisplay}
        </div>
        <h2 className={styles.sectionTitle}>Trending Movies</h2>
        <div className={styles.trendingMoviesContainer}>
            {trendingMoviesDisplay}
        </div>
    </main>
  )
}
