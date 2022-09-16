import React, { Dispatch, SetStateAction } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type {SearchData} from "../utils/interface"
import styles from './Header.module.css'
const apiKey = "api_key=4cc551bdbec360295f6123a443e43bb9"
interface HeaderProps{
    setSearching: Dispatch<SetStateAction<boolean>>;
    setSearchData: Dispatch<SetStateAction<SearchData | null>>;
}
  
const Header = ({setSearching, setSearchData}: HeaderProps) => {

    function search(){
        runSearch("multi", (document.getElementById("searchinput") as HTMLInputElement).value)
    }

    const runSearch:(type:string, searchItem:string) => Promise<SearchData | undefined> = async function(type, searchItem){
        setSearching(true)
        let url = ""

        if(type === "movie"){
        url = `https://api.themoviedb.org/3/search/movie?${apiKey}&language=en-US&query=${searchItem}&page=1&include_adult=false`
        }else if(type === "tv"){
        url = `https://api.themoviedb.org/3/search/tv?${apiKey}&language=en-US&page=1&query=${searchItem}&include_adult=false`
        }else{
        url = `https://api.themoviedb.org/3/search/multi?${apiKey}&language=en-US&query=${searchItem}&page=1&include_adult=false`
        }

        if(searchItem){
            console.log("run search ran. Here's what it searched: " + searchItem)
            searchItem = encodeURI(searchItem)
            fetch(url)
                .then(res=> res.json())
                .then((data) => {
                    if(data !== undefined){
                        setSearchData(data)
                        setSearching(false)
                    }
                })
                .catch((err) => console.log(err))
                .finally(()=>{
                    console.log("search complete, should have results")
                })
            }else{
                setSearching(false)
                console.error("Nothing in search bar. Try again.")
            return undefined
            }
    }

    return (
    <div className={styles.headercontainer}>
        <header className={styles.header}>
            <a className={styles.titleContainer} href='/'>
                <div>
                    <h1 className={styles.pageTitle}>Streaming Watchlist</h1>
                    <p className={styles.pageSubtitle}>data and images courtesy of tmdb.org</p>
                </div>
            </a>
    
        </header>
        <form 
            onSubmit={(e)=>{
                e.preventDefault()
                search()
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
                onClick={() => { search() }}/>
        </form>
    </div>
 )}

export default Header