import styles from './menu.module.scss';
import { userStore } from '../../stores/userdataStore';
import { useEffect, useState } from 'react';
import { tokenStore } from '../../stores/tokenStore';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const Menu = () => {

    const [projets, setProjects] = useState(false);

    useEffect(() => {
        async function projects() {
            await axios({
                method: 'get',
                url: 'http://localhost:5000/api/project/get',
                headers: {'Authorization': 'Bearer ' + tokenStore.token}
                }).then((response) => {
                    if (response.data.projects.length > 0) {
                        setProjects(true);
                    }
                }).catch((error) => {
                    return console.log(error.response.data.message);
            });
        }
        projects();
    }, []);

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.container__logo}>Accelerant</div>
                <div className={styles.container__projects}>
                    <NavLink to='/home' className={(props) => props.isActive ? styles.logoandtext__active : styles.logoandtext__block}>
                        <span className={styles.project}></span>
                        <div className={styles.menu_text}>Проекты</div>
                    </NavLink>
                    <NavLink to='//' className={(props) => props.isActive ? styles.logoandtext__active : styles.logoandtext__block}>
                        <span className={styles.pattern}></span>
                        <div className={styles.menu_text}>Шаблоны</div>
                    </NavLink>
                </div>
                <div className={styles.container__nameproject} style={{display: projets ? 'flex' : 'none'}}>NAME</div>
                <div className={styles.container__menu} style={{display: projets ? 'flex' : 'none'}}>
                    <div className={styles.logoandtext__block}>
                        <span className={styles.newpost}></span>
                        <div className={styles.menu_text}>Новый пост</div>
                    </div>
                    <div className={styles.logoandtext__block}>
                        <span className={styles.posts}></span>
                        <div className={styles.menu_text}>Публикации</div>
                    </div>
                    <div className={styles.logoandtext__block}>
                        <span className={styles.draft}></span>
                        <div className={styles.menu_text}>Черновики</div>
                    </div>
                    <div className={styles.logoandtext__block}>
                        <span className={styles.talk}></span>
                        <div className={styles.menu_text}>Обсуждения</div>
                    </div>
                    <div className={styles.logoandtext__block}>
                        <span className={styles.anal}></span>
                        <div className={styles.menu_text}>Аналитика</div>
                    </div>
                    <div className={styles.logoandtext__block}>
                        <span className={styles.settings}></span>
                        <div className={styles.menu_text}>Настройки</div>
                    </div>
                </div>
            </div>
            <div>
                <div className={styles.container__user}>{userStore.userdata.name}</div>
            </div>
        </div>
    )
}

export default observer(Menu);