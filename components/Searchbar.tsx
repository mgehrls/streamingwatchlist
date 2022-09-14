import React from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Searchbar.module.css'
import axios from 'axios'
const apiKey = "api_key=4cc551bdbec360295f6123a443e43bb9"

//needs onclick on FontAwesomeIcon
export default function Searchbar() {

    async function runSearch(type: string){
        let url = ""
        let searchItem: string = document.getElementById("searchinput") !== null ? (document.getElementById("searchinput") as HTMLInputElement).value : ""
        console.log("search ran I guess.")
        console.log(searchItem)
        //
        switch(type){
          case ("multi"):
            url = `https://api.themoviedb.org/3/search/multi?${apiKey}&language=en-US&query=${searchItem}&page=1&include_adult=false`
            
            if(searchItem){
              searchItem = encodeURI(searchItem)
              await axios.get(url)
                  .then((response) => {
                      console.log(response)
                })
                .catch((err) => console.log(err))
                .finally(()=>{
                  console.log("search complete")
                })
            }
                break
          case("movie"):
            url = `https://api.themoviedb.org/3/search/movie?${apiKey}&language=en-US&query=${searchItem}&page=1&include_adult=false`
            
            if(searchItem){
              searchItem = encodeURI(searchItem)
              await axios.get(url)
                  .then((response) => {
                      console.log(response)
                })
                .catch((err) => console.log(err))
                .finally(()=>{
                  console.log("search complete")
                })
            }
    
            break
          case("tv"):
            url = `https://api.themoviedb.org/3/search/tv?${apiKey}&language=en-US&page=1&query=${searchItem}&include_adult=false`
            
            if(searchItem){
              searchItem = encodeURI(searchItem)
              await axios.get(url)
                .then((response) => {
                  console.log(response)
                })
                .catch((err) => console.log(err))
                .finally(()=>{
                  console.log("search complete")
                })
            }
    
            break
          default:
            url = `https://api.themoviedb.org/3/search/multi?${apiKey}&language=en-US&query=${searchItem}&page=1&include_adult=false`
            
            if(searchItem){
              searchItem = encodeURI(searchItem)
              await axios.get(url)
                  .then((response) => {
                      console.log(response)
                })
                .catch((err) => console.log(err))
                .finally(()=>{
                  console.log("search complete")
                })
            }
            break
        }
    
      }

  return (
    <form onSubmit={(e)=>{
        e.preventDefault()
        //setSearching(true)
        runSearch("multi")
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
