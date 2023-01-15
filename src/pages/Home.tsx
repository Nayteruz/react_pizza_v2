import React, { FC } from "react";
import { useSearchParams } from "react-router-dom";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaSkeleton from "../components/PizzaSkeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {selectorFilter, setFields} from "../store/slices/filterSlice";
import {fetchPizzas, selectorPizza} from "../store/slices/pizzaSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useStoreHooks";
import { ISortItem, SortParams } from "../@types/shared_types";

const Home: FC = () => {

	const { items, total, loading, error } = useAppSelector(selectorPizza);
	const {categoryId, sort, page, limit, listSort, searchValue} = useAppSelector(selectorFilter);
	const [searchParams, setSearchParams] = useSearchParams();
	const dispatch = useAppDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const getPizzas = async (): Promise<void> => {
		let defSort: ISortItem = sort || listSort[1];

		const params: SortParams = {
			category: !categoryId ? null : categoryId,
			sortBy: defSort?.sortProperty,
			order: defSort?.order,
			title: searchValue.length < 3 ? null : searchValue,
			page: page,
			limit: limit,
		};
		try {
			dispatch(fetchPizzas(params));
		} catch (e) {
			console.warn('Ошибка ' + (e as Error).message)
			alert('Ошибка при получении данных!')
		}
	}

	React.useEffect(() => {
		if (isMounted.current) {
			const pp = new URLSearchParams();
			pp.append('categoryId', categoryId.toString());
			pp.append('page', page.toString());
			pp.append('sort', sort?.id.toString() || '1');

			setSearchParams(pp)
		}
		isMounted.current = true;
	}, [categoryId, sort, searchValue, page, limit, setSearchParams])

	React.useEffect(() => {
		if (window.location.search) {
			const params = new URLSearchParams();
			searchParams.forEach((value, key) => {
				params.append(key, value);
			});
			const [sort] = listSort.filter(s => s.id === +params.sort)
			dispatch(setFields({
				categoryId,
				page,
				sort:sort,
			}))
			isSearch.current = true;
		}
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
	const skeleton = Array.from(Array(12).keys()).map(key => <PizzaSkeleton key={key}/>);

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