import React, { FC } from "react";
import PlusIcon from "./icons/PlusIcon";
import { addItem, countTotals, selectorCartItem } from "../store/slices/cartSlice";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useStoreHooks";
import { ICartProduct, IProduct } from "../@types/shared_types";

type PizzaProps = IProduct;

const PizzaBlock: FC<PizzaProps> = (props) => {
  const { title, price, imageUrl, sizes, types, id } = props;
  const [activeSize, setActiveSize] = React.useState(0);
  const [activeType, setActiveType] = React.useState(0);
  const [cartItemCount, setCartItemCount] = React.useState(0);

  const typeNames = ["тонкое", "традиционное"];

    const sizesDef = sizes || [];
    const [cartItem] = useAppSelector(selectorCartItem(
      { count: 0, imageUrl, title, price, size: sizesDef[activeSize], type: typeNames[activeType], id }
    ));



  const dispatch = useAppDispatch();

  const handleAddItem = () => {
    const product: ICartProduct = {
      imageUrl: imageUrl,
      title: title,
      price: price,
      size: sizesDef[activeSize],
      type: typeNames[activeType],
      count: 1,
      id:''
    };
    dispatch(addItem(product));
    dispatch(countTotals());
  };

  React.useEffect(() => {
    if (cartItem) {
      setCartItemCount(cartItem.count!);
    } else {
      setCartItemCount(0);
    }
  }, [cartItem]);

  return (
    <div className="pizza-block">
      <div className="pizza-block__image">
        <Link to={`/pizza/${id}`}>
          <img
            src={imageUrl}
            alt={title}
          />
        </Link>
      </div>
      <h4 className="pizza-block__title"><Link to={`/pizza/${id}`}>{title}</Link></h4>
      <div className="pizza-block__selector">
        <ul>
          {types && types.map((type, i) =>
            <li
              key={i}
              className={activeType === i ? "active" : ""}
              onClick={() => setActiveType(i)}
            >
              {typeNames[type]}
            </li>
          )}
        </ul>
        <ul>
          {sizes && sizes.map((size, i) =>
            <li
              key={i}
              onClick={() => setActiveSize(i)}
              className={activeSize === i ? "active" : ""}
            >
              {size} см.
            </li>
          )}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button className="button button--outline button--add" onClick={handleAddItem}>
          <PlusIcon />
          <span>Добавить</span>
          <i>{cartItemCount}</i>
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
