import { observer } from 'mobx-react-lite';
import { modalStore } from '../../../../stores/modalStore';
import { postStore } from '../../../../stores/postStore';
import styles from './more-modal.module.scss';

type MoreProps = {
	onClickDraft: React.MouseEventHandler<HTMLDivElement>;
	onClickDelete: React.MouseEventHandler<HTMLDivElement>;
};

function MoreModal({ onClickDraft, onClickDelete }: MoreProps) {
	if (!modalStore.modalMore) return null;

	return (
		<div
			className={styles.container}
			style={{ height: postStore.updatePost ? '132px' : '88px' }}
		>
			<div onClick={onClickDraft} className={styles.more__text}>
				<div className={styles.draft}></div>Черновик
			</div>
			<div className={styles.more__text}>
				<div className={styles.comment}></div>
				Обсуждение
			</div>
			{postStore.updatePost ? (
				<div
					onClick={onClickDelete}
					className={styles.more__text}
					style={{ color: '#FC5B5B' }}
				>
					<div className={styles.delete}></div>
					Удалить
				</div>
			) : (
				<></>
			)}
		</div>
	);
}

export default observer(MoreModal);
