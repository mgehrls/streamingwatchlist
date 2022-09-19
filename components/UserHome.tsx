import React from 'react'
import { UserData } from '../utils/interface';
import styles from './UserHome.module.css'

interface UserHomeProps{
    removeMovie: (id: number) => void;
    removeShow: (id: number) => void;
    user: UserData
}

const UserHome=({removeMovie, removeShow, user}:UserHomeProps)=> {

  return (
    <div className={styles.homeContainer}>
        <h1>Welcome Back!</h1>
        <div className={styles.listsContainer}>
            <div className={styles.list}>Movies</div>
            <div className={styles.list}>Shows</div>
        </div>
    </div>
  )
}
export default UserHome