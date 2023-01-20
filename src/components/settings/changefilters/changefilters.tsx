import styles from './changefilters.module.scss';
import { useState } from 'react';
import AdderFilter from '../../adderfilter/adderfilter';
import { postStore } from '../../../stores/postStore';
import { modalStore } from '../../../stores/modalStore';
import axios from 'axios';
import { tokenStore } from '../../../stores/tokenStore';
import { oneProjectStore } from '../../../stores/oneProjectStore';


const Changefilters = () => {
    const [alert, setAlert] = useState('');
	const [value, setValue] = useState('');

    async function buttonClickDel(e: any) {
        postStore.activeThemeArray.map(async (theme: any, key: number) => {
            await axios({
                method: 'delete',
                url: 'http://localhost:5000/api/theme/delete',
                headers: { Authorization: 'Bearer ' + tokenStore.token },
                data: {
                    projectid: oneProjectStore.activeProject.id,
                    themeid: theme.id
                },
            }).catch(error => {
                console.log(error.response.data.message);
            });
        })
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
                    <button onClick={buttonClickDel} className={styles.buttons__delete}>Удалить</button>
                    <button onClick={postStore.activeThemeArray.length != 0 ? () => {modalStore.changeModalTheme();} : ()=>setAlert('Время публикации в прошлом.')} className={styles.buttons__reduct}>Редактировать</button>
                </div>
            </div>
        </div>
    )
}

export default Changefilters;