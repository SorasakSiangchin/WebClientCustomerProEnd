import { CheckCircleFilled, DeleteFilled } from '@ant-design/icons';
import { Button, Card, Image, InputNumber, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../app/hooks/useCart';
import MainContainer from '../../app/layout/MainContainer';
import TopSection from '../../app/layout/TopSection';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { currencyFormat, pathHome, Text, Ts } from '../../app/util/util';
import { addCartItemAsync, removeCartItemAsync } from '../../app/store/cartSlice';
import { useNavigate } from "react-router-dom";
import { CartItem } from '../../app/models/Cart';
import { toast } from 'react-toastify';
import Lottie from "lottie-react";
import IconWarning from "../../assets/icons/warning.json";
import { Container } from 'react-bootstrap';

export interface DataType {
    key: string;
    accountId: string;
    stock: number;
    cartItemId: number;
    product: object;
    amount: number;
    price: number;
    total: number;
    action: any;
}

const CartPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [dataCart, setDataCart] = useState<DataType[]>([]);
    const { account } = useAppSelector(state => state.account);
    const { cart, deliveryFree, status, subtotal } = useCart();

    const handleInputChange = (event: any, product?: any) => {
        if (event >= product.amount) {
            const amount = event - product.amount;
            dispatch(addCartItemAsync({ productId: product.key, accountId: account?.id, amount: amount }))

        } else {
            const amount = product.amount - event;
            dispatch(removeCartItemAsync({ productId: product.key, accountId: account?.id, amount: amount }))
        }

    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'สินค้า',
            dataIndex: 'product',
            key: 'product',
            render: (data: CartItem) => (
                <Space size="middle" className='text-st'>
                    <Image src={data.imageUrl} width={100} />
                    <Link to={''}>
                        {data.name}
                    </Link>
                </Space>
            ),
        },
        {
            title: 'ราคาต่อชิ้น',
            dataIndex: 'price',
            key: 'price',
            render: (data) => <Ts>{currencyFormat(data)}</Ts>
            ,
        },
        {
            title: 'จำนวน',
            key: 'amount',
            dataIndex: 'amount',
            render: (data, more) => <Space direction='vertical'>
                <InputNumber className='text-st' onChange={(amount) => handleInputChange(amount, more)} size="middle" min={1} max={more.stock} defaultValue={data} />
                <Container className="text-st" style={{ color: "#FF6100", width: "100%" }}>
                    เหลือสินค้าอยู่ {more.stock} ชิ้น
                </Container>
            </Space>

        },
        {
            title: 'ราคารวม',
            key: 'total',
            dataIndex: 'total',
            render: (data) => <Ts>{currencyFormat(data)}</Ts>

        },
        {
            title: 'แอคชั่น',
            key: 'action',
            dataIndex: 'action',
            render: (_, more) => <Button type="primary" className='text-st' loading={status === 'pendingRemoveItem' + more.key + 'del'} onClick={() => dispatch(removeCartItemAsync({ productId: more.key, accountId: account?.id, amount: more.amount, name: "del" }))} danger icon={<DeleteFilled />}>
                ลบ
            </Button>
        }
    ];

    const dataTable: DataType[] = cart?.items.map(item => {
        return {
            key: item.productId,
            cartItemId: item.id,
            accountId: item.accountId,
            stock: item.stock,
            product: item,
            amount: item.amount,
            price: item.price,
            total: item.price * item.amount,
            action: null
        };
    }) as DataType[];

    const rowSelection = {
        onChange: (_: any, selectedRows: DataType[]) => {
            setDataCart(selectedRows);
        }
    };

    const onClick = () => {
        if (dataCart?.length > 0) {
            navigate("/checkout", {
                state: {
                    data: dataCart,
                    cartId: cart?.id
                }
            });
        } else toast(toastContent, {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    const toastContent = <div style={{ display: "flex" }}>
        <Lottie style={{ width: "30px", display: "flex", justifyItems: "center" }} animationData={IconWarning} />
        <div className='center'>
            <Ts>กรุณาเลือกสินค้าก่อนยืนยันคำสั่งซื้อ</Ts>
        </div>
    </div>;

    return (
        <Fragment>
            <TopSection text={Text} title="ตะกร้าสินค้า" backToPageTitle="หน้าแรก" backToPageUrl={pathHome} />
            <MainContainer className="col1-layout wow bounceInUp animated">
                <div className="cart wow bounceInUp animated">
                    <div className="table-responsive shopping-cart-tbl  container">
                        <Table rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}
                            columns={columns}
                            dataSource={dataTable}
                            className="data-table cart-table table-striped "
                        />
                    </div>
                    <div className="container">
                        <div className="col-sm-4" />
                        <div className="col-sm-4" />
                        <div className="col-sm-4 main-container">
                            <div className="totals">
                                {
                                    Number(cart?.items.length) > 0 && <Card>
                                        <table id="shopping-cart-totals-table" className="table">
                                            <tfoot>
                                                <tr>
                                                    <td className="a-left" ><strong>รวมทั้งหมด ({dataTable?.length.toString()} สินค้า)</strong></td>
                                                    <td className="a-right"><strong><span className="price">{currencyFormat(subtotal + deliveryFree)}</span></strong></td>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                                <tr>
                                                    <td className="a-left" > ค่าจัดส่ง </td>
                                                    <td className="a-right"><span className="price">{currencyFormat(deliveryFree)}</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="checkout">
                                            <Button
                                                htmlType="button"
                                                size='large'
                                                className="button btn-proceed-checkout"
                                                icon={<CheckCircleFilled />}
                                                onClick={onClick}
                                            >
                                                <span>ดำเนินการชำระเงิน</span>
                                            </Button>
                                        </div>
                                    </Card>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </MainContainer>
        </Fragment >
    )
}
export default CartPage