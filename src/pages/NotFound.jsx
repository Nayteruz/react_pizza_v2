import React from 'react';
import NotFoundBLock from "../components/NotFoundBLock";
import {useNavigate} from "react-router-dom";

const NotFound = () => {

	const navigate = useNavigate();

	return (
		<>
			<NotFoundBLock/>
			<button onClick={() => navigate(-1)}>назад</button>
		</>
	);
};

export default NotFound;