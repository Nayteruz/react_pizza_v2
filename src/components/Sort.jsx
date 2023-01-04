import React from "react";
import ArrowTopIcon from "./icons/ArrowTopIcon";

function Sort() {

	const [open, setOpen] = React.useState(false);
	const [selected, setSelected] = React.useState(0);
	const list = ['популярности', 'цене', 'алфавиту'];
	const sortName = list[selected];

	const selectSort = (index) => {
		setSelected(index);
		setOpen(false);
	}

	return (
		<div className="sort">
			<div className="sort__label">
				<i style={{rotate: !open ? '180deg' : ''}}>
					<ArrowTopIcon/>
				</i>
				<b>Сортировка по:</b>
				<span onClick={() => setOpen(prev => !prev)}>{sortName}</span>
			</div>
			{open && (<div className="sort__popup">
				<ul>
					{list.map((name, i) =>
						<li key={i} onClick={() => selectSort(i)} className={selected === i ? 'active' : ''}>{name}</li>
					)}
				</ul>
			</div>)}
		</div>
	)
}

export default Sort;