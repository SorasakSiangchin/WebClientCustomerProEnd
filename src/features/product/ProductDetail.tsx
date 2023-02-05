import { FacebookFilled, HeartOutlined, InstagramFilled } from '@ant-design/icons';
import { Alert, Button, Image, Input, Rate } from 'antd';
import { Fragment, useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import { Link, useParams } from 'react-router-dom';
import AppButtonCart from '../../app/components/AppButtonCart';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { currencyFormat, Ts } from '../../app/util/util';
import { fetchImageProductsAsync, fetchProductAsync, productSelectors, resetImageProduct } from './productSlice';
import { FacebookShareButton } from "react-share";
import MainContainer from '../../app/layout/MainContainer';
import TitleTap from '../../app/layout/TitleTap';
import ContentTap from '../../app/layout/ContentTap';
import { addCartItemAsync, removeCartItemAsync } from '../cart/cartSlice';
import Swal from 'sweetalert2';

interface IImageGallery {
  original: any;
  thumbnail: any;
  renderItem: any;
}

const keysTap = ["reviews_tabs", "product_tabs_custom"];
const titleTap = ["ความคิดเห็น", "ข้อมูลร้านค้า"];

const ProductDetail = () => {
  const dispatch = useAppDispatch();
  const { idProduct } = useParams<{ idProduct: any }>();
  const product = useAppSelector(state => productSelectors.selectById(state, idProduct));
  const { cart } = useAppSelector(state => state.cart);
  const { imageProducts, imageProductLoaded } = useAppSelector(state => state.product);
  const { account } = useAppSelector(state => state.account);
  const [images, setImages] = useState<IImageGallery[] | any>([]);
  const [amount, setAmount] = useState<Number | any>(0); // จำนวนสินค้าที่เราจะเพิ่มใส่ตะกร้า

  // เพื่อ check ว่า ซื้อไปหรือยัง ซื้อไปแล้วกี่ชิ้น
  const item = cart?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (item) setAmount(item?.amount);
    if (!product) dispatch(fetchProductAsync(idProduct));
  }, [idProduct, item, dispatch, product]);

  useEffect(() => {
    if (product) setImages([{ original: product.imageUrl, thumbnail: product.imageUrl, renderItem: () => RenderItem(product.imageUrl) }]);
  }, [product, dispatch]);

  useEffect(() => {
    dispatch(fetchImageProductsAsync(idProduct));
    if (imageProducts && images.length === 1) imageProducts.map(imgPro => setImages((image: any) => {
      return [...image, { original: imgPro.imageUrl, thumbnail: imgPro.imageUrl, renderItem: () => RenderItem(imgPro.imageUrl) }]
    }));
    return () => {
      if (imageProducts) dispatch(resetImageProduct());
    };
  }, [imageProductLoaded, dispatch]);

  const handleInputChange = (event: any) => {
    if (event.target.value >= 0) {
      setAmount(parseInt(event.target.value));
      if (Number(amount) < Number(product?.stock)) setAmount(product?.stock);
    }
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
  }

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
  }

  const handleOnCart = () => {
    if (account) Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'บันทึกสำเร็จ',
      showConfirmButton: false,
      timer: 1000
    }).then(handleButtonClick);
    else Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'กรุณาเข้าสู่ระบบ',
      showConfirmButton: false,
      timer: 1000
    });
  };

  return (
    <Fragment>
      <div className="product-essential container">
        <div className="row product-view">
          <div className="product-img-box col-lg-5 col-sm-5 col-xs-12">
            {/* label area */}
            <div className="product-image">
              <ImageGallery items={images} lazyLoad showThumbnails={images.length > 1 ? true : false} showFullscreenButton={false} />
            </div>
          </div>
          <div className="product-shop col-lg- col-sm-7 col-xs-12">
            {/* <div className="product-next-prev"> <a className="product-next" href="#"><span></span></a> <a className="product-prev" href="#"><span></span></a> </div> */}
            <div className="product-name">
              <h1>{product?.name}</h1>
            </div>
            <div className="ratings">
              <Rate disabled defaultValue={2} style={{ fontSize: "15px" }} />
              <p className="rating-links">
                <Link to={""}>1 Review</Link>
                <span className="separator">|</span>
                <Link to="">Add Your Review</Link>
              </p>
            </div>
            <div className="price-block">
              <div className="price-box">
                <LabelAvailability stock={product?.stock} />
                <p className="special-price"> <span id="product-price-48" className="price"> {currencyFormat(product?.price)}</span> </p>
              </div>
            </div>
            <AddToBox>
              <div className="pull-left">
                <div className="custom pull-left">
                  <Button onClick={() => amountChange(1, "remove")} className="reduced items-count" ><i className="fa fa-minus">&nbsp;</i></Button>
                  <Input onChange={handleInputChange} className="input-text qty" value={amount || 0} style={{ width: "55px" }} />
                  <Button onClick={() => amountChange(1, "add")} className="increase items-count" ><i className="fa fa-plus">&nbsp;</i></Button>
                </div>
              </div>
              <AppButtonCart disabled={item?.amount === amount || (!item && amount === 0)} onClick={handleOnCart} >เพิ่มไปยังรถเข็น</AppButtonCart>
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
                    url={"https://www.youtube.com/watch?v=UTLgvSvPriE&list=RDMM15bPo11sfTM&index=4"}
                    quote={""}
                    hashtag={"#hashtag"}
                    className="Demo__some-network__share-button"
                  >
                    <Button type="default" size='large' icon={<FacebookFilled className='img-opacity' style={{ fontSize: "22px", marginTop: "2px" }} />} />
                  </FacebookShareButton>
                </li>
                <li className="fb">
                  <Button type="default" size='large' icon={<InstagramFilled className='img-opacity' style={{ fontSize: "22px", marginTop: "2px" }} />} />
                </li>
                <li style={{ fontSize: "25px", margin: "10px" }}>
                  |
                </li>
                <li>
                  <Button
                    type="default"
                    size='large'
                    icon={
                      <HeartOutlined className='img-opacity' style={{ fontSize: "22px", marginTop: "2px", color: "" }} />
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
                <ContentTap ids={keysTap} idAccount={product?.accountID} />
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </Fragment>
  )
}

const RenderItem = (image: string) => (<div className="product-full">
  <Image id="product-zoom" src={image} alt="product-image" style={{ height: "500px" }} />
</div>);

const LabelAvailability = ({ stock }: any) => <Alert className='text-st availability ' style={{ width: "25%", marginBottom: "25px" }} message={`มีสินค้า ${stock} รายการ`} type="success" showIcon />;

const AddToBox = ({ children }: any) => (

  <div className="add-to-box">
    <div className="add-to-cart">
      {children}
    </div>
  </div>
);

export default ProductDetail