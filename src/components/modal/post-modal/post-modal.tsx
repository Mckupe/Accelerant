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
import { userStore } from '../../../stores/userdataStore';
import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import MoreModal from './more-modal/more-modal';
import { toJS } from 'mobx';

type PostProps = {
	type: string;
	title: string;
};

function PostModal({ type, title }: PostProps) {
	const [alert, setAlert] = useState('');

	function resetAll() {
		modalStore.changeModalPost();
		postStore.resetActiveArray();
		setAlert('');
		if (modalStore.modalMore) modalStore.changeModalMore();
		if (postStore.updatePost) postStore.changeUpdatePost();
		if (modalStore.modalTalk) modalStore.changeModalTalk();
		if (dateStore.currentDate > 0) dateStore.changeCurrentDate(0);
	}

	async function addPlanPost() {
		let time;
		if (dateStore.currentDate === 0) time = dateStore.dateM + dateStore.timeM;
		else time = dateStore.currentDate;
		if (postStore.activeSocArray.length === 0)
			setAlert('Пожалуйста, выберите аккаунты для публикации.');
		else if (postStore.activeThemeArray.length > 3)
			setAlert('Пожалуйста, выберите не больше трех тем.');
		else {
			if (postStore.textPost.length === 0)
				setAlert('Вы не можете разместить публикацию без текста.');
			else {
				const data = {
					text: postStore.textPost,
					time: time,
					draft: false,
					talk: false,
					plan: true,
					socnetid: postStore.activeSocArray,
					themeid: postStore.activeThemeArray,
					projectid: oneProjectStore.activeProject.id,
					nameCreator: userStore.userdata.name,
				};
				await axios({
					method: `${postStore.updatePost ? 'put' : 'post'}`,
					url: `http://localhost:5000/api/post/${
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
		}
	}

	async function addDraftPost() {
		if (postStore.activeThemeArray.length > 3)
			setAlert('Выберите не больше трех тем!');
		const data = {
			text: postStore.textPost,
			time: dateStore.dateM + dateStore.timeM,
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
			url: `http://localhost:5000/api/post/${
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
			url: `http://localhost:5000/api/post/delete`,
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

	if (!modalStore.modalPost) {
		return null;
	}

	return (
		<>
			<div onClick={resetAll} className={styles.black}></div>
			<div className={styles.container}>
				<div>
					<div className={styles.head}>
						<span>
							{type === 'post' && postStore.updatePost
								? 'Публикация'
								: type === 'draft' && postStore.updatePost
								? 'Черновик'
								: title}
						</span>
						<div className={styles.head__icons}>
							<div className={styles.eye}></div>
							<div
								onClick={() => {
									modalStore.changeModalTalk();
								}}
								className={styles.comment}
							></div>
							<div
								onClick={() => {
									modalStore.changeModalPost();
									postStore.resetActiveArray();
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
									<div className={'vk'} />
								</div>
								<TgModal />
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
						<div className={styles.plus}></div>
					</div>
					<div className={styles.post}>
						<textarea
							name='post'
							placeholder='Напишите текст'
							className={styles.textarea}
							onChange={changeTextPost}
							value={postStore.textPost}
						/>
						<div className={styles.post__bar}>
							<div className={styles.bar__addfile}></div>
							<div className={styles.bar__container__emoji}>
								<div className={styles.emoji}></div>
								<div className={styles.pattern}></div>
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
				{postStore.socArray.length === 0 ? (
					<div className={styles.warning}>
						Подключите страницы в соцсети, чтобы опубликовать пост
					</div>
				) : alert === '' ? (
					<></>
				) : (
					<div className={styles.alert}>{alert}</div>
				)}
				<div className={styles.buttons}>
					<button
						onClick={() => {
							modalStore.changeModalMore();
						}}
						className={styles.button__draftortalk}
					></button>
					<MoreModal
						onClickDraft={addDraftPost}
						onClickDelete={onClickDelete}
					/>
					<div>
						{dateStore.currentDate === 0 ? (
							<>
								<button
									onClick={() => {
										dateStore.changeCalendar();
									}}
									className={styles.button__plan}
								>
									Запланировать
								</button>
								<button onClick={type === 'draft' ? addDraftPost : addPlanPost} className={styles.button__create}>
									Опубликовать
								</button>
							</>
						) : (
							<div className={styles.dateAndButton}>
								<button
									onClick={() => {
										dateStore.changeCalendar();
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
										marginRight: '25px',
										borderLeft: '1px solid gray',
									}}
									className={styles.exit}
								></div>
								<button onClick={addPlanPost} className={styles.button__create}>
									Запланировать
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default observer(PostModal);
