import logoSvg from "../assets/img/pizza-logo.svg"
import CartIcon from "./icons/CartIcon";
import {useNavigate} from "react-router-dom";
import SearchBlock from "./SearchBlock";
import {useDispatch, useSelector} from "react-redux";
import {setFieldsDefault} from "../store/slices/filterSlice";

function Header() {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {totalCount, totalPrice} = useSelector(state => state.cart);

	const navigateTo = (e, url) => {
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
					<a href="/cart" onClick={(e) => navigateTo(e, '/cart')} className="button button--cart">
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