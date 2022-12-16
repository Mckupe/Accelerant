import styles from './changefilters.module.scss';
import { useState } from 'react';
import AdderFilter from '../../adderfilter/adderfilter';


const Changefilters = () => {
    const [valid, setValid] = useState(true);
    const [value, setValue] = useState('');

    async function buttonClick(e: any) {
        
    }

    function changeValue(e: any) {
        setValue(e.target.value);
    }

    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <div className={styles.head__text}>
                    Темы
                </div>
            </div>
            <div className={styles.main}>
                <AdderFilter/>
                <div className={styles.buttons}>
                    <button onClick={buttonClick} className={styles.buttons__delete}>Удалить</button>
                    <button onClick={buttonClick} className={styles.buttons__reduct}>Редактировать</button>
                </div>
            </div>
        </div>
    )
}

export default Changefilters;