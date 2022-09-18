import React, { Dispatch, SetStateAction } from 'react'
import Result from './Result'
//import {useAutoAnimate} from '@formkit/auto-animate/react'
import type {SearchData, SearchResult, UserData} from '../utils/interface'

  interface MultiSearchProps{
    searchData:  SearchData | null;
    searching: boolean;
    addMovie: (id: number) => void;
    user: UserData | null
}

const MultiSearch = ({searchData, searching, addMovie, user}: MultiSearchProps) => {
    let searchResults: JSX.Element[] | JSX.Element = []
    if(searchData !== null){
        console.log(searchData)
        searchResults = searchData.results.map((result: SearchResult)=>{
            return(
               <Result key={result.id} data={result} addMovie={addMovie} user={user}/>
            )
        }) 

    }else if(searching){
        searchResults = <div className='searching-container'><i className="fa-solid fa-spinner fa-spin"/><h3>Searching...</h3></div>
    }else{
        searchResults = (
        <div className='searchless-container'>
            <i className="fa-solid fa-film"/>
            <h3>Search for a movie or show or actor...</h3>
        </div>)
    }

   // const [animationParent] = useAutoAnimate()  this is a ref for the div holding searchResults => ref={animationParent}

  return (

        <div id='result-section'>
            {searchResults}
        </div>

  )
}
export default MultiSearch