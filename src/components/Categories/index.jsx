import React from "react";
import axios from "../../utils/axiosInstance"
import {useDispatch, useSelector} from "react-redux";
import {selectorCategoryId, setCategoryId} from "../../store/slices/filterSlice";
import styles from "./Categories.module.scss"
import {selectorItems, setItems} from "../../store/slices/folderSlice";

function Index() {

	const dispatch = useDispatch();
	const categoryId = useSelector(selectorCategoryId);
	const items = useSelector(selectorItems);
	const setCategory = (id) => {
		dispatch(setCategoryId(id));
	}
	const [isLoading, setIsLoading] = React.useState(false);

	React.useEffect(()=> {
		setIsLoading(true)
		axios.get('/folders')
			.then(res => {
				dispatch(setItems(res.data))
			})
			.finally(() => setIsLoading(false))
	}, [dispatch])

	return (
		<div className={styles.categories}>
			<ul>
				{isLoading
					? [...Array(6)].map((e, i) =>
						<li key={i} style={{width:120, height:48, background:'#f9f9f9', borderRadius:30}}></li>)
					: items.map(item =>
						<li key={item.id} className={categoryId === item.id ? 'active' : ''} onClick={() => setCategory(item.id)} >
							{item.name}
						</li>)
				}
			</ul>
		</div>
	)
}

export default Index;