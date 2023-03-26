import { Button, Image, List, Space } from 'antd';
import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cart } from '../../app/models/Cart';
import FreeScrollBar from 'react-free-scrollbar';
import { currencyFormat } from '../../app/util/util';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { removeCartItemAsync } from '../../app/store/cartSlice';
import { CheckOutlined } from '@ant-design/icons';

interface Props {
  cart: Cart
  itemCount?: number
  subtotal?: number
};

const BlockCart = ({ cart, itemCount, subtotal }: Props) => {
  const heightShow = cart?.items.length ? "250px" : "120px";
  const dispatch = useAppDispatch();
  const { account } = useAppSelector(state => state.account);
  const navigate = useNavigate();
  return (
    <Fragment>
      <ContainerCart>
        <div className="block-title"> ตะกร้า </div>
        <div className="block-content">
          <div className="summary">
            <p className="amount">มีสินค้า {itemCount} ชิ้นในตะกร้าของคุณ</p>
            <p className="subtotal">
              <span className="label">ยอดรวม :</span>
              <span className="price">{currencyFormat(subtotal)}</span>
            </p>
          </div>
          <div className="ajax-checkout">
            <Button onClick={() => navigate("/cart")} className='text-st' type="primary" icon={<CheckOutlined />} size="middle" >
              ชำระเงิน
            </Button>
          </div>
          <p className="block-subtitle">รายการที่เพิ่ม({cart?.items.length | 0})</p>
          <ul id="cart-sidebar1" className="mini-products-list">
            <div style={{ width: '100%', height: heightShow }}>
              <FreeScrollBar >
                <List
                  dataSource={cart?.items}
                  renderItem={(item) => (
                    <List.Item>
                      <Link to="#" className="product-image"><Image src={item.imageUrl} alt="product" /></Link>
                      <div className="product-details">
                        <div className="access">
                          <Link to="#" onClick={() => dispatch(removeCartItemAsync({ productId: item.productId, accountId: account?.id, amount: item.amount, name: "del" }))} className="btn-remove1">Remove</Link>
                        </div>
                        <Space size={"large"}>
                          <strong className='text-st'>{item.amount} รายการ</strong>

                          <span className="price text-st">{currencyFormat(item.price)}</span>
                        </Space>
                        <p className="product-name text-st">{item.name}</p>
                      </div>
                    </List.Item>
                  )}
                />
              </FreeScrollBar>
            </div>
          </ul>
        </div>
      </ContainerCart>
    </Fragment>
  )
}

const ContainerCart = ({ children }: any) => <div className="block block-list block-cart" style={{ marginBottom: "30px" }}>{children}</div>

export default BlockCart