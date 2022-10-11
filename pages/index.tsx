import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import UserHome from '../components/UserHome'
import Search from '../components/Search'
import Searching from '../components/Searching'
import Footer from '../components/Footer'
import type { SearchData, ShowData, UserData } from '../utils/interface'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [searchData, setSearchData] = useState<SearchData | null>(null)
  const [user, setUser] = useState<UserData>({movies:[], shows:[]})
  const [display, setDisplay] = useState("home")
  let heroDisplay:JSX.Element = <></>

  useEffect(()=>{
    const stringFromStorage = localStorage.getItem("streamingWatchlist")
    if(stringFromStorage !== null){
      let userData:UserData = JSON.parse(stringFromStorage)
      setUser(userData)
    }
  },[])
  const saveToStorage = (data:UserData) => {
    localStorage.setItem("streamingWatchlist", JSON.stringify(data))
    console.log(user)
  }
  const addMovie = (id:number, title:string, description:string, backdropPath:string, posterPath:string)=>{
    if(user !== null){
      const newUserData = {movies:[...user.movies, {id:id, backdropPath:backdropPath, posterPath: posterPath, title:title, description:description}], shows:[...user.shows]}
      setUser(newUserData)
      saveToStorage(newUserData)
    }
  }
  const updateMovieDate =(id:number, lastSeen:Date)=>{
    if(user !== null){
      const updatedMovie = user.movies.find(movie => movie.id === id)
      if(updatedMovie !== undefined){
        if(lastSeen !== undefined){
          updatedMovie.lastSeen = lastSeen
          const newMovies = user.movies.filter(movie => movie.id !== id)
          const newUserData = {movies:[...newMovies, updatedMovie], shows:[...user.shows]}
          setUser(newUserData)
        }
      }
    }
  }
  const removeMovie = (id:number)=>{
    if(user!==null){
      const newMovies = user.movies.filter(movie => movie.id !== id)
      const newUserData = {movies:[...newMovies], shows:[...user.shows]}
      setUser(newUserData)
      saveToStorage(newUserData)
    }
  }
  const addShow = (id:number, title:string, description:string, backdropPath:string, posterPath:string)=>{
    if(user !== null){
      const showToAdd = {
        id: id,
        title:title,
        description:description,
        backdropPath:backdropPath,
        posterPath: posterPath
      }
      const newUserData = {movies:[...user.movies], shows:[...user.shows, {...showToAdd}]}
      setUser(newUserData)
      saveToStorage(newUserData)
    }
  }
  const updateShowDate =(id:number, lastSeen:Date)=>{
    if(user !== null){
      const updatedShow = user.shows.find(show => show.id === id)
      if(updatedShow !== undefined){
        if(lastSeen !== undefined){
          updatedShow.lastSeen = lastSeen
          const newShows = user.shows.filter(show => show.id !== id)
          const newUserData = {movies:[...user.movies], shows:[...newShows, updatedShow]}
          setUser(newUserData)
        }
      }
    }
  }
  const removeShow = (id:number)=>{
    if(user!==null){
      const newShows = user.shows.filter(show => show.id !== id)
      const newUserData = {movies:[...user.movies], shows:[...newShows]}
      setUser(newUserData)
      saveToStorage(newUserData)
    }
  }
  const HeaderProps = {
    setSearchData: setSearchData,
    setDisplay: setDisplay
  }
  const SearchProps = {
    searchData: searchData,
    addMovie: addMovie,
    removeMovie: removeMovie,
    addShow: addShow,
    removeShow:removeShow,
    user: user,
  }
  const UserHomeProps = {
    removeShow:removeShow,
    removeMovie: removeMovie,
    user: user,
    addMovie: addMovie,
    addShow: addShow,
    updateMovieDate: updateMovieDate,
    updateShowDate: updateShowDate
  }
  switch(display){
    case('home'):
    heroDisplay = <UserHome {...UserHomeProps} />
      break
    case("search"):
      heroDisplay = <Search {...SearchProps}/>
      break
    case("searching"):
      heroDisplay = <Searching />
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

        {heroDisplay}
        
      </div>
      <Footer/>
    </div>
  )
}

export default Home
