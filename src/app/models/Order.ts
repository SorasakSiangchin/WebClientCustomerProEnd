import { loadStripe } from "@stripe/stripe-js";
import { Address } from "./Address";

export const stripePromise = loadStripe('pk_test_51J5pRFD6QlVrrq9FrfeaECtvut0qmCm6WAFFwSgQyce2pHQ7XAxJpmN28X2Psuo79fQNKu2gPSfWMFeYNvuNg3B600tSp478sz')

export interface OrderRequest {
    addressID: number | undefined;
    orderItems: OrderItem[];
    accountIdFromProduct: string[];
    paymentMethod: number;
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

export interface  Order {
    id: string;
    accountID: string;
    subtotal: number;
    deliveryFee: number;
    customerStatus: boolean;
    sellerStatus: boolean;
    orderStatus: number;
    created: Date;
    total: number;
    paymentMethod: PaymentMethod;
    clientSecret: string;
    paymentIntentId?: string;
    orderCancel: boolean;
    orderItems: OrderItem[];
    address: Address;
}

export enum OrderStatus {
    WaitingForPayment, // รอดำเนินการ
    PendingApproval, // การชำระเงินที่ได้รับ
    SuccessfulPayment // การชำระเงินล้มเหลว
}

export enum PaymentMethod {
    TransferPayment, // โอนชำระเงิน
    CreditCard, //บัตรเครดิตชำระ
}

export interface OrderParams {
    pageNumber: number;
    pageSize: number;
    id: string;
    orderCancel: string;
    accountId: string;
    orderStatus: string;
    sellerId: string;
}
