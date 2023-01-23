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
import { useState } from 'react';

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
	const [valid, setValid] = useState(true);
	const [value, setValue] = useState('');

	const data = [
		{ name: '10', просмотры: 20000000 },
		{ name: '11', просмотры: 15000000 },
		{ name: '12', просмотры: 10000000 },
		{ name: '13', просмотры: 5000000 },
		{ name: '14', просмотры: 20000000 },
		{ name: '15', просмотры: 15000000 },
		{ name: '16', просмотры: 10000000 },
		{ name: '17', просмотры: 5000000 },
	];

	// const [userData, setUserData] = useState({
	//     labels: UserData.map((data) => data.date),
	//     datasets: [
	//         {
	//             label: "Pops",
	//             data: UserData.map((data) => data.value),
	//         },
	//     ],
	// });

	async function buttonClick(e: any) {}

	function changeValue(e: any) {
		setValue(e.target.value);
	}

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
							dataKey='name'
							scale='point'
							padding={{ left: 30, right: 10 }}
						/>
						<YAxis />
						<Tooltip />
						<CartesianGrid strokeDasharray='3 3' />
						<Bar
							dataKey='просмотры'
							fill='#8884d8'
							background={{ fill: '#eee' }}
						/>
					</BarChart>
				</div>
			</div>
		</div>
	);
};

export default Changename;
