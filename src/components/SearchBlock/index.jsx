import styles from "./SearchBlock.module.scss";
import {useSearchContext} from "../../App";
import {useCallback, useRef, useState} from "react";
import debounce from "../../utils/debounce";

const Index = () => {

	const {query, setQuery} = useSearchContext();
	const [value, setValue] = useState(query);
	const sRef = useRef(null);

	const updateSearchValue = useCallback(
		debounce((val) => {
			setQuery(val)
		}, 500),
		[]
	);

	const clearSearch = () => {
		setValue('');
		setQuery('')
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
				value={value.toString()}
				onChange={e=>changeInput(e.target.value)}
				type="text"
			/>
			{query.length > 0
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