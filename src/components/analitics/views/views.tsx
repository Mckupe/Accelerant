import styles from './views.module.scss';
import {
	PieChart,
	Pie,
	Tooltip,
	BarChart,
	XAxis,
	YAxis,
	Legend,
	CartesianGrid,
	Bar,
} from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { tokenStore } from '../../../stores/tokenStore';
import { observer } from 'mobx-react-lite';
import { oneProjectStore } from '../../../stores/oneProjectStore';
import { modalStore } from '../../../stores/modalStore';

const Changename = () => {
	const [data, setData] = useState([]);

	// let data = [
	// 	{ Текст: '10', Просмотры: 20000000 },
	// 	{ Текст: '11', Просмотры: 15000000 },
	// 	{ Текст: '12', Просмотры: 10000000 },
	// 	{ Текст: '13', Просмотры: 5000000 },
	// 	{ Текст: '14', Просмотры: 20000000 },
	// 	{ Текст: '15', Просмотры: 15000000 },
	// 	{ Текст: '16', Просмотры: 10000000 },
	// 	{ Текст: '17', Просмотры: 5000000 },
	// ];

	useEffect(() => {
		async function projects() {
			await axios({
				method: 'get',
				url: `${process.env.REACT_APP_API_URL}api/vk/getStat`,
				headers: { Authorization: 'Bearer ' + tokenStore.token },
				params: {
					projectid: oneProjectStore.activeProject.id,
				}
			})
				.then(response => {
					console.log(response)
					setData(response.data.statistic);
					console.log(data)	
				})
				.catch(error => {
					console.log(error.response.data.message);
				});
		}
		projects();
	}, [modalStore.addPost]);



	// const [userData, setUserData] = useState({
	//     labels: UserData.map((data) => data.date),
	//     datasets: [
	//         {
	//             label: "Pops",
	//             data: UserData.map((data) => data.value),
	//         },
	//     ],
	// });

	async function buttonClick(e: any) { }

	return (
		<div >
			<div className={styles.container}>
				<h1 className={styles.head}>Просмотры</h1>
				<div className={styles.container__grph}>
					<BarChart
						width={1000}
						height={300}
						data={data}
						margin={{
							right: 30,
							left: 40,
						}}
						barSize={65}
					>
						<XAxis
							dataKey='text'
							scale='point'
							padding={{ left: 30, right: 10 }}
						/>
						<YAxis />
						<Tooltip />
						<CartesianGrid strokeDasharray='3 3' />
						<Bar
							dataKey='views.count'
							fill='#8884d8'
							background={{ fill: '#eee' }}
						/>
					</BarChart>
				</div>
			</div>
		</div>
	);
};

export default observer(Changename);
