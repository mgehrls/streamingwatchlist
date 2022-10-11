import React, { Dispatch, SetStateAction } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type {SearchData} from "../utils/interface"
import styles from './Header.module.css'
const apiKey = process.env.KEY;
interface HeaderProps{
    setSearchData: Dispatch<SetStateAction<SearchData | null>>;
    setDisplay: Dispatch<SetStateAction<string>>;
}
  
const Header = ({setSearchData, setDisplay}: HeaderProps) => {

    function search(){
        runSearch("multi", (document.getElementById("searchinput") as HTMLInputElement).value)
    }

    const runSearch:(type:string, searchItem:string) => Promise<SearchData | undefined> = async function(type, searchItem){
        setDisplay("searching")
        let url = ""

        if(type === "movie"){
        url = `https://api.themoviedb.org/3/search/movie?${apiKey}&language=en-US&query=${searchItem}&page=1&include_adult=false`
        }else if(type === "tv"){
        url = `https://api.themoviedb.org/3/search/tv?${apiKey}&language=en-US&page=1&query=${searchItem}&include_adult=false`
        }else{
        url = `https://api.themoviedb.org/3/search/multi?${apiKey}&language=en-US&query=${searchItem}&page=1&include_adult=false`
        }

        if(searchItem){
            searchItem = encodeURI(searchItem)
            fetch(url)
                .then(res=> res.json())
                .then((data) => {
                    if(data !== undefined){
                        setSearchData(data)
                        setDisplay("search")
                    }
                })
                .catch((err) => {throw new Error(err)})
            }else{
                setDisplay("home")
                console.error("Nothing in search bar. Search for something.")
                return undefined
            }
    }

    return (
        <header className={styles.header}>
            <div className={styles.headerTop}>
                <div className={styles.titleContainer}>
                    <a className={styles.titleLink} href='/'>
                        <h1 className={styles.pageTitle}>StreamSave</h1>
                    </a>
                </div>
                <form 
                    onSubmit={(e)=>{
                        e.preventDefault()
                        search()
                    }} 
                    className={styles.searchbar}>
                    <FontAwesomeIcon 
                        icon={faMagnifyingGlass} 
                        className={styles.searchicon} 
                        onClick={() => { search() }}/>
                    <input 
                        id={"searchinput"}
                        className={styles.searchinput}
                        type="text" 
                        placeholder={"Search StreamSave..."}/>
                    <button className={styles.searchBtn} onClick={()=> search()}>Search</button>
                </form>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li>Series</li>
                    <li>Movies</li>
                    <li>Account</li>
                </ul>
            </nav>
           
        </header>
 )}

export default Header