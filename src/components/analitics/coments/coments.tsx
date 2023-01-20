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
        { name: "10", просмотры: 20000000 },
        { name: "11", просмотры: 1500000000 },
        { name: "12", просмотры: 100000000 },
        { name: "13", просмотры: 50000000 },
        { name: "14", просмотры: 2000000000 },
        { name: "15", просмотры: 150000000 },
        { name: "16", просмотры: 100000000 },
        { name: "17", просмотры: 5000000 },
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
        <div style={{ textAlign: "center" }}>
      <h1>Коментарии по датам</h1>
      <div className="App">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="просмотры" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      </div>
    </div>
  );
}

export default Changename;