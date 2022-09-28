import React from 'react'
import { UserData, SearchData, SearchResult } from '../utils/interface';
import SmallMediaDisplay from './SmallMediaDisplay';
import styles from './UserHome.module.css'
import Result from './Result';
const apiKey = process.env.KEY;
interface UserHomeProps{
  addMovie: (id: number, title: string, description:string, backdropPath:string) => void
  removeMovie: (id: number) => void;
  addShow: (id: number, title: string, description:string, backdropPath:string) => void
  removeShow: (id: number) => void;
  user: UserData
}



const UserHome=({removeMovie, removeShow, user, addMovie, addShow}:UserHomeProps)=> {
  const [seriesTrendData, setSeriesTrendData] = React.useState<SearchData | null>(null)
  const [moviesTrendData, setMoviesTrendData] = React.useState<SearchData | null>(null)

  React.useEffect(()=>{
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

  const smallMovieArray = user.movies.map(movie=>{
    const SmallMediaDisplayProps = {
      title: movie.title !== undefined ? movie.title : '',
      backdropPath: movie.backdropPath !== undefined ? movie.backdropPath : '',
      id: movie.id !== undefined ? movie.id : 0,
      key: movie.id !== undefined ? movie.id : 0,
      removeMovie: removeMovie,
    }
    return(
      <SmallMediaDisplay {...SmallMediaDisplayProps}/>
    )
  })
  const smallSeriesArray = user.shows.map(series=>{
    const SmallMediaDisplayProps = {
      title: series.title !== undefined ? series.title : '',
      backdropPath: series.backdropPath !== undefined ? series.backdropPath : '',
      id: series.id !== undefined ? series.id : 0,
      key: series.id !== undefined ? series.id : 0,
      removeShow: removeShow
    }
    return(
      <SmallMediaDisplay {...SmallMediaDisplayProps}/>
    )
  })

  const ResultProps = {
    addMovie: addMovie,
    removeMovie: removeMovie,
    addShow: addShow,
    removeShow: removeShow,
    user: user
  }
  interface ResultPropTypes{
    addMovie: (id: number, title: string, description:string, backdropPath:string) => void
    removeMovie: (id: number) => void;
    addShow: (id: number, title: string, description:string, backdropPath:string) => void
    removeShow: (id: number) => void;
    user: UserData
  }

function trendingSeriesSearch(ResultProps: ResultPropTypes){
    let trendingSeriesDisplay: JSX.Element[] | JSX.Element = []
    if(seriesTrendData !== null){
      trendingSeriesDisplay = seriesTrendData.results.map((result:SearchResult)=>{
      return(
        <Result data={result} {...ResultProps} />
      )
      })}
    return trendingSeriesDisplay
    }
const trendingSeriesDisplay = trendingSeriesSearch(ResultProps)

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
const trendingMoviesDisplay = trendingMoviesSearch(ResultProps)

  

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
      <aside className={styles.sidebarContainer}>
        <h3>Your List</h3>
        {smallSeriesArray}
        {smallMovieArray}
      </aside>
    </div>
  )
}
export default UserHome