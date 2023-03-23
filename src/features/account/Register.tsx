import { Badge, Button, Select, Space, Upload } from 'antd';
import { Formik, Form, ErrorMessage } from 'formik';
import { Fragment, useCallback, useState, useEffect } from 'react'
import TopSection from '../../app/layout/TopSection'
import { RegisterValidate } from './AccountValidate';
import { useNavigate } from 'react-router-dom';
import { CloseOutlined, CloudUploadOutlined, SaveFilled, UploadOutlined } from '@ant-design/icons';
import { Row, Container, Col } from 'react-bootstrap';
import { RcFile, UploadProps, UploadFile } from 'antd/es/upload';
import { uniqueNamesGenerator, names } from 'unique-names-generator';
import type { UploadChangeParam } from 'antd/es/upload';
import { CiShuffle } from "react-icons/ci";
import AppTextInput from '../../app/components/AppTextInput';
import { fetchRolesAsync, registerAccount, value } from '../../app/store/accountSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import AppPasswordInput from '../../app/components/AppPasswordInput';
import { Result } from '../../app/models/Interfaces/IResponse';
import { beforeUploadAntd, pathHome, Text } from '../../app/util/util';
import AppSwal from '../../app/components/AppSwal';
import "./Register.css";

const Register = () => {
  const dispatch = useAppDispatch();
  const { roleData } = useAppSelector(state => state.account);
  useEffect(() => {
    if (!roleData) dispatch(fetchRolesAsync());
  }, []);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const submitForm = async (data: any) => {
    const result: Result = await dispatch(registerAccount(data)).unwrap();
    if (result.isSuccess === true || result.statusCode === 200) {
      AppSwal({
        icon: "success",
        onThen: () => navigate("/login"),
        title: "บันทึกข้อมูลสำเร็จ",
      });
    } else {
      AppSwal({
        icon: "warning",
        onThen: () => { },
        title: result.errorMessages[0],
      });
    };
  };

  const RemoveImage = () => setImageUrl("");

  const randomName: string = uniqueNamesGenerator({
    dictionaries: [names]
  });

  const [isName, setIsName] = useState(false);

  return (
    <Fragment>
      <TopSection text={Text} title="สมัครสมาชิก" backToPageTitle="หน้าแรก" backToPageUrl={pathHome} />
      <Formik
        initialValues={value}
        validationSchema={RegisterValidate}
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
          setFieldValue
        }) => {
          const setName = useCallback(() => {
            setFieldValue("firstName", randomName);
            setIsName(!isName);
          }, [isName]);

          const handleChangeImaage: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
            if (info.file.status === 'uploading') {
              setLoading(true);
              return;
            }
            getBase64(info.file.originFileObj as RcFile, (url) => {
              setLoading(false);
              setImageUrl(url);
            });
            setFieldValue("formFiles", info.file.originFileObj);
          };
          return <Form onSubmit={handleSubmit}>
            <div className="main-container col1-layout wow bounceInUp animated animated" style={{ visibility: "visible" }}>
              <div className="main container">
                <div className="row" >
                  <div className="std">
                    <div className="wrapper_bl" style={{ marginTop: "1px" }}>
                      <div className="form_background">
                        <Container>
                          <Col md={8}>
                            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                              <Row>
                                <Col sm={6}>
                                  <AppTextInput
                                    type="text"
                                    size="large"
                                    status={touched.firstName && errors.firstName
                                      ? "error"
                                      : ""}
                                    name="firstName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.firstName}
                                    label={'ชื่อ'}
                                    button={<Button type="link" size='small' shape="circle" onClick={setName} icon={<CiShuffle size="12px" />} />}
                                  />
                                </Col>
                                <Col sm={6}>
                                  <AppTextInput
                                    type="text"
                                    size="large"
                                    status={touched.lastName && errors.lastName
                                      ? "error"
                                      : ""}
                                    name="lastName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lastName}
                                    label={'นามสกุล'} />
                                </Col>
                              </Row>
                              <Row>
                                <Col sm={6}>
                                  <AppTextInput
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    type="text"
                                    size="large"
                                    status={touched.email && errors.email
                                      ? "error"
                                      : ""}
                                    name="email"
                                    label={'ที่อยู่อีเมล'} />
                                </Col>
                                <Col sm={6}>
                                  <AppPasswordInput
                                    type="text"
                                    size="large"
                                    status={touched.password && errors.password
                                      ? "error"
                                      : ""}
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    label={"รหัสผ่าน"}
                                  />

                                </Col>
                              </Row>
                              <Row>
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
                                    label={"หมายเลขโทรศัพท์"}
                                  />
                                </Col>
                                <Col sm={6}>
                                  <label >บทบาท<em className="required">*</em></label>
                                  <Select
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
                                          label: data.name,
                                          disabled: data.name === "admin" ? true : false,
                                        }
                                      })
                                    }
                                  />
                                  <ErrorMessage name="roleID" component="div" className="text-danger" />
                                </Col>
                              </Row>
                            </Space>
                          </Col>
                          <Col>
                            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                              <Upload
                                name="avatar"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={beforeUploadAntd}
                                onChange={handleChangeImaage}
                              >
                                <Button loading={loading} icon={<UploadOutlined />}>
                                  เพิ่มรูปภาพ
                                </Button>
                              </Upload>
                              <Container className='roomfac' >
                                {imageUrl ? <Badge count={<Button
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
                                </Badge> : <CloudUploadOutlined className='img-opacity' style={{ fontSize: "170px" }} />}
                              </Container>
                            </Space>
                          </Col>
                          <Col md={8}>
                            <Row>
                              <Space direction="vertical" size="middle" style={{ display: 'flex' }}> <Col sm={6}>
                                <Button type="primary" htmlType="submit" loading={isSubmitting} icon={<SaveFilled style={{ fontSize: '110%' }} />} className="button" size="large">
                                  บันทึก
                                </Button>
                              </Col>
                              </Space>
                            </Row>
                          </Col>
                        </Container>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        }}
      </Formik>
    </Fragment>
  )
}

export default Register