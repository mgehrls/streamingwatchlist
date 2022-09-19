import React from 'react'
import Result from './Result'
//import {useAutoAnimate} from '@formkit/auto-animate/react'
import type {SearchData, SearchResult, UserData} from '../utils/interface'

  interface SearchProps{
    searchData:  SearchData | null;
    addMovie: (id: number) => void;
    removeMovie: (id: number) => void;
    addShow: (id: number) => void;
    removeShow: (id: number) => void;
    user: UserData
}


const Search = ({searchData, addMovie, user, removeMovie, addShow, removeShow}: SearchProps) => {
    let searchResults: JSX.Element[] | JSX.Element = []
    if(searchData !== null){
        searchResults = searchData.results.map((result: SearchResult)=>{
            return(
               <Result key={result.id} data={result} addMovie={addMovie} removeMovie={removeMovie} user={user} addShow={addShow} removeShow={removeShow}/>
            )
        }) 

    }

   // const [animationParent] = useAutoAnimate()  this is a ref for the div holding searchResults => ref={animationParent}

  return (

        <div id='result-section'>
            {searchResults}
        </div>

  )
}
export default Search