import styles from './coments.module.scss';
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
  } from "recharts";
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
			{ name: '10', комментарии: 200 },
			{ name: '11', комментарии: 1500 },
			{ name: '12', комментарии: 1000 },
			{ name: '13', комментарии: 500 },
			{ name: '14', комментарии: 2000 },
			{ name: '15', комментарии: 150 },
			{ name: '16', комментарии: 1000 },
			{ name: '17', комментарии: 50 },
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

    async function buttonClick(e: any) {

    }

    function changeValue(e: any) {
        setValue(e.target.value);
    }

    return (
			<div className={styles.container}>
				<h1 className={styles.head}>Комментарии</h1>
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
							dataKey='name'
							scale='point'
							padding={{ left: 30, right: 10 }}
						/>
						<YAxis />
						<Tooltip />
						<CartesianGrid strokeDasharray='3 3' />
						<Bar
							dataKey='комментарии'
							fill='#8884d8'
							background={{ fill: '#eee' }}
						/>
					</BarChart>
				</div>
			</div>
		);
}

export default Changename;