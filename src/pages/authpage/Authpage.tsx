import { useState } from 'react';
import axios from 'axios';
import styles from './authpage.module.scss';
import Authorization from '../../components/authorization/authorization';
import { userStore } from '../../stores/userdataStore';
import { tokenStore } from '../../stores/tokenStore';
import { useNavigate } from 'react-router-dom';

function Authpage() {
	const [panel, setPanel] = useState('auth');
	const [eye, setEye] = useState('password');
	const navigate = useNavigate();

	function changePanel() {
		if (panel === 'auth') setPanel('register');
		else setPanel('auth');
	}

	function changeEye() {
		if (eye === 'password') setEye('text');
		else setEye('password');
		console.log(eye);
	}

	async function buttonClick(e: any) {
		e.preventDefault();
		const reEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
		const rePass = /^.{8,}$/;
		let url = 'http://localhost:5000/api/user/register';
		if (!reEmail.test(userStore.userdata.email)) {
			userStore.changeValidEmail(false);
		}
		if (reEmail.test(userStore.userdata.email)) {
			userStore.changeValidEmail(true);
		}
		if (!rePass.test(userStore.userdata.password)) {
			userStore.changeValidPassword(false);
		}
		if (rePass.test(userStore.userdata.password)) {
			userStore.changeValidPassword(true);
		}
		if (
			reEmail.test(userStore.userdata.email) &&
			rePass.test(userStore.userdata.password)
		) {
			if (panel === 'auth') {
				url = 'http://localhost:5000/api/user/login';
			}
			userStore.changeValidEmail(true);
			userStore.changeValidPassword(true);
			await axios({
				method: 'post',
				url: url,
				data: {
					username: userStore.userdata.name,
					email: userStore.userdata.email,
					password: userStore.userdata.password,
				},
			})
				.then(response => {
					console.log(response.data);
					tokenStore.addtoken(response.data.token);
					userStore.changeName(response.data.username);
					navigate('/project');
				})
				.catch(error => {
					console.log(error.response.data.message);
				});
		}
	}

	return (
		<div className={styles.main__container}>
			<Authorization
				panel={panel}
				changePanel={changePanel}
    		eye={eye}
				changeEye={changeEye}
				buttonClick={buttonClick}
			/>
		</div>
	);
}

export default Authpage;
