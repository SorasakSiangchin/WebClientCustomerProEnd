import { message } from "antd";
import { RcFile } from "antd/es/upload";
import { NumericFormat } from "react-number-format";
import { Address, CreateAddress, UpdateAddress } from "../models/Address";

export const clientId = "54000393134-9j18ndph0oor1sh396dl5cd89a788klg.apps.googleusercontent.com";

export const backEndUtl = "https://localhost:7265/";

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

export const Ts = ({ children, className }: any) => <div className={`text-st ${className}`}>{children}</div>

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

export const convertToCreateAddress = (value: CreateAddress) => {
    const Result = {
        addressInformations: {
            id: 0,
            subDistrict: value.subDistrict,
            district: value.district,
            province: value.province,
            zipCode: value.zipCode.toString(),
            recipientName: value.recipientName,
            phoneNumber: value.phoneNumber,
            description: value.description,
        },

        accountID: value.accountID
    };
    return Result;
};

export const convertToUpdateAddress = (value: UpdateAddress) => {
    const Result = {
        addressInformations: {
            id: value.idInformation,
            subDistrict: value.subDistrict,
            district: value.district,
            province: value.province,
            zipCode: value.zipCode.toString(),
            recipientName: value.recipientName,
            phoneNumber: value.phoneNumber,
            description: value.description,
        },
        id: value.id,
        status: value.status,
        accountID: value.accountID
    };
    return Result;
};

export const convertToAddress = (value: Address) => {
    let Result = {};
    if (value) {
        Result = {
            id: value.id,
            idInformation: value.addressInformations.id,
            status: value.status,
            subDistrict: value.addressInformations.subDistrict,
            district: value.addressInformations.district,
            province: value.addressInformations.province,
            zipCode: value.addressInformations.zipCode,
            recipientName: value.addressInformations.recipientName,
            phoneNumber: value.addressInformations.phoneNumber,
            description: value.addressInformations.description,
            accountID: value.accountID
        };
    };
    return Result;
};

export const beforeUploadAntd = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('สามารถอัปโหลดไฟล์ JPG/PNG เท่านั้น!');
    }
    const isLt2M = file.size / 1024 / 1024 < 100;
    if (!isLt2M) {
        message.error('รูปภาพต้องมีขนาดเล็กกว่า 100MB!');
    }
    return isJpgOrPng && isLt2M;
};

export const Text = `ภายในระบบของเราจะมีสินค้าทางเกษตกรรมให้ทุกท่านเลือกชอปปิ้งอย่างมากมาย อีกทั้งยังมีการจองสินค้าที่มีเฉพาะในฤดูกาลนั้นๆและสินค้าที่คุณอาจจะเข้าถึงได้ยากอีกด้วย ขอให้ทุกท่านมีความสุขกับการชอปปิ้งนะครับ`;

export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

export const truncate = (str: any, length: any) => str.length > 10 ? str.substring(0, length) + "..." : str;



