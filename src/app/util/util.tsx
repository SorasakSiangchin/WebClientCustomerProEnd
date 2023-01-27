import { NumericFormat } from "react-number-format";
import { Address, CreateAddress, UpdateAddress } from "../models/Address";

const padTo2Digits = (num: any) => {
    return num.toString().padStart(2, '0');
};

export const formatDate = (date: any) => {
    return (
        [
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
            date.getFullYear(),
        ].join('/') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':')
    );
};

export const currencyFormat = (price?: number) => {
    return <NumericFormat
        value={price}
        displayType={"text"}
        thousandSeparator=","
        prefix={"฿"}
    />
};

export const convertRole = (roleName: any) => {
    switch (roleName) {
        case "customer":
            return "ลูกค้า";
        case "seller":
            return "เกษตรกร";
        case "admin":
            return "ผู้ดูแลระบบ";
        default:
            break;
    };
};

export const convertToCreateAddress = (value : CreateAddress) => {
    const Result = {
        addressInformations : {
            id: 0,
            subDistrict: value.subDistrict,
            district: value.district,
            province: value.province,
            zipCode: value.zipCode.toString(),
            recipientName: value.recipientName,
            phoneNumber: value.phoneNumber,
            description: value.description,
        } ,

    accountID: value.accountID
    };
    return Result;
};

export const convertToUpdateAddress = (value : UpdateAddress) => {
    const Result = {
        addressInformations : {
            id: value.idInformation,
            subDistrict: value.subDistrict,
            district: value.district,
            province: value.province,
            zipCode: value.zipCode.toString(),
            recipientName: value.recipientName,
            phoneNumber: value.phoneNumber,
            description: value.description,
        } ,
    id : value.id ,
    status : value.status ,
    accountID: value.accountID
    };
    return Result;
};

export const convertToAddress= (value : Address) => {
    let Result = {};
    if(value){
        Result = {
            id: value.id,
            idInformation : value.addressInformations.id ,
            status : value.status ,
            subDistrict: value.addressInformations.subDistrict,
            district: value.addressInformations.district,
            province: value.addressInformations.province,
            zipCode: value.addressInformations.zipCode,
            recipientName: value.addressInformations.recipientName,
            phoneNumber: value.addressInformations.phoneNumber,
            description:  value.addressInformations.description,
            accountID: value.accountID
        };
    };
    return Result;
};

export const Text = `ภายในระบบของเราจะมีสินค้าทางเกษตกรรมให้ทุกท่านเลือกชอปปิ้งอย่างมากมาย อีกทั้งยังมีการจองสินค้าที่มีเฉพาะในฤดูกาลนั้นๆและสินค้าที่คุณอาจจะเข้าถึงได้ยากอีกด้วย ขอให้ทุกท่านมีความสุขกับการชอปปิ้งนะครับ`;

