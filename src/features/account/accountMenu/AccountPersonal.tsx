import { useState, useEffect } from 'react';
import { convertRole, Ts, } from '../../../app/util/util';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, Form, Select, Space } from 'antd';
import { Container } from 'react-bootstrap';
import { Formik } from 'formik';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import AppUpload, { getBase64 } from '../../../app/components/AppUpload';
import { RegisterValidate } from '../AccountValidate';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { fetchRolesAsync, loadAccountStorage, setAccount } from '../accountSlice';
import agent from '../../../app/api/agent';
import AppTextInput from '../../../app/components/AppTextInput';
import { ColAccount } from "../AccountPage";
const AccountPersonal = () => {
    const dispatch = useAppDispatch();
    const accountStorage = loadAccountStorage();
    const { account } = useAppSelector(state => state.account);
    const [statusInput, setStatusInput] = useState<boolean>(false);
    const { roleData } = useAppSelector(state => state.account);

    useEffect(() => {
        if (!roleData) dispatch(fetchRolesAsync());
    }, []);

    const [loading, setLoading] = useState<boolean>(false);

    const value = {
        id: account?.id || "",
        firstName: account?.firstName || "",
        lastName: account?.lastName || "",
        email: account?.email || "",
        password: account?.password || "",
        phoneNumber: account?.phoneNumber || "",
        roleID: account?.role.id || "",
        formFiles: {} || undefined
    };

    interface Props {
        values?: any;
    };

    const handleUpdateAccount = async ({ values }: Props) => {
        if (accountStorage) {
            const { result } = await agent.Account.update(values ? values : value);
            localStorage.setItem('account', JSON.stringify({ ...accountStorage, account: result }));
            dispatch(setAccount({ account: result }));
        };
    };
    
    return (
        <Formik
            initialValues={value}
            validationSchema={RegisterValidate}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    handleUpdateAccount({ values: values });
                    setSubmitting(false);
                    setStatusInput(!statusInput);
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
                setFieldValue
            }) => {
                const handleChangeImaage: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
                    if (info.file.status === 'uploading') {
                        setLoading(true);
                        return;
                    };
                    getBase64(info.file.originFileObj as RcFile, async (url) => {
                        setLoading(false);
                    });
                    value.formFiles = info.file.originFileObj;
                    handleUpdateAccount({});
                };
                return <Form>
                    <ColAccount className="col-main col-sm-9" >
                        <div className="my-account">
                            <div className="dashboard">
                                <div className="welcome-msg">
                                    <p className="hello"><strong>ข้อมูลของฉัน </strong></p>
                                    <p>จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้.</p>
                                    <Divider />
                                </div>
                                <Container>
                                    <div className="col2-set">
                                        <div className="col-1 text-st">
                                            <InputLabelAndText
                                                label="ชื่อ"
                                                data={account?.firstName}
                                                status={statusInput}
                                                name="firstName"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.firstName}
                                                touched={touched.firstName}
                                                errors={errors.firstName}
                                            />
                                            <InputLabelAndText
                                                label="นามสกุล"
                                                data={account?.lastName}
                                                status={statusInput}
                                                name="lastName"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.lastName}
                                                touched={touched.lastName}
                                                errors={errors.lastName}
                                            />
                                            <InputLabelAndText
                                                label="อีเมล"
                                                data={account?.email}
                                                status={statusInput}
                                                name="email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                                touched={touched.email}
                                                errors={errors.email}
                                            />
                                            <InputLabelAndText
                                                label="เบอร์โทร"
                                                data={account?.phoneNumber}
                                                status={statusInput}
                                                name="phoneNumber"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.phoneNumber}
                                                touched={touched.phoneNumber}
                                                errors={errors.phoneNumber}
                                            />
                                            <Form.Item
                                                label={<Ts>ตำแหน่ง</Ts>}
                                            >
                                                {!statusInput ? <strong className="text-st">{convertRole(account?.role.name)}</strong> :
                                                    <Select
                                                        defaultValue={account?.role.id}
                                                        style={{ width: "100%" }}
                                                        size="large"
                                                        onChange={(data) => {
                                                            setFieldValue("roleID", data.toString());
                                                        }}
                                                        onBlur={handleBlur}
                                                        status={touched.roleID && errors.roleID
                                                            ? "error"
                                                            : ""}
                                                        options={
                                                            roleData?.map(data => {
                                                                return {
                                                                    value: data.id,
                                                                    label: <Ts>{convertRole(data.name)}</Ts>,
                                                                    disabled: data.name === "admin" ? true : false,
                                                                }
                                                            })
                                                        }
                                                    />}
                                            </Form.Item>
                                            {
                                                !statusInput ?
                                                    <Button className='text-st' onClick={() => setStatusInput(!statusInput)} type="primary" htmlType='button' icon={<EditOutlined />} size={"middle"}>
                                                        แก้ไข
                                                    </Button> :
                                                    <Button className='text-st' loading={isSubmitting} onClick={() => handleSubmit()} type="primary" danger icon={<SaveOutlined />} size={"middle"}>
                                                        บันทึก
                                                    </Button>
                                            }
                                        </div>
                                        <Divider type='vertical' className='my' style={{ height: "120px" }} />
                                        <div className="col-2">
                                            <Space direction="vertical" className='center'>
                                                <Avatar src={account?.imageUrl} style={{ width: '100px', height: '100px', margin: "auto" }} />
                                                <AppUpload handleChangeImaage={handleChangeImaage} >
                                                    <Button loading={loading} className='center text-st' type='default' htmlType='button'>
                                                        เลื่อกรูป
                                                    </Button>
                                                </AppUpload>
                                                <Ts>
                                                    ไฟล์ที่รองรับ: .JPEG, .PNG
                                                </Ts>
                                            </Space>
                                        </div>
                                    </div>
                                </Container>
                            </div>
                        </div>
                    </ColAccount>
                </Form>
            }
            }
        </Formik>
    )
}

const InputLabelAndText = ({ data, label, status, name, onChange, onBlur, value, touched, errors }: any) => {
    return <Form.Item
        label={<Ts>{label}</Ts>}
    >
        {
            !status ? <strong className="text-st">{data}</strong> : <AppTextInput
                isLabel={true}
                type="text"
                size="large"
                status={touched && errors
                    ? "error"
                    : ""}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                label={label} />
        }
    </Form.Item>
}

export default AccountPersonal