import { PlusOutlined, RollbackOutlined, SaveOutlined, ShopOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Divider, Form, Input, InputRef, List, Row, Select, Space } from 'antd';
import { ErrorMessage, Formik } from 'formik';
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useDelivery from '../../../app/hooks/useDelivery';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { fetchOrderAsync, orderSelectors } from '../../../app/store/orderSlice';
import { currencyFormat, Ts } from '../../../app/util/util';
import LayoutPrivate from '../LayoutPrivate';
import locale from 'antd/es/date-picker/locale/th_TH';
import { Result } from '../../../app/models/Interfaces/IResponse';
import { createDeliveryAsync, fetchStatusDeliverysAsync, updateDeliveryAsync } from '../../../app/store/deliverySlice';
import dayjs from 'dayjs';
import { DeliveryValidate } from './DeliveryValidate';
import agent from '../../../app/api/agent';
import AppSwal from '../../../app/components/AppSwal';

const DeliveryFormPrivate = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { state } = useLocation();
    const { idOrder } = useParams<{ idOrder: any }>();
    const { statusDelivery } = useDelivery();
    const order = useAppSelector(state => orderSelectors.selectById(state, idOrder));
    const [items, setItems] = useState(['jack', 'lucy']);
    const [name, setName] = useState('');
    const inputRef = useRef<InputRef>(null);

    useEffect(() => {
        if (!order) dispatch(fetchOrderAsync(idOrder));
    }, [order, dispatch]);

    const values = {
        id: 0,
        timeArrive: "",
        shippingServiceName: "",
        orderID: idOrder,
        statusDeliveryID: ""
    };

    const handleSubmitForm = async (value: any) => {
        let result: Result;
        if (!state) result = await dispatch(createDeliveryAsync(value)).unwrap();
        else result = await dispatch(updateDeliveryAsync(value)).unwrap();
        if (result!.isSuccess)
        AppSwal({
            icon : "success" ,
            onThen : () => navigate(-1) ,
            title : "บันทึกข้อมูลสำเร็จ" ,
            timer : 1500 
        });
    };
    const onNameChange = (event: any) => {
        setName(event.target.value);
    };

    const addItem = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        await agent.StatusDelivery.create({
            id: 0,
            name: name
        }).then(() => {
            dispatch(fetchStatusDeliverysAsync());
            setName('');
        });
    };

    return (
        <Formik
            initialValues={values}
            validationSchema={DeliveryValidate}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    handleSubmitForm(values);
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
                isSubmitting,
                setFieldValue,
                setValues
            }) => {

                useEffect(() => {
                    if (state) setValues(state);
                }, []);

                return <LayoutPrivate>
                    <Form layout='vertical' onFinish={handleSubmit} >
                        <Row  >
                            <Col span={8}><h1 className='text-st'>จัดส่งสินค้า</h1></Col>
                            <Col span={8} offset={8} style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
                                <Space>
                                    <Button loading={isSubmitting} className='text-st' type="primary" htmlType='submit' icon={<SaveOutlined />}>
                                        บันทึก
                                    </Button>
                                    <Button style={{ backgroundColor: "grey" }} className='text-st' type="primary" icon={<RollbackOutlined />} onClick={() => navigate(-1)}>
                                        กลับ
                                    </Button>
                                </Space>
                            </Col>
                        </Row>
                        <Divider />
                        <Row gutter={24}>
                            <Col span={10}>
                                <Card
                                    title="รายการจัดส่ง"
                                    className="text-st"
                                    bordered
                                    style={{ width: "100%" }}
                                >
                                    <List
                                        itemLayout="horizontal"
                                        size='small'
                                        dataSource={order?.orderItems}
                                        renderItem={(item: any) => (
                                            <List.Item className="text-st">
                                                <List.Item.Meta
                                                    avatar={<img width={70} height={70} src={item.imageUrl} />}
                                                    title={item.name}
                                                    description={currencyFormat(item.price)}
                                                />
                                                <h4>
                                                    {item.amount} รายการ
                                                </h4>
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                            </Col>
                            <Col span={14}>
                                <Card
                                    title="ข้อมูลจัดส่ง "
                                    className="text-st"
                                    bordered
                                    style={{ width: "100%" }}
                                >
                                    <Row gutter={24}>
                                        <Col span={12}>
                                            <Form.Item label={<Ts>เวลาจัดส่ง</Ts>}>
                                                <DatePicker
                                                    name='timeArrive'
                                                    defaultValue={state && dayjs(state.timeArrive, "YYYY-MM-DD HH:mm:ss")}
                                                    showTime
                                                    status={touched.timeArrive && errors.timeArrive
                                                        ? "error"
                                                        : ""}
                                                    locale={locale}
                                                    onChange={(_, date) => {
                                                        if (date !== "") setFieldValue("timeArrive", new Date(date).toLocaleString("th-TH"))
                                                        else setFieldValue("timeArrive", date)
                                                    }}
                                                    onBlur={handleBlur}
                                                    placeholder=""
                                                    style={{ width: "100%" }}
                                                />
                                                <ErrorMessage
                                                    name="timeArrive"
                                                    component="div"
                                                    className="text-danger text-st"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={<Ts>สถานะ</Ts>}>
                                                <Select
                                                    style={{ width: "100%" }}
                                                    size="middle"
                                                    onChange={(data) =>{
                                                        setFieldValue("statusDeliveryID", data);
                                                    }}
                                                    value={values.statusDeliveryID}
                                                    onBlur={handleBlur}
                                                    dropdownRender={(menu) => (
                                                        <>
                                                            {menu}
                                                            <Divider style={{ margin: '8px 0' }} />
                                                            <Space style={{ padding: '0 8px 4px' }}>
                                                                <Input.TextArea
                                                                    autoSize
                                                                    className='text-st'
                                                                    placeholder="เพิ่มสถานะ"
                                                                    ref={inputRef}
                                                                    value={name}
                                                                    onChange={(e) => onNameChange(e)}
                                                                />
                                                                <Button
                                                                    className='text-st'
                                                                    type="text"
                                                                    icon={<PlusOutlined />}
                                                                    onClick={addItem}

                                                                >
                                                                    เพิ่ม
                                                                </Button>
                                                            </Space>
                                                        </>
                                                    )}
                                                    status={touched.statusDeliveryID && errors.statusDeliveryID
                                                        ? "error"
                                                        : ""}
                                                >
                                                    {statusDelivery?.map(data => {
                                                        return (
                                                            <Select.Option value={data.id} >
                                                                {data.name} 
                                                            </Select.Option>
                                                        )
                                                    })}
                                                </Select>
                                                <ErrorMessage
                                                    name="statusDeliveryID"
                                                    component="div"
                                                    className="text-danger text-st"
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={24}>
                                        <Col span={24}>
                                            <Form.Item label={<Ts>ชื่อบริษัทจัดส่ง</Ts>}>
                                                <Input
                                                    name="shippingServiceName"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.shippingServiceName}
                                                    status={touched.shippingServiceName && errors.shippingServiceName
                                                        ? "error"
                                                        : ""}
                                                    suffix={<ShopOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
                                                />
                                                <ErrorMessage
                                                    name="shippingServiceName"
                                                    component="div"
                                                    className="text-danger text-st"
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Form>
                </LayoutPrivate>
            }
            }
        </Formik>
    )
}

export default DeliveryFormPrivate