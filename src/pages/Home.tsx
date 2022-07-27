import React from 'react';
import qs from 'qs';
import axios from "axios";

import {useSelector, useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'

import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import Placeholder from "../components/PizzaBlock/Placeholder";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";

import {selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzasSlice";


const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const {categoryId, currentPage, sort, searchValue} = useSelector(selectFilter)
    const {items, status} = useSelector(selectPizzaData)


    const onChangeCategory = React.useCallback((idx: number) => {
        dispatch(setCategoryId(idx));
    }, []);

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `search=${searchValue}` : '';

        try {
            dispatch(
                //@ts-ignore
                fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage
            }))
        } catch (error) {
            console.log('ERROR', error)
        }

    };

    React.useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            getPizzas();
        }

        isSearch.current = false;
    }, []);


    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            });

            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProperty, currentPage])


    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search, {ignoreQueryPrefix: true});

            const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

            dispatch(
                setFilters({
                    ...params,
                    sort,
                }),
            );
            isSearch.current = true;
        }
    }, []);

    const pizzas = items.map((obj: any) => (
        <Link to={`/pizza/${obj.id}`} key={obj.id}>
            <PizzaBlock {...obj}/>
        </Link>
    ))

    const skeletons = [...new Array(6)].map((_, index) => <Placeholder key={index}/>)
    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onClickCategoryId={onChangeCategory}/>
                <Sort value={sort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
                <div className='content__error-info'>
                    <h2>
                        Произошла ошибка 😕
                    </h2>
                    <p>
                        К сожалению, не удалось получить пиццы. Повторите попытку позже.
                    </p>
                </div>
            ) : (
                <div className="content__items">
                    {status === 'loading' ? skeletons : pizzas}
                </div>
            )}
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </>);
};

export default Home;