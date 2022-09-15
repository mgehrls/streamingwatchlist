import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import MultiSearch from '../components/Multisearch'
import axios from 'axios'
import { useState, useEffect } from 'react'
import type { SearchData } from '../utils/interface'
const apiKey = "api_key=4cc551bdbec360295f6123a443e43bb9"

const Home: NextPage = () => {
  const [data, setData] = useState<SearchData | null>(null)
  const [searching, setSearching] = useState<boolean>(false)

  useEffect(()=>{
    console.log(data)
  },[data])

  const runSearch:(type:string, searchItem:string) => Promise<SearchData | undefined> = async function(type, searchItem){
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
      await axios.get(url)
        .then((response) => {
            console.log(response)
            setData(response.data)
            })
            .catch((err) => console.log(err))
            .finally(()=>{
              console.log("search complete")
            })
        }else{
          console.log("Nothing in search bar. Try again.")
          return undefined
        }
  }

  const HeaderProps = {
    runSearch: runSearch,
    setSearching: setSearching,
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
        <MultiSearch data={data} searching={searching} />

      </div>
    </div>
  )
}

export default Home
