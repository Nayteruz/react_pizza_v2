import React, { FC } from "react";
import styles from "./NotFoundBlock.module.scss";
const Index: FC = () => {
	return (
		<div>
			<h1 className={styles.root}>
				<span>:(</span>
				<br/>
				Ничего не найдено
			</h1>
			<p className={styles.description}>К сожалению данная страница отсутствует. Попробуйюте другую страницу</p>
		</div>
	);
};

export default Index;