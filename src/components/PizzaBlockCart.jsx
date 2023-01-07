import React from 'react';
import CartMinusIcon from "./icons/CartMinusIcon";
import CartPlusIcon from "./icons/CartPlusIcon";
import CartDeleteIcon from "./icons/CartDeleteIcon";
import {useDispatch} from "react-redux";
import {minusItemCount, plusItemCount, removeItem} from "../store/slices/cartSlice";

const PizzaBlockCart = (props) => {

	const {imageUrl, title, price, count, size, type, id} = props;
	const dispatch = useDispatch();

	const handleDecItem = () => {
		dispatch(minusItemCount({id}))
	}
	const handleIncItem = () => {
		dispatch(plusItemCount({id}))
	}

	const deleteItem = () => {
		dispatch(removeItem({id}))
	}

	return (
		<div className="cart__item">
			<div className="cart__item-img">
				<img
					className="pizza-block__image"
					src={imageUrl}
					alt={title}
				/>
			</div>
			<div className="cart__item-info">
				<h3>{title}</h3>
				<p>{type} тесто, {size} см.</p>
			</div>
			<div className="cart__item-count">
				<div className="button button--outline button--circle cart__item-count-minus" onClick={handleDecItem}>
					<CartMinusIcon/>
				</div>
				<b>{count}</b>
				<div className="button button--outline button--circle cart__item-count-plus" onClick={handleIncItem}>
					<CartPlusIcon/>
				</div>
			</div>
			<div className="cart__item-price">
				<b>{price * count} ₽</b>
			</div>
			<div className="cart__item-remove">
				<div className="button button--outline button--circle" onClick={deleteItem}>
					<CartDeleteIcon/>
				</div>
			</div>
		</div>
	);
};

export default PizzaBlockCart;