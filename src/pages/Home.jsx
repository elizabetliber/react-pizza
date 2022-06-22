import React from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Placeholder from "../components/PizzaBlock/Placeholder";
import Index from "../components/PizzaBlock";

const Home = ({isLoading, items}) => {
    return (
        <>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, index) => <Placeholder key={index}/>)
                    : items.map((obj, i) => (<Index {...obj} key={obj.id}/>))}
            </div>
        </>);
};

export default Home;