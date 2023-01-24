import styles from './post.module.scss';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { postStore } from '../../stores/postStore';
import axios from 'axios';
import { tokenStore } from '../../stores/tokenStore';
import { modalStore } from '../../stores/modalStore';
import { dateStore } from '../../stores/dateStore';
import { commentStore } from '../../stores/commentStore';
import { imgsStore } from '../../stores/imgsStore';

type ProjectProps = {
	id: number;
	text: string;
	date: string;
	nameCreator: string;
	arrImgs: Array<string>;
	arrSoc: Array<number>;
	arrTheme: Array<number>;
	type: string;
	published: boolean;
};

function Post({
	id,
	date,
	arrImgs,
	nameCreator,
	arrSoc,
	arrTheme,
	text,
	type,
	published,
}: ProjectProps) {
	async function updatePost(e: any) {
		const id = e.currentTarget.dataset.id;
		await axios({
			method: 'get',
			url: `${process.env.REACT_APP_API_URL}api/post/getOne`,
			headers: { Authorization: 'Bearer ' + tokenStore.token },
			params: { postid: id },
		})
			.then(response => {
				console.log(response.data.posts);
				const post = response.data.posts;
				postStore.changeActivePostId(post.post.id);
				postStore.changeActivePostPublished(post.post.published);
				postStore.activeSocArray = post.post.socnetId;
				postStore.activeThemeArray = post.post.themeId;
				dateStore.changeCurrentDate(Number(post.post.time));
				postStore.changeTextPost(post.text);
				imgsStore.activeImgs = post.img;
			})
			.catch(error => {
				console.log(error);
			});
		await axios({
			method: 'get',
			url: `${process.env.REACT_APP_API_URL}api/comment/get`,
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
		<div
			onClick={updatePost}
			data-id={id}
			className={styles.container}
			style={{ opacity: published ? '0.7' : '1' }}
		>
			<div className={styles.head}>
				<div className={styles.head__date}>
					{type === 'post'
						? moment(date, 'x').format('HH:mm')
						: moment(date, 'x').format('DD.MM HH:mm')}
				</div>
				<div className={styles.head__themes}>
					{arrTheme ? (
						arrTheme.map((theme: number, key: number) => {
							const the = postStore.getThemeName(theme);
							return (
								<div
									key={key}
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
			<div className={styles.img}>
				{arrImgs.map((img: string, key: number) => {
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
			<div className={styles.main}>
				<div className={styles.main__container}>
					{arrSoc ? (
						arrSoc.map((soc: number, key: number) => {
							return (
								<div
									className={postStore.getSocName(soc)}
									style={{
										width: '20px',
										height: '20px',
										backgroundSize: '20px',
										border: 'none',
									}}
									key={key}
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
}

export default observer(Post);
