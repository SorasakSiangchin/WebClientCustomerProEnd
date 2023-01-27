import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Modal, List, Skeleton, Space, Alert, Cascader } from 'antd';
import { ErrorMessage, Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import AppTextInput from '../../../app/components/AppTextInput';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { ColAccount } from "../AccountPage";
import type { DefaultOptionType } from 'antd/es/cascader';
import { default as dtDistrict } from "../../../assets/jsondata/district.json";
import { default as dtProvince } from "../../../assets/jsondata/province.json";
import { default as dtSubDistrict } from "../../../assets/jsondata/subdistrict.json";
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import { AddressValidate } from '../AccountValidate';
import ModalFormAddress from './ModalFormAddress';
import { addressSelectors, createAddressesAsync, fetchAddressesAsync } from '../../address/addressSlice';

interface DataType {
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    email: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    nat: string;
}

interface Option {
    value: string;
    label: string;
    children?: Option[];
    code?: number;
};


const AccountAddress = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);
    const [numRender, setNumRender] = useState<number>(4);
    const { account } = useAppSelector(state => state.account);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [option, setOption] = useState<Option[]>([]);
    const { addressLoaded } = useAppSelector(state => state.address);
    const dispatch = useAppDispatch();
    const addresses = useAppSelector(addressSelectors.selectAll);

    const loadOption = () => {
        dtProvince.province.map(province => {
            setOption(data => {
                return [...data,
                {
                    label: province.NameInThai,
                    value: province.NameInThai,
                    children: dtDistrict.district.filter(district => district.ProvinceId === province.Id).map(district => (
                        {
                            value: district.NameInThai,
                            label: district.NameInThai,
                            children: dtSubDistrict.subDistrict.filter(subDistrict => subDistrict.DistrictId === district.Id).map(subDistrict => (
                                {
                                    value: subDistrict.NameInThai,
                                    label: subDistrict.NameInThai,
                                    code: subDistrict.ZipCode,
                                }
                            ))
                        }
                    ))
                }];
            })
        });
    };

    const loadMoreData = () => {
        setNumRender(numRender + 4);
        if (loading) {
            return;
        }
        setLoading(true);
        dispatch(fetchAddressesAsync({ accountId: account?.id, numRender: numRender }));
    };

    useEffect(() => {
        loadOption();
    }, []);

    useEffect(() => {
        if (!addressLoaded) dispatch(fetchAddressesAsync({ accountId: account?.id }));
    }, [addressLoaded, dispatch]);

    const value = {
        subDistrict: "",
        district: "",
        province: "",
        zipCode: "",
        recipientName: "",
        phoneNumber: "",
        description: "",
        accountID: account?.id
    };


    const displayRender = (labels: string[], selectedOptions?: any) =>
        labels.map((label, i) => {
            const option = selectedOptions[i];
            if (i === labels.length - 1) {
                return (
                    <span key={option.value}>
                        {label} {option.code}
                    </span>
                );
            }
            return <span key={option.value}>{label} / </span>;
        });

    return (
        <Formik
            initialValues={value}
            validationSchema={AddressValidate}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                    dispatch(createAddressesAsync(values as any));
                    setSubmitting(false);
                    setModalOpen(false);
                    resetForm();
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
                resetForm
            }) => {
                const onChangeCascader = (_: any, more: any) => {
                    setFieldValue("province", more[0].value);
                    setFieldValue("district", more[1].value);
                    setFieldValue("subDistrict", more[2].value);
                    setFieldValue("zipCode", more[2].code);
                };
                return <>
                    {modalOpen ? <ModalFormAddress
                        isOpen={modalOpen}
                        isSubmitting={isSubmitting}
                        onCancel={() => {
                            setModalOpen(false);
                            resetForm();
                        }}
                        
                        onOk={handleSubmit}
                        title="ที่อยู่ใหม่"
                        content={<div style={{ padding: "20px" }}>
                            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                <Row >
                                    <Col sm={6}>
                                        <AppTextInput
                                            type="text"
                                            size="large"
                                            status={touched.recipientName && errors.recipientName
                                                ? "error"
                                                : ""}
                                            name="recipientName"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.recipientName}
                                            label={'ชื่อผู้รับ'}
                                        />
                                    </Col>
                                    <Col sm={6}>
                                        <AppTextInput
                                            type="text"
                                            size="large"
                                            status={touched.phoneNumber && errors.phoneNumber
                                                ? "error"
                                                : ""}
                                            name="phoneNumber"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.phoneNumber}
                                            label={'เบอร์โทร'}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} >
                                        <label className='text-st' htmlFor="">ที่อยู่<em className="required">*</em></label>
                                        <Cascader
                                            size="large"
                                            clearIcon={false}
                                            onBlur={handleBlur}
                                            onChange={onChangeCascader}
                                            status={
                                                touched.province && errors.province &&
                                                    touched.district && errors.district &&
                                                    touched.subDistrict && errors.subDistrict
                                                    ? "error"
                                                    : ""}
                                            options={option}
                                            displayRender={displayRender}
                                            style={{ width: '100%' }}
                                        />
                                        <Space>
                                            {React.Children.toArray(["province", "district", "subDistrict"].map((name) => <ErrorMessage name={name} component="div" className="text-danger text-st" />))}
                                        </Space>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12} >
                                        <label className='text-st' htmlFor="">รายละเอียดที่อยู่</label>
                                        <Input.TextArea
                                            status={touched.description && errors.description
                                                ? "error"
                                                : ""}
                                            rows={4}
                                            name="description"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.description}
                                        />
                                        <ErrorMessage name="description" component="div" className="text-danger text-st" />
                                    </Col>
                                </Row>
                            </Space>
                        </div>}
                    /> : <></>}
                    <ColAccount className="col-main col-sm-9">
                        <div className="my-account">
                            <div className="dashboard">
                                <div className="welcome-msg">
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <p className="hello"><strong> ที่อยู่ของฉัน </strong></p>
                                        <Button
                                            type="primary"
                                            onClick={() => setModalOpen(true)}
                                            htmlType="button"
                                            icon={<PlusCircleOutlined style={{ fontSize: '110%' }} />}
                                            size="middle"
                                            className='text-st'
                                        >
                                            เพิ่มที่อยู่
                                        </Button>
                                    </div>
                                </div>
                                <Container>
                                    <div className="col2-set">
                                        <div
                                            id="scrollableDiv"
                                            style={{
                                                height: 400,
                                                overflow: 'auto',
                                                padding: '0 16px',
                                                border: '1px solid rgba(140, 140, 140, 0.35)',
                                            }}
                                        >

                                            <List
                                                dataSource={addresses}
                                                renderItem={(item, index) => (
                                                    <List.Item key={index}>
                                                        <Space className='text-st' direction="vertical" size={0.1} style={{ width: "100%" }}>
                                                            <Row>
                                                                <Col xs={12} md={8} >
                                                                    <div><strong>{item.addressInformations.recipientName}</strong> | <span>{item.addressInformations.phoneNumber}</span></div>
                                                                    <div>ต.{item.addressInformations.subDistrict} อ.{item.addressInformations.district} จ.{item.addressInformations.province} ({item.addressInformations.zipCode})</div>
                                                                    <div>{item.addressInformations.description}</div>
                                                                    {item.status && <Alert
                                                                        className='text-st text-center'
                                                                        type="error"
                                                                        message="ค่าเริ่ม"
                                                                        style={{
                                                                            width: "80px",
                                                                            height: "30px"
                                                                        }}
                                                                    />}
                                                                </Col>
                                                                <Col
                                                                    xs={6}
                                                                    md={4}
                                                                    className="flex-end"
                                                                >
                                                                    <div style={{
                                                                        display: "inline",

                                                                    }}>
                                                                        <div>
                                                                            <Button className='text-st' type="link">แก้ไข</Button>
                                                                            <Button className='text-st' type="link">ลบ</Button>
                                                                        </div>
                                                                        <div>
                                                                            <Button disabled={item.status} className='text-st' >ตั้งเป็นค่าตั้งต้น</Button>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Space>
                                                    </List.Item>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </Container>
                            </div>
                        </div>
                    </ColAccount>
                </>
            }
            }
        </Formik>
    )
}


export default AccountAddress