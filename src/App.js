import React from 'react';
import {
    Routes,
    Route
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './redux/slices/filterSlice'

import Header from "./components/Header";
import Home from "./pages/Home";
import NotFoundBlock from "./components/NotFoundBlock";

import './scss/app.scss';


export const MyContext = React.createContext();

function App() {
    const [searchValue, setSearchValue] = React.useState('')


    return (
        <div className="wrapper">
            <MyContext.Provider value={{searchValue, setSearchValue }}>
                <Header/>
                <div className="content">
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="*" element={<NotFoundBlock/>}/>
                        </Routes>
                    </div>
                </div>
            </MyContext.Provider>
        </div>
    );
}

export default App;
