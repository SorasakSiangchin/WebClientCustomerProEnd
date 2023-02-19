import { Order } from "./Order";

export interface EvidenceMoneyTransfer {
    id:       number;
    evidence: string;
    created:  Date;
    orderID:  string;
    order:    Order;
}