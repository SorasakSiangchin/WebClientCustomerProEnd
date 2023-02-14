import { LeftOutlined } from '@ant-design/icons'
import { Button, Col, Descriptions, Divider, Row, Radio, Card, List, Space } from 'antd'
import React, { Fragment, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../../app/store/configureStore';
import { fetchOrderAsync, orderSelectors } from '../../../../app/store/orderSlice';
import { Timeline } from 'antd';
import { currencyFormat, Ts } from '../../../../app/util/util';
import { AvatarAccountByProductId } from './Orders';

const OrderDetail = ({ orderId, setOrderPage }: any) => {
  const dispatch = useAppDispatch();
  const order = useAppSelector(state => orderSelectors.selectById(state, orderId));

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
          <p>หมายเลขคำสั่งซื้อ. {order?.id}</p>
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
              <Timeline mode='left' className='text-st' >
                <Timeline.Item label="2015-09-01">Create a services</Timeline.Item>
                <Timeline.Item label="2015-09-01 09:12:11">Solve initial network problems</Timeline.Item>
                <Timeline.Item label="2015-09-01 09:12:11">Technical testing</Timeline.Item>
                <Timeline.Item label="2015-09-01 09:12:11">Network problems being solved</Timeline.Item>
              </Timeline>
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
            {React.Children.toArray(infoSummary.map(summary => <Descriptions.Item
              className='text-st'
              label={<div style={{ display : "flex" , justifyContent : "end"}}>
                {summary.title}
              </div>}
              style={{ width: "80%" }}
            >
              {currencyFormat(summary.info)}
            </Descriptions.Item>))}
          </Descriptions>
        </Container>
      </div>
    </Fragment>
  )
}

export default OrderDetail