import { Col, Modal, Row, Space, Input, Form } from 'antd';
import { Formik } from 'formik';
import { DetailProduct } from '../../../app/models/DetailProduct';
import { Ts } from '../../../app/util/util';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../app/store/configureStore';
import { createDetailProductAsync, updateDetailProductAsync } from "../../../app/store/detailProductSlice";
import { DetailProductValidate } from './ProductPrivateValidate';

interface Props {
    modalOpen: boolean;
    setModalOpen: Function;
    detailProduct: DetailProduct | null;
    idProduct: string;
}

const ModalFormDetailProduct = ({ modalOpen, setModalOpen, detailProduct, idProduct }: Props) => {

    const dispatch = useAppDispatch();

    const value: DetailProduct = {
        id: 0,
        description: "",
        fertilizeMethod: "", // การใส่ปุ๋ย
        growingSeason: "", // ฤดูปลูก (ควรปลูกฤดูไหน)
        harvestTime: "", // ระยะเวลาเก็บเกี่ยว
        plantingMethod: "", // การปลูก
        speciesName: "",
        productID: idProduct
    };

    const handleSubmitForm = async (data: any) => {
        if (!detailProduct) dispatch(createDetailProductAsync(data));
        else dispatch(updateDetailProductAsync(data));
    };

    return (
        <Formik
            initialValues={value}
            validationSchema={DetailProductValidate}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                    handleSubmitForm(values);
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
                resetForm,
                setValues
            }) => {

                const onCancel = () => {
                    setModalOpen(false);
                    resetForm();
                }

                useEffect(() => {
                    if (detailProduct) setValues(detailProduct, false);
                    else resetForm();
                }, [detailProduct, modalOpen]);

                return <Modal
                    title="เพิ่มรายละเอียด"
                    className='text-st'
                    confirmLoading={isSubmitting}
                    okText={<Ts>ตกลง</Ts>}
                    onOk={handleSubmit as any}
                    cancelText={<Ts>ยกเลิก</Ts>}
                    open={modalOpen}
                    onCancel={onCancel}
                    width={900}
                >
                    <Form
                        layout='vertical'
                    >
                        <Space direction="vertical" size="middle" style={{ display: 'flex', width: "100%", padding: "20px" }} >
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.Item
                                        label={<Ts>ชื่อพันธุ์</Ts>}
                                    >
                                        <Input.TextArea
                                            status={touched.speciesName && errors.speciesName
                                                ? "error"
                                                : ""}
                                            name="speciesName"
                                            value={values.speciesName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            autoSize
                                            size='large'
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={<Ts>วิธีการใส่ปุ๋ย</Ts>}
                                    >
                                        <Input.TextArea
                                            status={touched.fertilizeMethod && errors.fertilizeMethod
                                                ? "error"
                                                : ""}
                                            name="fertilizeMethod"
                                            value={values.fertilizeMethod}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            autoSize
                                            size='large'
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={<Ts>วิธีการปลูก</Ts>}
                                    >
                                        <Input.TextArea
                                            status={touched.plantingMethod && errors.plantingMethod
                                                ? "error"
                                                : ""}
                                            name="plantingMethod"
                                            value={values.plantingMethod}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            autoSize
                                            size='large'
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={<Ts>ฤดูปลูก</Ts>}
                                    >
                                        <Input.TextArea
                                            status={touched.growingSeason && errors.growingSeason
                                                ? "error"
                                                : ""}
                                            name="growingSeason"
                                            value={values.growingSeason}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            autoSize
                                            size='large'
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={<Ts>ฤดูเก็บเกี่ยว</Ts>}
                                    >
                                        <Input.TextArea
                                            status={touched.harvestTime && errors.harvestTime
                                                ? "error"
                                                : ""}
                                            name="harvestTime"
                                            value={values.harvestTime}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            autoSize
                                            size='large'
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={<Ts>เพิ่มเติม</Ts>}
                                    >
                                        <Input.TextArea
                                            status={touched.description && errors.description
                                                ? "error"
                                                : ""}
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            autoSize
                                            size='large'
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Space>
                    </Form>

                </Modal>
            }}
        </Formik>
    )
}

export default ModalFormDetailProduct