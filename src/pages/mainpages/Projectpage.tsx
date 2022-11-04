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
    favorit: boolean;
}

function Projectpage() {

    const navigate = useNavigate();
    const projects = projectStore.sort;
    console.log(JSON.parse(JSON.stringify(projects)));

    useEffect(() => {
        async function projects() {
            await axios({
                method: 'get',
                url: 'http://localhost:5000/api/project/get',
                headers: {'Authorization': 'Bearer ' + tokenStore.token}
                }).then((response) => {
                    projectStore.resetArray();
                    const res = response.data.projects;
                    res.map((project: ObjectProject) => {
                        projectStore.changeProjectData(project);
                        projectStore.addProject();
                    });
                }).catch((error) => {
                    console.log(error.response.data.message);
            });
        }
        projects();
        modalStore.changeAddModal(false);
    }, [modalStore.addModal]);

    function onClickProject(e: any) {
        projectStore.changeActiveProject(e.currentTarget.dataset.id, e.currentTarget.dataset.name);
        navigate('/posts');
    }

    async function onClickStar(e: any) {
        e.stopPropagation();
        const favorit = projectStore.favorit(e.currentTarget.dataset.id);
        await axios({
            method: 'put',
            url: 'http://localhost:5000/api/project/update',
            headers: {'Authorization': 'Bearer ' + tokenStore.token},
            data: {
                projectid: e.currentTarget.dataset.id, 
                name:  e.currentTarget.dataset.name,
                favorit: favorit
            }
            }).then((response) => {
            }).catch((error) => {
                console.log(error.response.data.message);
        });
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
                        {JSON.parse(JSON.stringify(projects)).map((project: ObjectProject, i: number) => {
                            return <Project 
                                        onClick={onClickProject} 
                                        onClickStar={onClickStar} 
                                        id={project.id} 
                                        name={project.name} 
                                        nameCreator={project.nameCreator} 
                                        arrSoc={project.arraySoc} 
                                        favorit={project.favorit} 
                                        key={i}
                                    />
                        })}
                        <Modal/>
                    </div>
               </div>
            </div>
        </div>
    );
  }
  
  export default observer(Projectpage);