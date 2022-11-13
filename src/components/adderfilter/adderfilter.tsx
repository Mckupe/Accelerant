import styles from './adderfilter.module.scss';

const AdderFilter = () => {
    return (
        <div className={styles.container}>
            <div className={styles.filters}>
                <button className={styles.filter}>Удалить</button>
                <button className={styles.filter}>Редактировать</button>
                <button className={styles.adder}></button>   
            </div>
            <span className={styles.select}></span>
        </div>
    )
}

export default AdderFilter;