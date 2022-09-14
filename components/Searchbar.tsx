import React from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Searchbar.module.css'
import axios from 'axios'
const apiKey = "api_key=4cc551bdbec360295f6123a443e43bb9"

export default function Searchbar(props: {}) {
    console.log(props)


  return (
    <form onSubmit={(e)=>{
        e.preventDefault()
        //setSearching(true)
        props.runSearch("multi")
    }} className={styles.searchbar}>
        <input 
            id={"searchinput"}
            className={styles.searchinput}
            type="text" 
            placeholder={"test placeholder"}/>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.searchicon} onClick={() => runSearch("multi")}/>
    </form>
  )
}
