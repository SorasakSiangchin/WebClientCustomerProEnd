import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Product } from '../../app/models/Product';
const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

interface Props {
    productRare: Product[] | null;
}

const TopRareGood = ({ productRare }: Props) => {
    return (
        <Fragment>
            <div className="container">
                <div className="top-cate">
                    <h2>สินค้าหายาก</h2>
                    <p>สั่งจองได้เลย!!</p>
                    <div className="featured-pro container">
                        <div className="row">
                            <div className="slider-items-products">
                                <div id="top-categories" className="product-flexslider hidden-buttons">
                                    <Carousel className='center' responsive={responsive} autoPlay autoPlaySpeed={1000} transitionDuration={500} infinite={true} >
                                        {React.Children.toArray(productRare?.map(product => <SliderItem name={product.name} path={`/product/detail/${product.id}`} urlImage={product.imageUrl} />))}
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

interface Prop {
    path: string;
    urlImage: string;
    name: string;
}

const SliderItem = ({ name, path, urlImage }: Prop) => <div className="item">
    <Link to={path}>
        <div className="pro-img"><img src={urlImage} alt="Fresh Organic Mustard Leaf " />
            <div className="pro-info">{name}</div>
        </div>
    </Link>
</div>

export default TopRareGood