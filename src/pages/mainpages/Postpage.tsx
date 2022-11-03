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


function Postpage() {

    return (
        <div className={styles.main__container}>
            <Menu/>
            <div className={styles.container}>
               <Header text={'Публикации'}/>
               <div className={styles.main}>
                    <Filter/>
                    <div className={styles.adder__and__projects}>
                        <Adder text={'Новый пост'}/>
                        <Modal/>
                    </div>
               </div>
            </div>
        </div>
    );
  }
  
  export default observer(Postpage);