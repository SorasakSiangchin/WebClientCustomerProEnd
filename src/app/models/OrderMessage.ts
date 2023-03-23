import { Account } from "./Account";

export interface OrderMessage {
    id?:        string;
    message?:   string;
    created?:   Date;
    accountID?: string;
    orderID?:   string;
    account?:   Account;
}

export interface OrderMessageRequest {
    id?:        string;
    message?:   string;
    created?:   Date;
    accountID?: string;
    orderID?:   string;
}