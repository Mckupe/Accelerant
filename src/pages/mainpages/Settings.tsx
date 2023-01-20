import axios from 'axios';
import { tokenStore } from '../../stores/tokenStore';
import { projectStore } from '../../stores/projectStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './main.module.scss';
import Menu from '../../components/menu/menu';
import Header from '../../components/header/header';
import Changename from '../../components/settings/changename/changename';
import Changefilters from '../../components/settings/changefilters/changefilters';
import Сhangesoc from '../../components/settings/changesoc/changesoc';
import { oneProjectStore } from '../../stores/oneProjectStore';

function Projectpage() {
    const navigate = useNavigate()

    const sas = async function name(e:any) {
        e.preventDefault();
		const re = /^.{1,}$/;
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
		navigate('/project')
    }

    async function buttonClick(e: any) {
		e.preventDefault();
		const re = /^.{1,}$/;
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
		oneProjectStore.changeActiveProject(
			0,
			'',
			''
		);
	}



    return (
        <div className={styles.main__container}>
            <Menu/>
            <div className={styles.container}>
               <Header text={'Настройки проекта'} type={'settings'}/>
               <div className={styles.main}>
                    <div className={styles.settings}>
                        <Changename/>
                        <Changefilters/>
                        <Сhangesoc/> 
                        <button onClick={sas} className={styles.button}>Удалить проект</button>          
                    </div>
                    
               </div>
            </div>
        </div>
    );
  }
  
  export default observer(Projectpage);