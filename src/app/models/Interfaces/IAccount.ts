export interface Login {
    email: string;
    password: string;
}

export interface Register {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    roleID :number;
    formFiles: File;
}