import axios from 'axios';
import { useEffect } from 'react';
import { tokenStore } from '../../stores/tokenStore';
import { observer } from 'mobx-react-lite';
import styles from './main.module.scss';
import Menu from '../../components/menu/menu';
import Header from '../../components/headers/header/header';
import Adder from '../../components/adder/adder';
import PostModal from '../../components/modal/post-modal/post-modal';
import { modalStore } from '../../stores/modalStore';
import { postStore } from '../../stores/postStore';
import TalkModal from '../../components/modal/talk-modal/talk-modal';
import Post from '../../components/post/post';
import { oneProjectStore } from '../../stores/oneProjectStore';

function Talkpage() {
	useEffect(() => {
		async function getPosts() {
			await axios({
				method: 'get',
				url: `${process.env.REACT_APP_API_URL}api/post/getAll`,
				headers: { Authorization: 'Bearer ' + tokenStore.token },
				params: {
					projectid: oneProjectStore.activeProject.id,
					draft: false,
					talk: true,
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
				<Header text={'Обсуждения'} type='talk' />
				<div className={styles.main}>
					<div className={styles.adder__and__projects}>
						<Adder text={'Новый пост'} type='talk' />
						<PostModal title={'Новый пост'} type={'talk'} />
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
									arrImgs={post.img}
									type='talk'
									published={post.post.published}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default observer(Talkpage);
