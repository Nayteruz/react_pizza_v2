import { useEffect } from "react";

import {setCategoryId} from "../../store/slices/filterSlice";
import styles from "./Categories.module.scss"
import { fetchFolders } from "../../store/slices/folderSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreHooks";


function Index() {

	const dispatch = useAppDispatch();
	const categoryId = useAppSelector(state => state.filter.categoryId);
	const {items, loading, error} = useAppSelector(state => state.folder);
	const setCategory = (id: number) => {
		dispatch(setCategoryId(id));
	}

	const folders = items.map(item => {
		return (<li
			key={item.id}
			className={categoryId === item.id ? 'active' : ''}
			onClick={() => setCategory(item.id)}
		>
			{item.name}
		</li>)
	});
	const skeleton = Array.from(Array(6).keys())
		.map(key => <li
			key={key}
			style={{width:120, height:48, background:'#f9f9f9', borderRadius:30}}></li>);

	useEffect(() => {
		dispatch(fetchFolders());
	}, [dispatch])

	if (error){
		return <h2>Ошибка загрузки категорий...</h2>
	}


	return (
		<div className={styles.categories}>
			<ul>
				{loading ? skeleton : folders}
			</ul>
		</div>
	)
}

export default Index;