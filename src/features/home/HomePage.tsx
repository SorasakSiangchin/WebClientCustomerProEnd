
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../../app/hooks/useProducts';
import SlideImage from '../../app/layout/SlideImage';
import TopRareGood from './TopRareGood';
const HomePage = () => {
  const [isReload, setIsReload] = useState(false);
  const { productRare } = useProducts();
  useEffect(() => {
    setTimeout(() => {
      setIsReload(true);
    }, 500);
  }, []);



  return (
    <Fragment>
      {!isReload && <div id="preloader"></div>}
      <div className="container">
        <SlideImage />
      </div>
      <div className="content">
        {/*สินค้าหายาก */}
        <TopRareGood productRare={productRare} />
        <section className="best-pro">
          <div className="slider-items-products container">
            <div className="new_title top-border">
              <h2>Best Seller</h2>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy habitant morbi.</p>
            </div>
            <div id="best-seller" className="product-flexslider hidden-buttons">
              <div className="slider-items slider-width-col4 products-grid">
                <div className="item">
                  <div className="item-inner">
                    <div className="item-img">
                      <div className="item-img-info"><Link to="product-detail.html" title="Fresh Organic Mustard Leaf " className="product-image"><img src="products-images/p27.jpg" alt="sample dish" /></Link>
                        <div className="new-label new-top-left">Hot</div>
                        <div className="sale-label sale-top-left">-15%</div>
                      </div>
                      <div className="add_cart">
                        <button className="button btn-cart" type="button"><span>Add to Cart</span></button>
                      </div>
                    </div>
                    <div className="item-info">
                      <div className="info-inner">
                        <div className="item-title"><Link to="product-detail.html" title="Fresh Organic Mustard Leaf">Fresh Organic Mustard Leaf </Link> </div>
                        <div className="rating">
                          <div className="ratings">
                            <div className="rating-box">
                              <div className="rating" style={{ width: "80%" }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="item-content">
                          <div className="item-price">
                            <div className="price-box"><span className="regular-price" ><span className="price">$125.00</span> </span> </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="restuarent"><Link to="#"><i className="fas fa-heart"></i> Wishlist</Link> <Link to="#"><i className="fas fa-signal"></i> Compare</Link></div>
                  </div>
                </div>
                <div className="item">
                  <div className="item-inner">
                    <div className="item-img">
                      <div className="item-img-info"><Link to="product-detail.html" title="Fresh Organic Mustard Leaf " className="product-image"><img src="products-images/p17.jpg" alt="sample dish" /></Link> </div>
                      <div className="add_cart">
                        <button className="button btn-cart" type="button"><span>Add to Cart</span></button>
                      </div>
                    </div>
                    <div className="item-info">
                      <div className="info-inner">
                        <div className="item-title"><Link to="product-detail.html" title="Fresh Organic Mustard Leaf">Fresh Organic Mustard Leaf</Link> </div>
                        <div className="rating">
                          <div className="ratings">
                            <div className="rating-box">
                              <div className="rating" style={{ width: "80%" }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="item-content">
                          <div className="item-price">
                            <div className="price-box"><span className="regular-price" ><span className="price">$125.00</span> </span> </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="restuarent"><Link to="#"><i className="fas fa-heart"></i> Wishlist</Link> <Link to="#"><i className="fas fa-signal"></i> Compare</Link></div>
                  </div>
                </div>
                <div className="item">
                  <div className="item-inner">
                    <div className="item-img">
                      <div className="item-img-info"><Link to="product-detail.html" title="Fresh Organic Mustard Leaf " className="product-image"><img src="products-images/p7.jpg" alt="sample dish" /></Link> </div>
                      <div className="add_cart">
                        <button className="button btn-cart" type="button"><span>Add to Cart</span></button>
                      </div>
                    </div>
                    <div className="item-info">
                      <div className="info-inner">
                        <div className="item-title"><Link to="product-detail.html" title="Fresh Organic Mustard Leaf">Fresh Organic Mustard Leaf </Link> </div>
                        <div className="rating">
                          <div className="ratings">
                            <div className="rating-box">
                              <div className="rating" style={{ width: "80%" }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="item-content">
                          <div className="item-price">
                            <div className="price-box"><span className="regular-price" ><span className="price">$125.00</span> </span> </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="restuarent"><Link to="#"><i className="fas fa-heart"></i> Wishlist</Link> <Link to="#"><i className="fas fa-signal"></i> Compare</Link></div>
                  </div>
                </div>
                <div className="item">
                  <div className="item-inner">
                    <div className="item-img">
                      <div className="item-img-info"><Link to="product-detail.html" title="Fresh Organic Mustard Leaf " className="product-image"><img src="products-images/p26.jpg" alt="sample dish" /></Link> </div>
                      <div className="add_cart">
                        <button className="button btn-cart" type="button"><span>Add to Cart</span></button>
                      </div>
                    </div>
                    <div className="item-info">
                      <div className="info-inner">
                        <div className="item-title"><Link to="product-detail.html" title="Fresh Organic Mustard Leaf">Fresh Organic Mustard Leaf </Link> </div>
                        <div className="rating">
                          <div className="ratings">
                            <div className="rating-box">
                              <div className="rating" style={{ width: "80%" }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="item-content">
                          <div className="item-price">
                            <div className="price-box"><span className="regular-price" ><span className="price">$125.00</span> </span> </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="restuarent"><Link to="#"><i className="fas fa-heart"></i> Wishlist</Link> <Link to="#"><i className="fas fa-signal"></i> Compare</Link></div>
                  </div>
                </div>
                <div className="item">
                  <div className="item-inner">
                    <div className="item-img">
                      <div className="item-img-info"><Link to="product-detail.html" title="Fresh Organic Mustard Leaf " className="product-image"><img src="products-images/p6.jpg" alt="sample dish" /></Link> </div>
                      <div className="add_cart">
                        <button className="button btn-cart" type="button"><span>Add to Cart</span></button>
                      </div>
                    </div>
                    <div className="item-info">
                      <div className="info-inner">
                        <div className="item-title"><Link to="product-detail.html" title="Fresh Organic Mustard Leaf">Fresh Organic Mustard Leaf </Link> </div>
                        <div className="rating">
                          <div className="ratings">
                            <div className="rating-box">
                              <div className="rating" style={{ width: "80%" }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="item-content">
                          <div className="item-price">
                            <div className="price-box"><span className="regular-price" ><span className="price">$125.00</span> </span> </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="restuarent"><Link to="#"><i className="fas fa-heart"></i> Wishlist</Link> <Link to="#"><i className="fas fa-signal"></i> Compare</Link></div>
                  </div>
                </div>
                <div className="item">
                  <div className="item-inner">
                    <div className="item-img">
                      <div className="item-img-info"><Link to="product-detail.html" title="Fresh Organic Mustard Leaf " className="product-image"><img src="products-images/p5.jpg" alt="sample dish" /></Link> </div>
                      <div className="add_cart">
                        <button className="button btn-cart" type="button"><span>Add to Cart</span></button>
                      </div>
                    </div>
                    <div className="item-info">
                      <div className="info-inner">
                        <div className="item-title"><Link to="product-detail.html" title="Fresh Organic Mustard Leaf">Fresh Organic Mustard Leaf </Link> </div>
                        <div className="rating">
                          <div className="ratings">
                            <div className="rating-box">
                              <div className="rating" style={{ width: "80%" }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="item-content">
                          <div className="item-price">
                            <div className="price-box"><span className="regular-price" ><span className="price">$125.00</span> </span> </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="restuarent"><Link to="#"><i className="fas fa-heart"></i> Wishlist</Link> <Link to="#"><i className="fas fa-signal"></i> Compare</Link></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="mid-section">
          <div className="container">
            <div className="row">
              <h3>Why Organic?</h3>
              <h2>Healthy and fresh Fruits</h2>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="block1"> <strong>fresh from our farm</strong>
                  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy habitant morbi.</p>
                </div>
                <div className="block2"> <strong>100% organic Foods</strong>
                  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy habitant morbi.</p>
                </div>
                <div className="block3"> <strong>Good for health</strong>
                  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy habitant morbi.</p>
                </div>
                <div className="block4"> <strong>Safe From Pesticides</strong>
                  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy habitant morbi.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="best-pro best-pro1">
          <div className="slider-items-products container">
            <div className="new_title">
              <h2>Deal of the week</h2>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy habitant morbi.</p>
              <div className="box-timer">
                <div className="countbox_1 timer-grid"></div>
              </div>
            </div>
            <div id="best-rest" className="product-flexslider hidden-buttons">
              <div className="slider-items slider-width-col4 products-grid">
                <div className="item">
                  <div className="item-inner">
                    <div className="item-img">
                      <div className="item-img-info"><Link to="product-detail.html" title="Fresh Organic Mustard Leaf " className="product-image"><img src="products-images/p16.jpg" alt="sample dish" /></Link>
                        <div className="new-label new-top-left">Hot</div>
                        <div className="sale-label sale-top-left">-15%</div>
                      </div>
                      <div className="add_cart">
                        <button className="button btn-cart" type="button"><span>Add to Cart</span></button>
                      </div>
                    </div>
                    <div className="item-info">
                      <div className="info-inner">
                        <div className="item-title"><Link to="product-detail.html" title="Fresh Organic Mustard Leaf">Fresh Organic Mustard Leaf </Link> </div>
                        <div className="rating">
                          <div className="ratings">
                            <div className="rating-box">
                              <div className="rating" style={{ width: "80%" }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="item-content">
                          <div className="item-price">
                            <div className="price-box"><span className="regular-price" ><span className="price">$125.00</span> </span> </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="restuarent"><Link to="#"><i className="fas fa-heart"></i> Wishlist</Link> <Link to="#"><i className="fas fa-signal"></i> Compare</Link></div>
                  </div>
                </div>
                <div className="item">
                  <div className="item-inner">
                    <div className="item-img">
                      <div className="item-img-info"><Link to="product-detail.html" title="Fresh Organic Mustard Leaf " className="product-image"><img src="products-images/p12.jpg" alt="sample dish" /></Link> </div>
                      <div className="add_cart">
                        <button className="button btn-cart" type="button"><span>Add to Cart</span></button>
                      </div>
                    </div>
                    <div className="item-info">
                      <div className="info-inner">
                        <div className="item-title"><Link to="product-detail.html" title="Fresh Organic Mustard Leaf">Fresh Organic Mustard Leaf</Link> </div>
                        <div className="rating">
                          <div className="ratings">
                            <div className="rating-box">
                              <div className="rating" style={{ width: "80%" }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="item-content">
                          <div className="item-price">
                            <div className="price-box"><span className="regular-price" ><span className="price">$125.00</span> </span> </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="restuarent"><Link to="#"><i className="fas fa-heart"></i> Wishlist</Link> <Link to="#"><i className="fas fa-signal"></i> Compare</Link></div>
                  </div>
                </div>
                <div className="item">
                  <div className="item-inner">
                    <div className="item-img">
                      <div className="item-img-info"><Link to="product-detail.html" title="Fresh Organic Mustard Leaf " className="product-image"><img src="products-images/p21.jpg" alt="sample dish" /></Link> </div>
                      <div className="add_cart">
                        <button className="button btn-cart" type="button"><span>Add to Cart</span></button>
                      </div>
                    </div>
                    <div className="item-info">
                      <div className="info-inner">
                        <div className="item-title"><Link to="product-detail.html" title="Fresh Organic Mustard Leaf">Fresh Organic Mustard Leaf </Link> </div>
                        <div className="rating">
                          <div className="ratings">
                            <div className="rating-box">
                              <div className="rating" style={{ width: "80%" }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="item-content">
                          <div className="item-price">
                            <div className="price-box"><span className="regular-price" ><span className="price">$125.00</span> </span> </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="restuarent"><Link to="#"><i className="fas fa-heart"></i> Wishlist</Link> <Link to="#"><i className="fas fa-signal"></i> Compare</Link></div>
                  </div>
                </div>
                <div className="item">
                  <div className="item-inner">
                    <div className="item-img">
                      <div className="item-img-info"><Link to="product-detail.html" title="Fresh Organic Mustard Leaf " className="product-image"><img src="products-images/p3.jpg" alt="sample dish" /></Link> </div>
                      <div className="add_cart">
                        <button className="button btn-cart" type="button"><span>Add to Cart</span></button>
                      </div>
                    </div>
                    <div className="item-info">
                      <div className="info-inner">
                        <div className="item-title"><Link to="product-detail.html" title="Fresh Organic Mustard Leaf">Fresh Organic Mustard Leaf </Link> </div>
                        <div className="rating">
                          <div className="ratings">
                            <div className="rating-box">
                              <div className="rating" style={{ width: "80%" }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="item-content">
                          <div className="item-price">
                            <div className="price-box"><span className="regular-price" ><span className="price">$125.00</span> </span> </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="restuarent"><Link to="#"><i className="fas fa-heart"></i> Wishlist</Link> <Link to="#"><i className="fas fa-signal"></i> Compare</Link></div>
                  </div>
                </div>
                <div className="item">
                  <div className="item-inner">
                    <div className="item-img">
                      <div className="item-img-info"><Link to="product-detail.html" title="Fresh Organic Mustard Leaf " className="product-image"><img src="products-images/p4.jpg" alt="sample dish" /></Link> </div>
                      <div className="add_cart">
                        <button className="button btn-cart" type="button"><span>Add to Cart</span></button>
                      </div>
                    </div>
                    <div className="item-info">
                      <div className="info-inner">
                        <div className="item-title"><Link to="product-detail.html" title="Fresh Organic Mustard Leaf">Fresh Organic Mustard Leaf </Link> </div>
                        <div className="rating">
                          <div className="ratings">
                            <div className="rating-box">
                              <div className="rating" style={{ width: "80%" }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="item-content">
                          <div className="item-price">
                            <div className="price-box"><span className="regular-price" ><span className="price">$125.00</span> </span> </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="restuarent"><Link to="#"><i className="fas fa-heart"></i> Wishlist</Link> <Link to="#"><i className="fas fa-signal"></i> Compare</Link></div>
                  </div>
                </div>
                <div className="item">
                  <div className="item-inner">
                    <div className="item-img">
                      <div className="item-img-info"><Link to="product-detail.html" title="Fresh Organic Mustard Leaf " className="product-image"><img src="products-images/p5.jpg" alt="sample dish" /></Link> </div>
                      <div className="add_cart">
                        <button className="button btn-cart" type="button"><span>Add to Cart</span></button>
                      </div>
                    </div>
                    <div className="item-info">
                      <div className="info-inner">
                        <div className="item-title"><Link to="product-detail.html" title="Fresh Organic Mustard Leaf">Fresh Organic Mustard Leaf </Link> </div>
                        <div className="rating">
                          <div className="ratings">
                            <div className="rating-box">
                              <div className="rating" style={{ width: "80%" }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="item-content">
                          <div className="item-price">
                            <div className="price-box"><span className="regular-price" ><span className="price">$125.00</span> </span> </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="restuarent"><Link to="#"><i className="fas fa-heart"></i> Wishlist</Link> <Link to="#"><i className="fas fa-signal"></i> Compare</Link></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="hot-section">
          <div className="testimonials-section slider-items-products">
            <div id="testimonials" className="offer-slider parallax parallax-2">
              <div className="slider-items slider-width-col6">
                <div className="item">
                  <div className="avatar"><img src="images/member1.png" alt="Image" /></div>
                  <div className="testimonials">Perfect Themes and the best of all that you have many options to choose! Very fast responding! I highly recommend this theme and these people!</div>
                  <div className="clients_author"> Smith John <span>Happy Customer</span> </div>
                </div>
                <div className="item">
                  <div className="avatar"><img src="images/member2.png" alt="Image" /></div>
                  <div className="testimonials">Code, template and others are very good. The support has served me immediately and solved my problems when I need help. Are to be congratulated.</div>
                  <div className="clients_author"> Karla Anderson <span>Happy Customer</span> </div>
                </div>
                <div className="item">
                  <div className="avatar"><img src="images/member3.png" alt="Image" /></div>
                  <div className="testimonials">Our support and response has been amazing, helping me with several issues I came across and got them solved almost the same day. A pleasure to work with them!</div>
                  <div className="clients_author"> Stephen Smith <span>Happy Customer</span> </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="latest-blog">
          <div className="container">
            <div className="new_title">
              <h2>Latest News</h2>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy habitant morbi.</p>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-4 col-xs-12 col-sm-4 blog-post">
                <div className="blog_inner">
                  <div className="blog-img"> <Link to="blog-detail.html"> <img src="images/blog-img1.jpg" alt="blog image" /> </Link>
                    <div className="mask"> <Link className="info" to="blog-detail.html">Read More</Link> </div>
                  </div>
                  <div className="blog-info">
                    <h3><Link to="blog-detail.html">Powerful and flexible premium Ecommerce themes</Link></h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-xs-12 col-sm-4 blog-post">
                <div className="blog_inner">
                  <div className="blog-img"> <Link to="blog-detail.html"> <img src="images/blog-img2.jpg" alt="blog image" /> </Link>
                    <div className="mask"> <Link className="info" to="blog-detail.html">Read More</Link> </div>
                  </div>
                  <div className="blog-info">
                    <h3><Link to="blog-detail.html">Awesome template with lot's of features on the board!</Link></h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-xs-12 col-sm-4 blog-post">
                <div className="blog_inner">
                  <div className="blog-img"> <Link to="blog-detail.html"> <img src="images/blog-img3.jpg" alt="blog image" /> </Link>
                    <div className="mask"> <Link className="info" to="blog-detail.html">Read More</Link> </div>
                  </div>
                  <div className="blog-info">
                    <h3><Link to="blog-detail.html">Awesome template with lot's of features on the board!</Link></h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  )
}

export default HomePage