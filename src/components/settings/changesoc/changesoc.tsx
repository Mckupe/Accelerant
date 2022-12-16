import styles from './changesoc.module.scss';
import { useState } from 'react';

const Сhangesoc = () => {
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
                    Подключение соцсетей
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.logoandtext__block}>
                    <span className={styles.vk}></span>
                    <div className={styles.menu_text}>Вконтакте</div>
                    <button onClick={buttonClick} className={styles.button}>Подключить</button>
                </div>
                <div className={styles.logoandtext__block}>
                    <span className={styles.tg}></span>
                    <div className={styles.menu_text}>Телеграмм</div>
                    <button onClick={buttonClick} className={styles.button}>Подключить</button>
                </div>
                <div className={styles.logoandtext__block}>
                    <span className={styles.insta}></span>
                    <div className={styles.menu_text}>Инстаграмм</div>
                    <button onClick={buttonClick} className={styles.button}>Подключить</button>
                </div>
            </div>
        </div>
    )
}

export default Сhangesoc;