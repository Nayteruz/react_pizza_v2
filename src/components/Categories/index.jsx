import React from "react";
import axios from "../../utils/axiosInstance"
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId} from "../../store/slices/filterSlice";
import styles from "./Categories.module.scss"

function Index() {

	const dispatch = useDispatch();
	const categoryId = useSelector(state => state.filter.categoryId);
	const setCategory = (id) => {
		dispatch(setCategoryId(id));
	}
	const [folders, setFolders] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);

	React.useEffect(()=> {
		setIsLoading(true)
		axios.get('/folders')
			.then(res => {
				setFolders(res.data);
			})
			.finally(() => setIsLoading(false))
	}, [])

	return (
		<div className={styles.categories}>
			<ul>
				{isLoading
					? [...Array(6)].map((e, i) =>
						<li key={i} style={{width:120, height:48, background:'#f9f9f9', borderRadius:30}}></li>)
					: folders.map(item =>
						<li key={item.id} className={categoryId === item.id ? 'active' : ''} onClick={() => setCategory(item.id)} >
							{item.name}
						</li>)
				}
			</ul>
		</div>
	)
}

export default Index;