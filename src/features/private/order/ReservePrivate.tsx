import { CheckCircleOutlined, CloseCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Empty, Image, Input, List, Modal, Popover, Row, Space } from 'antd';
import moment from 'moment-timezone';
import { useEffect, Children, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import agent from '../../../app/api/agent';
import AppPagination from '../../../app/components/AppPagination';
import AppSwal from '../../../app/components/AppSwal';
import { OrderUsage } from '../../../app/models/Order';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { fetchOrdersAsync, initParams, orderSelectors, setParams, updateOrderAsync } from '../../../app/store/orderSlice';
import { currencyFormat, truncate, Ts } from '../../../app/util/util';
import LayoutPrivate from '../LayoutPrivate';
import { ConfirmButton } from './OrderPrivatePage';

const ReservePrivate = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const orders = useAppSelector(orderSelectors.selectAll);
    const { account } = useAppSelector(state => state.account);
    const { metaData, ordersLoaded } = useAppSelector(state => state.order);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(setParams({ ...initParams(), orderUsage: OrderUsage.Reserve.toString(), orderCancel: "false" }));
    }, []);

    useEffect(() => {
        if (!ordersLoaded) dispatch(fetchOrdersAsync());
    }, [dispatch, ordersLoaded]);

    const contentPopover = (<p className='text-st'>เพื่อบอกสาเหตุการยกเลิกการจองสินค้า</p>);

    const [message, setMessage] = useState<string>("");
    const [orderId, setOrderId] = useState<string>("");

    const resetData = () => {
        setMessage("");
        setOrderId("");
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        resetData();
    };

    const data = {
        id: "",
        accountID: account?.id,
        message: message,
        orderID: orderId
    };

    const handleSubmit = async () => {
        await agent.OrderMessage.create(data).then(() => {
            AppSwal({
                icon: "success",
                onThen: () => {
                    setIsModalOpen(false);
                    resetData();
                    dispatch(fetchOrdersAsync());
                },
                title: "ยกเลิกเรียบร้อย"
            });
        });
    };
    return (
        <LayoutPrivate>
            <Modal
                centered
                className='text-st'
                title={
                    <Space size="small">
                        <Ts>เพิ่มข้อความ</Ts>
                        <Popover content={contentPopover} title="">
                            <Button icon={<QuestionCircleOutlined />} type="text" size="small" />
                        </Popover>

                    </Space>
                }
                closeIcon
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={handleCancel}
                cancelText={<Ts>กลับ</Ts>}
                okText={<Ts>ยกเลิกการจอง</Ts>}
            >
                <Input.TextArea value={message} onChange={(e) => setMessage(e.target.value)} className='text-st' />
            </Modal>
            <Row>
                <Col span={10}><h1 className='text-st'>การสั่งจองทั้งหมด ({orders?.length} รายการ)</h1></Col>
                {/* <Col span={8} offset={8} style={{ display: "flex", justifyContent: "end" }}>

                </Col> */}
            </Row>
            <Divider />
            <Container>
                {orders?.length > 0 ?
                    <Row gutter={24}>
                        {Children.toArray(orders?.map(order => {

                            const showModal = () => {
                                setIsModalOpen(true);
                                setOrderId(order?.id);
                            };

                            const dataUpdate = {
                                ...order,
                                orderUsage: OrderUsage.Buy
                            };

                            const onConfirm = () => dispatch(updateOrderAsync(dataUpdate)).then(() => dispatch(fetchOrdersAsync()));

                            const action =  [
                                <ConfirmButton
                                    onConfirm={onConfirm}
                                    icon={<CheckCircleOutlined />}
                                    textBtn={"ยืนยัน"}
                                    title={"ยืนยัน?"}
                                    color="#75BC4E"
                                />,
                                <Button
                                    type='text'
                                    className='text-st'
                                    icon={<CloseCircleOutlined />}
                                    onClick={() => showModal()}
                                    style={{
                                        color: "#D04550"
                                    }}
                                >
                                    ยกเลิก
                                </Button>
                            ] ;

                            return <Col span={8}>
                                <Card
                                    className='text-st'
                                    hoverable
                                    bordered
                                    actions={action}
                                    title={`สั่งจองเมื่อ ${moment.utc(order.created).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss')}`}
                                    style={{
                                        width: "100%",
                                        marginTop: "2rem"
                                    }}
                                >

                                    <List
                                        itemLayout="horizontal"
                                        footer={<br />}
                                        dataSource={order.orderItems}
                                        renderItem={(item: any) => (
                                            <List.Item
                                                onClick={() => navigate('/private/order/detail', { state: { orderId: order.id, key: "reserve" } })}
                                            >
                                                <List.Item.Meta
                                                    className='text-st'
                                                    avatar={<Image width={50} height={60} src={item.imageUrl} />}
                                                    title={truncate(item.name, 10)}
                                                    description={`x${item.amount}`}
                                                />
                                                <Ts>{currencyFormat(item.price)}</Ts>
                                            </List.Item>
                                        )}
                                    />
                                    <Row gutter={24}>
                                        <Col span={12}>
                                            <p className='text-st'>
                                                ราคาทั้งหมด {" "}
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
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        }))}
                    </Row> : <div className='center' style={{ width: "100%", height: "44rem" }}>
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            className="text-st"
                            description="ไม่มีการสั่งจอง"
                        />
                    </div>}
            </Container>
            {orders?.length > 0 && metaData &&
                <AppPagination
                    isSimple={false}
                    metaData={metaData}
                    onPageChange={(page: number) =>
                        dispatch(setParams({ pageNumber: page }))
                    }
                />
            }
        </LayoutPrivate>
    )
}

export default ReservePrivate