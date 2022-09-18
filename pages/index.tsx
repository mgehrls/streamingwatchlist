import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'

import Header from '../components/Header'
import MultiSearch from '../components/Multisearch'
import type { SearchData } from '../utils/interface'
import type { UserData } from '../utils/interface'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [searchData, setSearchData] = useState<SearchData | null>(null)
  const [searching, setSearching] = useState<boolean>(false)
  const [user, setUser] = useState<UserData | null>({movies:[], shows:[]})

  //here for testing purposes.
  useEffect(()=>{
    console.log("searchData:")
    console.log(searchData)
  },[searchData])
  useEffect(()=>{
    console.log("userdata:")
    console.log(user)
  },[user])

  const addMovie = (id:number)=>{
    if(user !== null){
      setUser({movies:[...user.movies, {id:id}], shows:[...user.shows]})
    }
  }

  const HeaderProps = {
    setSearching: setSearching,
    setSearchData: setSearchData
  }
  const SearchProps = {
    searchData: searchData,
    searching: searching,
    addMovie: addMovie,
    user: user
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
        <MultiSearch {...SearchProps} />

      </div>
    </div>
  )
}

export default Home
