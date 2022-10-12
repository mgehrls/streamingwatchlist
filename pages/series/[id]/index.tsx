import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
const apiKey = process.env.KEY;

export default function SeriesSoloPage() {
    const router = useRouter()
    const id = router.query.id

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/tv/${id}?${apiKey}&language=en-US`)
            .then(res=> res.json())
            .then((data) => {
                if(data !== undefined){
                  console.log(data)
                }
            })
            .catch((err) => console.log(err))
            .finally(()=>{
                
            })})

  return (
    <>
        <Header />
        <div>{id}</div>
        <Footer/>
    </>)
}
