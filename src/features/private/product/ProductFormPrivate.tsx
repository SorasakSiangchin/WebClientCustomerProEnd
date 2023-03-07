import { CloseOutlined, CloudUploadOutlined, LoadingOutlined, RollbackOutlined, SaveOutlined } from '@ant-design/icons';
import { ErrorMessage, Formik } from 'formik';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Divider,
  Radio,
  RadioChangeEvent,
  Space,
  UploadProps,
  Upload,
  InputNumber,
  Badge
} from 'antd';
import LayoutPrivate from '../LayoutPrivate';
import { Row as BootstrapRow, Col as BootstrapCol, Container } from 'react-bootstrap';
import { beforeUploadAntd, Ts } from '../../../app/util/util';
import { RcFile } from 'antd/es/upload';
import useProducts from '../../../app/hooks/useProducts';
import { ProductPrivateValidate } from './ProductPrivateValidate';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { createProductAsync, updateProductAsync } from '../../../app/store/productSlice';
import { Result } from '../../../app/models/Interfaces/IResponse';
import AppSwal from '../../../app/components/AppSwal';
const { Option } = Select;

const ProductFormPrivate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const { account } = useAppSelector(state => state.account);
  const { weightUnits, categoryProducts, levelProducts } = useProducts();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const defaultUnit = weightUnits?.find(e => e.id);
  const defaultLevelProduct = levelProducts?.find(e => e.id);

  const values = {
    id: state ? state.key : '',
    name: state ? state.name : '',
    price: state ? state.price : 0,
    stock: state ? state.stock : 0,
    color: state ? state.color : '',
    weight: state ? state.weight : 0,
    description: state ? state.description : '',
    accountID: account?.id,
    weightUnitID: state ? state.weightUnitID : defaultUnit?.id,
    categoryProductID: state ? state.categoryProductID : "",
    levelProductID: state ? state.levelProductID : defaultLevelProduct?.id,
    formFiles: ""
  };

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleSubmitForm = async (value: any) => {
    let result: Result;
    if (!state) result = await dispatch(createProductAsync(value)).unwrap();
    else result = await dispatch(updateProductAsync(value)).unwrap();
    if (result!.isSuccess)
      AppSwal({
        icon: "success",
        onThen: () => navigate(-1),
        title: "บันทึกข้อมูลสำเร็จ",
      })
  };

  return (
    <Formik
      initialValues={values}
      validationSchema={ProductPrivateValidate}
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

        const selectAfter = (
          <Select defaultValue={defaultUnit?.name} onChange={(id) => setFieldValue("weightUnitID", id)} >
            {weightUnits?.map((weightUnit, index) => <Option className="text-st" key={index} value={weightUnit.id}>{weightUnit.name}</Option>)}
          </Select>);

        const RemoveImage = () => {
          setFieldValue("formFiles", "");
          setImageUrl("");
        };

        const onChangeRadio = (e: RadioChangeEvent) => setFieldValue("levelProductID", e.target.value);

        return <LayoutPrivate>
          <Form layout='vertical' onFinish={handleSubmit} >
            <Row  >
              <Col span={8}><h1 className='text-st'>สินค้าใหม่</h1></Col>
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
            <Container>
              <BootstrapRow>
                <BootstrapCol sm={8} >
                  <Row gutter={24}>
                    <Col span={15}>
                      <Form.Item
                        label={<Ts>ชื่อ</Ts>}
                      >
                        <Input
                          type="text"
                          size="middle"
                          className='text-st'
                          status={touched.name && errors.name
                            ? "error"
                            : ""}
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        />
                        <ErrorMessage name="name" component="div" className="text-danger text-st" />
                      </Form.Item >
                    </Col>
                    <Col span={9}>
                      <Form.Item
                        label={<Ts>ราคา</Ts>}
                      >
                        <InputNumber
                          min={100}
                          size="middle"
                          className='text-st'
                          style={{ width: "100%" }}
                          status={touched.price && errors.price
                            ? "error"
                            : ""}
                          name="price"
                          onChange={(data) => setFieldValue("price", data)}
                          onBlur={handleBlur}
                          value={values.price}
                        />
                        <ErrorMessage name="price" component="div" className="text-danger text-st" />
                      </Form.Item >
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col span={8}>
                      <Form.Item
                        label={<Ts>จำนวนสินค้า</Ts>}
                      >
                        <InputNumber
                          min={1}
                          size="middle"
                          className='text-st'
                          style={{ width: "100%" }}
                          status={touched.stock && errors.stock
                            ? "error"
                            : ""}
                          name="stock"
                          onChange={(data) => setFieldValue("stock", data)}
                          onBlur={handleBlur}
                          value={values.stock}
                        />
                        <ErrorMessage name="stock" component="div" className="text-danger text-st" />
                      </Form.Item >
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label={<Ts>น้ำหนัก</Ts>}
                      >
                        <InputNumber
                          addonAfter={selectAfter}
                          min={1}
                          size="middle"
                          className='text-st'
                          style={{ width: "100%" }}
                          status={touched.weight && errors.weight
                            ? "error"
                            : ""}
                          name="weight"
                          onChange={(data) => setFieldValue("weight", data)}
                          onBlur={handleBlur}
                          value={values.weight}
                        />
                        <ErrorMessage name="weight" component="div" className="text-danger text-st" />
                      </Form.Item >
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label={<Ts>ประเภทสินค้า</Ts>}
                      >
                        <Select
                          style={{ width: "100%" }}
                          size="large"
                          onChange={(data) => {
                            setFieldValue("categoryProductID", data);
                          }}
                          value={values.categoryProductID}
                          onBlur={handleBlur}
                          status={touched.categoryProductID && errors.categoryProductID
                            ? "error"
                            : ""}
                          options={
                            categoryProducts?.map(data => {
                              return {
                                value: data.id,
                                label: data.name,
                              }
                            })
                          }
                        />
                        <ErrorMessage name="categoryProductID" component="div" className="text-danger text-st" />
                      </Form.Item >
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col span={11}>
                      <Form.Item
                        label={<Ts>คำอธิบาย</Ts>}
                      >
                        <Input.TextArea
                          allowClear
                          className='text-st'
                          status={touched.description && errors.description
                            ? "error"
                            : ""}
                          name="description"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                        />
                        <ErrorMessage name="description" component="div" className="text-danger text-st" />
                      </Form.Item >
                    </Col>
                    <Col span={3}>
                      <Form.Item
                        label={<Ts>สี</Ts>}
                      >
                        <Input
                          type="color"
                          size="middle"
                          className='text-st'
                          status={touched.color && errors.color
                            ? "error"
                            : ""}
                          name="color"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.color}
                        />
                        <ErrorMessage name="color" component="div" className="text-danger text-st" />
                      </Form.Item >
                    </Col>
                    <Col span={10}>
                      <Form.Item
                        label={<Ts>ระดับสินค้า</Ts>}
                      >
                        <Radio.Group onChange={onChangeRadio} value={values.levelProductID} >
                          {levelProducts?.map((levelProduct, index) => <Radio key={index} value={levelProduct.id} className='text-st'>{levelProduct.level}</Radio>)}
                        </Radio.Group>
                      </Form.Item >
                    </Col>
                  </Row>
                </BootstrapCol>
                <BootstrapCol sm={4}  >
                  <Upload.Dragger height={250} {...props} beforeUpload={beforeUploadAntd} showUploadList={false}>
                    {!imageUrl ?
                      !state ? (<> <p className="ant-upload-drag-icon">
                        {!loading ? <CloudUploadOutlined style={{ fontSize: "60px" }} /> : <LoadingOutlined style={{ fontSize: "60px" }} />}
                      </p>
                        <p className="ant-upload-text text-st">
                          เพิ่มรูปภาพสินค้า
                        </p> </>)
                        : (<Badge count={<Button
                          type="primary"
                          shape="circle"
                          htmlType='button'
                          danger icon={<CloseOutlined />}
                          onClick={RemoveImage}
                          size="small"
                          style={{ marginLeft: "5px" }} />}>
                          <img
                            src={state.imageUrl}
                            className='img-thumbnail'
                            alt='...'
                            style={{ width: '100%', height: "200px" }}
                          />
                        </Badge>) : (<Badge count={<Button
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
                        </Badge>)}
                  </Upload.Dragger>
                  <ErrorMessage name="formFiles" component="div" className="text-danger text-st" />
                </BootstrapCol>
              </BootstrapRow>
            </Container>
          </Form>
        </LayoutPrivate>
      }
      }
    </Formik>
  )
}

export default ProductFormPrivate