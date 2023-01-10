import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaSkeleton from "../components/PizzaSkeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {selectorFilter, setFields} from "../store/slices/filterSlice";
import {fetchPizzas, selectorPizza} from "../store/slices/pizzaSlice";

const Home = () => {

	const { items, total, loading, error } = useSelector(selectorPizza);
	const {categoryId, sort, page, limit, listSort, searchValue} = useSelector(selectorFilter);
	const [searchParams, setSearchParams] = useSearchParams();
	const dispatch = useDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const getPizzas = async () => {
		const params = {
			category: !categoryId ? null : categoryId,
			sortBy: sort?.sortProperty,
			order: sort?.order,
			title: searchValue.length < 3 ? null : searchValue,
			page: page,
			limit: limit,
		};
		try {
			dispatch(fetchPizzas(params));
		} catch (err) {
			console.warn('Ошибка ' + err.message)
			alert('Ошибка при получении данных!')
		}
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
	}, [categoryId, sort, searchValue, page, limit, setSearchParams])

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
		// eslint-disable-next-line
	}, [])

	React.useEffect(() => {
		window.scrollTo(0, 0);
		if (!isSearch.current){
			getPizzas();
		}
		isSearch.current = false;
		// eslint-disable-next-line
	}, [categoryId, sort, searchValue, page, limit])

	const pizzas = items.map(item => <PizzaBlock key={item.id} {...item} />);
	const skeleton = [...Array(12).keys()].map(key => <PizzaSkeleton key={key}/>);

	if (error){
		return <h2>Ошибка {error}</h2>
	}

	if (!loading && pizzas.length === 0){
		return <h2>Пицц нет</h2>
	}


	return (
		<>
			<div className="content__top">
				<Categories/>
				<Sort/>
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{loading ? skeleton : pizzas}
			</div>
			<Pagination count={total} limit={limit}/>
		</>
	);
};

export default Home;