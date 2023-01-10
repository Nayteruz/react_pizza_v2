import React from 'react';
import CartTitleIcon from "../components/icons/CartTitleIcon";
import CartClearIcon from "../components/icons/CartClearIcon";
import CartBackArrow from "../components/icons/CartBackArrow";
import {Link} from "react-router-dom";
import PizzaBlockCart from "../components/PizzaBlockCart";
import {useDispatch, useSelector} from "react-redux";
import {cartSelector, clearItems} from "../store/slices/cartSlice";
import CartEmpty from "./Cart_empty";

const Cart = () => {

	const dispatch = useDispatch();
	const {items, totalPrice, totalCount} = useSelector(cartSelector);

	const clearCart = () => {
		if (window.confirm('Очистить корзину?')){
			dispatch(clearItems());
		}
	}

	if (!totalCount) {
		return <CartEmpty/>
	}

	return (
		<div className="cart">
			<div className="cart__top">
				<h2 className="content__title">
					<CartTitleIcon/>
					Корзина
				</h2>
				<div className="cart__clear" onClick={clearCart}>
					<CartClearIcon/>
					<span>Очистить корзину</span>
				</div>
			</div>

			<div className="content__items">
				{items.map(item =>
					<React.Fragment  key={item.id}>
						<PizzaBlockCart {...item}/>
					</React.Fragment>
				)}
			</div>
			<div className="cart__bottom">
				<div className="cart__bottom-details">
					<span> Всего пицц: <b>{totalCount} шт.</b> </span>
					<span> Сумма заказа: <b>{totalPrice} ₽</b> </span>
				</div>
				<div className="cart__bottom-buttons">
					<Link to="/" className="button button--outline button--add go-back-btn">
						<CartBackArrow/>
						<span>Вернуться назад</span>
					</Link>
					<div className="button pay-btn">
						<span>Оплатить сейчас</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;