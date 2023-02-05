import React , { Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import MainContainer from '../../app/layout/MainContainer';
import TopSection from '../../app/layout/TopSection';
import { Text } from '../../app/util/util';

const ProductsSimilar = () => {
   const { state } = useLocation();
  return (
    <Fragment>
         <TopSection
                text={Text}
                title="สินค้าที่คล้ายกัน"
                backToPageTitle="หน้าแรก"
                backToPageUrl="/"
            />
            <MainContainer className="col1-layout wow bounceInUp animated animated">
                <div className="row">
                    <div className="std">
                        <div className="wrapper_bl">
                            <div className="form_background">
                                <div className="pro-coloumn">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MainContainer>
    </Fragment>
  )
}

export default ProductsSimilar