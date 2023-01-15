import { ChangeEvent, FC, useCallback, useRef, useState } from "react";
import styles from "./SearchBlock.module.scss";
import debounce from "../../utils/debounce";
import {setSearchValue} from "../../store/slices/filterSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreHooks";

const Index: FC = () => {

	const dispatch = useAppDispatch();
	const searchValue = useAppSelector(state => state.filter.searchValue)
	const [value, setValue] = useState(searchValue);
	const sRef = useRef<HTMLInputElement>(null);

	const updateSearchValue = useCallback(
		debounce((val: string) => {dispatch(setSearchValue(val))},500), [dispatch]
	);


	const clearSearch = () => {
		setValue('');
		dispatch(setSearchValue(''))
		if (sRef.current){
			sRef.current.focus();
		}
	}

	const changeInput = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value)
	}

	return (
		<div className={styles.root}>
			<input
				ref={sRef}
				placeholder="Найти пиццу"
				value={value}
				onChange={changeInput}
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