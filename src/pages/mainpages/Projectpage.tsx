import axios from 'axios';
import { useEffect } from 'react';
import { tokenStore } from '../../stores/tokenStore';
import { projectStore } from '../../stores/projectStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import styles from './main.module.scss';
import Menu from '../../components/menu/menu';
import Header from '../../components/headers/header/header';
import Adder from '../../components/adder/adder';
import ProjectModal from '../../components/modal/project-modal/project-modal';
import Project from '../../components/project/project';
import { modalStore } from '../../stores/modalStore';
import { oneProjectStore } from '../../stores/oneProjectStore';
import TalkModal from '../../components/modal/talk-modal/talk-modal';
import PostModal from '../../components/modal/post-modal/post-modal';

function Projectpage() {
	const navigate = useNavigate();
	const projects = projectStore.sort;

	useEffect(() => {
		async function telegram() {
			await axios({
				method: 'post',
				url: `${process.env.REACT_APP_API_URL}api/telegram/check`,
				headers: { Authorization: 'Bearer ' + tokenStore.token },
			})
				.then(response => {
					console.log(response);
				})
				.catch(error => {
					console.log(error.response.data.message);
				});
		}
		telegram();
	}, []);

	useEffect(() => {
		async function projects() {
			await axios({
				method: 'get',
				url: `${process.env.REACT_APP_API_URL}api/project/get`,
				headers: { Authorization: 'Bearer ' + tokenStore.token },
			})
				.then(response => {
					projectStore.resetArray();
					response.data.projects.map((project: ObjectProject) => {
						oneProjectStore.changeProjectData(project);
						projectStore.addProject();
					});
				})
				.catch(error => {
					console.log(error.response.data.message);
				});
		}
		projects();
	}, [modalStore.addProject]);

	function onClickProject(e: any) {
		oneProjectStore.changeActiveProject(
			e.currentTarget.dataset.id,
			e.currentTarget.dataset.name,
			e.currentTarget.dataset.nameCreator
		);
		navigate('/posts');
	}

	async function onClickStar(e: any) {
		e.stopPropagation();
		const favorit = projectStore.favorit(e.currentTarget.dataset.id);
		await axios({
			method: 'put',
			url: `${process.env.REACT_APP_API_URL}api/project/update`,
			headers: { Authorization: 'Bearer ' + tokenStore.token },
			data: {
				projectid: e.currentTarget.dataset.id,
				name: e.currentTarget.dataset.name,
				favorit: favorit,
			},
		}).catch(error => {
			console.log(error.response.data.message);
		});
	}

	return (
		<div className={styles.main__container}>
			<Menu />
			<div className={styles.container}>
				<Header text={'Проекты'} type='project' />
				<div className={styles.main}>
					<div className={styles.adder__and__projects}>
						<Adder text={'Новый проект'} type={'project'} />
						<PostModal title={'Новый пост'} type={'post'} />
						<TalkModal />
						{projects.map((project: ObjectProject, key: number) => {
							return (
								<Project
									onClick={onClickProject}
									onClickStar={onClickStar}
									id={project.id}
									name={project.name}
									nameCreator={project.nameCreator}
									arrSoc={project.arraySoc}
									favorit={project.favorit}
									key={key}
								/>
							);
						})}
						<ProjectModal />
					</div>
				</div>
			</div>
		</div>
	);
}

export default observer(Projectpage);
