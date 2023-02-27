import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Card, Col, Divider, Image, Input, List, Modal, Popconfirm, Row, Select, Space } from 'antd';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import useOrder from '../../../app/hooks/useOrder';
import { EvidenceMoneyTransfer } from '../../../app/models/EvidenceMoneyTransfer';
import { useAppDispatch } from '../../../app/store/configureStore';
import { updateEvidenceMoneyTransferAsync } from '../../../app/store/evidenceMoneyTransferSlice';
import { fetchOrdersAsync, resetParams, setParams, updateOrderAsync } from '../../../app/store/orderSlice';
import { currencyFormat, truncate, Ts } from '../../../app/util/util';
import LayoutPrivate from '../LayoutPrivate'

const OrderPrivatePage = () => {
  const dispatch = useAppDispatch();
  const { orders, getEvidenceMoneyTransfers } = useOrder();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dataEvidence, setDataEvidence] = useState<EvidenceMoneyTransfer | null>(null);
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
        dispatch(resetParams());
        break;
    }
  }

  const onUpdateEvidence = (evidence: EvidenceMoneyTransfer | null) => {
    const data = {
      id: evidence?.id,
      orderID: evidence?.orderID,
      status: false
    };
    dispatch(updateEvidenceMoneyTransferAsync(data)).then(() => dispatch(fetchOrdersAsync()));
  }

  return (
    <LayoutPrivate>
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
          {orders !== null ? React.Children.toArray(orders?.filter(e => e.orderStatus !== 0).map(order => {
            const data = {
              ...order,
              orderStatus: 2
            };

            const onConfirm = () => {
              dispatch(updateOrderAsync(data)).then(() => dispatch(fetchOrdersAsync()));
            };

            const action = order.orderStatus !== 2 ? [
              <ConfirmButton
                onConfirm={onConfirm}
                icon={<CheckCircleOutlined />}
                textBtn={"ยืนยัน"}
                title={"ยืนยันการชำระเงิน?"}
                color="#75BC4E"
              />
              ,
              <ConfirmButton
                onConfirm={() => onUpdateEvidence(dataEvidence)}
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
              setIsModalOpen(true);
              setEvidence();
            };

            const handleOk = () => setIsModalOpen(false);

            const handleCancel = () => setIsModalOpen(false);

            const setEvidence = async () => setDataEvidence(await getEvidenceMoneyTransfers(order.id));

            return <>
              {dataEvidence &&
                <Modal
                  title="หลักฐาน"
                  className="text-st"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={false}
                >
                  <img
                    src={dataEvidence?.evidence}
                    alt="Evidence"
                    width={"100%"}
                    height={"100%"}
                  />
                </Modal>
              }
              <Col span={8}>
                <Card
                  className='text-st'
                  actions={action}
                  title={order.id + "."}
                  hoverable
                  bordered
                  style={{
                    width: "100%",
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
          })) : ""}
        </Row>
      </Container>
    </LayoutPrivate>
  )
}

const ConfirmButton = ({ onConfirm, icon, textBtn, title, color }: any) => {
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