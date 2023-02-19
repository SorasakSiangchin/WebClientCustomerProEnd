import { Empty, Space } from 'antd';
import { Fragment } from 'react';
import { Address } from '../../app/models/Address';

interface Props {
    address: Address | undefined
}

const CheckoutAddress = ({ address }: Props) => {

    const empty = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="ไม่พบที่อยู่" className='text-st' />;
    return (
        <Fragment>
            {address ? <Space direction='vertical' size="middle" style={{ padding: "10px" }}>
                <div id="billing-progress-opcheckout" className='text-st'>
                    รายละเอียดที่อยู่ :<dt style={{ display: "inline" }}> {address?.addressInformations.description}</dt>
                </div>
                <div id="shipping-progress-opcheckout" className='text-st'>
                    จังหวัด : <dt style={{ display: "inline" }}>{address?.addressInformations.province}</dt>
                </div>
                <div id="shipping_method-progress-opcheckout" className='text-st'>
                    อำเภอ : <dt style={{ display: "inline" }}> {address?.addressInformations.district}</dt>
                </div>
                <div id="payment-progress-opcheckout" className='text-st'>
                    ตำบล : <dt style={{ display: "inline" }}> {address?.addressInformations.subDistrict}</dt>
                </div>
                <div id="payment-progress-opcheckout" className='text-st'>
                    รหัสไปรษณีย์ : <dt style={{ display: "inline" }}> {address?.addressInformations.zipCode}</dt>
                </div>
            </Space> : empty}
        </Fragment>
    )
}

export default CheckoutAddress