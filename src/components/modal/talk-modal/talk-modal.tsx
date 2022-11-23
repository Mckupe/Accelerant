import axios from 'axios';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { commentStore } from '../../../stores/commentStore';
import { modalStore } from '../../../stores/modalStore';
import { postStore } from '../../../stores/postStore';
import { tokenStore } from '../../../stores/tokenStore';
import { userStore } from '../../../stores/userdataStore';
import { wsStore } from '../../../stores/wsStore';
import styles from './talk-modal.module.scss';

function TalkModal() {
	const [value, setValue] = useState('');
	const [valid, setValid] = useState(true);

	useEffect(() => {
		setValid(true);
	}, [modalStore.modalTalk]);

	useEffect(() => {
		wsStore.ws.onmessage = message => {
			console.log(JSON.parse(message.data).text);
			commentStore.addComment(JSON.parse(message.data));
		};
	}, []);

	async function sendMessege() {
		const re = /^.{1,20}$/;
		if (!re.test(value)) {
			setValid(false);
		} else {
			wsStore.ws.send(
				JSON.stringify({
					text: value,
					nameCreator: userStore.userdata.name,
					postid: postStore.activePostId,
				})
			);
			await axios({
				method: 'post',
				url: 'http://localhost:5000/api/comment/add',
				headers: { Authorization: 'Bearer ' + tokenStore.token },
				data: { postid: postStore.activePostId, text: value },
			})
				.then(response => {
					console.log(response.data);
				})
				.catch(error => {
					console.log(error.response.data.message);
				});
			setValue('');
			setValid(true);
		}
	}

	const onPressEnter = (event: any) => {
		if (event.keyCode === 13) {
			sendMessege();
		}
	};

	if (!modalStore.modalTalk) return null;

	return (
		<>
			<div className={styles.container}>
				<div className={styles.head}>
					<div className={styles.head__icon}></div>
					<span className={styles.head__text}>Комментарии</span>
				</div>
				<div
					className={styles.all__comment}
					style={{ justifyContent: postStore.updatePost ? 'start' : 'center' }}
				>
					{commentStore.dbCommentArray.map((comment: Coment, key: number) => {
						return (
							<div className={styles.comment__container} key={key}>
								<div className={styles.comment__user}>
									<div className={styles.user__icon}></div>
									<span className={styles.user__name}>
										{comment.nameCreator}
									</span>
								</div>
								<div className={styles.text__container}>
									<span className={styles.text__comment}>{comment.text}</span>
									<div className={styles.time__comment}>
										{dayjs(comment.createdAt).format('DD.MM HH:mm')}
									</div>
								</div>
							</div>
						);
					})}
					{postStore.updatePost ? (
						commentStore.postComment.map((comment: Coment, key: number) => {
							return (
								<div className={styles.comment__container} key={key}>
									<div className={styles.comment__user}>
										<div className={styles.user__icon}></div>
										<span className={styles.user__name}>
											{comment.nameCreator}
										</span>
									</div>
									<div className={styles.text__container}>
										<span className={styles.text__comment}>{comment.text}</span>
										<div className={styles.time__comment}>
											{dayjs(new Date()).format('DD.MM HH:mm')}
										</div>
									</div>
								</div>
							);
						})
					) : (
						<div
							className={styles.comment__container}
							style={{ color: '#a8a8a8', textAlign: 'center', padding: '10px' }}
						>
							Вы сможите оставить комментарий после публикации поста.
						</div>
					)}
				</div>
				<div className={styles.input__container}>
					<input
						value={value}
						onChange={e => setValue(e.target.value)}
						placeholder='Комментарий'
						className={valid ? styles.input__comment : styles.input__invalid}
						pattern='.{1,20}'
						type='text'
						onKeyDown={onPressEnter}
						disabled={postStore.updatePost ? false : true}
						required
					/>
					<button
						onClick={sendMessege}
						className={styles.button__comment}
						disabled={postStore.updatePost ? false : true}
					></button>
				</div>
			</div>
		</>
	);
}

export default observer(TalkModal);
