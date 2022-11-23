import styles from './project.module.scss';
import { observer } from 'mobx-react-lite';

type ProjectProps = {
	id: number;
	name: string;
	nameCreator: string;
	arrSoc: Array<string>;
	favorit: boolean;
	onClick: React.MouseEventHandler<HTMLDivElement>;
	onClickStar: React.MouseEventHandler<HTMLDivElement>;
};

const Project = ({
	id,
	name,
	nameCreator,
	arrSoc,
	favorit,
	onClick,
	onClickStar,
}: ProjectProps) => {
	return (
		<div
			onClick={onClick}
			data-name={name}
			data-id={id}
			className={styles.container}
		>
			<div className={styles.head}>
				<div className={styles.head__text}>{name}</div>
				<div
					onClick={onClickStar}
					data-id={id}
					data-name={name}
					className={favorit ? styles.head__star__active : styles.head__star}
				/>
			</div>
			<div className={styles.main}>
				<div className={styles.main__container}>
					{arrSoc ? (
						arrSoc.map((soc: string, i: number) => {
							return (
								<div
									className={soc}
									style={{ width: '20px', height: '20px', backgroundSize: '20px' }}
									key={i}
								/>
							);
						})
					) : (
						<></>
					)}
				</div>
				<div className={styles.main__user}>{nameCreator}</div>
			</div>
		</div>
	);
};

export default observer(Project);
