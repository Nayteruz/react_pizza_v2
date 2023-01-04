import React from "react";
import "../src/scss/app.scss";

import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

//mockapi mail doyeje9176@kaftee.com pass 19sunlight5s

function App() {
	return (
		<div className="wrapper">
			<Header/>
			<div className="content">
				<div className="container">
					<Routes>
						<Route path="/" element={<Home/>} />
						<Route path="/cart" element={<Cart/>} />
						<Route path="*" element={<NotFound/>} />
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default App;
