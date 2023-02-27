import { Address } from "./Address";

export interface OrderRequest {
    addressID: number | undefined;
    orderItems: OrderItem[];
    accountIdFromProduct: string[];
    cartID: string;
}

export interface OrderItem {
    productID: any;
    id: number;
    itemOrdered: ItemOrdered;
    price: number;
    amount: number;
}

export interface ItemOrdered {
    productID: string;
    name: string;
    imageUrl: string;
}

export interface Order {
    id: string;
    accountID: string;
    subtotal: number;
    deliveryFee: number;
    customerStatus: boolean;
    sellerStatus: boolean;
    orderStatus: number;
    created: Date;
    total: number;
    orderCancel: boolean;
    orderItems: OrderItem[];
    address: Address;
}

export enum OrderStatus {
    Pending, // รอดำเนินการ
    PaymentReceived, // การชำระเงินที่ได้รับ
    PaymentFailed // การชำระเงินล้มเหลว
}

export interface OrderParams {
    pageNumber: number;
    pageSize: number;
    id: string;
    orderCancel: string;
    accountId: string;
    orderStatus: string;
}