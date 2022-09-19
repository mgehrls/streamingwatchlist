import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Search.module.css'

const Searching = ()=>{
    return (
        <div id='result-section'>
            <div className='searching-container fa-3x'>
                <FontAwesomeIcon className={styles.searchingSpinner} icon={faSpinner} width={100}/>
                <h3>Searching...</h3>
            </div>`
        </div>
)}

export default Searching