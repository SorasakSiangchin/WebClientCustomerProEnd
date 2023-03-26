import { HeartFilled } from '@ant-design/icons';
import { Button, Card, Col, Row, Tabs } from 'antd';
import { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import useFavorite from '../../app/hooks/useFavorite';
import { Account } from '../../app/models/Account';
import { Product } from '../../app/models/Product';
import { currencyFormat } from '../../app/util/util';

interface ILocation {
    state: Account
}

const SellerDetail = () => {

    const { state }: ILocation = useLocation();
    const { checkFavorite, addFavorite, removeFavorite } = useFavorite();
    const navigate = useNavigate();
    const contentProduct = (<Row gutter={24}>
        {state.products?.map(product => {
            const onFavorite = (info: Product) => {
                if (!checkFavorite(product?.id)) addFavorite(info);
                else removeFavorite(info.id);
            };
            return <Col key={product.id} span={4}>
                <Card
                    
                    hoverable
                    bordered
                    style={{ width: "100%" , marginTop : "1rem" }}
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
                        <Button
                            onClick={() => onFavorite(product)}
                            className='text-st'
                            type="text"
                            icon={<HeartFilled style={{ fontSize: "15px", color: checkFavorite(product?.id) ? "red" : "" }} />}
                        >
                            รายการโปรด
                        </Button>
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
            </Col>
        })}
    </Row>);
    return (
        <Fragment>
            <div className="product-essential-bg-white container">
                <div className="row product-view">
                    <Card
                        style={{ width: "100%" }}
                        bordered
                    >
                        <Row gutter={24}>
                            <Col span={24}>
                                <Card.Meta
                                    avatar={<img style={{ width: "15rem", height: "15rem" }} src={state.imageUrl} />}
                                    title={<h2 className='text-st'>pppp</h2>}
                                    description={<p className='text-st'>สินค้าทั้งหมด {state.products?.length} รายการ</p>}
                                />
                            </Col>
                        </Row>
                    </Card>
                    <Container style={{ marginTop: '1rem' }}>
                        <Tabs
                            defaultActiveKey="1"
                            className='text-st'
                            items={[
                                {
                                    label: 'สินค้าทั้งหมด',
                                    key: '1',
                                    children: contentProduct,
                                },
                            ]} 
                        />
                    </Container>
                    {/* {productInfo.length > 0 && <Pagination
                                        pageSize={pageSize}
                                        current={current}
                                        total={productInfo.length}
                                        onChange={handleChange}
                                        className="center"
                                        style={{ marginTop: "30px" }}
                                    />} */}
                </div>
            </div>
        </Fragment>
    )
}

export default SellerDetail;