import {
    Routes,
    Route
} from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";


import './scss/app.scss';
import FullPizza from "./pages/FullPizza";
import MainLayout from "./components/layouts/MainLayout";
import NotFound from "./pages/NotFound";


function App() {
    return (
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="*" element={<NotFound/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/pizza/:id" element={<FullPizza/>}/>
            </Route>
        </Routes>
    );
}

export default App;
