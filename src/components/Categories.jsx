import React from "react";
import folders from "../assets/folders.json"

function Categories() {

	const [activeFolder, setActiveFolder] = React.useState(1);

	return (
		<div className="categories">
			<ul>
				{folders.map(item =>
					<li
						key={item.id}
						className={activeFolder === item.id ? 'active' : ''}
						onClick={() => setActiveFolder(item.id)}
					>
						{item.name}
					</li>
				)}
			</ul>
		</div>
	)
}

export default Categories;