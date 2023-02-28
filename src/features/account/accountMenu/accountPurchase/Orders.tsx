import { Avatar, Button, Card, Col, Divider, Empty, List, Popconfirm, Row, Space, Tooltip } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import agent from '../../../../app/api/agent';
import { Account } from '../../../../app/models/Account';
import { Result } from '../../../../app/models/Interfaces/IResponse';
import { Order } from '../../../../app/models/Order';
import { Product } from '../../../../app/models/Product';
import { EvidenceMoneyTransfer } from '../../../../app/models/EvidenceMoneyTransfer';
import { currencyFormat, Ts } from '../../../../app/util/util';
import ModalPayment from './ModalPayment';
import ModalEvidence from './ModalEvidence';
import { useAppDispatch } from '../../../../app/store/configureStore';
import { fetchOrdersAsync, updateOrderAsync } from '../../../../app/store/orderSlice';
import { ContainerOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import ModalTransferHistory from './ModalTransferHistory';
import { Delivery } from '../../../../app/models/Delivery';
import { TfiTruck } from 'react-icons/tfi';
import moment from 'moment-timezone';
interface Props {
    orders: Order[]
    setOrderPage?: any;
    setOrderId?: any;
    setDataDelivery?: any;
}

const Orders = ({ orders, setOrderPage, setOrderId, setDataDelivery }: Props) => {
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [id, setId] = useState<string>("");

    const onClickButton = (orderId: any) => {
        setOpenModal(true);
        setId(orderId);
    };

    const showOrder = orders?.length > 0 ? <Space direction='vertical' size="large" style={{ width: "100%" }}>
        {React.Children.toArray(orders?.map((order: Order) => {
            const [openModalEvidence, setOpenModalEvidence] = useState<boolean>(false);
            const [openModalHistory, setOpenModalHistory] = useState<boolean>(false);
            const [dataCancelEvidence, setDataCancelEvidence] = useState<EvidenceMoneyTransfer[]>();
            const [dataEvidence, setDataEvidence] = useState<EvidenceMoneyTransfer | null>(null);
            const [delivery, setDelivery] = useState<Delivery | null>(null);
            useEffect(() => {
                loadData();
            }, []);

            const loadData = async () => {
                const { isSuccess, result, statusCode }: Result = await agent.Delivery.getByIdOrder(order.id);
                if (isSuccess === true && statusCode === 200) setDelivery(result);
            };

            const onCancelOrder = () => {
                const data = {
                    ...order,
                    orderCancel: true
                };
                dispatch(updateOrderAsync(data)).then(() => dispatch(fetchOrdersAsync()));
            };

            const onConfirmCustomer = () => {
                const data = {
                    ...order,
                    customerStatus: true
                };
                dispatch(updateOrderAsync(data)).then(() => dispatch(fetchOrdersAsync()));
            };

            const CheckButton = () => {
                if (order.orderStatus === 0) {
                    return "กำลังรอการชำระเงิน"
                } else if (dataEvidence !== null && order.orderStatus === 1) {
                    return "รอการอนุมัติ"
                } else if (dataEvidence !== null && order.orderStatus === 2) {
                    if (!order.customerStatus) return "ฉันได้ตรวจสอบและยอมรับสินค้า";
                    else return "ให้คะแนน";
                } else {
                    return ""
                }
            };

            const CheckStatus = () => {
                if (!order.orderCancel) {
                    switch (order.orderStatus) {
                        case 0:
                            return "ที่ต้องชำระเงิน"
                        case 1:
                            return "ที่ต้องจัดส่ง"
                        case 2:
                            return "ที่ต้องได้รับ"
                        default:
                            return "";
                    }
                } else return "ยกเลิก"
            };

            const extraDelivery = (
                <>
                    <Button
                        icon={<><TfiTruck size={18} />{"  "}</>}
                        className="text-st"
                        type='text'
                        size='small'
                        style={{
                            color: "#75BC4E"
                        }}
                    >
                        {delivery?.statusDelivery.name}
                    </Button>
                    <Tooltip title={<p className='text-st' style={{ width: "100rem" }}>
                        จะได้รับภายใน {moment.utc(delivery?.timeArrive).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss')}
                    </p>}
                    >
                        <Button
                            size='small'
                            icon={<QuestionCircleOutlined />}
                            className="text-st"
                            type='text'
                        />
                    </Tooltip>
                    <Divider type='vertical' />
                </>
            )

            const extraCard = (
                <>
                    {delivery ? extraDelivery : ""}
                    <div
                        className='text-st'
                        style={{
                            display: "inline",
                            color: "#ff4d4f"
                        }}
                    >
                        {CheckStatus()}
                    </div>
                    {" "}
                    {
                        dataCancelEvidence &&
                            dataCancelEvidence?.length > 0 ?
                            <Tooltip
                                placement="top"
                                title={<Ts>ประวัติการโอน</Ts>}
                                className="text-st"
                            >
                                <Button
                                    style={{ display: "inline" }}
                                    type='text'
                                    className='center'
                                    shape="circle"
                                    icon={<ContainerOutlined />}
                                    size={"small"}
                                    onClick={() => setOpenModalHistory(true)}
                                />
                            </Tooltip> : ""
                    }
                </>
            );

            useEffect(() => {
                const setEvidence = async () => setDataEvidence(await loadEvidence(order.id));
                setEvidence();
            }, []);

            useEffect(() => {
                const setCancelEvidence = async () => setDataCancelEvidence(await loadCancelEvidence(order.id));
                setCancelEvidence();
            }, []);

            return (
                <Card
                    type="inner"
                    size='small'
                    extra={extraCard}
                    title={<AvatarAccountByProductId productId={order.orderItems[0].productID} />}
                >
                    <ModalPayment openModal={openModal} setOpenModal={setOpenModal} orderId={id} setOrderId={setId} />
                    {dataEvidence &&
                        <ModalEvidence
                            evidence={dataEvidence}
                            openModal={openModalEvidence}
                            setOpenModal={setOpenModalEvidence}
                        />}

                    <ModalTransferHistory
                        setOpenModal={setOpenModalHistory}
                        openModal={openModalHistory}
                        cancelEvidence={dataCancelEvidence}
                    />
                    <List
                        itemLayout="horizontal"
                        size='small'
                        dataSource={order.orderItems}
                        renderItem={(item: any) => (
                            <List.Item onClick={() => {
                                setOrderId(order.id);
                                setOrderPage(true);
                                setDataDelivery(delivery);
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
                                {
                                    !order.orderCancel ?
                                        <Space>
                                            <Button
                                                className='text-st'
                                                onClick={() => {
                                                    if (order.orderStatus !== 2) {
                                                        onClickButton(order.id);
                                                    } else {
                                                        onConfirmCustomer();
                                                    }
                                                }}
                                                type='primary'
                                                disabled={order.orderStatus === 1}
                                                style={{ width: "100%", backgroundColor: "#58944C" }}
                                            >
                                                {CheckButton()}
                                            </Button>
                                            {dataEvidence ? <Button
                                                className='text-st'
                                                onClick={() => setOpenModalEvidence(true)}
                                            >
                                                สรวจสอบหลักฐาน
                                            </Button> : ""}
                                            {order.orderStatus !== 2 ?
                                                <Popconfirm
                                                    className='text-st'
                                                    title={<Ts>ยกเลิกการสั่งซื้อ</Ts>}
                                                    onConfirm={onCancelOrder}
                                                    okText={<Ts>ตกลง</Ts>}
                                                    cancelText={<Ts>ยกเลิก</Ts>}
                                                >
                                                    <Button
                                                        className='text-st'
                                                    >ยกเลิก</Button>
                                                </Popconfirm> : ""
                                            }
                                        </Space> : ""
                                }
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
                const resultAccount: Result = await agent.Account.currentAccount({ accountId: accountID });
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

const loadEvidence = async (orderId: any) => {
    const { isSuccess, statusCode, result }: Result = await agent.EvidenceMoneyTransfer.get(orderId);
    if (isSuccess === true && statusCode === 200) return result;
    return null;
};

const loadCancelEvidence = async (orderId: any) => {
    const { isSuccess, statusCode, result }: Result = await agent.EvidenceMoneyTransfer.getCancel(orderId);
    if (isSuccess === true && statusCode === 200) return result;
    return null;
}

export default Orders