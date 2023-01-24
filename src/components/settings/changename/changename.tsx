import styles from './changename.module.scss';
import { tokenStore } from '../../../stores/tokenStore';
import { oneProjectStore } from '../../../stores/oneProjectStore';
import { useState } from 'react';
import axios from 'axios';
import { observer } from 'mobx-react-lite';

const Changename = () => {
    const [valid, setValid] = useState(true);
	const [value, setValue] = useState(oneProjectStore.activeProject.name);

	async function buttonClick(e: any) {
		e.preventDefault();
		const re = /^.{1,}$/;
		if (!re.test(value)) {
			setValid(false);
		} else {
			setValid(true);
			console.log(value);
			await axios({
				method: 'put',
				url: `${process.env.REACT_APP_API_URL}api/project/update`,
				headers: { Authorization: 'Bearer ' + tokenStore.token },
				data: {
					projectid: oneProjectStore.activeProject.id,
					name: value,
				},
			})
				.then(response => {
					return console.log(response.data);
				})
				.catch(error => {
					return console.log(error.response.data.message);
				});
		}
		oneProjectStore.changeActiveProject(
			oneProjectStore.activeProject.id,
			value,
			oneProjectStore.activeProject.nameCreator
		);
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

export default observer(Changename);