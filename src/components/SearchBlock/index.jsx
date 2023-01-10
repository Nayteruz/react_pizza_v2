import styles from "./SearchBlock.module.scss";
import {useCallback, useRef, useState} from "react";
import debounce from "../../utils/debounce";
import {useDispatch, useSelector} from "react-redux";
import {setSearchValue} from "../../store/slices/filterSlice";

const Index = () => {

	const dispatch = useDispatch();
	const searchValue = useSelector(state => state.filter.searchValue)
	const [value, setValue] = useState(searchValue);
	const sRef = useRef(null);

	//const debounced = useDebounce(query);

	// useEffect(() => {
	// 	setQuery(debounced)
	// }, [debounced])

	const updateSearchValue = useCallback(
		debounce((val) => {
			dispatch(setSearchValue(val))
		}, 500),
		[]
	);

	const clearSearch = () => {
		setValue('');
		dispatch(setSearchValue(''))
		sRef.current.focus();
	}

	const changeInput = (val) => {
		setValue(val);
		updateSearchValue(val)
	}

	return (
		<div className={styles.root}>
			<input
				ref={sRef}
				placeholder="Найти пиццу"
				value={value}
				onChange={e=>changeInput(e.target.value)}
				type="text"
			/>
			{searchValue.length > 0
				&& <button
					className={styles.clear}
					onClick={clearSearch}
				>
					&times;
				</button>
			}
		</div>
	);
};

export default Index;