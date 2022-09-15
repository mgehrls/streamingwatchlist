import React, { Dispatch, SetStateAction } from 'react'
import styles from './Header.module.css'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type {SearchData} from "../utils/interface"
interface HeaderProps{
    runSearch: (type:string, searchItem:string)=> Promise<SearchData | undefined>;
    setSearching: Dispatch<SetStateAction<boolean>>
}
  
const Header = ({runSearch, setSearching}: HeaderProps) => {

  return (
    <div>
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
                setSearching(true)
                runSearch("multi", (document.getElementById("searchinput") as HTMLInputElement).value)
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
                onClick={() => {
                    setSearching(true)
                    runSearch("multi", (document.getElementById("searchinput") as HTMLInputElement).value)
                    }}/>
        </form>
    </div>)
}

export default Header
