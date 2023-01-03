import React from "react";
import PlusIcon from "./icons/PlusIcon";

const PizzaBlock = (props) => {
	const {title, price, imageUrl, sizes, types} = props;
	const [activeSize, setActiveSize] = React.useState(0);
	const [activeType, setActiveType] = React.useState(0);
	const typeNames = ['тонкое', 'традиционное']

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
				<button className="button button--outline button--add">
					<PlusIcon/>
					<span>Добавить</span>
					<i>0</i>
				</button>
			</div>
		</div>
	);
};

export default PizzaBlock;
