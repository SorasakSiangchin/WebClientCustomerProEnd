export interface Cart {
    id: string;
    accountID: string;
    items: CartItem[];
}

export interface CartItem {
    id : number;
    productId: string;
    name: string;
    price: number;
    stock: number;
    accountId: string;
    imageUrl: string;
    categoryProductName: string;
    amount: number;
}
