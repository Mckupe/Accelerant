import axios from 'axios';
import { useEffect } from 'react';
import { tokenStore } from '../../stores/tokenStore';
import { projectStore } from '../../stores/projectStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './main.module.scss';
import Menu from '../../components/menu/menu';
import Header from '../../components/headers/header/header';
import Views from '../../components/analitics/views/views';
import Likes from '../../components/analitics/likes/likes';
import Coments from '../../components/analitics/coments/coments';

const projects = projectStore.sort;

type ObjectProject = {
	id: number;
	name: string;
	nameCreator: string;
	arraySoc: Array<string>;
};

function Projectpage() {
	const navigate = useNavigate();
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
				headers: { Authorization: 'Bearer ' + tokenStore.token },
				data: {
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
	}

	return (
		<div className={styles.main__container}>
			<Menu />
			<div className={styles.container}>
				<Header text={'Аналитика'} type={'analytics'} />
				<div className={styles.main}>
					<div className={styles.settings}>
						<Views />
						<Likes />
						<Coments />
					</div>
				</div>
			</div>
		</div>
	);
}

export default observer(Projectpage);
