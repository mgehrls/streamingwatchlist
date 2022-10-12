import React from 'react'
import { UserData } from '../utils/interface';
import SmallMediaDisplay from './SmallMediaDisplay'
import styles from './UserHome.module.css'

interface SidebarProps{
  removeMovie: (id: number) => void;
  removeShow: (id: number) => void;
  user: UserData;
  updateMovieDate: (id:number, lastSeen: string) => void;
  updateShowDate: (id:number, lastSeen: string) => void;

}

export default function SidebarList({removeMovie,removeShow, user, updateMovieDate, updateShowDate}:SidebarProps) {
    /* User List generation */
    const smallMovieArray = user.movies.map(movie=>{
      const SmallMediaDisplayProps = {
        title: movie.title !== undefined ? movie.title : '',
        backdropPath: movie.backdropPath !== undefined ? movie.backdropPath : '',
        posterPath: movie.posterPath !== undefined ? movie.posterPath : '',
        id: movie.id !== undefined ? movie.id : 0,
        key: movie.id !== undefined ? movie.id : 0,
        lastSeen: movie.lastSeen !== undefined ? movie.lastSeen : undefined,
        removeMovie: removeMovie,
        updateMovieDate: updateMovieDate
      }
      return(
        <SmallMediaDisplay {...SmallMediaDisplayProps}/>
      )
    })
  
    const smallSeriesArray = user.shows.map(series=>{
      const SmallMediaDisplayProps = {
        title: series.title !== undefined ? series.title : '',
        backdropPath: series.backdropPath !== undefined ? series.backdropPath : '',
        posterPath: series.posterPath !== undefined ? series.posterPath : '',
        id: series.id !== undefined ? series.id : 0,
        key: series.id !== undefined ? series.id : 0,
        lastSeen: series.lastSeen !== undefined ? series.lastSeen : undefined,
        removeShow: removeShow,
        updateShowDate: updateShowDate
      }
      return(
        <SmallMediaDisplay {...SmallMediaDisplayProps}/>
      )
    })

  return (
    <aside className={styles.sidebarContainer}>
    <h3>Your List</h3>
    <div className={styles.sidebarSeriesContainer}>
      {smallSeriesArray}
    </div>
    <div className={styles.sidebarSeriesContainer}>
      {smallMovieArray}
    </div>
  </aside>
  )
}
