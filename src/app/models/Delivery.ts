import { Order } from "./Order";

export interface Delivery {
    id:                  number;
    timeArrive:          Date;
    shippingServiceName: string;
    orderID:             string;
    statusDeliveryID:    number;
    order:               Order;
    statusDelivery:      StatusDelivery;
}

export interface StatusDelivery {
    id:   number;
    name: string;
}


