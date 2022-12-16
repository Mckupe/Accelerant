import styles from './coments.module.scss';
import { useState } from 'react';

const Сhangesoc = () => {
    const [valid, setValid] = useState(true);
    const [value, setValue] = useState('');

    async function buttonClick(e: any) {
    }

    function changeValue(e: any) {
        setValue(e.target.value);
    }

    return (
        <div className={styles.container}>

        </div>
    )
}

export default Сhangesoc;