
import { Card, Col, Descriptions, Divider, Image, Row, Space, Upload, Modal, Button, Tag, Empty } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/configureStore';
import { currencyFormat } from '../../../app/util/util';
import { crateImageProductAsync, deleteImageProductAsync, fetchImageProductsAsync, fetchProductAsync, productSelectors, resetImageProduct } from '../../../app/store/productSlice';
import LayoutPrivate from '../LayoutPrivate';
import React, { useState } from 'react';
import { DeleteFilled, DeleteOutlined, EditOutlined, InfoCircleFilled, RollbackOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd/es/upload';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { beforeUploadAntd } from '../../../app/util/util';
import { IconButton, ImageListItemBar } from '@mui/material';
import { fetchDetailProductByIdProductAsync, reSetDetailProduct, deleteDetailProductAsync } from '../../../app/store/detailProductSlice';
import ModalFormDetailProduct from './ModalFormDetailProduct';
import AppSwalConfirm from '../../../app/components/AppSwalConfirm';

interface IValue {
  id: string;
  formFiles: any,
  productID: any
}

const ProductDetailPrivatePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { productId } = useParams<{ productId: any }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [urlModal, setUrlModal] = useState<string>("");
  const product = useAppSelector(state => productSelectors.selectById(state, productId));
  const { imageProducts, imageProductLoaded } = useAppSelector(state => state.product);
  const { detailProduct, detailProductLoaded } = useAppSelector(state => state.detailProduct);

  useEffect(() => {
    if (!product) dispatch(fetchProductAsync(productId));
  }, [productId, dispatch, product]);

  useEffect(() => {
    if (!imageProductLoaded) dispatch(fetchImageProductsAsync(productId));
    return () => {
      if (imageProducts) dispatch(resetImageProduct());
    };
  }, [imageProductLoaded, dispatch]);

  useEffect(() => {
    dispatch(fetchDetailProductByIdProductAsync(productId));
    return () => {
      dispatch(reSetDetailProduct());
    }
  }, [detailProductLoaded, dispatch]);

  const infoProduct = [
    { title: 'ชื่อ', info: product?.name },
    { title: 'ราคา', info: <Tag className='text-st' color={"green"} key={product?.id}>{currencyFormat(product?.price)}</Tag> },
    { title: 'คลัง', info: product?.stock },
    { title: 'สี', info: <Card style={{ height: "30px", backgroundColor: product?.color }} /> },
    { title: 'น้ำหนัก', info: `${product?.weight} ${product?.weightUnit.name}` },
    { title: 'ประเภทสินค้า', info: product?.categoryProduct.name },
    { title: 'คำอธิบาย', info: product?.description },
  ];

  const infoDetailProduct = [
    { title: 'ชื่อพันธุ์', info: detailProduct?.speciesName },
    { title: 'วิธีการใส่ปุ๋ย', info: detailProduct?.fertilizeMethod },
    { title: 'วิธีการปลูก', info: detailProduct?.plantingMethod },
    { title: 'ฤดูปลูก', info: detailProduct?.growingSeason },
    { title: 'ฤดูเก็บเกี่ยว', info: detailProduct?.harvestTime },
    { title: 'เพิ่มเติม', info: detailProduct?.description },
  ];

  const value: IValue = {
    id: "",
    formFiles: null,
    productID: product?.id
  };

  const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    value.formFiles = info.file.originFileObj;
    dispatch(crateImageProductAsync(value));
    value.formFiles = null;
    setLoading(false);
  };

  const textButton = !detailProduct ? "เพิ่ม" : "แก้ไข";

  const onDelete = (id: any) => {
    AppSwalConfirm({
      icon: "warning",
      onThen: (result: any) => {
        if (result.isConfirmed) {
          dispatch(deleteDetailProductAsync(id));
          dispatch(reSetDetailProduct());
        }
      },
      title: "ลบรายละเอียดหรือไม่?"
    });
  };

  const extraDetail = <Space>
    {detailProduct && <Button className='text-st' danger type='primary' onClick={() => onDelete(detailProduct?.id)} icon={<DeleteOutlined />}>ลบ</Button>}
    <Button className='text-st' type='primary' onClick={() => setModalOpen(true)} icon={<EditOutlined />}>{textButton}</Button>
  </Space>

  const buttonUpload = <Upload
    style={{ width: "20px" }}
    multiple={true}
    showUploadList={false}
    beforeUpload={beforeUploadAntd}
    onChange={handleChange}
  >
    <Button className='text-st' loading={loading} icon={<UploadOutlined />}>
      เพิ่มรูปภาพ
    </Button>
  </Upload>

  return (
    <LayoutPrivate>
      <ModalFormDetailProduct modalOpen={modalOpen} setModalOpen={setModalOpen} detailProduct={detailProduct} idProduct={productId} />
      <Row  >
        <Col span={8}><h1 className='text-st'>ข้อมูลสินค้า</h1></Col>
        <Col span={8} offset={8} style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
          <Button style={{ backgroundColor: "grey" }} className='text-st' type="primary" icon={<RollbackOutlined />} onClick={() => navigate(-1)}>
            กลับ
          </Button>
        </Col>
      </Row>
      <Divider />
      <Row gutter={24}>
        <Col span={10}>
          <Space direction='vertical'>
            <Card >
              <Image alt="image-product" width={"100%"} height={"400px"} src={product?.imageUrl} />
            </Card>
            <Card
              style={{ width: "100%" }}
            >
              <Descriptions className='text-st' column={4} title="รูปภาพเพิ่มเติม" extra={buttonUpload} />
              {imageProducts?.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="ไม่มีรูปภาพ" className='text-st' />}
              <ImageList cols={4}>
                <>
                  {imageProducts?.map(item => (
                    <ImageListItem key={item.id}>
                      <Image
                        style={{ width: "100%", height: "100px" }}
                        preview={false}
                        src={item.imageUrl}
                        alt={item.productID}
                      />
                      <ImageListItemBar
                        actionIcon={
                          <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }}>
                            <Space>
                              <InfoCircleFilled onClick={() => {
                                setOpenModal(true);
                                setUrlModal(item.imageUrl);
                              }} />
                              <DeleteFilled onClick={() => dispatch(deleteImageProductAsync(item.id))} />
                            </Space>
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  ))}
                </>
              </ImageList>
            </Card>
          </Space>
        </Col>
        <Modal open={openModal} footer={null} onCancel={() => {
          setOpenModal(false);
          setUrlModal("");
        }}>
          <img alt="example" style={{ width: '100%' }} src={urlModal} />
        </Modal>
        <Col span={14}>
          <Space direction='vertical'>
            <Card
              style={{ width: "100%" }}
            >
              <Descriptions title={<h4 style={{ textDecoration: "underline" }} >ข้อมูล</h4>} className='text-st'>
                {React.Children.toArray(infoProduct.map(({ info, title }) => <Descriptions.Item labelStyle={{ fontWeight: "bold" }} label={title}>{info}</Descriptions.Item>))}
              </Descriptions>
            </Card>
            <Card
              style={{ width: "100%" }}
            >
              <Descriptions column={2} title="รายละเอียดเพิ่มเติม" className='text-st' extra={extraDetail}>
                {detailProduct && React.Children.toArray(infoDetailProduct.map(({ info, title }) => <Descriptions.Item labelStyle={{ fontWeight: "bold" }} label={title}>{info}</Descriptions.Item>))}
              </Descriptions>
              {!detailProduct && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="ไม่มีข้อมูล" className='text-st' />}
            </Card>
          </Space>
        </Col>
      </Row>
    </LayoutPrivate>
  )
}
export default ProductDetailPrivatePage;