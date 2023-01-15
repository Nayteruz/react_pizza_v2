import { useRef, useState } from "react";
import ArrowTopIcon from "./icons/ArrowTopIcon";
import { selectorFilter, setSort } from "../store/slices/filterSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useStoreHooks";
import { useOnClickOutside } from "usehooks-ts";
import { ISortItem } from "../@types/shared_types";

function Sort() {

  const dispatch = useAppDispatch();

  const { sort, listSort } = useAppSelector(selectorFilter);
  const defSort: ISortItem = sort || listSort[1];
  const [open, setOpen] = useState(false);
  const sortName: string = defSort?.name;
  const sortRef = useRef<HTMLDivElement>(null);

  const selectSort = (typeSort: ISortItem) => {
    dispatch(setSort(typeSort));
    setOpen(false);
  };

  const handleClickOutside = (): void => {
    setOpen(false);
  };

  useOnClickOutside(sortRef, handleClickOutside);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <i style={{ rotate: !open ? "180deg" : "" }}>
          <ArrowTopIcon />
        </i>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(prev => !prev)}>{sortName}</span>
      </div>
      {open && (<div className="sort__popup">
        <ul>
          {listSort.map((item) =>
            <li key={item.id} onClick={() => selectSort(item)}
                className={defSort.id === item.id ? "active" : ""}>{item.name}</li>
          )}
        </ul>
      </div>)}
    </div>
  );
}

export default Sort;