import React, { Dispatch, SetStateAction } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type {SearchData} from "../utils/interface"
import styles from './Header.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
const apiKey = process.env.KEY;
  
const Header = () => {
    const router = useRouter()
    function search(){
        const searchItem = encodeURI((document.getElementById("searchinput") as HTMLInputElement).value)
        if(searchItem){
            router.push(`/search/${searchItem}`)
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
                    <Link href={"/series"}><li>Series</li></Link>
                    <li>Movies</li>
                    <li>Account</li>
                </ul>
            </nav>
           
        </header>
 )}

export default Header