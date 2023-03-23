import { ExclamationCircleFilled, HeartFilled, ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Button, Card, Rate, Space } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFavorite from '../../app/hooks/useFavorite';
import { Product } from '../../app/models/Product';
import { currencyFormat } from '../../app/util/util';
import ModalProductDetail from './ModalProductDetail';

let checkTimer: any;

const timeLimit: number = 1000 * 20;

interface Props {
    product: Product
    saleLabel?: boolean
    isViewMode?: boolean
    productsLoaded?: boolean
    col?: string
};

const ProductCard = ({ product, saleLabel = false, isViewMode = false, productsLoaded = true }: Props) => {

    const date = new Date();
    const dateCreated = new Date(new Date(product.created).getTime() + timeLimit);
    const { checkFavorite, addFavorite, removeFavorite } = useFavorite();
    const [checkDate, setCheckDate] = useState<boolean>(false);
    const navigate = useNavigate();
    const statusFavorite = checkFavorite(product.id);

    const [openModal, setOpenModal] = useState(false);

    const onFavorite = (info: Product) => {
        if (!statusFavorite) addFavorite(info);
        else removeFavorite(info.id);
    };

    useEffect(() => {
        if (new Date(dateCreated) > date) {
            const remainingTime =
                dateCreated.getTime() - date.getTime();
            setCheckDate(true);
            checkTimer = setTimeout(() => {
                setCheckDate(false);
            }, remainingTime);
        } else clearTimeout(checkTimer);
    }, [checkDate, dateCreated, date, product.created]);

    if (!productsLoaded) {
        return (
            <li className="item col-lg-4 col-md-3 col-sm-4 col-xs-6">
                <div className="item-inner">
                    <Card style={{ width: 300, marginTop: 16 }} loading={productsLoaded} />
                </div>
            </li>
        )
    };

    return (
        <Fragment>
            {!isViewMode ? <li className="item col-lg-4 col-md-3 col-sm-4 col-xs-6">
                <div className="item-inner">
                    <div className="item-img">
                        <div className="item-img-info">
                            <Link to={`/product/detail/${product.id}`} title="Fresh Organic Mustard Leaves " className="product-image">
                                <img src={product.imageUrl} alt="Fresh Organic Mustard Leaves " height="250px" />
                            </Link>
                            {checkDate && <div className="new-label new-top-left">ใหม่</div>}
                            {product.stock === 0 && <div className="sale-label sale-top-right">สินค้าหมด</div>}
                        </div>
                    </div>
                    <div className="item-info">
                        <div className="info-inner">
                            <div className="item-title"><Link to="" title="Fresh Organic Mustard Leaves ">{product.name} </Link> </div>
                            <div className="item-content">
                                <div className="rating">
                                    <div className="ratings">
                                        <Rate style={{ width: "40%", fontSize: "100%" }} disabled value={product.averageScore} />
                                    </div>
                                </div>
                                <div className="item-price">
                                    <div className="price-box">
                                        <span className="regular-price">
                                            <span className="price">
                                                {currencyFormat(product.price)}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div className="restuarent">
                                    <Link to="#" onClick={() => onFavorite(product)} >
                                        <HeartFilled style={{ fontSize: "15px", color: statusFavorite ? "red" : "" }} /> รายการโปรด
                                    </Link>
                                    <Link to={`/products/similar/${product.id}`}>
                                        <ShoppingCartOutlined style={{ fontSize: "15px" }} /> สินค้าที่คล้ายกัน
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li> : <li className="item odd" >
                <div className="product-image">
                    <img className="small-image" style={{ height: "30rem" }} src={product.imageUrl} alt="HTC Rhyme Sense" />
                </div>
                <div className="product-shop">
                    <h2 className="product-name"><a href="product-detail.html" title="HTC Rhyme Sense">{product.name} </a></h2>
                    <div className="ratings">
                        {product.averageScore > 0 ? <Rate style={{ width: "40%", fontSize: "100%" }} disabled value={product.averageScore} /> : ""}
                    </div>
                    <div className="desc std">
                        <p>{product.description} </p>
                    </div>
                    <div className="price-box">
                        <p className="special-price">
                            <span id="product-price-212" className="price">
                                {currencyFormat(product.price)}
                            </span>
                        </p>
                    </div>
                    <div className="actions">
                        <ModalProductDetail open={openModal} setOpen={setOpenModal} product={product} />
                        <Space>
                            <Button
                                onClick={() => setOpenModal(true)}
                                className="button"
                                style={{ height: "100%", display: "flex", alignItems: "center" }}
                                htmlType="button"
                                icon={<ShoppingOutlined style={{ fontSize: "2rem" }} />}
                            >
                                เพิ่มใส่รถเข็น
                            </Button>
                            <Button
                                onClick={() => onFavorite(product)}
                                className="button"
                                style={{ height: "100%", display: "flex", alignItems: "center", backgroundColor: "#A9A7A7" }}
                                htmlType="button"
                                icon={<HeartFilled style={{ fontSize: "2rem", color: statusFavorite ? "red" : "" }} />}
                            >
                                รายการโปรด
                            </Button>
                            <Button
                                onClick={() => navigate(`/product/detail/${product.id}`)}
                                className="button"
                                style={{ height: "100%", display: "flex", alignItems: "center", backgroundColor: "#A9A7A7" }}
                                htmlType="button"
                                icon={<ExclamationCircleFilled style={{ fontSize: "2rem" }} />}
                            >
                                เพิ่มเติม
                            </Button>
                        </Space>
                    </div>
                </div>
            </li>}
        </Fragment>

    )
}

export default ProductCard;


{/*  

// ลดราคา  
<span className="price-label">
    <p className="old-price"> <span className="price-label"></span> <span id="old-price-212" className="price"> $442.99 </span> </p>
</span>  

*/}