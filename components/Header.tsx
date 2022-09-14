import React from 'react'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
        <a className={styles.titleContainer} href='/'>
            <div>
                <h1 className={styles.pageTitle}>Find your film</h1>
                <p className={styles.pageSubtitle}>data and images courtesy of tmdb.org</p>
            </div>
        </a>
        <nav>
            <a href="/movies">Movies</a>
            <a href="/tv">TV</a>
        </nav>
    </header>
  )
}
