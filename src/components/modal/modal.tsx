import axios from 'axios';
import { useState } from 'react';
import { tokenStore } from '../../stores/tokenStore';
import styles from './modal.module.scss';
import { modalStore } from '../../stores/modalStore';
import { observer } from 'mobx-react-lite';

const Modal = () => {

    const [valid, setValid] = useState(true);
    const [value, setValue] = useState('');

    async function buttonClick(e: any) {
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
        <div style={{display: modalStore.modal ? 'block' : 'none'}}>
            <div className={styles.black}></div>
            <form className={styles.container}>
                <div className={styles.head}>Новый проект</div>
                <div className={styles.input__container}>
                    <div className={styles.input__text}>Название</div>
                    <input type="text" pattern='.{1,}' value={value} onChange={changeValue} className={valid ? styles.input : styles.input__invalid} required/>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.buttons__close}>Закрыть</button>
                    <button onClick={buttonClick} className={styles.buttons__create}>Создать</button>
                </div>
            </form>
        </div>
    )
}

export default observer(Modal);