import { InfoCircleOutlined, RollbackOutlined, SaveOutlined, ShopOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Divider, Form, Input, List, Row, Space } from 'antd';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { TfiStatsUp } from 'react-icons/tfi';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { fetchOrderAsync, orderSelectors } from '../../../app/store/orderSlice';
import { currencyFormat, Ts } from '../../../app/util/util';
import LayoutPrivate from '../LayoutPrivate';

const DeliveryFormPrivate = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { idOrder } = useParams<{ idOrder: any }>();

    const order = useAppSelector(state => orderSelectors.selectById(state, idOrder));
    useEffect(() => {
        if (!order) dispatch(fetchOrderAsync(idOrder));
    }, [order, dispatch]);

    const values = {
        id: 0,
        timeArrive: "",
        shippingServiceName: "",
        orderID: idOrder,
        statusDeliveryID: ""
    };

    return (
        <Formik
            initialValues={values}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {

                    setSubmitting(false);
                }, 400);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue,
            }) => {
                return <LayoutPrivate>
                    <Form layout='vertical' onFinish={handleSubmit} >
                        <Row  >
                            <Col span={8}><h1 className='text-st'>จัดส่งสินค้า</h1></Col>
                            <Col span={8} offset={8} style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
                                <Space>
                                    <Button loading={isSubmitting} className='text-st' type="primary" htmlType='submit' icon={<SaveOutlined />}>
                                        บันทึก
                                    </Button>
                                    <Button style={{ backgroundColor: "grey" }} className='text-st' type="primary" icon={<RollbackOutlined />} onClick={() => navigate(-1)}>
                                        กลับ
                                    </Button>
                                </Space>
                            </Col>
                        </Row>
                        <Divider />
                        <Row gutter={24}>
                            <Col span={10}>
                                <Card
                                    title="รายการจัดส่ง"
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
                                                    description={currencyFormat(item.price)}
                                                />
                                                <h4>
                                                    {item.amount} รายการ
                                                </h4>
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                            </Col>
                            <Col span={14}>
                                <Card
                                    title="ข้อมูลจัดส่ง "
                                    className="text-st"
                                    bordered
                                    style={{ width: "100%" }}
                                >
                                    <Row gutter={24}>
                                        <Col span={12}>
                                            <Form.Item label={<Ts>เวลาจัดส่ง</Ts>}>
                                                <DatePicker
                                                    placeholder=""
                                                    style={{ width: "100%" }}
                                                    format={'YYYY/MM/DD'}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={<Ts>สถานะ</Ts>}>
                                                <Input
                                                    suffix={<TfiStatsUp style={{ color: 'rgba(0,0,0,.45)' }} />}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={24}>
                                        <Col span={24}>
                                            <Form.Item label={<Ts>ชื่อบริษัทจัดส่ง</Ts>}>
                                                <Input
                                                    suffix={<ShopOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Form>
                </LayoutPrivate>
            }
            }
        </Formik>
    )
}

export default DeliveryFormPrivate