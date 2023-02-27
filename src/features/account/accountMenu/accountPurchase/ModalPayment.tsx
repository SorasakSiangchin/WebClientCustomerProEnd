import { CloseOutlined, CopyOutlined, LoadingOutlined } from '@ant-design/icons';
import { useState } from "react";
import { Badge, Button, Col, Divider, message, Modal, Row, Upload, UploadProps } from 'antd'
import { AiOutlineCloudUpload } from "react-icons/ai";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { beforeUploadAntd, getBase64, Ts } from '../../../../app/util/util';
import { RcFile } from 'antd/es/upload';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../../../app/store/configureStore';
import Swal from 'sweetalert2';
import { createEvidenceMoneyTransferAsync } from '../../../../app/store/evidenceMoneyTransferSlice';
import { Result } from '../../../../app/models/Interfaces/IResponse';
import { resetOrder } from '../../../../app/store/orderSlice';
interface Props {
    openModal: boolean;
    setOpenModal: Function;
    orderId: string;
    setOrderId: Function;
}
const accountNumber = "1101310570";
const accountName = "สรศักดิ์ เซี่ยงฉิน";

const ValidateSchema = Yup.object().shape({
    formFiles: Yup.string().required('กรุณาเลือกไฟล์'),
});

const ModalPayment = ({ openModal, setOpenModal, orderId, setOrderId }: Props) => {
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const [imageUrl, setImageUrl] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const handleSubmitForm = async (value: any) => {
        const result: Result = await dispatch(createEvidenceMoneyTransferAsync(value)).unwrap();
        if (result.isSuccess === true) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'บันทึกข้อมูลสำเร็จ',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                setOpenModal(false);
                setOrderId("");
                setImageUrl("");
                dispatch(resetOrder());
            });
        };
    };

    return (
        <Formik
            initialValues={{ orderID: "", formFiles: '' }}
            validationSchema={ValidateSchema}
            onSubmit={(values, { resetForm }) => {
                values.orderID = orderId;
                handleSubmitForm(values);
                resetForm();
            }}
        >
            {({
                handleSubmit,
                setFieldValue,
                resetForm
            }) => {
                const props: UploadProps = {
                    name: 'formFiles',
                    multiple: false,
                    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
                    onChange: (info) => {
                        if (info.file.status === 'uploading') {
                            setLoading(true);
                            return;
                        }
                        getBase64(info.file.originFileObj as RcFile, (url) => {
                            setLoading(false);
                            setImageUrl(url);
                        });
                        setFieldValue("formFiles", info.file.originFileObj);
                    }
                };

                const RemoveImage = () => {
                    setFieldValue("formFiles", "");
                    setImageUrl("");
                };

                const onCancel = () => {
                    setOpenModal(false);
                    setOrderId("");
                    RemoveImage();
                    resetForm();
                };

                return <Modal
                    title="โอนชำระ"
                    className='text-st'
                    centered
                    okText={<Ts>ตกลง</Ts>}
                    cancelText={<Ts>ยกเลิก</Ts>}
                    open={openModal}
                    onOk={handleSubmit as any}
                    onCancel={onCancel}
                    width={'100rem'}
                >
                    <Form>
                        <Row gutter={24} >
                            {contextHolder}
                            <Col span={8} style={{ textAlign: "center" }}>
                                <div >
                                    <img width="50%" src='https://drive.google.com/uc?id=1H_ksUZIKJn2r_tiXuZHCXzBBvm3_s0Bb' alt='image-bank' />
                                    <h4 className='text-st'>ชื่อบัญชี {accountName}</h4>
                                    <h4 className='text-st'>
                                        เลขที่บัญชี {accountNumber} {" "}
                                        <CopyToClipboard text={accountNumber} onCopy={() => messageApi.open({
                                            type: 'success',
                                            content: 'This is a success message',
                                        })}>
                                            <Button type='text' icon={<CopyOutlined />} />
                                        </CopyToClipboard>
                                    </h4>
                                </div>
                            </Col>
                            <Col span={1} style={{ textAlign: "center" }}>
                                <Divider type='vertical' style={{ height: "100%" }} />
                            </Col>
                            <Col span={15} className="center">
                                <div>
                                    <Upload.Dragger {...props} beforeUpload={beforeUploadAntd} style={{ width: "30rem" }} showUploadList={false}>
                                        {!imageUrl ? <>
                                            {!loading ? <AiOutlineCloudUpload style={{ fontSize: "10rem" }} className='img-opacity' /> : <LoadingOutlined style={{ fontSize: "10rem" }} />}
                                            <p className="ant-upload-text text-st">
                                                เพิ่มหลักฐานการโอนเงิน
                                            </p>
                                        </> : <Badge count={<Button
                                            type="primary"
                                            shape="circle"
                                            htmlType='button'
                                            danger icon={<CloseOutlined />}
                                            onClick={RemoveImage}
                                            size="small"
                                            style={{ marginLeft: "5px" }} />}>
                                            <img
                                                src={imageUrl}
                                                className='img-thumbnail'
                                                alt='...'
                                                style={{ width: '100%', height: "200px" }}
                                            />
                                        </Badge>}
                                    </Upload.Dragger>
                                    <ErrorMessage name="formFiles" component="div" className="text-danger text-st" />
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            }}
        </Formik>
    )
}

export default ModalPayment