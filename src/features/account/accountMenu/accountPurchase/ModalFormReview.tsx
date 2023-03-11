import { Alert, Button, Card, Col, Image, Input, List, Modal, Popover, Rate, Row, Space } from 'antd';
import { OrderItem } from '../../../../app/models/Order';
import { beforeUploadAntd, beforeUploadVdoAntd } from '../../../../app/util/util';
import { useEffect, useState } from 'react';
import FreeScrollBar from 'react-free-scrollbar';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { CameraFilled, DeleteFilled, SmileOutlined, VideoCameraFilled } from '@ant-design/icons';
import Upload, { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import { IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../app/store/configureStore';
import { ReviewRequest } from '../../../../app/models/Review';
import { Result } from '../../../../app/models/Interfaces/IResponse';
import AppSwal from '../../../../app/components/AppSwal';
import { createReviewAsync, fetchReviewByProductIdAsync, setParams } from '../../../../app/store/reviewSilce';

interface Props {
    openModal: boolean;
    setOpenModal: Function;
    orderItems: OrderItem[]
}

interface Url {
    id: string;
    url: string;
}

const desc = ['แย่', 'พอใช้', 'ปานกลาง', 'ดี', 'ยอดเยี่ยม'];

const ModalFormReview = ({ openModal, orderItems, setOpenModal }: Props) => {
    const checkHeight = orderItems.length > 2 ? "50rem" : "40rem";
    const { account } = useAppSelector(state => state.account);
    const [onCancels, setOnCancels] = useState<Function[]>([]);
    const dispatch = useAppDispatch();
    return (
        <Modal
            title="ให้คะแนนสินค้า"
            className='text-st'
            centered
            open={openModal}
            onCancel={() => {
                setOpenModal(false);
                onCancels.map(func => func());
            }}
            maskClosable={false}
            width={"75rem"}
            footer={false}
        >
            {
                orderItems?.length > 0 ?
                    <div style={{ height: checkHeight, width: "100%" }}>
                        <FreeScrollBar>
                            <List
                                className="demo-loadmore-list"
                                itemLayout="horizontal"
                                dataSource={orderItems}
                                renderItem={(item: any) => {
                                    const [rate, setRate] = useState<number>(0);
                                    const [information, setInformation] = useState('');

                                    const [imageUrls, setImageUrls] = useState<Url[]>([]);
                                    const [imageDatas, setImageDatas] = useState<any[]>([]);
                                    const [imageLoading, setImageLoading] = useState<boolean>(false);

                                    const [videoUrls, setVideoUrls] = useState<Url | null>(null);
                                    const [videoDatas, setVideoDatas] = useState<any>(null);
                                    const [videoLoading, setVideoLoading] = useState<boolean>(false);

                                    const { check, onLoad } = checkFormReview(item.productID);

                                    const addEmoji = (e: any) => {
                                        let sym = e.unified.split("-");
                                        let codesArray: any[] = [];
                                        sym.forEach((el: any) => codesArray.push("0x" + el));
                                        let emoji = String.fromCodePoint(...codesArray);
                                        setInformation(information + emoji);
                                    };

                                    const getBase64 = (data: RcFile, callback: (url: string) => void, ket: string) => {
                                        const reader = new FileReader();
                                        if (ket === "img") setImageDatas(info => [...info, data as any]);
                                        if (ket === "vdo") setVideoDatas(data);
                                        reader.addEventListener('load', () => callback(reader.result as string));
                                        reader.readAsDataURL(data);
                                    };

                                    const handleChangeImage: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
                                        if (info.file.status === 'uploading') {
                                            setImageLoading(true);
                                            return;
                                        }
                                        getBase64(info.file.originFileObj as RcFile, (url) => {
                                            setImageLoading(false);
                                            setImageUrls(img => [...img, { id: info.file.uid, url: url }]);
                                        }, "img");
                                    };

                                    const handleChangeVideo: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
                                        if (info.file.status === 'uploading') {
                                            setVideoLoading(true);
                                            return;
                                        }
                                        getBase64(info.file.originFileObj as RcFile, (url) => {
                                            setVideoLoading(false);
                                            setVideoUrls({ id: info.file.uid, url: url });
                                        }, "vdo");
                                    };

                                    const removeUrl = (id: string, key: string) => {
                                        switch (key) {
                                            case "img":
                                                setImageDatas(imageDatas.filter((img: RcFile) => img.uid !== id));
                                                setImageUrls(imageUrls.filter((img) => img.id !== id));
                                                break;
                                            default:
                                                setVideoDatas(null);
                                                setVideoUrls(null);
                                                break;
                                        }
                                    };

                                    const onCancel = () => {
                                        setInformation("");
                                        setImageUrls([]);
                                        setImageDatas([]);
                                        setVideoUrls(null);
                                        setVideoDatas(null);
                                        onLoad();
                                        setRate(0);
                                    };

                                    const onConfirm = async () => {
                                        const data: ReviewRequest = {
                                            accountID: account?.id,
                                            imageFiles: imageDatas,
                                            orderItemID: item.id,
                                            information: information,
                                            score: rate,
                                            videoFiles: videoDatas
                                        };
                                        const { isSuccess, statusCode }: Result = await dispatch(createReviewAsync(data)).unwrap();
                                        if (isSuccess && statusCode === 200) AppSwal({
                                            icon: "success",
                                            onThen: () => {
                                                setOpenModal(false);
                                                onCancel();
                                            },
                                            title: "เรียบร้อย!",
                                        });
                                    };

                                    return <List.Item>
                                        <Space
                                            style={{ width: "100%" }}
                                            direction='vertical'
                                        >
                                            <Space style={{
                                                width: "100%",
                                                justifyContent: "space-between"
                                            }}>
                                                <Card.Meta
                                                    className='text-st'
                                                    avatar={<Image
                                                        alt='item-image'
                                                        src={item.imageUrl}
                                                        width={"8rem"}
                                                    />}
                                                    title={item.name}
                                                />
                                                {/* {check.toString()} */}
                                                {
                                                    !check ?
                                                        <span>
                                                            <Rate
                                                                onChange={(e) => {
                                                                    setRate(e);
                                                                    setOnCancels(func => [...func, onCancel]);
                                                                }}
                                                                value={rate}
                                                                tooltips={desc}
                                                                allowClear={false}
                                                            />
                                                            {rate ? <span className="ant-rate-text text-st">{desc[rate - 1]}</span> : ''}
                                                        </span> : <Alert className="text-st" message="ให้คะแนนแล้ว" type="success" showIcon />
                                                }
                                            </Space>
                                            {rate !== 0 ? <Card>
                                                <Space style={{ width: "100%" }} direction='vertical'>
                                                    <Row gutter={24}>
                                                        <Col span={22}>
                                                            <Input.TextArea
                                                                autoSize
                                                                value={information}
                                                                onChange={(e) => setInformation(e.target.value)}
                                                            />
                                                        </Col>
                                                        <Col span={2}>
                                                            <Popover placement="right" content={
                                                                <Picker
                                                                    data={data}
                                                                    onEmojiSelect={addEmoji}
                                                                />} trigger="click"
                                                            >
                                                                <Button icon={<SmileOutlined />} />
                                                            </Popover>
                                                        </Col>
                                                    </Row>
                                                    <Space direction='horizontal'>
                                                        <Upload
                                                            accept="image/*"
                                                            name="avatar"
                                                            className="avatar-uploader"
                                                            showUploadList={false}
                                                            beforeUpload={beforeUploadAntd}
                                                            onChange={handleChangeImage}
                                                        >
                                                            <Button className='text-st' loading={imageLoading} disabled={imageUrls.length > 4} danger size='small' icon={<CameraFilled />}>
                                                                เพิ่มรูปภาพ {imageUrls.length}/5
                                                            </Button>
                                                        </Upload>
                                                        <Upload
                                                            accept="video/*"
                                                            name="avatar"
                                                            className="avatar-uploader"
                                                            showUploadList={false}
                                                            beforeUpload={beforeUploadVdoAntd}
                                                            onChange={handleChangeVideo}
                                                        >
                                                            <Button className='text-st' loading={videoLoading} disabled={!!videoUrls} danger size='small' icon={<VideoCameraFilled />}>
                                                                เพิ่มวิดีโอ {videoUrls ? "1/1" : "0/1"}
                                                            </Button>
                                                        </Upload>
                                                        <Button onClick={() => onConfirm()} className='text-st' danger type='primary' size='small'>
                                                            ยืนยัน
                                                        </Button>
                                                    </Space>
                                                    <Space direction='horizontal'>
                                                        {imageUrls.length > 0 ? imageUrls.map((img, index) =>
                                                            <ImageListItem key={index}>
                                                                <Image width={"8rem"} height={"7rem"} key={index} alt={img.id} src={img.url} />
                                                                <ImageListItemBar
                                                                    actionIcon={
                                                                        <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }}>
                                                                            <Space>
                                                                                <DeleteFilled onClick={() => removeUrl(img.id, "img")} />
                                                                            </Space>
                                                                        </IconButton>
                                                                    }
                                                                />
                                                            </ImageListItem>
                                                        ) : ""}
                                                        {videoUrls ? <ImageListItem >
                                                            <video controls width={"80rem"} height={"80rem"}>
                                                                <source src={videoUrls.url} />
                                                            </video>
                                                            <ImageListItemBar
                                                                actionIcon={
                                                                    <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }}>
                                                                        <Space>
                                                                            <DeleteFilled onClick={() => removeUrl("", "video")} />
                                                                        </Space>
                                                                    </IconButton>
                                                                }
                                                            />
                                                        </ImageListItem> : ""}
                                                    </Space>
                                                </Space>
                                            </Card> : ""}
                                        </Space>
                                    </List.Item>

                                }}
                            />
                        </FreeScrollBar>
                    </div>
                    : ""
            }
        </Modal>
    )
}

const checkFormReview = (productId: any) => {
    const dispatch = useAppDispatch();
    const [check, setCheck] = useState<boolean>(false);

    useEffect(() => {
        dispatch(setParams({ productId }));
        onLoad();
    }, [dispatch]);

    const onLoad = async () => {
        const { result, isSuccess, statusCode }: Result = await dispatch(fetchReviewByProductIdAsync()).unwrap();
        if (isSuccess && statusCode === 200) setCheck(result.reviews.length! > 0 ? true : false);
    };

    return {
        check,
        onLoad
    };
}

export default ModalFormReview