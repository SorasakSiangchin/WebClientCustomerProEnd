import React, { useEffect } from 'react'
import { fetchCategoryProductsAsync, fetchLevelProductsAsync, fetchProductRaresAsync, fetchProductsAsync, fetchWeightUnitsAsync, productSelectors } from '../../app/store/productSlice';
import { useAppDispatch, useAppSelector } from '../store/configureStore';

const useProducts = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(productSelectors.selectAll); // ตัวสินค้า
    const {
        productsLoaded,
        metaData,
        categoryProductLoaded,
        categoryProducts,
        weightUnitLoaded,
        weightUnits,
        levelProductLoaded,
        levelProducts
    } = useAppSelector(state => state.product);//
    const { productRare, productRareLoaded } = useAppSelector(state => state.product);

    useEffect(() => {
        if (!productRareLoaded) dispatch(fetchProductRaresAsync());
    }, [productRareLoaded, dispatch]);

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch]);

    useEffect(() => {
        if (!categoryProductLoaded) dispatch(fetchCategoryProductsAsync());
    }, [categoryProductLoaded, dispatch]);

    useEffect(() => {
        if (!weightUnitLoaded) dispatch(fetchWeightUnitsAsync());
    }, [weightUnitLoaded, dispatch]);

    useEffect(() => {
        if (!levelProductLoaded) dispatch(fetchLevelProductsAsync());
    }, [levelProductLoaded, dispatch]);

    return {
        metaData,
        productsLoaded,
        categoryProductLoaded,
        categoryProducts,
        products,
        productRare,
        productRareLoaded,
        weightUnits,
        weightUnitLoaded,
        levelProductLoaded,
        levelProducts
    };
}

export default useProducts