import {Route, Routes} from "react-router-dom";

import "../src/scss/app.scss";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";

//mockapi mail doyeje9176@kaftee.com pass 19sunlight5s

function App() {

	return (
		<Routes>
			<Route path="/" element={<MainLayout/>}>
				<Route path="" element={<Home/>}/>
				<Route path="pizza/:id" element={<FullPizza />}/>
				<Route path="cart" element={<Cart/>}/>
				<Route path="*" element={<NotFound/>}/>
			</Route>
		</Routes>

	);
}

export default App;
