import * as Yup from 'yup';
const emailValidation = /^[a-zA-Z0-9_\\.]+@[a-zA-Z]+\.[a-zA-Z0-9\\.]+$/;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const LoginValidate = Yup.object().shape({
  email: Yup.string().email('กรุณากรอกอีเมล').required('กรุณากรอกอีเมล').matches(emailValidation, "รูปแบบผู้ใช้งานไม่ถูกต้อง"),
  password: Yup.string().required("กรุณากรอกรหัสผ่าน").min(8, "รหัสผ่านต้องมากกว่า 8 ตัว"),
});

export const RegisterValidate = Yup.object().shape({
  email: Yup.string().email('กรุณากรอกอีเมล').required('กรุณากรอกอีเมล').matches(emailValidation, "รูปแบบผู้ใช้งานไม่ถูกต้อง"),
  password: Yup.string().required("กรุณากรอกรหัสผ่าน").min(8, "รหัสผ่านต้องมากกว่า 8 ตัว"),
  phoneNumber: Yup.string().required("กรุณากรอกเบอร์โทรศัพท์").matches(phoneRegExp, 'หมายเลขโทรศัพท์ไม่ถูกต้อง'),
  firstName:Yup.string().required("กรุณากรอกชื่อ"),
  lastName:Yup.string().required("กรุณากรอกนามสกุล") ,
  roleID : Yup.string().required("กรุณาเลือกบทบาท")
});

export const AddressValidate = Yup.object().shape({
  subDistrict: Yup.string().required('กรุณาเลือกตำบล'),
  district: Yup.string().required("กรุณาเลือกอำเภอ"),
  province: Yup.string().required("กรุณาเลือกจังหวัด"),
  zipCode:Yup.string().required("กรุณากรอกรหัสไปรษณีย์"),
  recipientName:Yup.string().required("กรุณากรอกชื่อผู้รับ") ,
  phoneNumber : Yup.string().required("กรุณากรอกเบอร์โทรศัพท์").matches(phoneRegExp, 'หมายเลขโทรศัพท์ไม่ถูกต้อง'),
  description : Yup.string().required('กรุณากรอกรายละเอียด'),
});