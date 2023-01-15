import React, { FC } from "react";
import CartMinusIcon from "./icons/CartMinusIcon";
import CartPlusIcon from "./icons/CartPlusIcon";
import CartDeleteIcon from "./icons/CartDeleteIcon";
import { countTotals, minusItemCount, plusItemCount, removeItem } from "../store/slices/cartSlice";
import { useAppDispatch } from "../hooks/useStoreHooks";
import { ICartProduct } from "../@types/shared_types";


const PizzaBlockCart: FC<ICartProduct> = (props) => {

  const { imageUrl, title, price, count, size, type, id } = props;
  const dispatch = useAppDispatch();

  const handleDecItem = () => {
    dispatch(minusItemCount({ id }));
    dispatch(countTotals());
  };
  const handleIncItem = () => {
    dispatch(plusItemCount({ id }));
    dispatch(countTotals());
  };

  const deleteItem = () => {
    dispatch(removeItem({ id }));
    dispatch(countTotals());
  };

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
          <CartMinusIcon />
        </div>
        <b>{count}</b>
        <div className="button button--outline button--circle cart__item-count-plus" onClick={handleIncItem}>
          <CartPlusIcon />
        </div>
      </div>
      <div className="cart__item-price">
        <b>{price * count!} ₽</b>
      </div>
      <div className="cart__item-remove">
        <div className="button button--outline button--circle" onClick={deleteItem}>
          <CartDeleteIcon />
        </div>
      </div>
    </div>
  );
};

export default PizzaBlockCart;