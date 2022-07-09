import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Placeholder from "../components/PizzaBlock/Placeholder";
import Index from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {MyContext} from "../App";
import {setCategoryId, setSortType} from "../redux/slices/filterSlice";

const Home = () => {
    const dispatch = useDispatch()
    const {categoryId, sort } = useSelector((state) => state.filter)

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true)
    const [currentPage, setCurrentPage] = React.useState(1)
    const {searchValue} = React.useContext(MyContext)


    const pizzas = items.filter((obj) => {
        return obj.title.toLowerCase().includes(searchValue.toLowerCase());
    })
        .map((obj) => (<Index {...obj} key={obj.id}/>))
    const skeletons = [...new Array(6)].map((_, index) => <Placeholder key={index}/>)


    React.useEffect(() => {
        setIsLoading(true);

        const order = sort.sortProperty.includes('-') ? "asc" : 'desc';
        const sortBy = sort.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        fetch(`https://62b0204ae460b79df03d82b6.mockapi.io/items?&page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(data => data.json())
            .then(pizzas => {
                setItems(pizzas)
                setIsLoading(false)
            })
    }, [sort, categoryId, searchValue, currentPage]);


    const onClickCategoryId = (index) => {
        dispatch(setCategoryId(index))
    }

    const onClickSortType = (index) => {
        dispatch(setSortType(index))
    }

    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onClickCategoryId={(index) => {onClickCategoryId(index)}}/>
                <Sort value={sort} onClickSortType={(obj) => {onClickSortType(obj)}}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination onChangePage={number => setCurrentPage(number)}/>
        </>);
};

export default Home;