export interface Cart {
    id:        string;
    accountID: string;
    items:     CartItem[];
}

export interface CartItem {
    productId:           string;
    name:                string;
    price:               number;
    stock:               number;
    imageUrl:            string;
    categoryProductName: string;
    amount:              number;
}
