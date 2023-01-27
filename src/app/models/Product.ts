export interface Product {
    id:                string;
    name:              string;
    price:             number;
    stock:             number;
    color:             string;
    weight:            number;
    description:       string;
    imageUrl:          string;
    created:           Date;
    lastUpdate:        Date;
    weightUnitID:      number;
    categoryProductID: number;
    weightUnit:        WeightUnit;
    categoryProduct:   CategoryProduct;
}

export interface CategoryProduct {
    id:        number;
    name:      string;
    accountID: string;
}

export interface WeightUnit {
    id:   number;
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
} 

export interface ImageProduct {
    id:        string;
    imageUrl:  string;
    productID: string;
}