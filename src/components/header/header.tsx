import styles from './header.module.scss';

const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.text}>
                Проекты
            </div>
        </div>
    )
}

export default Header;