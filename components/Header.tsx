import React from 'react'
import styles from './Header.module.css'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
const apiKey = "api_key=4cc551bdbec360295f6123a443e43bb9"

interface HeaderProps{
    search: (type:string, searchItem:string)=> Promise<false | undefined>
}

export default function Header({search}: HeaderProps) {
  return (
    <>
    <header className={styles.header}>
        <a className={styles.titleContainer} href='/'>
            <div>
                <h1 className={styles.pageTitle}>Streaming Watchlist</h1>
                <p className={styles.pageSubtitle}>data and images courtesy of tmdb.org</p>
            </div>
        </a>
        <nav>
            <a href="/movies">Movies</a>
            <a href="/tv">TV</a>
        </nav>
    </header>
        <form 
            onSubmit={(e)=>{
                e.preventDefault()
                //setSearching(true)
                search("multi", (document.getElementById("searchinput") as HTMLInputElement).value)
            }} 
            className={styles.searchbar}>
            <input 
                id={"searchinput"}
                className={styles.searchinput}
                type="text" 
                placeholder={"test placeholder"}/>
            <FontAwesomeIcon 
                icon={faMagnifyingGlass} 
                className={styles.searchicon} 
                onClick={() => search("multi", (document.getElementById("searchinput") as HTMLInputElement).value)}/>
        </form>
        </>
  )
}
