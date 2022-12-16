import axios from 'axios';
import { useEffect } from 'react';
import { tokenStore } from '../../stores/tokenStore';
import { projectStore } from '../../stores/projectStore';
import { postStore } from '../../stores/postStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './main.module.scss';
import Menu from '../../components/menu/menu';
import Header from '../../components/header/header';
import Changename from '../../components/settings/changename/changename';
import Changefilters from '../../components/settings/changefilters/changefilters';
import Сhangesoc from '../../components/settings/changesoc/changesoc';
import { modalStore } from '../../stores/modalStore';
import { oneProjectStore } from '../../stores/oneProjectStore';
import { userStore } from '../../stores/userdataStore';

const projects = projectStore.sort;

type ObjectProject = {
    id: number;
    name: string;
    nameCreator: string;
    arraySoc: Array<string>;
}

function Projectpage() {

    const navigate = useNavigate()
    const [valid, setValid] = useState(true);
    const [value, setValue] = useState('');

    const sas = async function name(e:any) {
        e.preventDefault();
		const re = /^.{1,}$/;
		// if (!re.test(value)) {
		// 	setValid(false);
		// } else {
		// 	setValid(true);
			console.log(value);
			await axios({
				method: 'delete',
				url: 'http://localhost:5000/api/project/delete',
				headers: { Authorization: 'Bearer ' + tokenStore.token },
				data: {
                    projectid: oneProjectStore.activeProject.id,
				},
			})
				.then(response => {
					return console.log(response.data);
				})
				.catch(error => {
					return console.log(error.response.data.message);
				});
			// modalStore.changeModalProject();
			// modalStore.changeAddProject();
		// }
    }

    async function buttonClick(e: any) {
		e.preventDefault();
		const re = /^.{1,}$/;
		// if (!re.test(value)) {
		// 	setValid(false);
		// } else {
		// 	setValid(true);
			console.log(value);
			await axios({
				method: 'delete',
				url: 'http://localhost:5000/api/project/delete',
				headers: { Authorization: 'Bearer ' + tokenStore.token },
				data: {
                    projectid: oneProjectStore.activeProject.id,
				},
			})
				.then(response => {
					return console.log(response.data);
				})
				.catch(error => {
					return console.log(error.response.data.message);
				});
			// modalStore.changeModalProject();
			// modalStore.changeAddProject();
		// }
	}



    return (
        <div className={styles.main__container}>
            <Menu/>
            <div className={styles.container}>
               <Header text={'Настройки проекта'}/>
               <div className={styles.main}>
                    <div className={styles.settings}>
                        <Changename/>
                        <Changefilters/>
                        <Сhangesoc/> 
                        <NavLink
						to='/project'
                        onClick={sas} className={styles.button}
					>
                        Удалить проект
					</NavLink>          
                    </div>
                    
               </div>
            </div>
        </div>
    );
  }
  
  export default observer(Projectpage);