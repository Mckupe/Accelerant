import styles from './changename.module.scss';
import axios from 'axios';
import { useState } from 'react';
import { tokenStore } from '../../../stores/tokenStore';
import { modalStore } from '../../../stores/modalStore';
import { observer } from 'mobx-react-lite';


type ProjectProps = {
    id: number;
    name: string;
}

const Changename = ({ id, name, }: ProjectProps) => {
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
                headers: {'Authorization': 'Bearer ' + tokenStore.token},
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