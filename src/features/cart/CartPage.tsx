import { DeleteFilled } from '@ant-design/icons';
import { Button, Card, Image, InputNumber, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../app/hooks/useCart';
import MainContainer from '../../app/layout/MainContainer';
import TopSection from '../../app/layout/TopSection';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { currencyFormat, Text, Ts } from '../../app/util/util';
import { addCartItemAsync, removeCartItemAsync } from './cartSlice';

interface DataType {
    key: string;
    product: object;
    amount: number;
    price: number;
    total: number;
    action: any;
}

const CartPage = () => {
    const dispatch = useAppDispatch();
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
            render: (data) => (
                <Space size="middle" className='text-st'>
                    <Image src={data.image} width={100} />
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
            render: (data, more) => <InputNumber className='text-st' onChange={(amount) => handleInputChange(amount, more)} size="middle" min={1} max={100000} defaultValue={data} />

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

    const dataTable: DataType[] = cart?.items.map(item => ({
        key: item.productId,
        product: { image: item.imageUrl, name: item.name },
        amount: item.amount,
        price: item.price,
        total: item.price * item.amount,
        action: null
    })) as DataType[];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        }
    };
    return (
        <Fragment>
            <TopSection text={Text} title="ตะกร้าสินค้า" backToPageTitle="หน้าแรก" backToPageUrl="/" />
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
                                            <button type="button" className="button btn-proceed-checkout"><span>ดำเนินการชำระเงิน</span></button>
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