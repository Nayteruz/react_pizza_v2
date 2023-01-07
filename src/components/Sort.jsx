import {useEffect, useRef, useState} from "react";
import ArrowTopIcon from "./icons/ArrowTopIcon";
import {useDispatch, useSelector} from "react-redux";
import {setSort} from "../store/slices/filterSlice";

function Sort() {

	const dispatch = useDispatch();

	const sort = useSelector(state => state.filter.sort);
	const sortList = useSelector(state => state.filter.listSort)
	const [open, setOpen] = useState(false);
	const sortName = sort?.name;
	const sortRef = useRef(null);

	const selectSort = (typeSort) => {
		dispatch(setSort(typeSort))
		setOpen(false);
	}

	const handleClickOutside = (e) => {
		if (sortRef.current && !sortRef.current.contains(e.target)){
			setOpen(false);
		}
	}

	useEffect(() => {
		document.body.addEventListener('click', handleClickOutside)
		return () => document.body.removeEventListener('click', handleClickOutside)
	}, [])

	return (
		<div ref={sortRef} className="sort">
			<div className="sort__label">
				<i style={{rotate: !open ? '180deg' : ''}}>
					<ArrowTopIcon/>
				</i>
				<b>Сортировка по:</b>
				<span onClick={() => setOpen(prev => !prev)}>{sortName}</span>
			</div>
			{open && (<div className="sort__popup">
				<ul>
					{sortList.map((item) =>
						<li key={item.id} onClick={() => selectSort(item)} className={sort.id === item.id ? 'active' : ''}>{item.name}</li>
					)}
				</ul>
			</div>)}
		</div>
	)
}

export default Sort;