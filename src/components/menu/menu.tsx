import styles from './menu.module.scss';
import { userStore } from '../../stores/userdataStore';
import { projectStore } from '../../stores/projectStore';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const Menu = () => {

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.container__logo}>Accelerant</div>
                <div className={styles.container__projects}>
                    <NavLink to='/project' className={(props) => props.isActive ? styles.logoandtext__active : styles.logoandtext__block}>
                        <span className={styles.project}></span>
                        <div className={styles.menu_text}>Проекты</div>
                    </NavLink>
                    <NavLink to='//' className={(props) => props.isActive ? styles.logoandtext__active : styles.logoandtext__block}>
                        <span className={styles.pattern}></span>
                        <div className={styles.menu_text}>Шаблоны</div>
                    </NavLink>
                </div>
                <div className={styles.container__nameproject} style={{display: projectStore.projectData.name ? 'flex' : 'none'}}>{projectStore.projectData.name}</div>
                <div className={styles.container__menu} >
                    <div className={styles.logoandtext__block} style={{display: projectStore.projectData.name  ? 'flex' : 'none'}}>
                        <span className={styles.newpost}></span>
                        <div className={styles.menu_text}>Новый пост</div>
                    </div>
                    <NavLink to='/posts' className={(props) => props.isActive ? styles.logoandtext__active : styles.logoandtext__block}>
                        <span className={styles.posts}></span>
                        <div className={styles.menu_text}>Публикации</div>
                    </NavLink>
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
                    <NavLink to='/settings' className={(props) => props.isActive ? styles.logoandtext__active : styles.logoandtext__block}>
                        <span className={styles.settings}></span>
                        <div className={styles.menu_text}>Настройки</div>
                    </NavLink>
                </div>
            </div>
            <div>
                <div className={styles.container__user}>{userStore.userdata.name}</div>
            </div>
        </div>
    )
}

export default observer(Menu);