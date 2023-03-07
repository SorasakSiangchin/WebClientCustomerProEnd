import { CheckCircleOutlined, LeftOutlined } from '@ant-design/icons'
import { Button, Col, Descriptions, Divider, Row, List, Tag, Empty } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../../app/store/configureStore';
import { fetchOrderAsync, orderSelectors } from '../../../../app/store/orderSlice';
import { Timeline } from 'antd';
import { currencyFormat, Ts } from '../../../../app/util/util';
import agent from '../../../../app/api/agent';
import { Result } from '../../../../app/models/Interfaces/IResponse';
import useDelivery from '../../../../app/hooks/useDelivery';
import { Delivery } from '../../../../app/models/Delivery';
import moment from 'moment-timezone';

const OrderDetail = ({ orderId, setOrderPage, delivery }: any) => {
  const dispatch = useAppDispatch();
  const { statusDelivery } = useDelivery();
  const order = useAppSelector(state => orderSelectors.selectById(state, orderId));
  const [dataDelivery, setDataDelivery] = useState<Delivery>(delivery);
  useEffect(() => {
    if (!order) dispatch(fetchOrderAsync(orderId));
  }, [orderId, order, dispatch]);

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


  return (
    <Fragment>
      <div className="welcome-msg">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button icon={<LeftOutlined />} onClick={() => setOrderPage(false)} className="text-st" type="text">ย้อนกลับ</Button>
          <div >
            <p style={{ display: "inline" }}>หมายเลขคำสั่งซื้อ. {order?.id}</p>
            {
              dataDelivery && <>
                <br />
                <p style={{
                  display: "flex",
                  justifyContent: "end",
                  color: 'rgba(0,0,0,.45)'
                }}>
                  ขนส่งโดย {dataDelivery.shippingServiceName}
                </p>
              </>
            }
          </div>
        </div>
        <Divider />
        <Container>
          <Row gutter={24}>
            <Col span={10}>
              <Descriptions className='text-st' size='small' column={1} title={<u>ที่อยู่ในการจัดส่ง</u>}>
                {React.Children.toArray(infoAddress.map(address => <Descriptions.Item label={address.title}>{address.info}</Descriptions.Item>))}
              </Descriptions>
            </Col>
            <Col span={1} className='center'>
              <Divider style={{ height: "100%" }} type='vertical' />
            </Col>
            <Col span={13} >
              {dataDelivery ? <>
                <Timeline mode='alternate' className='text-st' >
                  {statusDelivery?.map(status => {
                    const check = dataDelivery.statusDeliveryID !== status.id;
                    return <Timeline.Item
                      dot={!check && <CheckCircleOutlined />}
                      color={check ? 'rgba(0,0,0,.20)' : "#EA8E2D"}
                      style={{ color: check ? 'rgba(0,0,0,.20)' : "#EA8E2D" }}
                    >
                      {status.name}
                    </Timeline.Item>
                  })}
                </Timeline>
                <p className='text-st ' style={{
                  display: "flex",
                  justifyContent: "end"
                }}>
                  จะถึงภายใน {moment.utc(delivery?.timeArrive).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss')}
                </p>
              </> : <Empty
                className='text-st'
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="ยังไม่มีการจัดส่ง"
              />}
            </Col>
          </Row>
          <br />
          <List
            // bordered
            itemLayout="horizontal"
            size='small'
            dataSource={order?.orderItems}
            renderItem={(item: any) => (
              <List.Item  >
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
        </Container>
      </div>
    </Fragment>
  )
}

export default OrderDetail