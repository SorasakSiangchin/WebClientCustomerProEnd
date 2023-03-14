import { EditOutlined, EllipsisOutlined, HeartFilled, SettingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import { Product } from '../../app/models/Product';
import { currencyFormat } from '../../app/util/util';

const ProductRecommend = ({ productRecommend }: any) => {
  return (
    <div className="slider-items-products container">
      <div className="new_title top-border">
        <h2>สินค้าแนะนำ</h2>
        <p>สินค้าบางชนิดหาได้เฉพาะตามฤดูกาลเท่านั้น !</p>
      </div>
      <div id="best-seller" className="product-flexslider hidden-buttons">
        <div className="slider-width-col4 products-grid">
          <Row gutter={24}>
            {productRecommend?.map((product: Product) => <Col key={product.id} span={6}>
              <Card
                hoverable
                bordered
                style={{ width: "100%" }}
                cover={
                  <img
                    alt="product-image"
                    src={product.imageUrl}
                    style={{
                      height: "20rem"
                    }}
                  />
                }
                actions={[
                  <Button className='text-st' type="text" icon={<HeartFilled style={{ fontSize: "15px" }} />}>
                    รายการโปรด
                  </Button>,
                  <Button className='text-st' type="text" icon={<ShoppingCartOutlined style={{ fontSize: "15px" }} />}>
                    สินค้าที่คล้ายกัน
                  </Button>,
                ]}
              >
                <Card.Meta
                  className='text-st'
                  title={product.name}
                  description={
                    <span id="product-price-212" className="price">
                      {currencyFormat(product.price)}
                    </span>
                  }
                />
              </Card>
            </Col>)}
          </Row>
        </div>
      </div>
    </div>
  )
}

export default ProductRecommend
