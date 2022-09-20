import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './UserHome.module.css'

interface SmallDisplayProps{
    removeMovie?: (id: number) => void;
    removeShow?: (id: number) => void;
    title:string;
    posterPath:string;
    id:number;
}

const SmallMediaDisplay = ({title, posterPath, removeMovie, removeShow, id}: SmallDisplayProps)=>{
    return (
        <div className={styles.listItem}>
           <img className={styles.posterImg} src={posterPath} alt={`${title} Poster`} />
           <p className={styles.title}>{title}</p>
        </div>
)}

export default SmallMediaDisplay