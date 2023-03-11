import React, { Fragment, useState, useCallback } from 'react'
import TopSection from '../../app/layout/TopSection';
import ProductCard from './ProductCard';
import CustomSlider from './CustomSlider';
import BlockCart from './BlockCart';
import { useAppDispatch } from '../../app/store/configureStore';
import { resetProductParams, setParams } from '../../app/store/productSlice';
import AppPagination from '../../app/components/AppPagination';
import { Button, Empty, Form, Select, Space } from 'antd';
import { AppstoreOutlined, RedoOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { CategoryProduct } from '../../app/models/Product';
import SideNavCategories from './SideNavCategories';
import useProducts from '../../app/hooks/useProducts';
import { Text } from '../../app/util/util';
import MainContainer from '../../app/layout/MainContainer';
import useCart from '../../app/hooks/useCart';
import { Cart } from '../../app/models/Cart';

// จำนวน product ที่แสดง
const OptionPager = [
  {
    value: '9',
    label: '9',
  },
  {
    value: '18',
    label: '18',
  },
  {
    value: '27',
    label: '27',
  }
];

const ProductList = () => {
  const dispatch = useAppDispatch();

  const { categoryProducts, metaData, products, productsLoaded } = useProducts();
  const { cart, itemCount, subtotal } = useCart();

  const [isViewMode, setIsViewMode] = useState(false);
  const setGridViewMode = () => setIsViewMode(false);
  const setListViewMode = () => setIsViewMode(true);

  const showProducts = React.Children.toArray(products.map((product) => <ProductCard product={product} isViewMode={isViewMode} productsLoaded={productsLoaded} />));

  const reset = () => dispatch(resetProductParams());

  return (
    <Fragment>
      <TopSection text={Text} title="สินค้า" backToPageTitle="หน้าแรก" backToPageUrl="/" />
      <MainContainer className="col2-left-layout bounceInUp animated">
        <div className="row">
          <div className="col-main sidebar col-sm-9 col-sm-push-3 product-grid">
            <div className="pro-coloumn">
              <article>
                <div className="toolbar">
                  <div className="sorter">
                    <Space direction="horizontal">
                      <Button size="middle" onClick={setGridViewMode} icon={<AppstoreOutlined />} type={!isViewMode ? "primary" : "default"}></Button>
                      <Button size="middle" onClick={setListViewMode} icon={<UnorderedListOutlined />} type={isViewMode ? "primary" : "default"}></Button>
                    </Space>
                  </div>
                  <div className="limiter">
                    <Form>
                      <Form.Item
                        label="แสดง"
                      >
                        <Space>
                          <Select
                            size='middle'
                            defaultValue="9"
                            style={{ width: "60px" }}
                            options={OptionPager}
                            onChange={(page) => {
                              var result: number = +page; // แปลงเป็น int
                              dispatch(setParams({ pageSize: result }));
                            }}
                          />
                          <Button icon={<RedoOutlined />} onClick={reset} />
                        </Space>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
                {/* #region product list */}
                <div className="category-products">
                  {showProducts.length > 0 && !isViewMode ? <ul className={"products-grid"}  >
                    {showProducts}
                  </ul> : <ol className={"products-list"}  >
                    {showProducts}
                  </ol>}
                  {showProducts.length <= 0 && <div className={"products-grid"} style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "50px",
                  }}  > <Empty description="ไม่พบสินค้า" /></div>}
                </div>
                {/* #endregion */}
                {showProducts.length > 0 && metaData && (
                  <AppPagination
                    metaData={metaData}
                    onPageChange={(page: number) =>
                      dispatch(setParams({ pageNumber: page }))
                    }
                  />
                )}
              </article>
            </div>
          </div>
          <aside className="col-left sidebar col-sm-3 col-xs-12 col-sm-pull-9 wow bounceInUp animated">
            <SideNavCategories
              categorys={categoryProducts as CategoryProduct[]}
              onCateChange={(cate: string) => dispatch(setParams({ category: cate }))}
              onRangeChange={(start: number, end: number) => dispatch(setParams({ rangePriceStart: start, rangePriceEnd: end }))}
            />
            <CustomSlider />
            <BlockCart cart={cart as Cart} itemCount={itemCount} subtotal={subtotal} />
          </aside>
        </div>
      </MainContainer>
    </Fragment>
  )
}


export default ProductList;


{/* <div className="pages">
<label>Page:</label>
<ul className="pagination">
  <li><a href="#">«</a></li>
  <li className="active"><a href="#">1</a></li>
  <li><a href="#">2</a></li>
  <li><a href="#">3</a></li>
  <li><a href="#">4</a></li>
  <li><a href="#">5</a></li>
  <li><a href="#">»</a></li>
</ul>
</div> */}
// const ItemSlide = ({ url } : any) => ( <SwiperSlide>
//   <div className="item"> <Link to=""><img alt="" src={url} /></Link>
//     <div className="cat-img-title cat-bg cat-box">
//       <div className="small-tag">Season 2020</div>
//       <h2 className="cat-heading">Organic <span>World</span></h2>
//       <p>GET 40% OFF &sdot; Free Delivery </p>
//     </div>
//   </div>
// </SwiperSlide> );

// <div className="category-description std">
// <div className="slider-items-products">
//   <div id="category-desc-slider" className="product-flexslider hidden-buttons">
//     <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
//       {["sss" , 2 ,  3].map((i) => <ItemSlide key={i} url={Category01} />)}
//     </Swiper>
//   </div>
// </div>
// </div>