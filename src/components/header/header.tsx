import styles from './header.module.scss';

type HeaderProps = {
	text: string;
};

const Header = ({ text }: HeaderProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.text}>{text}</div>
		</div>
	);
};

export default Header;
