import React, { FC } from "react";
import styles from "./Pagination.module.scss";
import { selectorFilter, setPage } from "../../store/slices/filterSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useStoreHooks";

interface PaginationProps {
  count: number;
  limit: number;
}

const Index: FC<PaginationProps> = (props) => {

  const dispatch = useAppDispatch();
  const { count } = props;

  const { page, limit } = useAppSelector(selectorFilter);

  const list = Array.from(Array(Math.ceil(count / limit)).keys());

  return (
    <ul className={styles.root}>
      {list.length > 1 && list.map(item =>
        <li
          key={item}
          className={item + 1 === page ? "active" : ""}
          onClick={() => dispatch(setPage(item + 1))}
        >
          {item + 1}
        </li>
      )}
    </ul>
  );
};

export default Index;