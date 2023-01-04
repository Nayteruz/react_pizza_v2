import React from "react";
import axios from "../utils/axiosInstance"

function Categories() {

	const [folders, setFolders] = React.useState([]);
	const [activeFolder, setActiveFolder] = React.useState(1);
	const [isLoading, setIsLoading] = React.useState(false);

	React.useEffect(()=> {
		setIsLoading(true)
		axios.get('/folders')
			.then(res => {
				setFolders(res.data);
			})
			.finally(() => setIsLoading(false))
	}, [])

	return (
		<div className="categories">
			<ul>
				{isLoading
					? [...Array(6)].map((e, i) =>
						<li key={i} style={{width:120, height:48, background:'#f9f9f9', borderRadius:30}}></li>)
					: folders.map(item =>
						<li key={item.id} className={activeFolder === item.id ? 'active' : ''} onClick={() => setActiveFolder(item.id)} >
							{item.name}
						</li>)
				}
			</ul>
		</div>
	)
}

export default Categories;