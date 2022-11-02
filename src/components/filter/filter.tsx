import styles from './filter.module.scss';

const Filter = () => {
    return (
        <div className={styles.container}>
            <div className={styles.filter}>
                <span className={styles.filter__text}>Фильтры:</span>
                <select>
                    <option value='GR'>Темы</option>
                    <option value='YE'>Yellow</option>
                    <option value='BL'>Black</option>
                </select>
            </div>
            <span className={styles.select}></span>
        </div>
    )
}

export default Filter;