import { MessageFilled } from '@ant-design/icons';
import { Button, Card, Col, Divider, Empty, List, Row, Space, Tabs, TabsProps, Tooltip, Watermark } from 'antd';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import AppPagination from '../../../../app/components/AppPagination';
import { Order, OrderUsage } from '../../../../app/models/Order';
import { MetaData } from '../../../../app/models/Pagination';
import { useAppDispatch, useAppSelector } from '../../../../app/store/configureStore';
import { fetchOrdersAsync, initParams, orderSelectors, setParams } from '../../../../app/store/orderSlice';
import { currencyFormat, Ts } from '../../../../app/util/util';
import { ColAccount } from '../../AccountPage';
import ModalReserve from './ModalReserve';

const AccountReserve = () => {
    const dispatch = useAppDispatch();
    const { account } = useAppSelector(state => state.account);
    const [openModal, setOpenModal] = useState(false);
    const [order, setOrder] = useState<Order | null>(null);
    const orders = useAppSelector(orderSelectors.selectAll);
    const { metaData, ordersLoaded } = useAppSelector(state => state.order);

    useEffect(() => {
        dispatch(setParams({ ...initParams(), accountId: account?.id, orderUsage: OrderUsage.Reserve.toString() }));
    }, []);

    useEffect(() => {
        if (!ordersLoaded) dispatch(fetchOrdersAsync());
    }, [dispatch, ordersLoaded]);

    const showModal = (order: Order) => {
        setOrder(order);
        setOpenModal(true);
    };

    const handleCancel = () => {
        setOrder(null);
        setOpenModal(false);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `ทั้งหมด`,
            children: <Reserve
                orders={orders}
                showModal={showModal}
                metaData={metaData}
            />,
        },
        {
            key: '2',
            label: `ที่สั่งจอง`,
            children: <Reserve
                orders={orders.filter(e => e.orderCancel === false)}
                showModal={showModal}
                metaData={metaData}
            />,
        },
        {
            key: '3',
            label: `ยกเลิก`,
            children: <Reserve
                orders={orders.filter(e => e.orderCancel === true)}
                showModal={showModal}
                metaData={metaData}
            />,
        },
    ];

    return (
        <ColAccount className="col-main col-sm-9" >
            <div className="my-account">
                <div className="dashboard">
                    {order && <ModalReserve open={openModal} setOpen={setOpenModal} order={order} handleCancel={handleCancel} />}
                    <Container>
                        <Tabs className='text-st' defaultActiveKey="1" items={items} />
                    </Container>
                </div>
            </div>
        </ColAccount>
    )
};

interface Props {
    orders: Order[];
    showModal: Function;
    metaData: MetaData | null;
};

const Reserve = ({ orders, showModal, metaData }: Props) => {
    const dispatch = useAppDispatch();
    return orders.length > 0 ? <>
        <Space size="large" direction='vertical' style={{ width: "100%" }}>
            {React.Children.toArray(orders.map((order: Order) => {
                return <Watermark content={order.orderCancel ? "ถูกยกเลิก" : ""} >
                    <Card
                        type="inner"
                        size='small'
                        extra={<div
                            className='text-st'
                            style={{
                                display: "inline",
                                color: "#ff4d4f"
                            }}
                        >
                            {order.orderCancel ?
                                <Space>
                                    <Ts>ยกเลิก</Ts>
                                    <Tooltip title={<Ts>ข้อความ</Ts>}>
                                        <Button onClick={() => showModal(order)} size='small' type='text' icon={<MessageFilled />} />
                                    </Tooltip>
                                </Space> : "ที่สั่งจอง"}
                        </div>}
                    >
                        <List
                            itemLayout="horizontal"
                            size='small'
                            dataSource={order.orderItems}
                            renderItem={(item: any) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<img width={70} height={70} src={item.imageUrl} />}
                                        title={item.name}
                                        description={`x${item.amount}`}
                                    />
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
                                    {
                                        !order.orderCancel ?
                                            <Space>
                                                <Button className='text-st' disabled>
                                                    รอการอนุมัติ
                                                </Button>
                                            </Space> : ""
                                    }
                                </Col>
                            </Row>
                        </Space>
                    </Card>
                </Watermark>
            }))}
        </Space>
        {metaData && <div >
            <AppPagination
                isSimple={false}
                metaData={metaData}
                onPageChange={(page: number) =>
                    dispatch(setParams({ pageNumber: page }))
                }
            />
        </div>
        }
    </> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="text-st" description="ไม่มีรายการสั่งจอง" />
};

export default AccountReserve