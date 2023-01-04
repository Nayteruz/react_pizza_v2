import React from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaSkeleton from "../components/PizzaSkeleton";
import PizzaBlock from "../components/PizzaBlock";
import axios from "../utils/axiosInstance";

const Home = () => {

	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);

	React.useEffect(() => {
		setIsLoading(true);
		axios.get('/items')
			.then(res => {
				setItems(res.data);
			})
			.finally(() => {
				setIsLoading(false);
			})
		window.scrollTo(0, 0);
	}, [])

	return (
		<>
			<div className="content__top">
				<Categories/>
				<Sort/>
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading
					? [...Array(12)].map((e, i) => <PizzaSkeleton key={i} />)
					: items.map(item => <PizzaBlock key={item.id} {...item} />)
				}
			</div>
		</>
	);
};

export default Home;