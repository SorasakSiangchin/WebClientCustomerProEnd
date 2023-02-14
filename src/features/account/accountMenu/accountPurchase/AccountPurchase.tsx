import { Tabs } from 'antd';
import useOrder from '../../../../app/hooks/useOrder';
import { ColAccount } from '../../AccountPage';
import type { TabsProps } from 'antd';
import { Container } from 'react-bootstrap';
import Orders from './Orders';
import { useState } from 'react';
import OrderDetail from './OrderDetail';



const AccountPurchase = () => {
    const { orders } = useOrder();
    const [orderPage, setOrderPage] = useState<boolean>(false);
    const [orderId, setOrderId] = useState<string>("");
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `ทั้งหมด`,
            children: <Orders orders={orders} setOrderPage={setOrderPage} setOrderId={setOrderId} />,
        },
        {
            key: '2',
            label: `ที่ต้องชำระเงิน`,
            children: <Orders orders={orders?.filter(e => e.orderStatus === 0)} setOrderPage={setOrderPage} setOrderId={setOrderId} />,
        },
        {
            key: '3',
            label: `ที่ต้องจัดส่ง`,
            children: <Orders orders={orders?.filter(e => e.orderStatus === 1)} setOrderPage={setOrderPage} setOrderId={setOrderId} />,
        },
    ];

    const ShowData = () => {
        if (!orderPage) {
            return <Container>
                <Tabs className='text-st' defaultActiveKey="1" items={items} />
            </Container>
        } else {
            return <OrderDetail orderId={orderId} setOrderPage={setOrderPage}  />
        }
    }

    return (
        <ColAccount className="col-main col-sm-9" >
            <div className="my-account">
                <div className="dashboard">
                    <ShowData />
                </div>
            </div>
        </ColAccount>
    )
}

export default AccountPurchase