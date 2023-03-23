import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Card, Col, Divider, Empty, Image, Input, List, Modal, Popconfirm, Row, Select, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppPagination from '../../../app/components/AppPagination';
import { Order, OrderUsage } from '../../../app/models/Order';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { updateEvidenceMoneyTransferAsync } from '../../../app/store/evidenceMoneyTransferSlice';
import { fetchOrdersAsync, resetParams, setParams, updateOrderAsync, resetOrder, orderSelectors, initParams } from '../../../app/store/orderSlice';
import { currencyFormat, truncate, Ts } from '../../../app/util/util';
import LayoutPrivate from '../LayoutPrivate';

const OrderPrivatePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [order, setOrder] = useState<Order | null>(null);
  const orders = useAppSelector(orderSelectors.selectAll);
  const { metaData, ordersLoaded , orderParams} = useAppSelector(state => state.order);

  useEffect(() => {
    dispatch(setParams({ ...initParams() , haveEvidence: true, orderUsage: OrderUsage.Buy.toString() }));
  }, []);

  useEffect(() => {
   if(!ordersLoaded) dispatch(fetchOrdersAsync());
  }, [dispatch  , ordersLoaded]);

  const options = orders.map(e => {
    return {
      key: e.id,
      value: e.id
    }
  });

  const onChangeSelect = (event: any) => {
    switch (event) {
      case "1":
        dispatch(setParams({ orderStatus: "1" }));
        break;
      case "2":
        dispatch(setParams({ orderStatus: "2" }));
        break;
      default:
        dispatch(setParams({ ...initParams() , haveEvidence: true, orderUsage: OrderUsage.Buy.toString() }));
        break;
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  }

  const handleCancel = () => setIsModalOpen(false);
  return (
    <LayoutPrivate>
      <Modal
        title="หลักฐาน"
        className="text-st"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <img
          src={order?.evidenceMoney?.evidence}
          alt="Evidence"
          width={"100%"}
          height={"100%"}
        />
      </Modal>
      <Row>
        <Col span={8}><h1 className='text-st'>การสั่งซื้อทั้งหมด</h1></Col>
        <Col span={8} offset={8} style={{ display: "flex", justifyContent: "end" }}>
          <Space>
            <h1>
              <Select
                allowClear
                style={{ width: 120 }}
                onChange={onChangeSelect}
                placeholder={<Ts>ค้นหา</Ts>}
                options={[
                  { value: '1', label: <Ts>ยังไม่ยืนยัน</Ts> },
                  { value: '2', label: <Ts>ยืนยันสำเร็จ</Ts> },
                ]}
              />
            </h1>
            <h1>
              <AutoComplete
                filterOption={(inputValue, option) =>
                  option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                onChange={(e) => dispatch(setParams({ id: e }))}
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
          {orders.length > 0 ? React.Children.toArray(orders.map(order => {

            const onUpdateEvidence = (evidence: any) => {
              dispatch(updateEvidenceMoneyTransferAsync({
                id: evidence?.id,
                orderID: evidence?.orderID,
                status: false
              })).then(() => dispatch(resetOrder()));
            };

            const dataUpdate = {
              ...order,
              orderStatus: 2
            };

            const onConfirm = () => dispatch(updateOrderAsync(dataUpdate)).then(() => dispatch(fetchOrdersAsync()));

            const action = order.orderStatus !== 2 ? [
              <ConfirmButton
                onConfirm={onConfirm}
                icon={<CheckCircleOutlined />}
                textBtn={"ยืนยัน"}
                title={"ยืนยันการชำระเงิน?"}
                color="#75BC4E"
              />,
              <ConfirmButton
                onConfirm={async () => onUpdateEvidence(order?.evidenceMoney)}
                icon={<CloseCircleOutlined />}
                textBtn={"ยกเลิก"}
                title={"ยกเลิกการชำระเงิน?"}
                color="#D04550"
              />
            ] : [
              <Button
                type='text'
                className='text-st'
                icon={<CheckCircleOutlined />}
                style={{
                  color: "#75BC4E"
                }}
              >
                สำเร็จ
              </Button>
            ];

            const showModal = () => {
              setOrder(order);
              setIsModalOpen(true);
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
                      <List.Item
                        onClick={() => navigate('/private/order/detail', { state: { orderId: order.id } })}
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
      {metaData &&
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

export const ConfirmButton = ({ onConfirm, icon, textBtn, title, color }: any) => {
  return <Popconfirm
    title={<Ts>{title}</Ts>}
    onConfirm={onConfirm}
    okText={<Ts>ตกลง</Ts>}
    cancelText={<Ts>ยกเลิก</Ts>}
  >
    <Button
      type='text'
      className='text-st'
      icon={icon}
      style={{
        color: color
      }}
    >
      {textBtn}
    </Button>
  </Popconfirm>
};

export default OrderPrivatePage