import styles from './soc-modal.module.scss';
import { observer } from 'mobx-react-lite';
import { modalStore } from '../../../../stores/modalStore';

function SocModal() {
	if (!modalStore.modalSoc) return null;

	return (
		<>
			<div
				onClick={() => modalStore.changeModalSoc()}
				className={styles.black}
			></div>
			<div className={styles.container}>
				<span className={styles.title}>Выберете соц-сеть</span>
				<div className={styles.socs}>
					<div
						style={{ width: '100px', height: '100px', backgroundSize: '100px' }}
						onClick={() => {
							modalStore.changeModalTg();
							modalStore.changeModalSoc();
						}}
						className={'telega'}
					/>
					<div
						style={{ width: '100px', height: '100px', backgroundSize: '100px' }}
						onClick={() => {
							modalStore.changeModalVk();
							modalStore.changeModalSoc();
						}}
						className={'vk'}
					/>
				</div>
			</div>
		</>
	);
}

export default observer(SocModal);
