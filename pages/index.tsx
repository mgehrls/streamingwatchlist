import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Searchbar from '../components/Searchbar'
import axios from 'axios'
const apiKey = "api_key=4cc551bdbec360295f6123a443e43bb9"

const Home: NextPage = () => {
  


  return (
    <div className={styles.container}>
      <Head>
        <title>Streaming Watchlist</title>
        <meta name="description" content="Keep track of your favorite shows and movies!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <div className={styles.main}>
        <Searchbar/>
      </div>
    </div>
  )
}

export default Home
