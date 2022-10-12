import React, { useEffect } from 'react'
import { UserData, SearchData, SearchResult, ResultPropTypes } from '../utils/interface';
import styles from './UserHome.module.css'
import Result from './Result';
import SidebarList from './SidebarList';
const apiKey = process.env.KEY;
interface UserHomeProps{
  addMovie: (id: number, title: string, description:string, backdropPath:string, posterPath:string) => void;
  removeMovie: (id: number) => void;
  addShow: (id: number, title: string, description:string, backdropPath:string, posterPath:string) => void;
  removeShow: (id: number) => void;
  user: UserData;
  updateMovieDate: (id:number, lastSeen: string) => void;
  updateShowDate: (id:number, lastSeen: string) => void;
}

const UserHome=({removeMovie, removeShow, user, addMovie, addShow, updateMovieDate, updateShowDate}:UserHomeProps)=> {
  const [seriesTrendData, setSeriesTrendData] = React.useState<SearchData | null>(null)
  const [moviesTrendData, setMoviesTrendData] = React.useState<SearchData | null>(null)
  const ResultProps = {
    addMovie: addMovie,
    removeMovie: removeMovie,
    addShow: addShow,
    removeShow: removeShow,
    user: user
  }
  const SidebarListProps = {
    removeMovie: removeMovie,
    removeShow: removeShow,
    user: user,
    updateMovieDate: updateMovieDate,
    updateShowDate: updateShowDate,
  }
  const trendingSeriesDisplay = trendingSeriesSearch(ResultProps)
  const trendingMoviesDisplay = trendingMoviesSearch(ResultProps)

  //get trending data on load
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
      <div className={styles.homeContainer}>
  
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

      {user.shows.length || user.movies.length ? <SidebarList {...SidebarListProps} /> : ""}
  
      </div>
    )
}

export async function getStaticProps() {
  const res1 = await fetch(`https://api.themoviedb.org/3/trending/movie/day?${apiKey}`)
  const movieTrendDataFromProps = await res1.json()
  const res2 = await fetch(`https://api.themoviedb.org/3/trending/tv/day?${apiKey}`)
  const seriesTrendDataFromProps = await res2.json()

  return {
    props: {
      movieTrendDataFromProps,
      seriesTrendDataFromProps,
    },
  }
}


export default UserHome