import { AutoComplete, Button, Card, Col, Divider, Empty, Image, Input, List, Row, Select, Space } from 'antd';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import useOrder from '../../../app/hooks/useOrder';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { setParams } from '../../../app/store/orderSlice';
import { currencyFormat, truncate, Ts } from '../../../app/util/util';
import LayoutPrivate from '../LayoutPrivate';
import { TfiTruck } from "react-icons/tfi";
import { useNavigate } from 'react-router-dom';

const DeliveryPrivatePage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { orders } = useOrder();
    const { account } = useAppSelector(state => state.account);

    useEffect(() => {
        dispatch(setParams({ sellerId: account?.id }));
    }, []);

    const options = orders.map(e => {
        return {
            key: e.id,
            value: e.id
        }
    });

    return (
        <LayoutPrivate>
            <Row>
                <Col span={8}><h1 className='text-st'>ที่ต้องจัดส่ง</h1></Col>
                <Col span={8} offset={8} style={{ display: "flex", justifyContent: "end" }}>
                    <Space>
                        <h1>
                            <AutoComplete
                                filterOption={(inputValue, option) =>
                                    option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                                onChange={(e) => {
                                    dispatch(setParams({ id: e }));
                                }}
                                style={{ width: "30rem", height: "100%" }}
                                options={options}
                            >
                                <Input.Search
                                    allowClear
                                    className='center'
                                    size="middle"
                                    placeholder="ค้นหาใบสั่งซื้อ"
                                    enterButton
                                    width="100%"
                                />
                            </AutoComplete>
                        </h1>
                    </Space>
                </Col>
            </Row>
            <Divider />
            <Container>
                <Row gutter={24}>
                    {orders?.length > 0 ? React.Children.toArray(orders?.filter(e => e.orderStatus !== 0).map(order => {
                        const action = [
                            <Button
                                onClick={() => navigate(`/private/delivery/form/${order.id}`)}
                                type='link'
                                icon={<><TfiTruck />{"  "}</>}
                                className='text-st'
                            >
                                จัดส่ง
                            </Button>
                        ];

                        const showModal = () => {

                        }

                        return <>

                            <Col span={8}>
                                <Card
                                    className='text-st'
                                    actions={action}
                                    title={order.id + "."}
                                    hoverable
                                    bordered
                                    style={{
                                        width: "100%",
                                        marginTop: "2rem"
                                    }}
                                >
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={[order.orderItems[0]]}
                                        footer={
                                            order.orderItems.length > 1 ?
                                                <p className='text-st center img-opacity'>
                                                    มีสินค้าอีก {order.orderItems.length - 1}
                                                </p> : <p><br /></p>
                                        }
                                        renderItem={(item: any) => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    className='text-st'
                                                    avatar={<Image width={50} height={60} src={item.imageUrl} />}
                                                    title={truncate(item.name, 10)}
                                                    description={`x${item.amount}`}
                                                />
                                                {item.id}
                                                <Ts>{currencyFormat(item.price)}</Ts>
                                            </List.Item>
                                        )}
                                    />
                                    <Row gutter={24}>
                                        <Col span={12}>
                                            <p className='text-st'>
                                                ราคาที่ต้องจ่าย {" "}
                                                <span style={{
                                                    fontSize: "15px",
                                                    color: "#D08B45"
                                                }}>
                                                    {currencyFormat(order.total)}
                                                </span>
                                            </p>
                                        </Col>
                                        <Col
                                            span={12}
                                            style={{
                                                display: "flex",
                                                justifyContent: "end"
                                            }}
                                        >
                                            <Button
                                                size='small'
                                                type="primary"
                                                className='text-st'
                                                onClick={() => showModal()}
                                            >
                                                ตรวจสอบหลักฐาน
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </>
                    })) : <div className='center' style={{ width: "100%", height: "44rem" }}>
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            className="text-st"
                            description="ไม่มีการสั่งซื้อ"
                        />
                    </div>}
                </Row>
            </Container>
        </LayoutPrivate>
    )
}

export default DeliveryPrivatePage