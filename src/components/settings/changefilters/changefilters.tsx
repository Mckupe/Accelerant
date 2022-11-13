import styles from './changefilters.module.scss';
import axios from 'axios';
import { useState } from 'react';
import { tokenStore } from '../../../stores/tokenStore';
import { modalStore } from '../../../stores/modalStore';
import { observer } from 'mobx-react-lite';
import AdderFilter from '../../adderfilter/adderfilter';


type ProjectProps = {
    id: number;
    name: string;
}

const Changefilters = ({ id, name, }: ProjectProps) => {
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