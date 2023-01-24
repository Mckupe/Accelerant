import styles from './adderfilter.module.scss';
import { postStore } from '../../stores/postStore';
import ThemeModal from '../modal/post-modal/theme-modal/theme-modal';
import { modalStore } from '../../stores/modalStore';

const AdderFilter = () => {

    function changeThemeArray(e: any) {
		postStore.addActiveTheme(Number(e.currentTarget.dataset.id));
	}
    
    return (
        <div className={styles.container}>
            <div className={styles.filters}>
            <div className={styles.themes}>
						<div className={styles.themes__container}>
							{postStore.themeArray.length > 0
								? postStore.themeArray.map((theme: any, key: number) => {
									return (
										<div key={key} style={{ display: 'flex' }}>
											<input
												id={theme.id}
												type='checkbox'
												className={styles.theme__input}
												checked={
													postStore.activeThemeArray.includes(theme.id)
														? false
														: true
												}
												onChange={() => { }}
											/>
											<label
												data-id={theme.id}
												onClick={changeThemeArray}
												htmlFor={theme.id}
												className={styles.theme}
												style={{ backgroundColor: `#${theme.color}` }}
											>
												{theme.theme}
											</label>
										</div>
									);
								})
								: null}
							<div
								onClick={() => {
									modalStore.changeModalTheme();
								}}
								className={styles.plus__theme}
							></div>
							<ThemeModal />
						</div>
					</div>  
            </div>
            <span className={styles.select}></span>
        </div>
    )
}

export default AdderFilter;