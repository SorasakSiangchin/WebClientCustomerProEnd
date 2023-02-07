import { Result } from './../../app/models/Interfaces/IResponse';
import { createAsyncThunk, createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Product, ProductParams, CategoryProduct, ImageProduct, WeightUnit, LevelProduct } from '../../app/models/Product';
import { RootState } from '../../app/store/configureStore';
import { MetaData } from '../../app/models/Pagination';

interface ProductState {
    product: Product | null;
    productsLoaded: boolean;
    productRare: Product[] | null;
    productRareLoaded: boolean;
    categoryProductLoaded: boolean;
    categoryProducts: CategoryProduct[] | null;
    imageProductLoaded: boolean;
    productNames: Product[] | null;
    productNameLoaded: boolean;
    imageProducts: ImageProduct[] | null;
    productParams: ProductParams;
    weightUnits: WeightUnit[] | null;
    weightUnitLoaded: boolean;
    levelProducts: LevelProduct[] | null;
    levelProductLoaded: boolean;
    metaData: MetaData | null;
};

export const fetchImageProductsAsync = createAsyncThunk<ImageProduct[], any>(
    'product/fetchImageProductsAsync',
    async (idProduct, thunkAPI) => {
        try {
            const result = await agent.ImageProduct.get(idProduct);
            const images = result.result;
            return images;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);

export const fetchProductsAsync = createAsyncThunk<Product[], void, { state: RootState }>(
    'product/fetchProducts',
    async (_, thunkAPI) => {
        const params = thunkAPI.getState().product.productParams;
        try {
            const result = await agent.Product.list(params);
            const products = result.items.result;
            thunkAPI.dispatch(setMetaData(result.metaData));
            return products;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);

export const fetchProductAsync = createAsyncThunk<Product, any>(
    "product/fetchProduct",
    async (productId, thunkAPI) => {
        try {
            const { result }: Result = await agent.Product.detail(productId);
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);

export const fetchWeightUnitsAsync = createAsyncThunk<Result>(
    "product/fetchWeightUnitAsync",
    async (_, thunkAPI) => {
        try {
            const results: Result = await agent.WeightUnit.list();
            return results;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);

export const fetchLevelProductsAsync = createAsyncThunk<Result>(
    "product/fetchLevelProductsAsync",
    async (_, thunkAPI) => {
        try {
            const results: Result = await agent.LevelProduct.list();
            return results;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);


export const fetchCategoryProductsAsync = createAsyncThunk("product/fetchCategoryProduct",
    async (_, thunkAPI) => {
        try {
            const { result }: Result = await agent.CategoryProduct.list();
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    });

export const fetchProductRaresAsync = createAsyncThunk("product/fetchProductRaresAsync",
    async (_, thunkAPI) => {
        try {
            const { result }: Result = await agent.Product.getRares();
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    });

export const fetchProductByNameAsync = createAsyncThunk<Product[], string>("product/fetchProductByNameAsync",
    async (nameProduct, thunkAPI) => {
        try {
            const { result }: Result = await agent.Product.getName(nameProduct);
            console.log(result);
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    });

export const removeProductAsync = createAsyncThunk<Result, string>("product/removeProductAsync", async (productId, thunkAPI) => {
    try {
        const results: Result = await agent.Product.delete(productId);
        return results;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data })
    }
});

export const createProductAsync = createAsyncThunk<Result, any>("product/createProductAsync", async (product, thunkAPI) => {
    try {
        const results: Result = await agent.Product.create(product);
        return results;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data })
    }
});

const initParams = (): ProductParams => {
    return {
        pageNumber: 1,
        pageSize: 9,
        category: "",
        rangePriceStart: 0,
        rangePriceEnd: 0,
        searchTerm: ""
    }
};

const productsAdapter = createEntityAdapter<Product>(); // สรา้งตัวแปรแบบ Adapter

export const productSlice = createSlice({
    name: "product",
    initialState: productsAdapter.getInitialState<ProductState>({
        product: null,
        productParams: initParams(),
        metaData: null,
        productsLoaded: false,
        categoryProducts: null,
        categoryProductLoaded: false,
        imageProducts: null,
        imageProductLoaded: false,
        productRare: null,
        productRareLoaded: false,
        productNames: null,
        productNameLoaded: false,
        weightUnits: null,
        weightUnitLoaded: false,
        levelProducts: null,
        levelProductLoaded: false,
    }),
    reducers: {
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
        setParams: (state, action) => {
            state.productsLoaded = false; // เพื่อ Product มัน reload ใหม่
            state.productParams = { ...state.productParams, ...action.payload };
        },
        resetProductParams: (state) => {
            state.productsLoaded = false;
            state.productParams = initParams();
        },
        resetImageProduct: (state) => {
            state.imageProducts = null;
            state.imageProductLoaded = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload); // set products
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload) // set product
        });
        builder.addCase(fetchCategoryProductsAsync.fulfilled, (state, action) => {
            state.categoryProducts = action.payload;
            state.categoryProductLoaded = true;
        });
        builder.addCase(fetchProductRaresAsync.fulfilled, (state, action) => {
            state.productRare = action.payload;
            state.productRareLoaded = true;
        });
        builder.addCase(fetchProductByNameAsync.fulfilled, (state, action) => {
            state.productNames = action.payload;
            state.productNameLoaded = true;
        });
        builder.addCase(fetchImageProductsAsync.fulfilled, (state, action) => {
            state.imageProducts = action.payload;
            state.imageProductLoaded = true;
        });
        builder.addCase(fetchWeightUnitsAsync.fulfilled, (state, action) => {
            const { result, isSuccess, statusCode } = action.payload;
            if (isSuccess === true && statusCode === 200) state.weightUnits = result;
            state.weightUnitLoaded = true;
        });
        builder.addCase(fetchLevelProductsAsync.fulfilled, (state, action) => {
            const { result, isSuccess, statusCode } = action.payload;
            if (isSuccess === true && statusCode === 200) state.levelProducts = result;
            state.levelProductLoaded = true;
        });
        builder.addMatcher(isAnyOf(removeProductAsync.fulfilled, createProductAsync.fulfilled), (state, action) => {
            const { isSuccess } = action.payload;
            if (isSuccess === true) state.productsLoaded = false;
        });
    }
});

export const { setMetaData, setParams, resetProductParams, resetImageProduct } = productSlice.actions;

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.product); 