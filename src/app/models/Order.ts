import { loadStripe } from "@stripe/stripe-js";
import { Address } from "./Address";
import { EvidenceMoneyTransfer } from "./EvidenceMoneyTransfer";
import { OrderMessage } from "./OrderMessage";

export const stripePromise = loadStripe('pk_test_51J5pRFD6QlVrrq9FrfeaECtvut0qmCm6WAFFwSgQyce2pHQ7XAxJpmN28X2Psuo79fQNKu2gPSfWMFeYNvuNg3B600tSp478sz')

export interface OrderRequest {
    addressID: number | undefined;
    orderItems: OrderItem[];
    accountIdFromProduct: string[];
    paymentMethod: number;
    cartID: string;
    orderUsage : OrderUsage;
};

export interface OrderItem {
    productID: any;
    id: number;
    itemOrdered: ItemOrdered;
    price: number;
    amount: number;
};

export interface ItemOrdered {
    productID: string;
    name: string;
    imageUrl: string;
};

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
    orderUsage : OrderUsage;
    evidenceMoney : EvidenceMoneyTransfer;
    orderMessage?:    OrderMessage[];
};

export enum OrderStatus {
    WaitingForPayment, // รอดำเนินการ
    PendingApproval, // การชำระเงินที่ได้รับ
    SuccessfulPayment // การชำระเงินล้มเหลว
};

export enum PaymentMethod {
    TransferPayment, // โอนชำระเงิน
    CreditCard, //บัตรเครดิตชำระ
};

export enum OrderUsage {
    Buy, // โอนชำระเงิน
    Reserve, //บัตรเครดิตชำระ
};

export interface OrderParams {
    id: string;
    pageNumber: number;
    pageSize: number;
    orderCancel: string;
    accountId: string;
    orderStatus: string;
    sellerId: string;
    orderUsage:string;
    haveEvidence : boolean; // ส่งเป็น boolean จะ get order ที่มีหลักฐานการชำระเงิน
};
