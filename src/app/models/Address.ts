import { Account } from "./Account";

export interface Address {
    id:                  number;
    accountID:           string;
    status:              boolean;
    addressInformations: AddressInformation;
    account:             Account;
};

export interface AddressInformation {
    id:            number;
    subDistrict:   string;
    district:      string;
    province:      string;
    zipCode:       string;
    information:   string;
    recipientName: string;
    phoneNumber:   string;
    description:   string;
};

export interface CreateAddress {
    subDistrict: string ,
    district: string,
    province: string,
    zipCode: string,
    recipientName: string,
    phoneNumber: string,
    description: string,
    accountID: string
}