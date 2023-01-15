import React, { FC, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPizza } from "../store/slices/pizzaSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useStoreHooks";

const FullPizza: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const item = useAppSelector(state => state.pizza.item);
  const loading = useAppSelector(state => state.pizza.loading);


  useEffect(() => {
      console.log(typeof id)
      dispatch(fetchPizza(id));
  }, [id, dispatch]);


  if (loading) {
    return <h2>Загрузка...</h2>;
  }

  if (!item) {
    return <h2>Пицца не найдена <Link to="/" className="to-main">на главную</Link></h2>;
  }

  return (
    <div className="container full">
      <div className="image">
        <img src={item?.imageUrl} alt={item?.title} />
      </div>
      <div className="note">
        <h2>{item?.title}</h2>
        <div className="price">Цена {item?.price}</div>
      </div>
    </div>
  );
};

export default FullPizza;