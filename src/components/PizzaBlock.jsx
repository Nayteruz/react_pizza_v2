import React from "react";
import PlusIcon from "./icons/PlusIcon";
import {useDispatch, useSelector} from "react-redux";
import {addItem, selectorCartItem} from "../store/slices/cartSlice";

const PizzaBlock = (props) => {
	const {title, price, imageUrl, sizes, types} = props;
	const [activeSize, setActiveSize] = React.useState(0);
	const [activeType, setActiveType] = React.useState(0);
	const [cartItemCount, setCartItemCount] = React.useState(0);

	const typeNames = ['тонкое', 'традиционное'];

	const [cartItem] = useSelector(selectorCartItem(
		{imageUrl, title, price, size: sizes[activeSize], type: typeNames[activeType]}
	))

	const dispatch = useDispatch();

	const handleAddItem = () => {
		const product = {
			imageUrl,
			title,
			price,
			size: sizes[activeSize],
			type: typeNames[activeType],
			count: 1,
		}
		dispatch(addItem(product))
	}

	React.useEffect(() => {
		if (cartItem) {
			setCartItemCount(cartItem.count);
		} else {
			setCartItemCount(0);
		}
	}, [cartItem]);

	return (
		<div className="pizza-block">
			<div className="pizza-block__image">
				<img
					src={imageUrl}
					alt={title}
				/>
			</div>
			<h4 className="pizza-block__title">{title}</h4>
			<div className="pizza-block__selector">
				<ul>
					{types.map((type, i) =>
						<li
							key={i}
							className={activeType === i ? 'active' : ''}
							onClick={() => setActiveType(i)}
						>
							{typeNames[type]}
						</li>
					)}
				</ul>
				<ul>
					{sizes.map((size, i) =>
						<li
							key={i}
							onClick={() => setActiveSize(i)}
							className={activeSize === i ? 'active' : ''}
						>
							{size} см.
						</li>
					)}
				</ul>
			</div>
			<div className="pizza-block__bottom">
				<div className="pizza-block__price">от {price} ₽</div>
				<button className="button button--outline button--add" onClick={handleAddItem}>
					<PlusIcon/>
					<span>Добавить</span>
					<i>{cartItemCount}</i>
				</button>
			</div>
		</div>
	);
};

export default PizzaBlock;
