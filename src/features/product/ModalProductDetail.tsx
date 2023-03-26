import { Alert, Button, Carousel, Image, Input, Modal, Rate, Space } from 'antd'
import { useEffect, useState } from 'react';
import AppButtonCart from '../../app/components/AppButtonCart';
import AppSwal from '../../app/components/AppSwal';
import useReview from '../../app/hooks/useReview';
import { Product } from '../../app/models/Product';
import { addCartItemAsync, removeCartItemAsync } from '../../app/store/cartSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchProductAsync } from '../../app/store/productSlice';
import { currencyFormat } from '../../app/util/util';

interface Props {
  open: boolean;
  setOpen: Function;
  product: Product
};

const ModalProductDetail = ({ open, setOpen, product }: Props) => {
  const { reviews } = useReview({ productId: product.id });
  const { cart } = useAppSelector(state => state.cart);
  const [amount, setAmount] = useState<Number | any>(0);
  const { account } = useAppSelector(state => state.account);
  const dispatch = useAppDispatch();

  // เพื่อ check ว่า ซื้อไปหรือยัง ซื้อไปแล้วกี่ชิ้น
  const item = cart?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (item) setAmount(item?.amount);
  }, [item, dispatch, product]);

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

  return (
    <Modal
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      footer={false}
      width={"100rem"}
    >
      <div className="product-essential container" style={{ height: "100%" }}>
        <div className="row product-view">
          <div className="product-img-box col-lg-5 col-sm-5 col-xs-12">
            {/* label area */}
            <div className="product-image">
              <Carousel autoplay dotPosition="top">
                <div>
                  <img src={product.imageUrl} style={{ height: "35rem" }} alt="image-product" />
                </div>
                {product.imageProducts.map(img => <div key={img.id}>
                  <img style={{ height: "35rem" }} src={img.imageUrl} alt="image-product" />
                </div>)}
              </Carousel>
            </div>
          </div>
          <div className="product-shop col-lg- col-sm-7 col-xs-12">
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
                  <Button onClick={() => amountChange(1, "remove")} className="reduced items-count" ><i className="fa fa-minus">&nbsp;</i></Button>
                  <Input onChange={handleInputChange} className="input-text qty" value={amount || 0} style={{ width: "55px" }} />
                  <Button onClick={() => amountChange(1, "add")} className="increase items-count" ><i className="fa fa-plus">&nbsp;</i></Button>
                </div>
              </div>
              <AppButtonCart size='small' disabled={item?.amount === amount || (!item && amount === 0)} onClick={handleOnCart} >เพิ่มไปยังรถเข็น</AppButtonCart>
            </AddToBox>
          </div>
        </div>
      </div>
    </Modal>
  )
}

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

export default ModalProductDetail