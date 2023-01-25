import styles from './post-modal.module.scss';
import { modalStore } from '../../../stores/modalStore';
import { observer } from 'mobx-react-lite';
import DateModal from './date-modal/date-modal';
import { dateStore } from '../../../stores/dateStore';
import { postStore } from '../../../stores/postStore';
import ThemeModal from './theme-modal/theme-modal';
import axios from 'axios';
import { tokenStore } from '../../../stores/tokenStore';
import { oneProjectStore } from '../../../stores/oneProjectStore';
import TgModal from './tg-modal/tg-modal';
import VkModal from './vk-modal/vk-modal';
import { userStore } from '../../../stores/userdataStore';
import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import MoreModal from './more-modal/more-modal';
import { imgsStore } from '../../../stores/imgsStore';
import Patterns from './patterns/patterns';
import { commentStore } from '../../../stores/commentStore';
import { previewStore } from '../../../stores/previewStore';
import SocModal from './soc-modal/soc-modal';

type PostProps = {
	type: string;
	title: string;
};

function PostModal({ type, title }: PostProps) {
	const [alert, setAlert] = useState('');
	const [value, setValue] = useState('');

	async function deleteUpload() {
		if (imgsStore.activeImgs.length === 0) {
			return;
		}
		await axios({
			method: 'delete',
			headers: { Authorization: 'Bearer ' + tokenStore.token },
			url: `${process.env.REACT_APP_API_URL}api/img/delete`,
			data: { imgs: imgsStore.activeImgs },
		})
			.then(response => {
				console.log(response.data);
				imgsStore.resetActiveImgs();
			})
			.catch(error => {
				console.log(error.response.data.message);
			});
	}

	async function resetAll() {
		modalStore.changeModalPost();
		postStore.resetActiveArray();
		setAlert('');
		if (modalStore.modalMore) modalStore.changeModalMore();
		if (postStore.updatePost) postStore.changeUpdatePost();
		if (modalStore.modalTalk) {
			modalStore.changeModalTalk();
			commentStore.changeCommentArray(commentStore.resetCommentArray());
		}
		if (modalStore.modalPreview) modalStore.changeModalPreview();
		if (dateStore.currentDate > 0) dateStore.changeCurrentDate(0);
		if (modalStore.patterns) modalStore.changePatterns();
		if (postStore.activePostIsPublished)
			postStore.changeActivePostPublished(false);
		imgsStore.resetActiveImgs();
		previewStore.changeModalTg(false);
		previewStore.changeModalVk(false);
	}

	async function addPlanPost() {
		let time;
		if (dateStore.currentDate === 0) time = dateStore.dateM + dateStore.timeM;
		else {
			time = dateStore.currentDate;
			if (time < Date.now()) {
				setAlert('Время публикации в прошлом.');
				return;
			}
		}
		if (postStore.activeSocArray.length === 0)
			setAlert('Пожалуйста, выберите аккаунты для публикации.');
		else if (postStore.activeThemeArray.length > 3)
			setAlert('Пожалуйста, выберите не больше трех тем.');
		else {
			if (postStore.textPost.length === 0)
				setAlert('Вы не можете разместить публикацию без текста.');
			else {
				let data = {
					text: postStore.textPost,
					time: time,
					img: imgsStore.activeImgs,
					draft: false,
					talk: false,
					plan: true,
					socnetid: postStore.activeSocArray,
					themeid: postStore.activeThemeArray,
					projectid: oneProjectStore.activeProject.id,
					nameCreator: userStore.userdata.name,
				};
				type === 'talk'
					? (data = { ...data, talk: true, plan: false })
					: (data = { ...data, talk: false, plan: true });
				await axios({
					method: `${postStore.updatePost ? 'put' : 'post'}`,
					url: `${process.env.REACT_APP_API_URL}api/post/${
						postStore.updatePost ? 'update' : 'add'
					}`,
					headers: { Authorization: 'Bearer ' + tokenStore.token },
					data: postStore.updatePost
						? {
								...data,
								postid: postStore.activePostId,
								talk: false,
								plan: true,
						  }
						: data,
				})
					.then(async response => {
						if (
							!postStore.updatePost &&
							dateStore.currentDate === 0 &&
							postStore.checkSocNetTg(response.data.post.socnetId)
						) {
							await axios({
								method: 'post',
								url: `${process.env.REACT_APP_API_URL}api/telegram/publish`,
								headers: { Authorization: 'Bearer ' + tokenStore.token },
								data: { postid: response.data.post.id },
							})
								.then(response => {
									console.log(response.data);
								})
								.catch(error => {
									console.log(error.response.data.message);
								});
						}
						if (
							!postStore.updatePost &&
							postStore.checkSocNetVk(response.data.post.socnetId)
						) {
							await axios({
								method: 'post',
								url: `${process.env.REACT_APP_API_URL}api/vk/post`,
								headers: { Authorization: 'Bearer ' + tokenStore.token },
								data: { postid: response.data.post.id },
							})
								.then(response => {
									console.log(response.data);
								})
								.catch(error => {
									console.log(error.response.data.message);
									setAlert('Уже существует пост в это время!');
								});
						}
					})
					.catch(error => {
						console.log(error.response.data.message);
					});
				resetAll();
				modalStore.changeAddPost();
				console.log(imgsStore.activeImgs);
			}
		}
	}

	async function addDraftPost() {
		if (postStore.activeThemeArray.length > 3)
			setAlert('Выберите не больше трех тем!');
		const data = {
			text: postStore.textPost,
			time: dateStore.dateM + dateStore.timeM,
			img: imgsStore.activeImgs,
			draft: true,
			talk: false,
			plan: false,
			socnetid: postStore.activeSocArray,
			themeid: postStore.activeThemeArray,
			projectid: oneProjectStore.activeProject.id,
			nameCreator: userStore.userdata.name,
		};
		await axios({
			method: `${postStore.updatePost ? 'put' : 'post'}`,
			url: `${process.env.REACT_APP_API_URL}api/post/${
				postStore.updatePost ? 'update' : 'add'
			}`,
			headers: { Authorization: 'Bearer ' + tokenStore.token },
			data: postStore.updatePost
				? { ...data, postid: postStore.activePostId }
				: data,
		})
			.then(response => {
				console.log(response.data);
			})
			.catch(error => {
				console.log(error.response.data.message);
			});
		resetAll();
		modalStore.changeAddPost();
	}

	async function onClickDelete() {
		await axios({
			method: `delete`,
			url: `${process.env.REACT_APP_API_URL}api/post/delete`,
			headers: { Authorization: 'Bearer ' + tokenStore.token },
			data: { postid: postStore.activePostId },
		})
			.then(response => {
				console.log(response.data);
			})
			.catch(error => {
				console.log(error.response.data.message);
			});
		resetAll();
		modalStore.changeAddPost();
	}

	async function onClickTalk() {
		let time;
		if (dateStore.currentDate === 0) time = dateStore.dateM + dateStore.timeM;
		else {
			time = dateStore.currentDate;
			if (time < Date.now()) {
				setAlert('Время публикации в прошлом.');
				return;
			}
		}
		if (postStore.activeSocArray.length === 0)
			setAlert('Пожалуйста, выберите аккаунты для публикации.');
		else if (postStore.activeThemeArray.length > 3)
			setAlert('Пожалуйста, выберите не больше трех тем.');
		else {
			if (postStore.textPost.length === 0)
				setAlert('Вы не можете разместить публикацию без текста.');
			else {
				await axios({
					method: `put`,
					url: `${process.env.REACT_APP_API_URL}api/post/update`,
					headers: { Authorization: 'Bearer ' + tokenStore.token },
					data: {
						text: postStore.textPost,
						time: dateStore.dateM + dateStore.timeM,
						img: imgsStore.activeImgs,
						draft: false,
						talk: true,
						plan: false,
						socnetid: postStore.activeSocArray,
						themeid: postStore.activeThemeArray,
						projectid: oneProjectStore.activeProject.id,
						nameCreator: userStore.userdata.name,
						postid: postStore.activePostId,
					},
				})
					.then(response => {
						console.log(response.data);
					})
					.catch(error => {
						console.log(error.response.data.message);
					});
				resetAll();
				modalStore.changeAddPost();
			}
		}
	}

	function changeSocnetArray(e: any) {
		postStore.addActiveSocnet(Number(e.currentTarget.dataset.id));
		setAlert('');
	}

	function changeThemeArray(e: any) {
		postStore.addActiveTheme(Number(e.currentTarget.dataset.id));
		setAlert('');
	}

	function changeTextPost(e: any) {
		postStore.changeTextPost(e.target.value);
		setAlert('');
	}

	async function uploadFile(e: any) {
		setValue('');
		const files = e.target.files;
		const form = new FormData();
		for (let i = 0; i < files.length; i++) {
			form.append('file', files[i]);
		}
		await axios({
			method: `post`,
			url: `${process.env.REACT_APP_API_URL}api/img/upload`,
			headers: { Authorization: 'Bearer ' + tokenStore.token },
			data: form,
		})
			.then(response => {
				console.log(response.data);
				response.data.imgs.map((img: string) => {
					return imgsStore.addActiveImg(img);
				});
			})
			.catch(error => {
				console.log(error);
			});
		if (imgsStore.activeImgs.length > 10) {
			setAlert('Пост может иметь не больше 10 изображений.');
		}
		console.log(imgsStore.activeImgs);
	}

	if (!modalStore.modalPost) {
		return null;
	}

	return (
		<>
			<div
				onClick={() => {
					if (!postStore.updatePost) deleteUpload();
					resetAll();
				}}
				className={styles.black}
			></div>
			<div className={styles.container}>
				<div>
					<div className={styles.head}>
						<span>
							{(type === 'post' || type === 'talk') && postStore.updatePost
								? 'Публикация'
								: type === 'draft' && postStore.updatePost
								? 'Черновик'
								: title}
						</span>
						<div className={styles.head__icons}>
							<div
								onClick={() => {
									modalStore.changeModalPreview();
									previewStore.changeModalTg(false);
									previewStore.changeModalVk(false);
								}}
								className={styles.eye}
							></div>
							<div
								onClick={() => {
									if (modalStore.modalTalk)
										commentStore.changeCommentArray(
											commentStore.resetCommentArray()
										);
									modalStore.changeModalTalk();
								}}
								className={styles.comment}
							></div>
							<div
								onClick={() => {
									if (!postStore.updatePost) deleteUpload();
									resetAll();
								}}
								className={styles.exit}
							></div>
						</div>
					</div>
					<div className={styles.soc__container}>
						{postStore.socArray.length === 0 ? (
							<>
								<div className='socs'>
									<div
										onClick={() => modalStore.changeModalTg()}
										className={'telega'}
									/>
									<a
										onClick={() => modalStore.changeModalVk()}
										className={'vk'}
									/>
								</div>
								<TgModal />
								<VkModal />
							</>
						) : (
							postStore.socArray.map((soc: any, key: number) => {
								return (
									<input
										type='checkbox'
										data-id={soc.id}
										className={soc.socnet}
										style={{ marginRight: '8px' }}
										key={key}
										checked={
											postStore.activeSocArray.includes(soc.id) ? true : false
										}
										onChange={changeSocnetArray}
									/>
								);
							})
						)}
						{postStore.socArray.length > 0 && (
							<>
								<div
									onClick={() => modalStore.changeModalSoc()}
									className={styles.plus}
								></div>
								<TgModal />
								<VkModal />
								<SocModal />
							</>
						)}
					</div>
					<div className={styles.post}>
						<textarea
							name='post'
							placeholder='Напишите текст'
							className={styles.textarea}
							onChange={changeTextPost}
							value={postStore.textPost}
						/>
						{imgsStore.activeImgs && (
							<div className={styles.preview__container}>
								{imgsStore.activeImgs.map((img: string, key: number) => {
									return (
										<img
											className={styles.preview}
											src={`${process.env.REACT_APP_API_URL}static/imgs/${img}`}
											alt=''
											key={key}
										/>
									);
								})}
							</div>
						)}
						<div className={styles.post__bar}>
							<label className={styles.bar__addfile}>
								<input
									className={styles.bar__input}
									type='file'
									accept='image/*,.png,.jpg,.gif,.web'
									value={value}
									onChange={uploadFile}
									multiple
								/>
							</label>

							<div className={styles.bar__container__emoji}>
								<div className={styles.emoji}></div>
								<div
									onClick={() => {
										modalStore.changePatterns();
									}}
									className={styles.pattern}
								></div>
								<Patterns />
							</div>
						</div>
					</div>
					<DateModal />
					<div className={styles.themes}>
						<span style={{ marginRight: '22px' }}>Темы:</span>
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
													onChange={() => {}}
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
				<div className={styles.buttons__container}>
					{postStore.activePostIsPublished ? (
						<div className={styles.published}>
							<span>
								Опубликован{' '}
								<span style={{ fontWeight: '600' }}>
									{dayjs(dateStore.currentDate)
										.locale('ru')
										.format('D MMMM HH:mm')}
								</span>
							</span>
						</div>
					) : (
						<></>
					)}
					{postStore.socArray.length === 0 ? (
						<div className={styles.warning}>
							Подключите страницы в соцсети, чтобы опубликовать пост
						</div>
					) : alert === '' ? (
						<></>
					) : (
						<div className={styles.alert}>{alert}</div>
					)}

					<div
						className={styles.buttons}
						style={{
							justifyContent: type === 'talk' ? 'flex-end' : 'space-between',
						}}
					>
						{postStore.activePostIsPublished ? (
							<button onClick={onClickDelete} className={styles.button__delete}>
								<span>Удалить</span>
							</button>
						) : type === 'talk' ? (
							<></>
						) : (
							<button
								onClick={() => {
									modalStore.changeModalMore();
								}}
								className={styles.button__draftortalk}
							></button>
						)}

						<MoreModal
							onClickDraft={addDraftPost}
							onClickDelete={onClickDelete}
							onClickTalk={onClickTalk}
						/>
						{postStore.activePostIsPublished ? (
							<button
								onClick={() => {
									postStore.changeUpdatePost();
									postStore.changeActivePostPublished(false);
									dateStore.changeCurrentDate(0);
								}}
								className={styles.button__copy}
							>
								Создать копию
							</button>
						) : (
							<div>
								{dateStore.currentDate === 0 ? (
									<>
										<button
											onClick={() => {
												dateStore.changeCalendar();
												dateStore.resetAll();
											}}
											className={styles.button__plan}
										>
											Запланировать
										</button>
										<button
											onClick={type === 'draft' ? addDraftPost : addPlanPost}
											className={styles.button__create}
										>
											{type === 'talk' && postStore.updatePost
												? 'Утвердить'
												: type === 'talk'
												? 'На утверждение'
												: type === 'draft'
												? 'В черновики'
												: 'Опубликовать'}
										</button>
									</>
								) : (
									<div className={styles.dateAndButton}>
										<button
											onClick={() => {
												dateStore.changeCalendar();
												setAlert('');
											}}
											className={styles.button__time}
										>
											{`${dayjs(dateStore.currentDate)
												.locale('ru')
												.format('DD MMM HH:mm')}`}
										</button>
										<div
											onClick={() => {
												dateStore.changeCurrentDate(0);
											}}
											style={{
												paddingLeft: '15px',
												marginLeft: '-55px',
												marginRight: '15px',
												borderLeft: '1px solid gray',
											}}
											className={styles.exit}
										></div>
										<button
											onClick={addPlanPost}
											className={styles.button__create}
										>
											{type === 'talk' && postStore.updatePost
												? 'Утвердить'
												: type === 'talk'
												? 'На утверждение'
												: type === 'draft'
												? 'В черновики'
												: 'Запланировать'}
										</button>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default observer(PostModal);
