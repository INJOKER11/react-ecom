import React, { useEffect, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Categories from "../components/Categories/Categories";
import Sort, {list} from "../components/Sort/Sort";
import Skeleton from "../components/ProductCard/Skeleton";
import ProductCard from "../components/ProductCard/ProductCard";
import Pagination from "../components/Pagination/Pagination";


import { selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {fetchProducts, selectProductsData, TSearchProductParams} from "../redux/slices/productsSlice";
import {useAppDispatch} from "../redux/store";




const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false)
  const isMounted = useRef(false)


  const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);
  const {items, status} = useSelector(selectProductsData);
  const sortType = sort.sortProperty


  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id))
  }

  const pizzas = items.map((obj: any) => (<ProductCard {...obj} key={obj.imageUrl}/>));

  const getProducts = async () => {
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-','');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    // @ts-ignore
    dispatch(
        fetchProducts({
          order,
          sortBy,
          category,
          search,
          currentPage
        })
    )
    window.scrollTo(0,0)

  }
  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number))
  }

  useEffect(() => {
    if(isMounted.current){
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId: categoryId > 0 ? categoryId : null,
        currentPage,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true;
  }, [categoryId, sortType,  currentPage]);

  useEffect(() => {
    if(window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as TSearchProductParams

      const sortObj = list.find((obj) => obj.sortProperty === params.sortBy)

      dispatch(setFilters({
        searchValue: params.search,
        categoryId: Number(params.category),
        currentPage: params.currentPage,
        sort: sortObj || list[0]
      }))
      isSearch.current = true
    }
  }, []);


  useEffect(() => {
    if(!isSearch.current){
      getProducts()
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