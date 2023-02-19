import { Avatar, Button, Card, Col, Divider, Empty, List, Row, Space } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import agent from '../../../../app/api/agent';
import { Account } from '../../../../app/models/Account';
import { Result } from '../../../../app/models/Interfaces/IResponse';
import { Order } from '../../../../app/models/Order';
import { Product } from '../../../../app/models/Product';
import { currencyFormat, Ts } from '../../../../app/util/util';
import ModalPayment from './ModalPayment';

interface Props {
    orders: Order[]
    setOrderPage?: any;
    setOrderId?: any;
}

const Orders = ({ orders, setOrderPage, setOrderId }: Props) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [id, setId] = useState<string>("");
    const showOrder = orders?.length > 0 ? <Space direction='vertical' size="large" style={{ width: "100%" }}>
        {React.Children.toArray(orders?.map((order: Order) => {
            const CheckButton = () => {
                switch (order.orderStatus) {
                    case 0:
                        return "ชำระเงินตอนนี้"
                    case 1:
                        return "รออนุมัติ"
                    case 2:
                        return "รออนุมัติ"
                    default:
                        return "";
                }
            };

            const CheckStatus = () => {
                switch (order.orderStatus) {
                    case 0:
                        return "ที่ต้องชำระเงิน"
                    case 1:
                        return "ที่ต้องจัดส่ง"
                    default:
                        return "";
                }
            };
            
            const onClickButton = (orderId : any) => {
                setOpenModal(true);
                setId(orderId);
            };

            return (
                <Card

                    type="inner"
                    size='small'
                    extra={<Ts><div style={{ color: "#ff4d4f" }}>{CheckStatus()}</div></Ts>}
                    title={<AvatarAccountByProductId productId={order.orderItems[0].productID}  />}
                >
                    <ModalPayment openModal={openModal} setOpenModal={setOpenModal} orderId={id} setOrderId={setId} />
                    <List
                        itemLayout="horizontal"
                        size='small'
                        dataSource={order.orderItems}
                        renderItem={(item: any) => (
                            <List.Item onClick={() => {
                                setOrderId(order.id);
                                setOrderPage(true);
                            }} >
                                <List.Item.Meta
                                    avatar={<img width={70} height={70} src={item.imageUrl} />}
                                    title={item.name}
                                    description={`x${item.amount}`}
                                />
                                {item.id}
                                <Ts>{currencyFormat(item.price)}</Ts>
                            </List.Item>
                        )}
                    />
                    <Divider />
                    <Space direction='vertical' style={{ width: "100%" }}>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <Ts>
                                รวมการสั่งซื้อ : {"  "}
                                <strong style={{ color: "#ff4d4f", fontSize: "20px" }}>
                                    {currencyFormat(order.total)}
                                </strong>
                            </Ts>
                        </div>
                        <Row gutter={24}>
                            <Col span={10}>
                            </Col>
                            <Col span={14} style={{ display: "flex", justifyContent: "end" }}>
                                <Space>
                                    <Button className='text-st' onClick={() => onClickButton(order.id)} type='primary' style={{ width: "100%", backgroundColor: "#58944C" }}>{CheckButton()}</Button>
                                    <Button className='text-st'>ยกเลิก</Button>
                                </Space>
                            </Col>
                        </Row>
                    </Space>
                </Card>
            )
        }))}
    </Space> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="text-st" description="ไม่มีการสั่งซื้อ" />

    return (
        <Fragment>
            {showOrder}
        </Fragment>
    )
}

export const AvatarAccountByProductId = ({ productId }: any) => {
    const [account, setAccount] = useState<Account | null>(null);
    useEffect(() => {
        const loadAccount = async () => {
            const { result, isSuccess, statusCode }: Result = await agent.Product.detail(productId);
            if (isSuccess === true && statusCode === 200) {
                const { accountID } = result as Product
                const resultAccount: Result = await agent.Account.currentAccount(accountID);
                if (resultAccount.isSuccess === true && resultAccount.statusCode === 200) setAccount(resultAccount.result);
            };
        }
        loadAccount();
    }, []);
    return <Card.Meta
        avatar={<Avatar src={account?.imageUrl} />}
        title={account?.firstName}
    />;
}

export default Orders