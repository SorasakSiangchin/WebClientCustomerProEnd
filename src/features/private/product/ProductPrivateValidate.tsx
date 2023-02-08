import * as Yup from 'yup';

export const ProductPrivateValidate = Yup.object().shape({
    name: Yup.string().required('กรุณากรอกชื่อ'),
    price: Yup.number().min(100, "ราคาต้องมากกว่า 100 บาท").required("กรุณากรอกราคา"),
    stock: Yup.number().min(1 , "จำนวนสินค้าต้องมากกว่า 1 รายการ").required("กรุณากรอกจำนวน"),
    weight:Yup.number().min(1 , "น้ำหนักต้องมากกว่า 1").required("กรุณากรอกจำนวน"),
    description : Yup.string().required('กรุณากรอกคำอธิบาย'),
    categoryProductID:Yup.string().required("เลือกประเภทสินค้า"),
    //formFiles : Yup.string().required("กรุณาเลือกรูปภาพ")
  });