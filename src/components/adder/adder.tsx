import styles from './adder.module.scss';
import { modalStore } from '../../stores/modalStore';

type AdderProps = {
    text: string;
}

const Adder = ({text}: AdderProps) => {

    return (
        <div onClick={() => modalStore.changeModal(true)} className={styles.container}>
            <div className={styles.plus}/>
            <div className={styles.container__text}>
                {text}
            </div>
        </div>
    )
}

export default Adder;