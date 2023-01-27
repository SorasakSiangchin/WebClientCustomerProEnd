import { message, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import React from 'react'

interface Props {
    children?: any;
    handleChangeImaage?: any;
    showUploadList?: boolean

}

export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const AppUpload = ({ children, handleChangeImaage, showUploadList = false }: Props) => {
    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) message.error('สามารถอัปโหลดไฟล์ JPG/PNG เท่านั้น!');

        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!isLt2M) message.error('รูปภาพต้องมีขนาดเล็กกว่า 100MB!');

        return isJpgOrPng && isLt2M;
    };
    return (
        <Upload
            name="avatar"
            className="avatar-uploader"
            showUploadList={showUploadList}
            beforeUpload={beforeUpload}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={handleChangeImaage}
        >
            {children}
        </Upload>
    )
}


export default AppUpload;