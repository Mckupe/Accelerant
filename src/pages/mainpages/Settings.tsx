import axios from 'axios';
import { useEffect } from 'react';
import { tokenStore } from '../../stores/tokenStore';
import { projectStore } from '../../stores/projectStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './main.module.scss';
import Menu from '../../components/menu/menu';
import Header from '../../components/header/header';
import Sas from '../../components/settings/sas/sas';
import Sas2 from '../../components/settings/sas2/sas2';
import Sas3 from '../../components/settings/sas3/sas3';
//import Adder from '../../components/adder/adder';
import Modal from '../../components/modal/modal';
//import Project from '../../components/project/project';
import { modalStore } from '../../stores/modalStore';

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

    useEffect(() => {
        async function projects() {
            console.log(tokenStore.token)
            await axios({
                method: 'get',
                url: 'http://localhost:5000/api/project/get',
                headers: {'Authorization': 'Bearer ' + tokenStore.token}
                }).then((response) => {
                    projectStore.changeProjects(response.data.projects);
                }).catch((error) => {
                    console.log(error.response.data.message);
            });
        }
        projects();
    }, [modalStore.addModal]);

    function onClickProject(e: any) {

        projectStore.changeProjectData(e.currentTarget.dataset.id, e.currentTarget.dataset.name);
        navigate('/posts');
    }

    return (
        <div className={styles.main__container}>
            <Menu/>
            <div className={styles.container}>
               <Header text={'Настройки проекта'}/>
               <div className={styles.main}>
                    <div className={styles.settings}>
                        <Sas id={projectStore.projectData.id} name={projectStore.projectData.name}/>
                        <Sas2 id={projectStore.projectData.id} name={projectStore.projectData.name}/>
                        <Sas3 id={projectStore.projectData.id} name={projectStore.projectData.name}/> 
                        <button onClick={buttonClick} className={styles.button}>Удалить проект</button>          
                    </div>
                    
               </div>
            </div>
        </div>
    );
  }
  
  export default observer(Projectpage);