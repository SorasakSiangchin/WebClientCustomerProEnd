import { Avatar, Button, Card, Image, Space, Table } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import MainContainer from '../../app/layout/MainContainer';
import TopSection from '../../app/layout/TopSection';
import type { ColumnsType } from 'antd/es/table';
import { currencyFormat, Ts } from '../../app/util/util';
import { Link, useLocation, useNavigate } from "react-router-dom";
import agent from '../../app/api/agent';
import { Result } from '../../app/models/Interfaces/IResponse';
import { Account } from '../../app/models/Account';
import { CartItem } from '../../app/models/Cart';
import CheckoutAddress from './CheckoutAddress';
import useAddress from '../../app/hooks/useAddress';
import CheckoutInfoPayment from './CheckoutInfoPayment';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const columns: ColumnsType<DataType> = [
    {
        title: <Ts>สินค้า</Ts>,
        dataIndex: 'product',
        key: 'product',
        render: (data: CartItem) => (
            <Space size="middle" className='text-st'>
                <Image src={data.imageUrl} width={50} />
                <Link to={''}>
                    {data.name}
                </Link>
            </Space>
        ),
        width: '50%',
    },
    {
        title: <Ts>ราคาต่อชิ้น</Ts>,
        dataIndex: 'price',
        key: 'price',
        render: (data) => <Ts>{currencyFormat(data)}</Ts>
        ,
    },
    {
        title: <Ts>จำนวน</Ts>,
        key: 'amount',
        dataIndex: 'amount',
        render: (data) => <Ts>{data}</Ts>,
    },
    {
        title: <Ts>ราคารวม</Ts>,
        key: 'total',
        dataIndex: 'total',
        render: (data) => <Ts>{currencyFormat(data)}</Ts>,

    }
];

const CheckoutPage = () => {
    const { state } = useLocation();
    const [accountId, setAccountId] = useState<string[]>([]);
    const { addresses } = useAddress();
    const address = addresses.find(x => x.status === true)
    const navigate = useNavigate();
    const loadAccountId = async () => {
        const { result, isSuccess, statusCode }: Result = await agent.Order.getIdAccount({
            cartId: state.cartId,
            cartItemId: state?.dataCart.map((e: any) => e.cartItemId)
        });
        if (isSuccess === true && statusCode === 200) setAccountId(result);
    };
   
    const priceTotal = state?.dataCart.reduce((curNumber: any, item: any) => {
        return curNumber + item.price * item.amount;
    }, 0);

    const deliveryFree = priceTotal > 10000 ? 0 : 50;

    useEffect(() => {
        loadAccountId();
    }, []);

    const showProduct = React.Children.toArray(accountId.map(id => {
        const product = state.dataCart.filter((e: any) => e.accountId === id);
        const priceSubTotal = product.reduce((curNumber: any, item: any) => {
            return curNumber + item.price * item.amount;
        }, 0);
        const amountSubTotal = product.reduce((curNumber: any, item: any) => {
            return curNumber + item.amount;
        }, 0);
        const data: DataType[] = product.map((item: any) => {
            return {
                key: item.cartItemId,
                accountId: item.accountId,
                product: item.product,
                amount: item.amount,
                price: item.price,
                total: item.price * item.amount,
            };
        });
        return <Card hoverable className='text-st' title={<AvatarAccount accountId={id} />} bordered={true} style={{
            width: "100%",
            height: "100%",
            marginTop: "20px",
            marginBottom: "20px",
            borderStyle: "solid",
            borderWidth: "5px"
        }}>
            <Table columns={columns} dataSource={data} pagination={false} />
        </Card>;
    }));

    return (
        <Fragment>
            <TopSection text={""} title="ทำการสั่งซื้อ" backToPageTitle="หน้าแรก" backToPageUrl="/" />
            <MainContainer className="col2-right-layout">
                <div className="row">
                    <section className="col-main col-sm-8">
                        <div className="one-page-checkout" id="checkoutSteps">
                            <div className="site-card-border-less-wrapper">
                                <div className="block-title"> สินค้าที่สั่งซื้อ {accountId.length}</div>
                                <br />
                                {showProduct}
                            </div>
                        </div>
                    </section>
                    <div className="col-right sidebar col-sm-4 wow bounceInUp animated animated" style={{ marginBottom: "30px" }} >
                        <div id="checkout-progress-wrapper">
                            <Card
                                title="ที่อยู่ในการจัดส่ง"
                                className="block block-progress text-st"
                                extra={
                                    <Button type='link' className='text-st' onClick={() => navigate("/account" , {state : "2" })}>
                                        {address ? "เปลี่ยน" : "เพิ่ม" } 
                                    </Button>
                                }
                            >
                                <CheckoutAddress address={address} />
                            </Card>
                            <Card
                                title="การชำระเงิน"
                                className="block block-progress text-st"
                                actions={[
                                    <Button
                                        style={{ width: "90%" }}
                                        htmlType="button"
                                        size='large'
                                        className="button btn-proceed-checkout"
                                    >
                                        <span>ดำเนินการชำระเงิน</span>
                                    </Button>
                                ]}
                            >
                                <CheckoutInfoPayment deliveryFree={deliveryFree} priceTotal={priceTotal}  />
                            </Card>
                        </div>
                    </div>
                </div>
            </MainContainer>
        </Fragment>
    )
};

const AvatarAccount = ({ accountId }: any) => {
    const [account, setAccount] = useState<Account | null>(null);
    useEffect(() => {
        const loadAccount = async () => {
            const { result, isSuccess, statusCode }: Result = await agent.Account.currentAccount(accountId);
            if (isSuccess === true && statusCode === 200) setAccount(result);
        }
        loadAccount();
    }, []);
    return <Card.Meta
        avatar={<Avatar src={account?.imageUrl} />}
        title={account?.firstName}
    />;
}

export default CheckoutPage