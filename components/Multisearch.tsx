import React from 'react'
import Result from './Result'
import Searchbar from './Searchbar'
//import {useAutoAnimate} from '@formkit/auto-animate/react'
import type {SearchData, SearchResult} from '../utils/interface'

  interface MultiSearchProps{
    data:  SearchData | null;
    searching: boolean
}

const MultiSearch = ({data, searching}: MultiSearchProps) => {
    let searchResults: JSX.Element[] | JSX.Element = []
    if(data !== null){
        console.log(data)
        searchResults = data.results.map((result: SearchResult)=>{
            return(
               <Result key={result.id} data={result}/>
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