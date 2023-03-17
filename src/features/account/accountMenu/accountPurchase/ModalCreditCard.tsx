import { Col, Descriptions, List, Modal, Row, Tag } from 'antd';
import React, { useState } from 'react'
import { currencyFormat, Ts } from '../../../../app/util/util'
import { Button, Steps, theme } from 'antd';
import { Order, OrderStatus } from '../../../../app/models/Order';
import { StripeElementType } from '@stripe/stripe-js';
import { Grid, TextField } from '@mui/material';
import { StripeInput } from '../../../checkout/StripeInput';
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../../../app/store/configureStore';
import { fetchOrdersAsync, updateOrderAsync } from '../../../../app/store/orderSlice';
import { Result } from '../../../../app/models/Interfaces/IResponse';
import AppSwal from '../../../../app/components/AppSwal';

const validationSchema = Yup.object().shape({
    nameCard: Yup.string().required('กรุณกรอกข้อมูล'),
});

interface Props {
    openModal: boolean;
    setOpenModal: Function;
    order: Order
}

const ModalCreditCard = ({ openModal, setOpenModal, order }: Props) => {

    const stripe = useStripe();
    const elements = useElements(); //สำหรับอ่านข้อมูลบัตรเครดิต
    const [current, setCurrent] = useState(0);
    const dispatch = useAppDispatch();
    const [cardState, setCardState] = useState<{
        elementError: { [key in StripeElementType]?: string };
    }>({ elementError: {} });

    const [cardComplete, setCardComplete] = useState<any>({ // จะได้ค่ามาจาก input
        cardNumber: false,
        cardExpiry: false,
        cardCvc: false,
    });

    const onCardInputChange = (event: any) => {
        setCardState({
            ...cardState,
            elementError: {
                ...cardState.elementError,
                [event.elementType]: event.error?.message,
            },
        });
        setCardComplete({ ...cardComplete, [event.elementType]: event.complete });
    };

    const infoSummary = [
        { title: 'รวมค่าสินค้า', info: order?.subtotal },
        { title: 'ค่าจัดส่ง', info: order?.deliveryFee },
        { title: 'รวมการสั่งซื้อ', info: order?.total },
    ];

    const checkYourOrderContent = (
        <Row gutter={24}>
            <Col span={13}>
                <List
                    itemLayout="horizontal"
                    size='small'
                    dataSource={order?.orderItems}
                    renderItem={(item: any) => (
                        <List.Item  >
                            <List.Item.Meta
                                className='text-st'
                                avatar={<img width={70} height={70} src={item.imageUrl} />}
                                title={item.name}
                                description={`x${item.amount}`}
                            />
                            <Ts>{currencyFormat(item.price)}</Ts>
                        </List.Item>
                    )}
                />
            </Col>
            <Col span={11}>
                <Descriptions
                    bordered
                    column={1}
                >
                    {React.Children.toArray(infoSummary.map((summary, index) => <Descriptions.Item
                        className='text-st'
                        label={<div style={{ display: "flex", justifyContent: "end" }}>
                            {summary.title}
                        </div>}
                        style={{ width: "80%" }}
                    >
                        {index === 2 ? <Tag className='text-st center' color="success" style={{ fontSize: "20px", padding: "5px" }}>{currencyFormat(summary.info)}</Tag> : currencyFormat(summary.info)}
                    </Descriptions.Item>))}
                </Descriptions>
            </Col>
        </Row>
    );

    const paymentDetailsContent = ({ touched, errors, handleChange, handleBlur }: any) => {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label="Name on card"
                        name='nameCard'
                        error={touched.nameCard && errors.nameCard ? true : false}
                        helperText={<ErrorMessage name='nameCard' component="div" className="text-danger" />}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        onChange={onCardInputChange}
                        error={!!cardState.elementError.cardNumber}
                        helperText={cardState.elementError.cardNumber}
                        id="cardNumber"
                        label="Card number"
                        fullWidth
                        autoComplete="cc-number"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            inputComponent: StripeInput,
                            inputProps: { component: CardNumberElement }, // ต้องใช้ชื้อแบบนี้เลย
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        onChange={onCardInputChange}
                        error={!!cardState.elementError.cardExpiry}
                        helperText={cardState.elementError.cardExpiry}
                        id="expDate"
                        label="Expiry date"
                        fullWidth
                        autoComplete="cc-exp"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            inputComponent: StripeInput,
                            inputProps: { component: CardExpiryElement }, // ต้องใช้ชื้อแบบนี้เลย
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        onChange={onCardInputChange}
                        error={!!cardState.elementError.cardCvc}
                        helperText={cardState.elementError.cardCvc}
                        id="cvv"
                        label="CVV"
                        fullWidth
                        autoComplete="cc-csc"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            inputComponent: StripeInput,
                            inputProps: { component: CardCvcElement }, // ต้องใช้ชื้อแบบนี้เลย
                        }}
                    />
                </Grid>
            </Grid>

        )
    };

    const steps = ({ touched, errors, handleChange, handleBlur }: any) => [
        {
            title: 'ตรวจสอบคำสั่งซื้อของคุณ',
            content: checkYourOrderContent,
        },
        {
            title: 'รายละเอียดการจ่ายเงิน',
            content: paymentDetailsContent({ touched, errors, handleChange, handleBlur }),
        },
    ];

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = ({ touched, errors, handleChange, handleBlur }: any) => steps({ touched, errors, handleChange, handleBlur }).map((item) => ({ key: item.title, title: item.title }));

    const { token } = theme.useToken();

    const contentStyle: React.CSSProperties = {
        color: token.colorTextTertiary,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
        padding: 30
    };

    const submitDisabled = (): boolean => {
        return (
            !cardComplete.cardCvc ||
            !cardComplete.cardExpiry ||
            !cardComplete.cardNumber
        );
    }

    const submitOrder = async ({ nameOnCard }: any) => {
        if (!stripe || !elements) return; // stripe not ready
        try {
            const cardElement = elements.getElement(CardNumberElement); // เช็ครหัสบัตรเครดิต
            const paymentResult = await stripe.confirmCardPayment(
                order?.clientSecret!,
                {
                    payment_method: {
                        card: cardElement!,
                        billing_details: {
                            name: nameOnCard,
                        },
                    },
                }
            );
            if (paymentResult.paymentIntent?.status === "succeeded") { // ถ้าสำเร็จจะส่งไปที่ Backend
                const data = {
                    ...order,
                    orderStatus: OrderStatus.SuccessfulPayment
                };
                const { isSuccess, statusCode, errorMessages }: Result = await dispatch(updateOrderAsync(data)).unwrap();
                if (isSuccess && statusCode === 200) {
                    AppSwal({
                        icon: "success",
                        title: "ชำระเงินสำเร็จ",
                        onThen: () => {
                            setOpenModal(false);
                            dispatch(fetchOrdersAsync());
                        }
                    });
                } else {
                    AppSwal({
                        icon: "error",
                        title: errorMessages[0],
                        onThen: () => { }
                    });
                };
            } else {
                AppSwal({
                    icon: "error",
                    title: "ชำระเงินไม่สำเร็จ",
                    onThen: () => { }
                });
            };
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Formik
            initialValues={{ nameCard: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(async () => {
                    await submitOrder({ nameOnCard: values.nameCard });
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
            }) => {
                return <Modal
                    title="โอนชำระ"
                    className='text-st'
                    centered
                    open={openModal}
                    onOk={() => setOpenModal(false)}
                    onCancel={() => setOpenModal(false)}
                    footer={false}
                    width={'100rem'}
                >
                    <Steps className='text-st' current={current} items={items({ touched, errors, handleChange, handleBlur })} />
                    <div style={contentStyle}>{steps({ touched, errors, handleChange, handleBlur })[current].content}</div>
                    <div style={{ marginTop: 24 }}>
                        {current < steps({ touched, errors, handleChange, handleBlur }).length - 1 && (
                            <Button className='text-st' type="primary" onClick={() => next()}>
                                ถัดไป
                            </Button>
                        )}
                        {current === steps({ touched, errors, handleChange, handleBlur }).length - 1 && (
                            <Button className='text-st' htmlType='submit' type="primary" disabled={submitDisabled()} onClick={() => handleSubmit(values as any)}>
                                เสร็จสิน
                            </Button>
                        )}
                        {current > 0 && (
                            <Button className='text-st' style={{ margin: '0 8px' }} onClick={() => prev()}>
                                กลับ
                            </Button>
                        )}
                    </div>
                </Modal>
            }}
        </Formik>

    )
}

export default ModalCreditCard