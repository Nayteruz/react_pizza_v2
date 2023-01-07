import React from "react";
import {Route, Routes} from "react-router-dom";

import "../src/scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

//mockapi mail doyeje9176@kaftee.com pass 19sunlight5s

const SearchContext = React.createContext('');
export const useSearchContext = () => {
	return React.useContext(SearchContext);
}

function App() {

	const [query, setQuery] = React.useState('');

	return (
		<div className="wrapper">
			<SearchContext.Provider value={{query, setQuery}}>
				<Header />
				<div className="content">
					<div className="container">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/cart" element={<Cart/>} />
							<Route path="*" element={<NotFound/>} />
						</Routes>
					</div>
				</div>
			</SearchContext.Provider>
		</div>
	);
}

export default App;
