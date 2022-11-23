import styles from './post.module.scss';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { postStore } from '../../stores/postStore';
import axios from 'axios';
import { tokenStore } from '../../stores/tokenStore';
import { modalStore } from '../../stores/modalStore';
import { dateStore } from '../../stores/dateStore';
import { commentStore } from '../../stores/commentStore';

type ProjectProps = {
	id: number;
	text: string;
	date: string;
	nameCreator: string;
	arrSoc: Array<number>;
	arrTheme: Array<number>;
};

function Post({
	id,
	date,
	nameCreator,
	arrSoc,
	arrTheme,
	text,
}: ProjectProps) {

	async function updatePost(e: any) {
		const id = e.currentTarget.dataset.id;
		await axios({
			method: 'get',
			url: 'http://localhost:5000/api/post/getOne',
			headers: { Authorization: 'Bearer ' + tokenStore.token },
			params: {postid: id}
		})
			.then(response => {
				console.log(response.data.posts);
				const post = response.data.posts;
				postStore.changeActivePostId(post.post.id);
				postStore.activeSocArray = post.post.socnetId;
				postStore.activeThemeArray = post.post.themeId;
				dateStore.changeCurrentDate(Number(post.post.time));
				postStore.changeTextPost(post.text);
			})
			.catch(error => {
				console.log(error.response.data.message);
			});
		await axios({
			method: 'get',
			url: 'http://localhost:5000/api/comment/get',
			headers: { Authorization: 'Bearer ' + tokenStore.token },
			params: { postid: id },
		})
			.then(response => {
				console.log(response.data.comments);
				commentStore.addDbComment(response.data.comments);
			})
			.catch(error => {
				console.log(error.response.data.message);
			});
		modalStore.changeModalPost();
		postStore.changeUpdatePost();
	}

	return (
		<div onClick={updatePost} data-id={id} className={styles.container}>
			<div className={styles.head}>
				<div className={styles.head__date}>
					{moment(date, 'x').format('DD.MM HH:mm')}
				</div>
				<div className={styles.head__themes}>
					{arrTheme ? (
						arrTheme.map((theme: number, i: number) => {
							const the = postStore.getThemeName(theme);
							return (
								<div
									key={i}
									className={styles.theme}
									style={{
										backgroundColor: `#${the!.color}`,

										maxWidth:
											arrTheme.length === 1
												? '70px'
												: arrTheme.length === 2
												? '35px'
												: '23px',
									}}
								>
									<div className={styles.anim}>{the!.theme}</div>
								</div>
							);
						})
					) : (
						<></>
					)}
				</div>
			</div>
			<div className={styles.text}>
				<div className={styles.spans}>{text}</div>
			</div>
			<div className={styles.img}></div>
			<div className={styles.main}>
				<div className={styles.main__container}>
					{arrSoc ? (
						arrSoc.map((soc: number, i: number) => {
							return (
								<div
									className={postStore.getSocName(soc)}
									style={{
										width: '20px',
										height: '20px',
										backgroundSize: '20px',
										border: 'none',
									}}
									key={i}
								/>
							);
						})
					) : (
						<></>
					)}
				</div>
				<div className={styles.main__user}>{nameCreator}</div>
			</div>
		</div>
	);
};

export default observer(Post);
