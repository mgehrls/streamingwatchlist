import React from 'react'
import { UserData } from '../utils/interface';
import SmallMediaDisplay from './SmallMediaDisplay';
import styles from './UserHome.module.css'

interface UserHomeProps{
    removeMovie: (id: number) => void;
    removeShow: (id: number) => void;
    user: UserData
}


const UserHome=({removeMovie, removeShow, user}:UserHomeProps)=> {

  const smallMovieArray = user.movies.map(movie=>{
    const SmallMediaDisplayProps = {
      title: movie.title !== undefined ? movie.title : '',
      posterPath: movie.posterPath !== undefined ? movie.posterPath : '',
      id: movie.id !== undefined ? movie.id : 0,
      removeMovie: removeMovie,
    }
    return(
      <SmallMediaDisplay {...SmallMediaDisplayProps}/>
    )
  })
  const smallSeriesArray = user.shows.map(series=>{
    const SmallMediaDisplayProps = {
      title: series.title !== undefined ? series.title : '',
      posterPath: series.posterPath !== undefined ? series.posterPath : '',
      id: series.id !== undefined ? series.id : 0,
      removeShow: removeShow
    }
    return(
      <SmallMediaDisplay {...SmallMediaDisplayProps}/>
    )
  })

  const MovieDisplay = smallMovieArray.slice(0,10)
  const SeriesDisplay = smallSeriesArray.slice(0,10)

  return (
    <div className={styles.homeContainer}>
        <h1>Welcome Back!</h1>
        <div className={styles.listsContainer}>
            <div className={styles.listContainer}>
              <h2>Movies</h2>
              <div className={styles.list}>
                {MovieDisplay}
              </div>
            </div>
            <div className={styles.listContainer}>
              <h2>Series</h2>
              <div className={styles.list}>
                  {SeriesDisplay}
              </div>
            </div>
        </div>
    </div>
  )
}
export default UserHome