import logoSvg from "../assets/img/pizza-logo.svg"
import CartIcon from "./icons/CartIcon";
import {useNavigate} from "react-router-dom";
import SearchBlock from "./SearchBlock";
import {setFieldsDefault} from "../store/slices/filterSlice";
import {cartSelector} from "../store/slices/cartSlice";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useStoreHooks";

function Header() {

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {totalCount, totalPrice} = useAppSelector(cartSelector);

	const navigateTo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, url: string) => {
		e.preventDefault();
		navigate(url);
		dispatch(setFieldsDefault());
	}

	return (
		<div className="header">
			<div className="container">
				<a href="/" onClick={(e) => navigateTo(e, '/')}  className="header__logo">
					<img width="38" src={logoSvg} alt="Pizza logo"/>
					<div>
						<h1>React Pizza</h1>
						<p>самая вкусная пицца во вселенной</p>
					</div>
				</a>
				<SearchBlock/>
				<div className="header__cart">
					<a href="/Cart.tsx" onClick={(e) => navigateTo(e, '/cart')} className="button button--cart">
						<span>{totalPrice} ₽</span>
						<div className="button__delimiter"></div>
						<CartIcon/>
						<span>{totalCount}</span>
					</a>
				</div>
			</div>
		</div>
	)
}

export default Header;