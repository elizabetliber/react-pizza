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
    const [searchValue, setSearchValue] = React.useState('')
    console.log(searchValue)
    return (
        <div className="wrapper">
            <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
            <div className="content">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home searchValue={searchValue}/>}/>
                        <Route path="*" element={<NotFoundBlock/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
