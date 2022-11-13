import styles from './changesoc.module.scss';
import axios from 'axios';
import { useState } from 'react';
import { tokenStore } from '../../../stores/tokenStore';
import { modalStore } from '../../../stores/modalStore';
import { observer } from 'mobx-react-lite';


type ProjectProps = {
    id: number;
    name: string;
}

const Сhangesoc = ({ id, name, }: ProjectProps) => {
    const [valid, setValid] = useState(true);
    const [value, setValue] = useState('');

    async function buttonClick(e: any) {
        console.log(value);
        e.preventDefault();
        const re = /^.{1,}$/;
        if (!re.test(value)) {
            setValid(false);
        } else {
            setValid(true);
            console.log(value);
            await axios({
                method: 'post',
                url: 'http://localhost:5000/api/project/add',
                headers: { 'Authorization': 'Bearer ' + tokenStore.token },
                data: {
                    name: value
                }
            }).then((response) => {
                return console.log(response.data);
            }).catch((error) => {
                return console.log(error.response.data.message);
            });
            modalStore.changeModal(false);
            modalStore.changeAddModal(true);
        }
    }

    function changeValue(e: any) {
        setValue(e.target.value);
    }

    return (
        <div data-name={name} data-id={id} className={styles.container}>
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
                    <div className={styles.menu_text}>Вконтакте</div>
                    <button onClick={buttonClick} className={styles.button}>Подключить</button>
                </div>
                <div className={styles.logoandtext__block}>
                    <span className={styles.insta}></span>
                    <div className={styles.menu_text}>Вконтакте</div>
                    <button onClick={buttonClick} className={styles.button}>Подключить</button>
                </div>
            </div>
        </div>
    )
}

export default Сhangesoc;