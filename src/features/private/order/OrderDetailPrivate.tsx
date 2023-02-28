import { RollbackOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Descriptions, Divider, List, Row, Tag } from 'antd';
import { Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import LayoutPrivate from '../LayoutPrivate';
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { fetchOrderAsync, orderSelectors } from '../../../app/store/orderSlice';
import agent from '../../../app/api/agent';
import { Result } from '../../../app/models/Interfaces/IResponse';
import { Account } from '../../../app/models/Account';
import { currencyFormat, Ts } from '../../../app/util/util';
import Lottie from "lottie-react";
import IconLocation from "../../../assets/icons/Location.json";
const OrderDetailPrivate = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const dispatch = useAppDispatch();
    const [account, setAccount] = useState<Account | null>(null);
    const order = useAppSelector(states => orderSelectors.selectById(states, state.orderId));

    useEffect(() => {
        if (!order) dispatch(fetchOrderAsync(state.orderId));
        loadInfoCustomer(order);
    }, [state.orderId, order, dispatch]);

    const titleCard = (
        <div style={{ display: "flex", alignItems: "end" }}>
            <Lottie style={{ width: "5rem" }} animationData={IconLocation} />
            <p>ที่อยู่จัดส่ง</p>
        </div>
    );
    const infoAddress = [
        { title: 'รายละเอียดที่อยู่', info: order?.address.addressInformations.description },
        { title: 'จังหวัด', info: order?.address.addressInformations.province },
        { title: 'อำเภอ', info: order?.address.addressInformations.district },
        { title: 'ตำบล', info: order?.address.addressInformations.subDistrict },
        { title: 'รหัสไปรษณีย์', info: order?.address.addressInformations.zipCode },
    ];

    const infoSummary = [
        { title: 'รวมค่าสินค้า', info: order?.subtotal },
        { title: 'ค่าจัดส่ง', info: order?.deliveryFee },
        { title: 'รวมการสั่งซื้อ', info: order?.total },
    ];

    const actionCard = (
        <>
            <span>สั่งซื้อโดย : </span>
            <span>{`${account?.firstName}  ${account?.lastName}`}</span>
        </>
    )

    const loadInfoCustomer = async (order: any) => {
        const { isSuccess, result }: Result = await agent.Account.currentAccount({
            accountId: order.address.accountID,
            statusLogin: ""
        });
        if (isSuccess === true) setAccount(result);
    };

    return (
        <LayoutPrivate>
            <Row>
                <Col span={8}><h1 className='text-st'>ข้อมูลใบสั่งซื้อ</h1></Col>
                <Col span={8} offset={8} style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
                    <Button style={{ backgroundColor: "grey" }} className='text-st' type="primary" icon={<RollbackOutlined />} onClick={() => navigate(-1)}>
                        กลับ
                    </Button>
                </Col>
            </Row>
            <Divider />
            <Container>
                <Row gutter={24}>
                    <Col span={10}>
                        <Card
                            title={titleCard}
                            className="text-st"
                            bordered
                            style={{ width: "100%" }}
                            actions={[
                                actionCard
                            ]}
                        >
                            <Descriptions className='text-st' size='small' column={1} >
                                {React.Children.toArray(infoAddress.map(address => <Descriptions.Item label={address.title}>{address.info}</Descriptions.Item>))}
                            </Descriptions>
                        </Card>
                    </Col>
                    <Col span={14}>
                        <Card
                            title="รายการสั่งซื้อ"
                            className="text-st"
                            bordered
                            style={{ width: "100%" }}
                        >
                            <List
                                itemLayout="horizontal"
                                size='small'
                                dataSource={order?.orderItems}
                                renderItem={(item: any) => (
                                    <List.Item className="text-st">
                                        <List.Item.Meta
                                            avatar={<img width={70} height={70} src={item.imageUrl} />}
                                            title={item.name}
                                            description={`x${item.amount}`}
                                        />
                                        <Ts>{currencyFormat(item.price)}</Ts>
                                    </List.Item>
                                )}
                            />
                            <br />
                            <Descriptions
                                bordered
                                column={1}
                            >
                                {React.Children.toArray(infoSummary.map((summary, index) => <Descriptions.Item
                                    className='text-st'
                                    label={<div style={{ display: "flex", justifyContent: "end" }}>
                                        {summary.title}
                                    </div>}
                                    style={{ width: "80%" }}
                                >
                                    {index === 2 ? <Tag className='text-st center' color="success" style={{ fontSize: "20px", padding: "5px" }}>{currencyFormat(summary.info)}</Tag> : currencyFormat(summary.info)}
                                </Descriptions.Item>))}
                            </Descriptions>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </LayoutPrivate>
    )
}

export default OrderDetailPrivate