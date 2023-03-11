export interface Account {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    imageUrl: string;
    status: boolean;
    roleID: number;
    role: Role;
};

export interface Role {
    id: number;
    name: string;
};

export interface GoogleLoginRequest {
    email: string;
    password: string;
    imageUrl: string;
    firstName: string;
    lastName: string;
};

export interface AccountParams {
    pageNumber: number;
    pageSize: number;
    status: string;
    searchName: string;
    searchEmail: string;
    searchPhoneNumber: string;
}

