import styles from './project.module.scss';

type ProjectProps = {
    id: number;
    name: string;
    nameCreator: string;
    arrSoc: Array<string>;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

const Project = ({id, name, nameCreator, arrSoc, onClick}: ProjectProps) => {

    return (
        <div onClick={onClick} data-name={name} data-id={id} className={styles.container}>
            <div className={styles.head}>
                <div className={styles.head__text}>
                    {name}
                </div>
                <div className={styles.head__star}/>
            </div>
            <div className={styles.main}>
                <div className={styles.main__container}>
                    {arrSoc ? arrSoc.map((soc: string, i:number) => {
                        return <div className={styles.main__ + {soc}} key={i}/>
                    }) : <></>}
                </div>
                <div className={styles.main__user}>{nameCreator}</div>
            </div>
        </div>
    )
}

export default Project;