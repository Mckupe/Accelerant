import axios from 'axios';
import { useEffect } from 'react';
import { tokenStore } from '../../stores/tokenStore';
import { projectStore } from '../../stores/projectStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import styles from './main.module.scss';
import Menu from '../../components/menu/menu';
import Header from '../../components/header/header';
import Filter from '../../components/filter/filter';
import Adder from '../../components/adder/adder';
import Modal from '../../components/modal/modal';
import Project from '../../components/project/project';
import { modalStore } from '../../stores/modalStore';

type ObjectProject = {
    id: number;
    name: string;
    nameCreator: string;
    arraySoc: Array<string>;
}

function Projectpage() {

    const navigate = useNavigate();

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
               <Header text={'Проекты'}/>
               <div className={styles.main}>
                    <Filter/>
                    <div className={styles.adder__and__projects}>
                        <Adder text={'Новый проект'}/>
                        {JSON.parse(JSON.stringify(projectStore.projects)).map((project: ObjectProject, i: number) => {
                            return <Project onClick={onClickProject} id={project.id} name={project.name} nameCreator={project.nameCreator} arrSoc={project.arraySoc} key={i}/>
                        })}
                        <Modal/>
                    </div>
               </div>
            </div>
        </div>
    );
  }
  
  export default observer(Projectpage);