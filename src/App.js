import React from 'react';
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

import './scss/app.scss';


function App() {
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        fetch('https://62b0204ae460b79df03d82b6.mockapi.io/items')
            .then(data => data.json())
            .then(pizzas => setItems(pizzas))
    }, []);


    console.log(items)
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {
                            items && items.map((obj, i) => (
                                <PizzaBlock {...obj} key={obj.id}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
