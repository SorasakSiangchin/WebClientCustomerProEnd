import { Button, Input } from 'antd';
import { Formik, Form, ErrorMessage } from 'formik';
import { Fragment } from 'react'
import TopSection from '../../app/layout/TopSection'
import { useAppDispatch } from '../../app/store/configureStore';
import { loginAccount } from '../../app/store/accountSlice';
import { LoginValidate } from './AccountValidate';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Result } from '../../app/models/Interfaces/IResponse';
import { LockFilled, UserAddOutlined } from '@ant-design/icons';
import AppButton from '../../app/components/AppButton';
import { Text } from '../../app/util/util';
import MainContainer from '../../app/layout/MainContainer';

const value = { email: '', password: '' };

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const submitForm = async (data: any) => {
    const result: Result = await dispatch(loginAccount(data)).unwrap();
    if (result.isSuccess === true || !result.errorMessages) {
      swal({
        title: "เข้าสู่ระบบสำเร็จ",
        icon: "success",
        buttons: [false, "ตกลง"],
      });
    } else {
      swal({
        title: result.errorMessages[0],
        icon: "warning",
        buttons: [false, "ตกลง"],
      });
    };
  };
  return (
    <Fragment>
      <TopSection text={Text} title="เข้าสู่ระบบ" backToPageTitle="หน้าแรก" backToPageUrl="/" />
      <MainContainer className="col1-layout wow bounceInUp animated animated">
        <div className="account-login">
          <Formik
            initialValues={value}
            validationSchema={LoginValidate}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                submitForm(values);
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
            }) =>
              <Form onSubmit={handleSubmit}>
                <fieldset className="col2-set">
                  <div className="col-1 new-users"> <strong>สมัครสมาชิกใหม่!</strong>
                    <div className="content">
                      <p className='text-st'>เมื่อสร้างบัญชีกับร้านค้าของเรา คุณจะสามารถดำเนินการตามขั้นตอนการชำระเงินได้เร็วขึ้น จัดเก็บที่อยู่จัดส่งหลายแห่ง ดูและติดตามคำสั่งซื้อของคุณในบัญชีของคุณ และอื่นๆ อีกมากมาย</p>
                      <Button type="primary" className="button" icon={<UserAddOutlined />} size="large" onClick={() => navigate("/register")}>
                        <span>สมัครสมาชิก</span>
                      </Button>
                    </div>
                  </div>
                  <div className="col-2 registered-users">
                    <div className="content">
                      <ul className="form-list">
                        <li>
                          <label htmlFor="email" className='text-st'>ที่อยู่อีเมล<em className="required">*</em></label>
                          <div className="input-box">
                            <Input
                              type="text"
                              size="large"
                              status={touched.email && errors.email
                                ? "error"
                                : ""}
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email} />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                          </div>
                        </li>
                        <li>
                          <label htmlFor="pass" className='text-st'>รหัสผ่าน<em className="required">*</em></label>
                          <div className="input-box">
                            <Input.Password
                              type="text"
                              size="large"
                              status={touched.password && errors.password
                                ? "error"
                                : ""}
                              name="password"
                              className="input-text required-entry validate-password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password} />
                            <ErrorMessage name="password" component="div" className="text-danger" />
                          </div>
                        </li>
                      </ul>
                      <div className="buttons-set" style={{ marginTop: "5%" }}>
                        <AppButton type="primary" htmlType="submit" loading={isSubmitting} icon={<LockFilled style={{ fontSize: '110%' }} />} size="large">
                          ตกลง
                        </AppButton>
                        <Link to="" className="forgot-word text-st">
                          ลืมรหัสผ่านหรือไม่?
                        </Link>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </Form>
            }
          </Formik>
        </div>
      </MainContainer>
    </Fragment>
  )
}

export default Login