import { Card, Checkbox, Empty, message, Pagination } from 'antd';
import React, { Fragment, useState } from 'react';
import useFavorite from '../../app/hooks/useFavorite';
import MainContainer from '../../app/layout/MainContainer';
import TopSection from '../../app/layout/TopSection';
import { currencyFormat, Text } from '../../app/util/util';
import Meta from 'antd/es/card/Meta';
import { Link, useNavigate } from 'react-router-dom';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import usePagination from '../../app/hooks/usePagination';



const ProductFavorite = () => {
    const { infoFavorite, removeFavorite } = useFavorite();
    const { current, handleChange, maxIndex, minIndex, pageSize } = usePagination({ pageSize: 8 });
    const navigate = useNavigate();
    const [editStatus, setEditStatus] = useState<boolean>(false);
    const [disliked, setDisliked] = useState<CheckboxValueType[]>([]); // สินค้าที่จะเลิกถูกใจ

    const AppEmpty = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="ไม่พบผลการค้นหา" />;

    const onDisliked = (id: any) => {
        message.success({
            type: 'success',
            content: 'เลิกถูกใจ',
            duration: 1,
            className: "center"
        }).then(() => { removeFavorite(id) });
    };

    const showProduct = React.Children.toArray(infoFavorite?.map((product, index) => index >= minIndex &&
        index < maxIndex && <li className="item col-lg-3 col-md-3 col-sm-3 col-xs-6">

            <Card
                hoverable
                className='text-st'
                style={{ width: "100%", marginTop: "30px" }}
                cover={<img alt="example" onClick={() => navigate(`/product-detail/${product.id}`)} src={product.imageUrl} width="100%" height="200" />}
                actions={[
                    <Link to="#" onClick={() => onDisliked([product.id])}>เลิกถูกใจ</Link>,
                    <Link to="#">สินค้าที่คล้ายกัน</Link>,
                ]}
            >
                {editStatus && <Checkbox value={product.id} className="text-st" style={{ display: "flex", justifyContent: "end" }}>เลือก</Checkbox>}
                <Meta title={product.name} description={<div className='price'>{currencyFormat(product.price)}</div>} />
            </Card>

        </li>)
    );
    
    const onEditMode = () => setEditStatus(true);
    const onDoneMode = () => {
        setEditStatus(false);
        setDisliked([]);
    };

    return (
        <Fragment>
            <TopSection
                text={Text}
                title="สิ่งที่ฉันถูกใจ"
                backToPageTitle="หน้าแรก"
                backToPageUrl="/"
                isMode={true}
                textSize={true}
                editStatus={editStatus}
                onEditMode={onEditMode}
                onDoneMode={onDoneMode}
                disliked={disliked}
                onDisliked={onDisliked}
            />
            <MainContainer className="col1-layout wow bounceInUp animated animated">
                <div className="row">
                    <div className="std">
                        <div className="wrapper_bl">
                            <div className="form_background">
                                <div className="pro-coloumn">
                                    <Checkbox.Group style={{ width: '100%' }} onChange={(idProduct) => setDisliked(idProduct)}>
                                        <div className="full-background">
                                            {
                                                <ul className={"products-grid"}  >
                                                    {infoFavorite.length > 0 ? showProduct : AppEmpty}
                                                </ul>
                                            }
                                        </div>
                                    </Checkbox.Group>
                                    {infoFavorite.length > 0 && <Pagination
                                        pageSize={pageSize}
                                        current={current}
                                        total={infoFavorite.length}
                                        onChange={handleChange}
                                        className="center"
                                        style={{ marginTop: "30px" }}
                                    />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MainContainer>
        </Fragment>
    )
}

export default ProductFavorite