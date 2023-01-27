import { MailFilled, PhoneFilled } from '@ant-design/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import { midLinks } from './Header'

const Footer = () => {
    return (
        <footer>
            <div className="footer-inner">
                <div className="newsletter-row">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col1">
                                <div className="newsletter-wrap">
                                    <h5>ร้านค้าเกษตรกรรม</h5>
                                    <h4>K A N K A S E T</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-middle container">
                    <div>
                        <div className="row">
                            <div className="col-md-3 col-sm-6">
                                <div className="footer-column">
                                    <h4>เมนูช่วยเหลือ</h4>
                                    <ul className="links">
                                        {midLinks.map((link , index) => <li key={index  }><Link to={link.path} >{link.title}</Link ></li>)}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <div className="footer-column">
                                    <h4>หน่วยงานที่เกี่ยวข้อง</h4>
                                    <ul className="links">
                                        <li><Link to="#" >ระบบตลาดและเครื่องมือทางการตลาด</Link ></li>
                                        <li><Link to="#" >กรมการค้าภายใน</Link ></li>
                                        <li><Link to="#" >ลมาคมตลาดสดไทย</Link ></li>
                                        <li><Link to="#" >สำนักงานกรุงเทพมหานคร</Link ></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <div className="footer-column">
                                    <h4>ข้อมูลเพิ่มเติม</h4>
                                    <ul className="links">
                                        <li><Link to="http://www.eto.ku.ac.th/pdf/training/2554/maketing.pdf">การตลาดสินค้าเกษตร</Link ></li>
                                        <li><Link to="http://www.aecth.org/" >มูลนิธิรักษ์สิ่งแวดล้อมโลก</Link ></li>
                                        <li><Link to="https://alro.go.th/th/coopshop">สินค้าเกษตรและแปรรูป</Link ></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6">
                                <Contact/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-top container">
                <div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-4">
                            <div className="social">
                                <ul>
                                    <li className="fb"><Link to=""></Link ></li>
                                    <li className="tw"><Link to=""></Link ></li>
                                    <li className="googleplus"><Link to=""></Link ></li>
                                    <li className="rss"><Link to=""></Link ></li>
                                    <li className="pintrest"><Link to=""></Link ></li>
                                    <li className="linkedin"><Link to=""></Link ></li>
                                    <li className="youtube"><Link to=""></Link ></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-4 col-xs-12 coppyright">สรศักดิ์ เซี่ยงฉิน 63123250109 ( เพื่อการศึกษา ) </div>
                        <div className="col-xs-12 col-sm-4">
                            <div className="payment-accept"> <img src="images/payment-1.png" alt="" /> <img src="images/payment-2.png" alt="" /> <img src="images/payment-3.png" alt="" /> <img src="images/payment-4.png" alt="" /> </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

const Contact = () => <div className="footer-column">
    <h4>Contact Us</h4>
    <div className="contacts-info">
        <div className="contact-footer"><PhoneFilled style={{ fontSize:"20px" , marginRight:"10px" }}/>0616032203</div>
        <div className="contact-footer"><MailFilled style={{ fontSize:"20px" , marginRight:"10px" }} />XxSorasakxX@gmail.com</div>
    </div>
</div>

export default Footer