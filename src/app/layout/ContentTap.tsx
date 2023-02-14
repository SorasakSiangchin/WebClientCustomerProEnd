import { ShopOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Descriptions, Divider, Empty, Pagination, Row, Space } from 'antd';
import React, { Fragment, useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import Image from "../../assets/images/member1.png";
import agent from '../api/agent';
import { Account } from '../models/Account';
import { Result } from '../models/Interfaces/IResponse';
import { Product } from '../models/Product';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { fetchDetailProductByIdProductAsync, reSetDetailProduct } from '../store/detailProductSlice';

interface Props {
    ids: any;
    product: Product | undefined;
}

const ContentTap = ({ ids, product }: Props) => {
    return (
        <Fragment>
            <ReviewTap id={ids[0]} />
            <ProductStore id={ids[1]} idAccount={product?.accountID} />
            <ProductDetail id={ids[2]} product={product} />
        </Fragment>
    )
}

const ReviewTap = ({ id }: any) => {
    return <div className="tab-pane fade in active" id={id}>
        <div className="woocommerce-Reviews">
            <div>
                <h2 className="woocommerce-Reviews-title"><span>ความคิเห็นสินค้า</span></h2>
                <ol className="commentlist">
                    <li className="comment">
                        <div>
                            <img alt="image" src={Image} className="avatar avatar-60 photo" />
                            <div className="comment-text">
                                <div className="ratings">
                                    <div className="rating-box">
                                        <div style={{ width: "100%" }} className="rating"></div>
                                    </div>
                                </div>
                                <p className="meta">
                                    <strong>John Doe</strong>
                                    <span>–</span> April 19, 2018
                                </p>
                                <div className="description"><p>Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Nulla quis lorem ut libero malesuada feugiat. Proin eget tortor risus. Donec rutrum congue leo eget malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    <p>Donec sollicitudin molestie malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="comment">
                        <div>
                            <img alt="image" src={Image} className="avatar avatar-60 photo" />
                            <div className="comment-text">
                                <div className="ratings">
                                    <div className="rating-box">
                                        <div style={{ width: "100%" }} className="rating"></div>
                                    </div>
                                </div>
                                <p className="meta">
                                    <strong>Stephen Smith</strong> <span>–</span> June 02, 2018
                                </p>
                                <div className="description"><p>Donec rutrum congue leo eget malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </div>
                            </div>
                        </div>
                    </li>
                </ol>
            </div>
            <Container style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Pagination defaultCurrent={1} total={50} />
            </Container>
        </div>
    </div>
}

const ProductStore = ({ id, idAccount }: any) => {
    const dispatch = useAppDispatch();
    const [account, setAccount] = useState<Account | null>(null);
    const [products, setProducts] = useState<Product[] | null>(null);
    useEffect(() => {
        if (account === null) {
            const loadAccount = async () => {
                const result: Result = await agent.Account.currentAccount(idAccount);
                if (result.isSuccess === true && result.statusCode === 200) setAccount(result.result);
            }
            loadAccount();
        }
    }, [dispatch, account]);

    useEffect(() => {
        if (products === null) {
            const loadProducts = async () => {
                const result: Result = await agent.Product.getByIdAccount(idAccount);
                if (result.isSuccess === true && result.statusCode === 200) setProducts(result.result);
            }
            loadProducts();
        }
    }, [dispatch]);

    return <div className="tab-pane fade" id={id}>
        <div className="product-tabs-content-inner clearfix" >
            <Row gutter={24}>
                <Col span={20} >
                    <Space>
                        <div>
                            <Card.Meta
                                style={{ width: "100%" }}
                                avatar={<Avatar src={account?.imageUrl} size={100} />}
                            />
                        </div>
                        <div style={{ display: "flex" }}>
                            <Col className='text-st'>
                                <h2>{account?.firstName}</h2>
                                <p>สินค้าทั้งหมด {products?.length} รายการ</p>
                                <br />
                                <br />
                            </Col>
                        </div>
                    </Space>
                </Col>
                <Col span={4} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end"
                }}>
                    <Button className='text-st' size='large' icon={<ShopOutlined />}>ดูร้านค้า</Button>
                </Col>
            </Row>
        </div>
    </div>
}

const ProductDetail = ({ id, product }: any) => {
    const dispatch = useAppDispatch();
    const { detailProduct, detailProductLoaded } = useAppSelector(state => state.detailProduct);

    useEffect(() => {
        dispatch(fetchDetailProductByIdProductAsync(product?.id));
        return () => {
            dispatch(reSetDetailProduct());
        }
    }, [detailProductLoaded, dispatch]);

    const infoProduct = [
        { title: 'ประเภทสินค้า', info: product?.categoryProduct.name },
        { title: 'น้ำหนัก', info: `${product?.weight} ${product?.weightUnit.name}` },
        { title: 'สี', info: <Card style={{ height: "30px", backgroundColor: product?.color }} /> },
    ];

    const infoDetailProduct = [
        { title: 'ชื่อพันธุ์', info: detailProduct?.speciesName },
        { title: 'วิธีการใส่ปุ๋ย', info: detailProduct?.fertilizeMethod },
        { title: 'วิธีการปลูก', info: detailProduct?.plantingMethod },
        { title: 'ฤดูปลูก', info: detailProduct?.growingSeason },
        { title: 'ฤดูเก็บเกี่ยว', info: detailProduct?.harvestTime },
        { title: 'เพิ่มเติม', info: detailProduct?.description },
    ];

    return <div className="tab-pane fade" id={id}>
        <div className="product-tabs-content-inner clearfix" >
            <Row gutter={24}>
                <Col span={11} >
                    <Descriptions column={1} title={<u>รายละเอียดสินค้า</u>} className='text-st'>
                        {React.Children.toArray(infoProduct.map(({ info, title }) => <Descriptions.Item labelStyle={{ fontWeight: "bold" }} label={title}>{info}</Descriptions.Item>))}
                    </Descriptions>
                </Col>
                <Col span={2} className='center'>
                    <Divider type='vertical' style={{ height: "100%" }} />
                </Col>
                <Col span={11}>
                    <Descriptions column={1} title={<u>ข้อมูลจำเพาะของสินค้า</u>} className='text-st'>
                        {detailProduct && React.Children.toArray(infoDetailProduct.map(({ info, title }) => <Descriptions.Item labelStyle={{ fontWeight: "bold" }} label={title}>{info}</Descriptions.Item>))}
                    </Descriptions>
                    {!detailProduct && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="ไม่มีข้อมูล" className='text-st' />}
                </Col>
            </Row>
        </div>
    </div>
}


// Add a review

{/* <div className="comment-respond">
    <span className="comment-reply-title">Add a review </span>
    <form action="#" method="post" className="comment-form">
        <p className="comment-notes"><span id="email-notes">Your email address will not be published.</span> Required fields are marked <span className="required">*</span></p>
        <div className="comment-form-rating">
            <label id="rating">Your rating</label>
            <p className="stars">
                <span>
                    <a className="star-1" href="#">1</a>
                    <a className="star-2" href="#">2</a>
                    <a className="star-3" href="#">3</a>
                    <a className="star-4" href="#">4</a>
                    <a className="star-5" href="#">5</a>
                </span>
            </p>
        </div>
        <p className="comment-form-comment">
            <label>Your review <span className="required">*</span></label>
            <textarea id="comment" name="comment" required></textarea>
        </p>
        <p className="comment-form-author">
            <label >Name <span className="required">*</span></label>
            <input id="author" name="author" type="text" value="" required /></p>
        <p className="comment-form-email">
            <label >Email <span className="required">*</span></label>
            <input id="email" name="email" type="email" value="" required /></p>
        <p className="form-submit">
            <input name="submit" type="submit" id="submit" className="submit" value="Submit" />
        </p>
    </form>
</div> */}


export default ContentTap