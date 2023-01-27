export interface Account {
    id:          string;
    firstName:   string;
    lastName:    string;
    email:       string;
    password:    string;
    phoneNumber: string;
    imageUrl:    null;
    roleID:      number;
    role:        Role;
}

export interface Role {
    id:   number;
    name: string;
}
