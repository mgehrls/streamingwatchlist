import { useRouter } from 'next/router'
import React from 'react'


export default function SearchResults() {
    const apiKey = process.env.KEY;
    const router = useRouter()
    const searchQuery = router.query.query
    let url = ""
    let type = ""

    if(searchQuery){
        fetch(url)
            .then(res=> res.json())
            .then((data) => {
                if(data !== undefined){
                    console.log(data)
                }
            })
            .catch((err) => alert(err))
        }else{
            console.error("Nothing in search bar. Search for something.")
            return undefined
        }

    if(type === "movie"){
        url = `https://api.themoviedb.org/3/search/movie?${apiKey}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
        }else if(type === "tv"){
        url = `https://api.themoviedb.org/3/search/tv?${apiKey}&language=en-US&page=1&query=${searchQuery}&include_adult=false`
        }else{
        url = `https://api.themoviedb.org/3/search/multi?${apiKey}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
        }

  return (
    <div>{searchQuery}</div>
  )
}
