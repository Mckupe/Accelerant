import styles from './main.module.scss';
import Menu from '../../components/menu/menu';
import Header from '../../components/header/header';
import Filter from '../../components/filter/filter';
import Adder from '../../components/adder/adder';

function Projectpage() {
    return (
        <div className={styles.main__container}>
            <Menu/>
            <div className={styles.container}>
               <Header/>
               <div className={styles.main}>
                    <Filter/>
                    <Adder/>
               </div>
            </div>
        </div>
    );
  }
  
  export default Projectpage;