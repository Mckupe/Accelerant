import styles from './adder.module.scss';
import Modal from './modal/modal';
import { modalStore } from '../../stores/modalStore';

const Adder = () => {

    return (
        <>
            <div onClick={() => modalStore.changeModal(true)} className={styles.container__add}>
                <div className={styles.plus}/>
                <div className={styles.adder__text}>
                    Новый проект
                </div>
            </div>
            <Modal/>
        </>
    )
}

export default Adder;