import React, { useEffect } from 'react'
import { fetchCategoryProductsAsync, fetchProductRaresAsync, fetchProductsAsync, productSelectors } from '../../features/product/productSlice';
import { useAppDispatch, useAppSelector } from '../store/configureStore';

const useProducts = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(productSelectors.selectAll); // ตัวสินค้า
    const { productsLoaded, metaData, categoryProductLoaded, categoryProducts } = useAppSelector(state => state.product);//
    const { productRare, productRareLoaded } = useAppSelector(state => state.product);

    useEffect(() => {
      if (!productRareLoaded) dispatch(fetchProductRaresAsync());
    }, [productRareLoaded , dispatch]);

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch]);

    useEffect(() => {
        if (!categoryProductLoaded) dispatch(fetchCategoryProductsAsync());
    }, [categoryProductLoaded, dispatch]);
    
    return {
        metaData,
        productsLoaded ,
        categoryProductLoaded ,
        categoryProducts ,
        products ,
        productRare ,
        productRareLoaded
    };
}

export default useProducts