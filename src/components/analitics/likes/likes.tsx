import styles from './likes.module.scss';
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
import { oneProjectStore } from '../../../stores/oneProjectStore';
import { modalStore } from '../../../stores/modalStore';

// const UserData = [
//     {
//         "date": 215,
//         "value": 10
//     },
//     {
//         "date": 235,
//         "value": 20
//     },
//     {
//         "date": 124,
//         "value": 30
//     }
// ]

const Changename = () => {
	const [data, setData] = useState([]);

	// const data = [
	// 	{ name: '10', лайки: 20000 },
	// 	{ name: '11', лайки: 15000 },
	// 	{ name: '12', лайки: 10000 },
	// 	{ name: '13', лайки: 50000 },
	// 	{ name: '14', лайки: 20000 },
	// 	{ name: '15', лайки: 15000 },
	// 	{ name: '16', лайки: 10000 },
	// 	{ name: '17', лайки: 50000 },
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
					setData(response.data.respons);	
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

	return (
		<div className={styles.container}>
			<h1 className={styles.head}>Лайки</h1>
			<div className={styles.container__likes}>
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
					<Bar dataKey='likes.count' fill='#8884d8' background={{ fill: '#eee' }} />
				</BarChart>
			</div>
		</div>
	);
};

export default Changename;
