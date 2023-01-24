import { observer } from 'mobx-react-lite';
import { imgsStore } from '../../../../stores/imgsStore';
import { modalStore } from '../../../../stores/modalStore';
import { postStore } from '../../../../stores/postStore';
import { previewStore } from '../../../../stores/previewStore';
import styles from './preview-modal.module.scss';

function PreviewModal() {

	if (!modalStore.modalPreview) return null;

	return (
		<>
			<div className={styles.container}>
				<div className={styles.head}>
					<div className={styles.head__icon}></div>
					<span className={styles.head__text}>Предпросмотр</span>
				</div>
				<div className='socs'>
					<input
						type='radio'
						name='soc'
						className={'telega'}
						onClick={() => {
							previewStore.changeModalTg(true);
							previewStore.changeModalVk(false);
						}}
					/>
					<input
						type='radio'
						name='soc'
						className={'vk'}
						onClick={() => {
							previewStore.changeModalTg(false);
							previewStore.changeModalVk(true);
						}}
					/>
				</div>
				<div>
					{(postStore.textPost || imgsStore.activeImgs) && previewStore.vk && (
						<div
							className={styles.preview}
							style={{ padding: '16px 20px 16px 20px' }}
						>
							<div className={styles.head__post}>
								<div style={{ display: 'flex', alignItems: '' }}>
									<div className={styles.avatar}></div>
									<span className={styles.name}>Сергей Жданов</span>
								</div>
								<svg
									width='20'
									height='20'
									color='gray'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<g
										id='more_horizontal_24__Page-2'
										stroke='none'
										stroke-width='1'
										fill='none'
										fill-rule='evenodd'
									>
										<g id='more_horizontal_24__more_horizontal_24'>
											<path
												id='more_horizontal_24__Bounds'
												d='M24 0H0v24h24z'
											></path>
											<path
												d='M18 10a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2c0-1.1.9-2 2-2Zm-6 4a2 2 0 0 1-2-2c0-1.1.9-2 2-2a2 2 0 0 1 2 2 2 2 0 0 1-2 2Zm-6 0a2 2 0 0 1-2-2c0-1.1.9-2 2-2a2 2 0 0 1 2 2 2 2 0 0 1-2 2Z'
												id='more_horizontal_24__Mask'
												fill='currentColor'
											></path>
										</g>
									</g>
								</svg>
							</div>
							<div
								className={styles.content}
								style={{ padding: '0px', marginBottom: '16px' }}
							>
								{postStore.textPost}
							</div>
							{imgsStore.activeImgs && (
								<div
									className={
										imgsStore.activeImgs.length % 2 === 0
											? styles.imgsVK2
											: styles.imgsVK3
									}
								>
									{imgsStore.activeImgs.map((img: string, key: number) => {
										return (
											<img
												src={`http://localhost:5000/static/imgs/${img}`}
												alt=''
												key={key}
											/>
										);
									})}
								</div>
							)}
							<div
								className={styles.eye__container}
								style={{
									marginTop: '16px',
									justifyContent: 'space-between',
									padding: '0',
								}}
							>
								<div className={styles.reaction}>
									<div className={styles.background}>
										<svg
											height='24'
											color='gray'
											viewBox='0 0 24 24'
											width='24'
											xmlns='http://www.w3.org/2000/svg'
										>
											<g fill='none' fill-rule='evenodd'>
												<path d='M0 0h24v24H0z'></path>
												<path
													d='M16 4a5.95 5.95 0 0 0-3.89 1.7l-.12.11-.12-.11A5.96 5.96 0 0 0 7.73 4 5.73 5.73 0 0 0 2 9.72c0 3.08 1.13 4.55 6.18 8.54l2.69 2.1c.66.52 1.6.52 2.26 0l2.36-1.84.94-.74c4.53-3.64 5.57-5.1 5.57-8.06A5.73 5.73 0 0 0 16.27 4zm.27 1.8a3.93 3.93 0 0 1 3.93 3.92v.3c-.08 2.15-1.07 3.33-5.51 6.84l-2.67 2.08a.04.04 0 0 1-.04 0L9.6 17.1l-.87-.7C4.6 13.1 3.8 11.98 3.8 9.73A3.93 3.93 0 0 1 7.73 5.8c1.34 0 2.51.62 3.57 1.92a.9.9 0 0 0 1.4-.01c1.04-1.3 2.2-1.91 3.57-1.91z'
													fill='currentColor'
													fill-rule='nonzero'
												></path>
											</g>
										</svg>
									</div>
									<div className={styles.background}>
										<svg
											height='24'
											color='gray'
											viewBox='0 0 24 24'
											width='24'
											xmlns='http://www.w3.org/2000/svg'
										>
											<g fill='none' fill-rule='evenodd'>
												<path d='M0 0h24v24H0z'></path>
												<path
													d='M16.9 4H7.1c-1.15 0-1.73.11-2.35.44-.56.3-1 .75-1.31 1.31C3.11 6.37 3 6.95 3 8.1v5.8c0 1.15.11 1.73.44 2.35.3.56.75 1 1.31 1.31l.15.07c.51.25 1.04.35 1.95.37h.25v2.21c0 .44.17.85.47 1.16l.12.1c.64.55 1.6.52 2.21-.08L13.37 18h3.53c1.15 0 1.73-.11 2.35-.44.56-.3 1-.75 1.31-1.31.33-.62.44-1.2.44-2.35V8.1c0-1.15-.11-1.73-.44-2.35a3.17 3.17 0 0 0-1.31-1.31A4.51 4.51 0 0 0 16.9 4zM6.9 5.8h9.99c.88 0 1.18.06 1.5.23.25.13.44.32.57.57.17.32.23.62.23 1.5v6.16c-.02.61-.09.87-.23 1.14-.13.25-.32.44-.57.57-.32.17-.62.23-1.5.23h-4.02a.9.9 0 0 0-.51.26l-3.47 3.4V17.1c0-.5-.4-.9-.9-.9H6.74a2.3 2.3 0 0 1-1.14-.23 1.37 1.37 0 0 1-.57-.57c-.17-.32-.23-.62-.23-1.5V7.74c.02-.61.09-.87.23-1.14.13-.25.32-.44.57-.57.3-.16.58-.22 1.31-.23z'
													fill='currentColor'
													fill-rule='nonzero'
												></path>
											</g>
										</svg>
									</div>
									<div className={styles.background}>
										<svg
											height='24'
											color='gray'
											viewBox='0 0 24 24'
											width='24'
											xmlns='http://www.w3.org/2000/svg'
										>
											<g fill='none' fill-rule='evenodd'>
												<path d='M0 0h24v24H0z'></path>
												<path
													d='M12 3.73c-1.12.07-2 1-2 2.14v2.12h-.02a9.9 9.9 0 0 0-7.83 10.72.9.9 0 0 0 1.61.46l.19-.24a9.08 9.08 0 0 1 5.84-3.26l.2-.03.01 2.5a2.15 2.15 0 0 0 3.48 1.69l7.82-6.14a2.15 2.15 0 0 0 0-3.38l-7.82-6.13c-.38-.3-.85-.46-1.33-.46zm.15 1.79c.08 0 .15.03.22.07l7.82 6.14a.35.35 0 0 1 0 .55l-7.82 6.13a.35.35 0 0 1-.57-.28V14.7a.9.9 0 0 0-.92-.9h-.23l-.34.02c-2.28.14-4.4.98-6.12 2.36l-.17.15.02-.14a8.1 8.1 0 0 1 6.97-6.53.9.9 0 0 0 .79-.9V5.87c0-.2.16-.35.35-.35z'
													fill='currentColor'
													fill-rule='nonzero'
												></path>
											</g>
										</svg>
									</div>
								</div>
								<div className={styles.eye}></div>
							</div>
						</div>
					)}
					{(postStore.textPost || imgsStore.activeImgs) && previewStore.tg && (
						<div className={styles.preview}>
							{imgsStore.activeImgs && (
								<div
									className={
										imgsStore.activeImgs.length % 2 === 0
											? styles.imgs2
											: styles.imgs3
									}
								>
									{imgsStore.activeImgs.map((img: string, key: number) => {
										return (
											<img
												className={styles.img2}
												src={`http://localhost:5000/static/imgs/${img}`}
												alt=''
												key={key}
											/>
										);
									})}
								</div>
							)}
							<div className={styles.content}>{postStore.textPost}</div>
							<div className={styles.eye__container}>
								<div className={styles.eye}></div>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default observer(PreviewModal);
