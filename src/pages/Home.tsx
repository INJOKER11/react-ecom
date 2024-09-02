import React, { useEffect, useRef } from 'react';
import qs from 'qs';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import Categories from "../components/Categories/Categories";
import Sort, {list} from "../components/Sort/Sort";
import Skeleton from "../components/ProductCard/Skeleton";
import ProductCard from "../components/ProductCard/ProductCard";
import Pagination from "../components/Pagination/Pagination";


import {selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {fetchProducts, selectProductsData} from "../redux/slices/productsSlice";





const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false)
  const isMounted = useRef(false)


  const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);
  const {items, status} = useSelector(selectProductsData);
  const sortType = sort.sortProperty




  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id))
  }

  const pizzas = items.map((obj: any) => (<Link to={`/product/${obj.id}`}>
    <ProductCard {...obj} key={obj.id}/>
  </Link>));

  const fetchPizzas = async () => {
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-','');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const params = {
      order,
      sortBy,
      category,
      search,
      currentPage
    }
    // @ts-ignore
    dispatch(fetchProducts(params))
    window.scrollTo(0,0)

  }
  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number))
  }

  useEffect(() => {
    if(isMounted.current){
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true;
  }, [categoryId, sortType,  currentPage]);

  useEffect(() => {
    if(window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty)

      dispatch(
          setFilters({
            ...params,
            sort
          })
      )
      isSearch.current = true
    }
  }, []);


  useEffect(() => {
    if(!isSearch.current){
      fetchPizzas()
    }

    isSearch.current = false;
  }, [categoryId, sortType, currentPage, searchValue]);



  return (
      <div className='container'>
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onClickCategory}/>
          <Sort/>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {
            status === 'error' ? (
                <h2>Unexpected error</h2>
            ) : (
                status === 'loading' ? ([...new Array(6)].map((_, index) => <Skeleton key={index}/>))
                    : pizzas
            )
          }
        </div>
        <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
      </div>
  );
};

export default Home;