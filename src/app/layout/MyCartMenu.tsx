import { Badge, Button, List, Popover } from "antd";
import ProductsP6 from "../../assets/products-images/p6.jpg";
import ProductsP5 from "../../assets/products-images/p5.jpg";
import { Link, useNavigate, } from "react-router-dom";
import { Cart, CartItem } from "../models/Cart";
import { currencyFormat } from "../util/util";
import AppButton from "../components/AppButton";
import useCart from "../hooks/useCart";
import { ShoppingCartOutlined } from "@ant-design/icons";


interface Prop {
    cart: Cart;
}

export const MyCartMenu = ({ cart }: Prop) => {
    const navigate = useNavigate();
    const { itemCount } = useCart();
    const contentBasket = (
        <div className="fl-mini-cart-content" >
            <div className="block-subtitle" >
                <div className="top-subtotal">{cart?.items.length} สินค้า  </div>
            </div>
            <ul className="mini-products-list" id="cart-sidebar">
                <List
                    size="small"
                    dataSource={cart?.items}
                    renderItem={(item) => <List.Item><li >
                        <div className="item-inner"><Link className="product-image" title="timi &amp; leslie Sophia Diaper Bag, Lemon Yellow/Shadow White" to="#">
                            <img alt="Fresh Organic Mustard Leaf" width={100} src={item.imageUrl} />
                        </Link>
                            <div className="product-details">
                                <span className="price">{currencyFormat(item.price)}</span>
                                <p className="product-name"><Link to="#">{item.name}</Link></p>
                            </div>
                        </div>
                    </li></List.Item>}
                />
            </ul>
            <div className="actions">
                <AppButton type="primary" htmlType="submit" size="large" onClick={() => navigate("/cart")}>
                    ดูตะกร้าของคุณ
                </AppButton>
            </div>
        </div>
    );
    return <div className="fl-cart-contain">
        <div className="mini-cart">
            <Link to="/cart">
                <BoxPopover content={contentBasket} cartItem={cart?.items} >
                    <Badge count={itemCount} offset={[-3, 7]}>
                        <Button  icon={<ShoppingCartOutlined />} style={{ height : "50%" , fontSize : "25px" , color : "white"}} className="basket center">
                            <Link to="/cart">ตะกร้าสินค้า</Link>
                        </Button>
                    </Badge>
                </BoxPopover>
            </Link>
        </div>
    </div>
}

interface Props {
    children: any;
    content: any;
    cartItem: CartItem[]
}

const BoxPopover = ({ children, content, cartItem }: Props) => <>
    {
        cartItem?.length !== 0 && cartItem ? <Popover content={content} >
            {children}
        </Popover> : children
    }

</>