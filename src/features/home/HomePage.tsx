
import { Fragment } from 'react';
import useProducts from '../../app/hooks/useProducts';
import SlideImage from '../../app/layout/SlideImage';
import TopRareGood from './TopRareGood';
import ProductRecommend from './ProductRecommend';

const HomePage = () => {
  
  const { productRare, productRecommend } = useProducts();
  
  return (
    <Fragment>
      <div className="container">
        <SlideImage />
      </div>
      <div className="content">
        {/* สินค้าหายาก */}
        {productRare ? <TopRareGood productRare={productRare} /> : ""}
        <section className="best-pro">
          <ProductRecommend productRecommend={productRecommend} />
        </section>
      </div>
    </Fragment>
  )
}

export default HomePage