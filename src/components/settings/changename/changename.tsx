import styles from './changename.module.scss';
import { useState } from 'react';

const Changename = () => {
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
                    Название проекта
                </div>
            </div>
            <div className={styles.main}>
                <input type="text" pattern='.{1,}' value={value} onChange={changeValue} className={valid ? styles.input : styles.input__invalid} required />
                <button onClick={buttonClick} className={styles.buttons__save}>Сохранить</button>
            </div>
        </div>
    )
}

export default Changename;