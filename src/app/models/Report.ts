
import { Product } from "./Product";

export interface ProductStatistics {
    product: Product;
    numPercen: number;
    amount: number;
}

export interface SalesStatistics {
    totalPrice: number;
    sales: Sale[];
}

export interface Sale {
    percent: number;
    price: number;
    fullTime: Date;
    day: number;
    month: number;
    year: number;
}

export interface RequestProductStatistics {
    accountId: any ;
    dateStart: Date | null;
    dateEnd: Date | null;
}

export interface RequestSalesStatistics {
    accountId: any ;
    year: Date | null ;
}

export enum TypeProductStatisticsRequest {
    DateStart = 'DateStart',
    DateEnd = 'DateEnd',
};

export enum TypeSalesStatisticsRequest {
    DateYear = 'DateYear',
};