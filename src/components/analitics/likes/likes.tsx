import styles from './likes.module.scss';
import { useState } from 'react';
import AdderFilter from '../../adderfilter/adderfilter';


const Changefilters = () => {
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

export default Changefilters;