import { Button, Input, Space } from 'antd';
import { Formik, Form, ErrorMessage } from 'formik';
import { Fragment, useEffect } from 'react'
import TopSection from '../../app/layout/TopSection'
import { useAppDispatch } from '../../app/store/configureStore';
import { googleLoginAccount, loginAccount, setStatusLogin } from '../../app/store/accountSlice';
import { LoginValidate } from './AccountValidate';
import { Link, useNavigate } from 'react-router-dom';
import { Result } from '../../app/models/Interfaces/IResponse';
import { LockFilled, UserAddOutlined } from '@ant-design/icons';
import AppButton from '../../app/components/AppButton';
import { clientId, Text, Ts } from '../../app/util/util';
import MainContainer from '../../app/layout/MainContainer';
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { GoogleLoginRequest } from '../../app/models/Account';
import AppSwal from '../../app/components/AppSwal';
const value = { email: '', password: '' };

const valueGoogle: GoogleLoginRequest = { email: '', password: '', firstName: '', lastName: '', imageUrl: '' };

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitForm = async (data: any) => {
    const result: Result = await dispatch(loginAccount(data)).unwrap();
    if (result.isSuccess === true || !result.errorMessages) {
      AppSwal({
        icon : "success" ,
        onThen : () => dispatch(setStatusLogin()) ,
        title : "เข้าสู่ระบบสำเร็จ" ,
      });
    } else {
      AppSwal({
        icon : "warning" ,
        onThen : () => dispatch(setStatusLogin()) ,
        title : result.errorMessages[0] ,
      });
    };
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      })
    }
    gapi.load("client:auth2", initClient);
  }, []);

  const onSuccess = async (res: any) => {
    AddValueGoogle(res.profileObj);
    const result: Result = await dispatch(googleLoginAccount(valueGoogle)).unwrap();
    if (result.isSuccess === true || !result.errorMessages){
      AppSwal({
        icon : "success" ,
        onThen : () => dispatch(setStatusLogin()) ,
        title : "เข้าสู่ระบบสำเร็จ" ,
      })
    };
  };

  const onFailure = (res: any) => {
    console.log(res);
  };

  const AddValueGoogle = (profileObj: any) => {
    valueGoogle.email = profileObj.email;
    valueGoogle.firstName = profileObj.givenName
    valueGoogle.lastName = profileObj.familyName
    valueGoogle.password = profileObj.googleId
    valueGoogle.imageUrl = profileObj.imageUrl
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
                       <Space>
                       <AppButton type="primary" htmlType="submit" loading={isSubmitting} icon={<LockFilled style={{ fontSize: '110%' }} />} size="large">
                          ตกลง
                        </AppButton>
                        <div>
                          <GoogleLogin
                            clientId={clientId}
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={"single_host_origin"}
                            isSignedIn={true}
                          />
                        </div>
                       </Space>
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