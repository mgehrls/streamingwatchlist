import styles from './UserHome.module.css'

interface SmallDisplayProps{
    removeMovie?: (id: number) => void;
    removeShow?: (id: number) => void;
    title:string;
    backdropPath:string;
    id:number;
}

const SmallMediaDisplay = ({title, backdropPath, removeMovie, removeShow, id}: SmallDisplayProps)=>{
    return (
        <div className={styles.listItem}>
           <img className={styles.backdropImg} src={backdropPath} alt={`${title} backdrop`} />
           <input className={styles.date} type={"date"}/>
           <div className={styles.rank}>Rank</div>
        </div>
)}

export default SmallMediaDisplay