import * as Yup from 'yup';

export const DeliveryValidate = Yup.object().shape({
    timeArrive: Yup.string().required('กรุณาเลือกเวลา') ,
    shippingServiceName: Yup.string().required('กรุณากรอกชื่อบริษัทขนส่ง') ,
    statusDeliveryID : Yup.string().required('กรุณาเลือกสถานะ') ,
    
  });