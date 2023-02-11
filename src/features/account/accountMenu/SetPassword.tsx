import React, { Fragment } from 'react'
import { Container } from 'react-bootstrap';
import { ColAccount } from '../AccountPage';
import { Button, Form, Divider, Input } from 'antd';
import { ErrorMessage, Formik } from 'formik';
import { Ts } from '../../../app/util/util';
import agent from '../../../app/api/agent';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { loadAccountStorage, setAccount } from '../../../app/store/accountSlice';
import { Result } from '../../../app/models/Interfaces/IResponse';
import swal from 'sweetalert';


interface IValues {
    newPassword?: string;
    confirmPassword?: string;
};

const SetPassword = () => {
    const { account } = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();
    const accountStorage = loadAccountStorage();
    const values = { confirmPassword: "", newPassword: "" };

    const validate = (values: IValues) => {
        let errors: IValues = {};
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!values.newPassword) errors.newPassword = "กรณากรอกรหัสผ่าน";
        else if (!regex.test(values.newPassword)) errors.newPassword = "ขั้นต่ำ 8 ตัวอักษร และต้องมีตัวอักษรและเลขอย่างน้อยชนิดละ 1 ตัว";
        if (!values.confirmPassword) errors.confirmPassword = "กรณากรอกรหัสผ่าน";
        else if (values.newPassword !== values.confirmPassword) errors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
        return errors;
    };

    const handleUpdateAccount = async (values: IValues) => {
        if (accountStorage) {
            const data = { ...account, passwordNew: values.newPassword }
            const { result, isSuccess, statusCode }: Result = await agent.Account.updatePassword(data);
            if (isSuccess === true && statusCode === 200) {
                swal({
                    title: "บันทึกข้อมูลสำเร็จ",
                    icon: "success",
                    buttons: [false, "ตกลง"],
                }).then(() => {
                    localStorage.setItem('account', JSON.stringify({ ...accountStorage, account: result }));
                    dispatch(setAccount({ account: result }))
                });
                ;
            }
        }
    };

    return (
        <ColAccount className="col-main col-sm-9" >
            <div className="my-account">
                <div className="dashboard">
                    <div className="welcome-msg">
                        <p className="hello">
                            <strong>
                                ตั้งค่ารหัสผ่าน
                            </strong>
                        </p>
                        <p>กรุณาอย่าเปิดเผยรหัสผ่านแก่คนอื่นๆ เพื่อความปลอดภัยของบัญชีผู้ใช้คุณเอง.</p>
                        <Divider />
                    </div>
                    <Formik
                        initialValues={values}
                        validate={validate}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                handleUpdateAccount(values);

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

                        }) => <Container>
                                <div className="col2-set">
                                    <Form
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        style={{ maxWidth: 600 }}
                                        onFinish={handleSubmit}
                                    >
                                        <Form.Item
                                            label={<Ts>รหัสผ่านใหม่</Ts>}
                                        >
                                            <Input.Password
                                                name="newPassword"
                                                value={values.newPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                status={touched.newPassword && errors.newPassword
                                                    ? "error"
                                                    : ""}
                                            />
                                            <ErrorMessage name="newPassword" component="div" className="text-danger text-st" />
                                        </Form.Item>
                                        <Form.Item
                                            label={<Ts>ยืนยันรหัสผ่าน</Ts>}
                                        >
                                            <Input.Password
                                                name="confirmPassword"
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                status={touched.confirmPassword && errors.confirmPassword
                                                    ? "error"
                                                    : ""}
                                            />
                                            <ErrorMessage name="confirmPassword" component="div" className="text-danger text-st" />
                                        </Form.Item>
                                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                            <Button type="primary" htmlType="submit" className='text-st' >
                                                ยืนยัน
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </Container>}
                    </Formik>

                </div>
            </div>
        </ColAccount>
    )
}

export default SetPassword