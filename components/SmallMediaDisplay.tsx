import styles from './UserHome.module.css'
import useHover from '../utils/useHover'

interface SmallDisplayProps{
    removeMovie?: (id: number) => void;
    removeShow?: (id: number) => void;
    title:string;
    backdropPath:string;
    id:number;
}

const SmallMediaDisplay = ({title, backdropPath, removeMovie, removeShow, id}: SmallDisplayProps)=>{
    const [hoverRef, isHovered] = useHover()

    return (
        <div ref={hoverRef} className={styles.listItem}>
           <img className={styles.backdropImg} src={backdropPath} alt={`${title} backdrop`} />
        </div>
)}

export default SmallMediaDisplay