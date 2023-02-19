export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    color: string;
    weight: number;
    description: string;
    imageUrl: string;
    accountID: string;
    created: Date;
    lastUpdate: Date;
    weightUnitID: number;
    categoryProductID: number;
    weightUnit: WeightUnit;
    categoryProduct: CategoryProduct;
    levelProductID:number;
    levelProduct : LevelProduct;
}

export interface CategoryProduct {
    id: number;
    name: string;
    accountID: string;
}

export interface WeightUnit {
    id: number;
    name: string;
}

export interface ProductParams {
    // orderBy: string;
    // types: string[];
    // brands: string[];
    category: string;
    pageNumber: number;
    pageSize: number;
    rangePriceStart: number;
    rangePriceEnd: number;
    searchTerm?: string;
    accountID?:string;
}

export interface ImageProduct {
    id: string;
    imageUrl: string;
    productID: string;
}

export interface WeightUnit {
    id:   number;
    name: string;
}

export interface LevelProduct {
    id:    number;
    level: string;
}