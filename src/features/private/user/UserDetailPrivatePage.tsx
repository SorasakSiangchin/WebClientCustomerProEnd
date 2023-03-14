import { RollbackOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Col, Descriptions, Divider, Image, Row, Space, Tag } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { accountSelectors, fetchAccountAsync } from '../../../app/store/accountSlice';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { convertRole, currencyFormat } from '../../../app/util/util';
import LayoutPrivate from '../LayoutPrivate';

const UserDetailPrivatePage = () => {
  const { id } = useParams<{ id: any }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const account = useAppSelector(state => accountSelectors.selectById(state, id));

  useEffect(() => {
    if (!account) dispatch(fetchAccountAsync(id));
  }, [id, dispatch, account]);

  const details = [
    { label: "ชื่อจริง", description: account?.firstName },
    { label: "นามสกุล", description: account?.lastName },
    { label: "อีเมล", description: account?.email },
    { label: "เบอร์โทร", description: account?.phoneNumber },
    { label: "ตำแหน่ง", description: convertRole(account?.role.name) },
    { label: "สถานะ", description: account?.status ? <Tag color={"green"} className="text-st">ใช้งาน</Tag> : <Tag color={"red"} className="text-st">ระงับ</Tag> },
  ];

  return (
    <LayoutPrivate>
      <Row>
        <Col span={8}><h1 className='text-st'>รายละเอียดผู้ใช้งาน</h1></Col>
        <Col span={8} offset={8} style={{ display: "flex", justifyContent: "end", alignItems: "center" }} >
          <Button style={{ backgroundColor: "grey" }} className='text-st' type="primary" icon={<RollbackOutlined />} onClick={() => navigate(-1)}>
            กลับ
          </Button>
        </Col>
      </Row>
      <Divider />
      <Row gutter={24}>
        <Col span={8} >
          <img
            src={account?.imageUrl}
            style={{
              width: "100%",
              height: "40rem",
              borderRadius: '1rem'
            }}
          />
          <h3 className='center text-st'>{`${account?.firstName} ${account?.lastName}`}</h3>
        </Col>
        <Col span={16}>
          <Space direction='vertical' size="middle">
            <Card title="รายละเอียด" bordered className='text-st'>
              <Descriptions size='middle'>
                {details.map((info, index) => <Descriptions.Item key={index} className='text-st' label={<b>{info.label}</b>}>{info.description}</Descriptions.Item>)}
              </Descriptions>
            </Card>
            {
              account?.roleID === 2 && <Card title={`สินค้า (${account?.products?.length})`} bordered className='text-st'>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  {account?.products?.map((product, index) =>
                    <Col key={index} className="gutter-row" span={6}>
                      <Card
                        hoverable
                        style={{ width: "100%" }}
                        cover={<img
                          alt="product-image"
                          style={{ width: "100%", height: "15rem" }}
                          src={product.imageUrl}
                        />}
                      >
                        <Card.Meta
                          className='text-st'
                          title={product.name}
                          description={currencyFormat(product.price)} />
                      </Card>
                    </Col>
                  )
                  }
                </Row>
              </Card>
            }
          </Space>
        </Col>
      </Row>
    </LayoutPrivate>
  )
}

export default UserDetailPrivatePage