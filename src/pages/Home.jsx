import React from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Placeholder from "../components/PizzaBlock/Placeholder";
import Index from "../components/PizzaBlock";
import Pagination from "../components/Pagination";

const Home = ({searchValue}) => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true)
    const [categoryId, setCategoryId] = React.useState(0)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [sortType, setSortType] = React.useState({
        name: 'популярности',
        sortProperty: 'rating'
    })

    const pizzas = items.filter((obj) => {
        if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
        }
        return false;
    })
        .map((obj, i) => (<Index {...obj} key={obj.id}/>))
    const skeletons = [...new Array(6)].map((_, index) => <Placeholder key={index}/>)



    React.useEffect(() => {
        setIsLoading(true);

        const order = sortType.sortProperty.includes('-') ? "asc" : 'desc';
        const sortBy = sortType.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        fetch(`https://62b0204ae460b79df03d82b6.mockapi.io/items?&page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(data => data.json())
            .then(pizzas => {
                setItems(pizzas)
                setIsLoading(false)
            })
    }, [categoryId, sortType, searchValue, currentPage]);



    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)}/>
                <Sort value={sortType} onChangeSort={(i) => setSortType(i)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination onChangePage={number => setCurrentPage(number)}/>
        </>);
};

export default Home;