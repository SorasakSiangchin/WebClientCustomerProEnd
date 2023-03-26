import {
  CalendarOutlined,
  FacebookFilled,
  HeartFilled,
  InstagramFilled,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Alert, Button, Image, Input, Rate, Space } from 'antd';
import { Fragment, useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import { useNavigate, useParams } from 'react-router-dom';
import AppButtonCart from '../../app/components/AppButtonCart';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { currencyFormat, Ts } from '../../app/util/util';
import { fetchProductAsync, productSelectors } from '../../app/store/productSlice';
import { FacebookShareButton, } from "react-share";
import MainContainer from '../../app/layout/MainContainer';
import TitleTap from '../../app/layout/TitleTap';
import ContentTap from '../../app/layout/ContentTap';
import { addCartItemAsync, removeCartItemAsync } from '../../app/store/cartSlice';
import AppSwal from '../../app/components/AppSwal';
import useReview from '../../app/hooks/useReview';
import useFavorite from '../../app/hooks/useFavorite';
import { Product } from '../../app/models/Product';
import { OrderUsage } from '../../app/models/Order';

interface IImageGallery {
  original: any;
  thumbnail: any;
  renderItem: any;
}

const keysTap = ["reviews_tabs", "product_tabs_custom", "product_detail_tabs"];
const titleTap = ["ความคิดเห็น", "ข้อมูลร้านค้า", "เพิ่มเติม"];

const ProductDetail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: any }>();
  const { cart } = useAppSelector(state => state.cart);
  const { reviews, metaData, setParams, reviewsLoaded } = useReview({ productId });
  const product = useAppSelector(state => productSelectors.selectById(state, productId));
  const { account } = useAppSelector(state => state.account);
  const [images, setImages] = useState<IImageGallery[] | any>([]);
  const [amount, setAmount] = useState<Number | any>(0); // จำนวนสินค้าที่เราจะเพิ่มใส่ตะกร้า
  const { checkFavorite, addFavorite, removeFavorite } = useFavorite();

  // เพื่อ check ว่า ซื้อไปหรือยัง ซื้อไปแล้วกี่ชิ้น
  const item = cart?.items.find((i : any) => i.productId === product?.id);
 
  useEffect(() => {
    if (item) setAmount(item?.amount);
    if (!product) dispatch(fetchProductAsync(productId));
  }, [productId, item, dispatch, product]);

  useEffect(() => {
    if (Number(amount) > Number(product?.stock)) setAmount(product?.stock);
  }, [amount]);
  
  const statusFavorite = checkFavorite(productId);

  const onFavorite = (info: Product) => {
    if (!statusFavorite) addFavorite(info);
    else removeFavorite(info.id);
  };

  useEffect(() => {
    if (product) {
      setImages([{ original: product.imageUrl, thumbnail: product.imageUrl, renderItem: () => RenderItem(product.imageUrl) }]);
      product?.imageProducts.map(imgPro => setImages((image: any) => {
        return [...image, { original: imgPro.imageUrl, thumbnail: imgPro.imageUrl, renderItem: () => RenderItem(imgPro.imageUrl) }]
      }));
    };
  }, [product, dispatch]);

  const handleInputChange = (event: any) => {
    if (parseInt(event.target.value) > 0) {
      setAmount(parseInt(event.target.value));
    }else  setAmount(0);
    
  };

  const handleReserve = () => {
    navigate("/checkout", {
      state: {
        data: [
          {
            key: product?.id,
            accountId: account?.id,
            action: null,
            amount: amount,
            price: product?.price,
            stock: product?.stock,
            cartItemId: "",
            product: product,
            total: amount * Number(product?.price),
          }
        ],
        cartId: "",
        orderUsage: OrderUsage.Reserve
      }
    });
  };

  const handleButtonClick = () => {
    // ถ้าสินค้าไม่มีหรือจำนวนที่ใส่เข้าไปไหม่มากกว่าของเก่า
    if (!item || amount > item.amount) {
      // ถ้ามันมี
      const updatedAmount = item ? amount - item.amount : amount;
      dispatch(
        addCartItemAsync({
          productId: product?.id!,
          amount: updatedAmount,
          accountId: account?.id
        })
      );
    } else {
      const updatedAmount = item.amount - amount;
      dispatch(
        removeCartItemAsync({
          productId: product?.id!,
          amount: updatedAmount,
          accountId: account?.id
        })
      )
    };
  };

  const amountChange = (data: number = 1, key: string) => {
    if (data > 0) {
      switch (key) {
        case "add":
          if (Number(amount) < Number(product?.stock)) {
            setAmount(amount + Number(data));
          }
          break;
        case "remove":
          if (amount > 0) {
            setAmount(amount - Number(data));
          }
          break;
      }
    }
  };

  const handleOnCart = () => {
    if (account) AppSwal({
      icon: "success",
      onThen: handleButtonClick,
      title: "บันทึกสำเร็จ",
      timer: 1000
    })
    else AppSwal({
      icon: "warning",
      onThen: () => { },
      title: "กรุณาเข้าสู่ระบบ",
      timer: 1000
    })
  };

  const checkTypeAlert = (levelID: any) => {
    switch (levelID) {
      case 1:
        return "info";
      case 2:
        return "warning";
      case 3:
        return "error";
      default:
        return "info";
    };
  };

  const checkProduct = product?.categoryProductID !== 999;

  const iconButton = checkProduct ? <ShoppingCartOutlined style={{ fontSize: "30px" }} /> : <CalendarOutlined style={{ fontSize: "30px" }} />

  return (
    <Fragment>
      <div className="product-essential container">
        <div className="row product-view">
          <div className="product-img-box col-lg-5 col-sm-5 col-xs-12">
            {/* label area */}
            <div className="product-image">
              <ImageGallery
                items={images}
                lazyLoad
                showThumbnails={images.length > 1 ? true : false}
                showFullscreenButton={false}
              />
            </div>
          </div>
          <div className="product-shop col-lg- col-sm-7 col-xs-12">
            {/* <div className="product-next-prev"> <a className="product-next" href="#"><span></span></a> <a className="product-prev" href="#"><span></span></a> </div> */}
            <div className="product-name">
              <h1>{product?.name}</h1>
            </div>
            <div className="ratings">
              <Rate disabled value={Number(reviews?.averageScore)} style={{ fontSize: "15px" }} />
            </div>
            <div className="price-block">
              <div className="price-box">
                <div style={{ display: "flex", }}>
                  <Space direction='horizontal' style={{ width: "100%" }}>
                    <LabelAvailability message={`มีสินค้า ${product?.stock} รายการ`} showIcon={true} type="success" />
                    <LabelAvailability message={<>ระดับสินค้า <u>{product?.levelProduct.level}</u></>} showIcon={false} type={checkTypeAlert(product?.levelProductID)} />
                  </Space>
                </div>
                <p className="special-price"> <span id="product-price-48" className="price"> {currencyFormat(product?.price)}</span> </p>
              </div>
            </div>
            <AddToBox>
              <div className="pull-left">
                <div className="custom pull-left">
                  <Button onClick={() => amountChange(1, "remove")} className="reduced items-count" >
                    <MinusOutlined style={{
                      fontWeight: "bold" 
                    }} >
                      &nbsp;
                    </MinusOutlined>
                  </Button>
                  <Input min={0} max={product?.stock} onChange={handleInputChange} className="input-text qty" value={amount} style={{ width: "55px" }} />
                  <Button onClick={() => amountChange(1, "add")} className="increase items-count" >
                    <PlusOutlined style={{
                      fontWeight: "bold"
                    }}
                    >
                      &nbsp;
                    </PlusOutlined>
                  </Button>
                </div>
              </div>
              <AppButtonCart
                disabled={item?.amount === amount || (!item && amount === 0)}
                onClick={checkProduct ? handleOnCart : handleReserve}
                icon={iconButton}
              >
                {checkProduct ? "เพิ่มไปยังรถเข็น" : "สั่งจอง"}
              </AppButtonCart>
            </AddToBox>
            <div className="short-description">
              <Ts>
                {product?.description}
              </Ts>
            </div>
            <div className="social">
              <ul className="link">
                <li className="fb">
                  <FacebookShareButton
                    url={import.meta.env.VITE_APP_BACKEND_URL}
                    quote={""}
                    hashtag={"#hashtag"}
                    className="Demo__some-network__share-button"
                  >
                    <Button type="default" size='large' icon={<FacebookFilled className='img-opacity' style={{ fontSize: "22px", marginTop: "2px" }} />} />
                  </FacebookShareButton>
                </li>
                <li style={{ fontSize: "25px", margin: "10px" }}>
                  |
                </li>
                <li>
                  <Button
                    onClick={() => onFavorite(product as Product)}
                    type="default"
                    size='large'
                    icon={
                      <HeartFilled
                        className='img-opacity'
                        style={{
                          fontSize: "22px",
                          marginTop: "2px",
                          color: statusFavorite ? "red" : ""
                        }} />
                    } />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <MainContainer className="col1-layout wow bounceInUp animated">
        <div className="col-main row">
          <div className="product-view wow bounceInUp animated">
            <div className="product-collateral">
              <TitleTap titles={titleTap} keys={keysTap} />
              <div id="productTabContent" className="tab-content">
                <ContentTap
                  ids={keysTap}
                  product={product}
                  reviewsLoaded={reviewsLoaded}
                  setParams={setParams}
                  metaData={metaData}
                  reviews={reviews}
                />
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </Fragment>
  );
}

const RenderItem = (image: string) => (<div className="product-full">
  <Image id="product-zoom" src={image} alt="product-image" style={{ height: "500px" }} />
</div>);

const LabelAvailability = ({ message, showIcon, type }: any) =>
  <Alert
    className='text-st availability '
    style={{ width: "100%", marginBottom: "25px" }}
    message={message}
    type={type}
    showIcon={showIcon}
  />;

const AddToBox = ({ children }: any) => (

  <div className="add-to-box">
    <div className="add-to-cart">
      {children}
    </div>
  </div>
);

export default ProductDetail