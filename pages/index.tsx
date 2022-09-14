import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import axios from 'axios'
import { useState, useEffect } from 'react'
const apiKey = "api_key=4cc551bdbec360295f6123a443e43bb9"

const Home: NextPage = () => {
  const [data, setData] = useState<SearchData | null>(null)
  interface SearchResult{
    adult?: boolean;
    backdrop_path?: string;
    genre_ids?:number[];
    id: number;
    media_type?: string;
    original_language?:string;
    original_title?:string;
    overview?:string;
    popularity?: number;
    poster_path?:string;
    realease_date?:string;
    title?:string;
    video?:boolean;
    vote_average?:number;
    vote_count?:number;
  }
  interface SearchData{
    data:{
      page: number;
      results: SearchResult[];
      total_pages: number;
      total_results: number;
    }
  }

  useEffect(()=>{
    console.log(data)
  },[data])

  async function runSearch(type: string, searchItem: string | null){
    let url = ""
    
    switch(type){
      case ("multi"):
        url = `https://api.themoviedb.org/3/search/multi?${apiKey}&language=en-US&query=${searchItem}&page=1&include_adult=false`
        
        if(searchItem){
          searchItem = encodeURI(searchItem)
          await axios.get(url)
              .then((response) => {
                  setData(response.data.results)
                  console.log(response)
                  return true
            })
            .catch((err) => console.log(err))
            .finally(()=>{
              console.log("search complete")
            })
        }else{
          return false
        }
            break
      case("movie"):
        url = `https://api.themoviedb.org/3/search/movie?${apiKey}&language=en-US&query=${searchItem}&page=1&include_adult=false`
        
        if(searchItem){
          searchItem = encodeURI(searchItem)
          await axios.get(url)
              .then((response) => {
                  console.log(response)
                  return true

            })
            .catch((err) => console.log(err))
            .finally(()=>{
              console.log("search complete")
            })
        }else{
          return false
        }

        break
      case("tv"):
        url = `https://api.themoviedb.org/3/search/tv?${apiKey}&language=en-US&page=1&query=${searchItem}&include_adult=false`
        
        if(searchItem){
          searchItem = encodeURI(searchItem)
          await axios.get(url)
            .then((response) => {
              console.log(response)
              return true
            })
            .catch((err) => console.log(err))
            .finally(()=>{
              console.log("search complete")
            })
        }else{
          return false
        }

        break
      default:
        url = `https://api.themoviedb.org/3/search/multi?${apiKey}&language=en-US&query=${searchItem}&page=1&include_adult=false`
        
        if(searchItem){
          searchItem = encodeURI(searchItem)
          await axios.get(url)
              .then((response) => {
                  console.log(response)
                  return true
            })
            .catch((err) => console.log(err))
            .finally(()=>{
              console.log("search complete")
            })
        }else{
          return false
        }
        break
    }

  }
  const HeaderProps = {
    search: runSearch
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Streaming Watchlist</title>
        <meta name="description" content="Keep track of your favorite shows and movies!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header {...HeaderProps}/>
      <div className={styles.main}>

      </div>
    </div>
  )
}

export default Home
