import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import Search from '../../../components/Search';
import SidebarList from '../../../components/SidebarList';
import { SearchData, UserData } from '../../../utils/interface';
import styles from "../../../components/Search.module.css"


export default function SearchResults() {
    const [user, setUser] = useState<UserData>({movies:[], shows:[]})
    const [searchData, setSearchData] = useState<SearchData | null>(null)
    const apiKey = process.env.KEY;
    const router = useRouter()
    const searchQuery = router.query.query
    const url = `https://api.themoviedb.org/3/search/multi?${apiKey}&language=en-US&query=${searchQuery}&page=1&include_adult=false`


    function fetchFromStorage(){
        const stringFromStorage = localStorage.getItem("streamingWatchlist")
        if(stringFromStorage !== null){
        let userData:UserData = JSON.parse(stringFromStorage)
        setUser(userData)
        }
    }
    useEffect(()=>{
        fetchFromStorage()
        if(searchQuery){
            fetch(url)
                .then(res=> res.json())
                .then((data) => {
                    if(data !== undefined){
                        setSearchData(data)
                    }
                })
                .catch((err) => alert(err))
            }else{
                console.error("Nothing in search bar. Search for something.")
                return undefined
            }
    }, [])
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
      const updateMovieDate =(id:number, lastSeen:string)=>{
        if(user !== null){
          const updatedMovie = user.movies.find(movie => movie.id === id)
          if(updatedMovie !== undefined){
            if(lastSeen !== undefined){
              updatedMovie.lastSeen = lastSeen
              const newMovies = user.movies.filter(movie => movie.id !== id)
              const newUserData = {movies:[...newMovies, updatedMovie], shows:[...user.shows]}
              setUser(newUserData)
              saveToStorage(newUserData)
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
      const updateShowDate =(id:number, lastSeen:string)=>{
        if(user !== null){
          const updatedShow = user.shows.find(show => show.id === id)
          if(updatedShow !== undefined){
            if(lastSeen !== undefined){
              updatedShow.lastSeen = lastSeen
              const newShows = user.shows.filter(show => show.id !== id)
              const newUserData = {movies:[...user.movies], shows:[...newShows, updatedShow]}
              setUser(newUserData)
              saveToStorage(newUserData)
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

      const SidebarListProps = {
        removeMovie: removeMovie,
        removeShow: removeShow,
        user: user,
        updateMovieDate: updateMovieDate,
        updateShowDate: updateShowDate,
    }
    const SearchProps = {
        searchData: searchData,
        addMovie: addMovie,
        removeMovie: removeMovie,
        addShow: addShow,
        removeShow:removeShow,
        user: user,
      }
    
    const searchLoading = (          
      <div className='searching-container fa-3x'>
        <FontAwesomeIcon className={styles.searchingSpinner} icon={faSpinner} width={100}/>
        <h3>Searching...</h3>
      </div>
)


    return (
        <div className={styles.wholePage}>
            <Header />
              <div className={styles.mainContainer}>
                {searchData ? <Search {...SearchProps}/> : searchLoading}
                {user.shows.length || user.movies.length ? <SidebarList {...SidebarListProps} /> : ""} 
              </div>
            <Footer/>
        </div>
    )
    }
