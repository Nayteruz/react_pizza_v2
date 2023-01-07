import React, {useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaSkeleton from "../components/PizzaSkeleton";
import PizzaBlock from "../components/PizzaBlock";
import axios from "../utils/axiosInstance";
import Pagination from "../components/Pagination";
import {useSearchContext} from "../App";
import {setFields} from "../store/slices/filterSlice";

const Home = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const {query} = useSearchContext();
	const dispatch = useDispatch();
	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const {categoryId, sort, page, limit, listSort} = useSelector(state => state.filter);

	const [items, setItems] = React.useState([]);
	const [total, setTotal] = React.useState(0);
	const [isLoading, setIsLoading] = React.useState(false);

	const fetchPizzas = () => {
		setIsLoading(true);
		const params = {
			category: !categoryId ? null : categoryId,
			sortBy: sort?.sortProperty,
			order: sort?.order,
			title: query.length < 3 ? '' : query,
			page: page,
			limit: limit,
		};
		axios.get('/items', {params})
			.then(res => {
				setItems(res.data.items);
				setTotal(res.data.count);
			})
			.finally(() => {
				setIsLoading(false);
			})
	}

	React.useEffect(() => {
		if (isMounted.current) {
			const paramsQuery = {
				categoryId,
				page,
				sort: sort?.id,
			};
			setSearchParams(paramsQuery)
		}
		isMounted.current = true;
	}, [categoryId, sort, query, page, limit])

	React.useEffect(() => {
		if (window.location.search) {
			const params = {};
			for (const [k, p] of searchParams) {
				params[k] = p;
			}
			dispatch(setFields({
				...params,
				sort:listSort.filter(s => s.id === +params.sort)[0],
			}))
			isSearch.current = true;
		}
	}, [])

	React.useEffect(() => {
		window.scrollTo(0, 0);
		if (!isSearch.current){
			fetchPizzas();
		}
		isSearch.current = false;
	}, [categoryId, sort, query, page, limit])

	const pizzas = items.map(item => <PizzaBlock key={item.id} {...item} />);
	const skeleton = [...Array(12).keys()].map(key => <PizzaSkeleton key={key}/>);

	return (
		<>
			<div className="content__top">
				<Categories/>
				<Sort/>
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading ? skeleton : pizzas}
			</div>
			<Pagination count={total} limit={limit}/>
		</>
	);
};

export default Home;