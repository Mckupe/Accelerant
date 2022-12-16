import { observer } from 'mobx-react-lite';
import { filterStore } from '../../../stores/filterStore';
import { modalStore } from '../../../stores/modalStore';
import { postStore } from '../../../stores/postStore';
import styles from './themes.module.scss';

function Themes() {
	function onClickTheme(theme: Theme) {
		filterStore.changeActiveTheme(theme);
	}

	if (!modalStore.modalFilterThemes) return null;

	return (
		<div className={styles.container}>
			<div
				onClick={(e: any) => {
					e.stopPropagation();
					modalStore.changeModalFilterThemes();
					onClickTheme({id: 0, theme: 'Все', color: ''});
				}}
				className={styles.theme}
			>
				<span>Все</span>
			</div>
			{postStore.themeArray.map((theme: Theme, key: number) => {
				return (
					<div
						onClick={(e: any) => {
							e.stopPropagation();
							modalStore.changeModalFilterThemes();
							onClickTheme(theme);
						}}
						className={styles.theme}
						key={key}
					>
						<span>{theme.theme}</span>
					</div>
				);
			})}
		</div>
	);
}

export default observer(Themes);
