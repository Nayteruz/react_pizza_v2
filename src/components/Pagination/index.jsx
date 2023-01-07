import React from 'react';
import styles from "./Pagination.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {setPage} from "../../store/slices/filterSlice";

const Index = (props) => {

	const dispatch = useDispatch();
	const {count} = props;

	const {page, limit} = useSelector(state => state.filter);

	const list = [...Array(Math.ceil(count/limit)).keys()];

	return (
		<ul className={styles.root}>
			{list.length > 1 && list.map(item =>
				<li
					key={item}
					className={item+1 === page ? 'active' : ''}
					onClick={() => dispatch(setPage(item+1))}
				>
					{item+1}
				</li>
			)}
		</ul>
	);
};

export default Index;