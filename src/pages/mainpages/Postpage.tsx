import axios from 'axios';
import { useEffect } from 'react';
import { tokenStore } from '../../stores/tokenStore';
import { observer } from 'mobx-react-lite';
import styles from './main.module.scss';
import Menu from '../../components/menu/menu';
import Header from '../../components/header/header';
import PostModal from '../../components/modal/post-modal/post-modal';
import { modalStore } from '../../stores/modalStore';
import { postStore } from '../../stores/postStore';
import TalkModal from '../../components/modal/talk-modal/talk-modal';
import Post from '../../components/post/post';
import { oneProjectStore } from '../../stores/oneProjectStore';
import dayjs from 'dayjs';
import { dateStore } from '../../stores/dateStore';
import { dayStore } from '../../stores/daysStore';
import { patternStore } from '../../stores/patternStore';
import PatternModal from '../../components/modal/pattern-modal/pattern-modal';
import { filterStore } from '../../stores/filterStore';

function Postpage() {
	useEffect(() => {
		async function getSocData() {
			await axios({
				method: 'get',
				url: 'http://localhost:5000/api/soc/get',
				headers: { Authorization: 'Bearer ' + tokenStore.token },
				params: { projectid: oneProjectStore.activeProject.id },
			})
				.then(response => {
					postStore.addSocArray(response.data.socs);
				})
				.catch(error => {
					console.log(error.response.data.message);
				});
		}
		getSocData();
	}, [modalStore.addTg]);

	useEffect(() => {
		async function patterns() {
			await axios({
				method: 'get',
				url: 'http://localhost:5000/api/pattern/get',
				headers: { Authorization: 'Bearer ' + tokenStore.token },
			})
				.then(response => {
					patternStore.resetArray();
					response.data.patterns.map((pattern: ObjectPattern) => {
						patternStore.addPattern(pattern);
					});
				})
				.catch(error => {
					console.log(error);
				});
		}
		patterns();
	}, [modalStore.addPattern]);

	const getDaysInMonth = (month: number, year: number) => {
		const dates = new Array(31)
			.fill('')
			.map((v, i) => new Date(year, month - 1, i + 1))
			.filter(v => v.getMonth() === month - 1);
		const result = dates.map(date => {
			return dayjs(date).locale('ru').format('D MMMM dddd');
		});
		return result;
	};

	useEffect(() => {
		async function getThemeData() {
			await axios({
				method: 'get',
				url: 'http://localhost:5000/api/theme/get',
				headers: { Authorization: 'Bearer ' + tokenStore.token },
				params: { projectid: oneProjectStore.activeProject.id },
			})
				.then(response => {
					postStore.addThemeArray(response.data.themes);
				})
				.catch(error => {
					console.log(error.response.data.message);
				});
		}
		getThemeData();
	}, [modalStore.addTheme]);

	useEffect(() => {
		async function getPosts() {
			await axios({
				method: 'get',
				url: 'http://localhost:5000/api/post/getAll',
				headers: { Authorization: 'Bearer ' + tokenStore.token },
				params: {
					projectid: oneProjectStore.activeProject.id,
					draft: false,
					talk: false,
					plan: true,
				},
			})
				.then(response => {
					console.log(response.data.posts);
					postStore.changePostsArray(response.data.posts);
				})
				.catch(error => {
					console.log(error.response.data);
				});
		}
		getPosts();
	}, [modalStore.addPost]);

	return (
		<div className={styles.main__container}>
			<Menu />
			<div className={styles.container}>
				<Header text={'Публикации'} type={'post'} />
				<div className={styles.main}>
					<div className={styles.adder__and__projects}>
						{/* <Adder text={'Новый пост'} type='post' /> */}
						<PostModal title={'Новый пост'} type={'post'} />
						<TalkModal />
						<div className={styles.main__days}>
							{getDaysInMonth(
								dayStore.dateForPosts.month,
								dayStore.dateForPosts.year
							).map((day: string, key: number) => {
								return postStore.getDayPosts(day, filterStore.activeTheme)
									.length > 0 ? (
									<div className={styles.main__oneday} key={key}>
										<span className={styles.day}>{day}</span>
										<div className={styles.day__posts}>
											{postStore.getDayPosts(day, filterStore.activeTheme)
												.length > 0 ? (
												postStore
													.getDayPosts(day, filterStore.activeTheme)
													.map((post: Posts, key: number) => {
														return (
															<Post
																id={post.post.id}
																date={post.post.time}
																nameCreator={post.post.nameCreator}
																arrSoc={post.post.socnetId}
																arrTheme={post.post.themeId}
																text={post.text}
																key={key}
																arrImgs={post.img}
																type='post'
																published={post.post.published}
															/>
														);
													})
											) : (
												<span className={styles.message}>
													Публикаций не запланировано
												</span>
											)}
										</div>
									</div>
								) : null;
							})}
						</div>
						<PatternModal />
					</div>
				</div>
			</div>
		</div>
	);
}

export default observer(Postpage);
