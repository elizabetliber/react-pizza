import React from 'react';
import {
    Routes,
    Route
} from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import './scss/app.scss';
import NotFoundBlock from "./components/NotFoundBlock";



function App() {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        fetch('https://62b0204ae460b79df03d82b6.mockapi.io/items')
            .then(data => data.json())
            .then(pizzas => {
                setItems(pizzas)
                setIsLoading(false)
            })
    }, []);


    console.log(items)
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home isLoading={isLoading} items={items}/>}/>
                        <Route path="*" element={<NotFoundBlock/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
