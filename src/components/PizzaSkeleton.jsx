import React from 'react';
import ContentLoader from "react-content-loader"

const PizzaSkeleton = () => {
	return (
		<ContentLoader
			className="pizza-block"
			speed={2}
			width={280}
			height={460}
			viewBox="0 0 280 460"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<circle cx="135" cy="130" r="125" />
			<rect x="0" y="270" rx="5" ry="5" width="280" height="27" />
			<rect x="0" y="312" rx="10" ry="10" width="280" height="88" />
			<rect x="0" y="425" rx="5" ry="5" width="91" height="27" />
			<rect x="126" y="415" rx="30" ry="30" width="153" height="45" />
		</ContentLoader>
	);
};

export default PizzaSkeleton;