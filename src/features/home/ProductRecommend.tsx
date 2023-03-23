import { HeartFilled, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card, Col, Rate, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import useFavorite from '../../app/hooks/useFavorite';
import { Product } from '../../app/models/Product';
import { currencyFormat } from '../../app/util/util';

const ProductRecommend = ({ productRecommend }: any) => {
  const { checkFavorite, addFavorite, removeFavorite } = useFavorite();
  const navigate = useNavigate();

  return (
    <div className="slider-items-products container">
      <div className="new_title top-border">
        <h2>สินค้าแนะนำ</h2>
        <p>สินค้าบางชนิดหาได้เฉพาะตามฤดูกาลเท่านั้น !</p>
      </div>
      <div id="best-seller" className="product-flexslider hidden-buttons">
        <div className="slider-width-col4 products-grid">
          <Row gutter={24}>
            {productRecommend?.map((product: Product) => {
              const statusFavorite = checkFavorite(product.id);
              const onFavorite = (info: Product) => {
                if (!statusFavorite) addFavorite(info);
                else removeFavorite(info.id);
              };
              return <Col key={product.id} span={6}>
                <Card
                  hoverable
                  bordered
                  style={{ width: "100%" }}
                  cover={
                    <img
                      onClick={() => navigate(`/product/detail/${product?.id}`)}
                      alt="product-image"
                      src={product.imageUrl}
                      style={{
                        height: "20rem"
                      }}
                    />
                  }
                  actions={[
                    <Button onClick={() => onFavorite(product)} className='text-st' type="text" icon={<HeartFilled style={{ fontSize: "15px", color: statusFavorite ? "red" : "" }} />}>
                      รายการโปรด
                    </Button>,
                    <Button onClick={() => navigate(`/products/similar/${product.id}`)} className='text-st' type="text" icon={<ShoppingCartOutlined style={{ fontSize: "15px" }} />}>
                      สินค้าที่คล้ายกัน
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    className='text-st'
                    title={product.name}
                    description={
                      <>
                        <Rate style={{ width: "40%", fontSize: "100%" , display : "flex"}} disabled value={product.averageScore} />
                        <span id="product-price-212" className="price">
                          {currencyFormat(product.price)}
                        </span>
                      </>
                    }
                  />
                </Card>
              </Col>
            })}
          </Row>
        </div>
      </div>
    </div>
  )
}

export default ProductRecommend
