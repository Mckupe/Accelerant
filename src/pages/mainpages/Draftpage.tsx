import axios from 'axios';
import { useEffect } from 'react';
import { tokenStore } from '../../stores/tokenStore';
import { observer } from 'mobx-react-lite';
import styles from './main.module.scss';
import Menu from '../../components/menu/menu';
import Header from '../../components/header/header';
import Filter from '../../components/filter/filter';
import Adder from '../../components/adder/adder';
import PostModal from '../../components/modal/post-modal/post-modal';
import { modalStore } from '../../stores/modalStore';
import { postStore } from '../../stores/postStore';
import TalkModal from '../../components/modal/talk-modal/talk-modal';
import Post from '../../components/post/post';
import { oneProjectStore } from '../../stores/oneProjectStore';

function Draftpage() {
	useEffect(() => {
		async function getPosts() {
			await axios({
				method: 'get',
				url: 'http://localhost:5000/api/post/getAll',
				headers: { Authorization: 'Bearer ' + tokenStore.token },
				params: {
					projectid: oneProjectStore.activeProject.id,
					draft: true,
					talk: false,
					plan: false,
				},
			})
				.then(response => {
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
				<Header text={'Черновики'} />
				<div className={styles.main}>
					<Filter />
					<div className={styles.adder__and__projects}>
						<Adder text={'Новый черновик'} type='draft' />
						<PostModal title={'Новый черновик'} type={'draft'}/>
						<TalkModal />
						{postStore.postsArray.map((post: Posts, key: number) => {
							return (
								<Post
									id={post.post.id}
									date={post.post.time}
									nameCreator={post.post.nameCreator}
									arrSoc={post.post.socnetId}
									arrTheme={post.post.themeId}
									text={post.text}
									key={key}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default observer(Draftpage);
