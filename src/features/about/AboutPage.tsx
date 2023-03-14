import { Carousel, Col, Row } from 'antd'
import { Fragment } from 'react'
import MainContainer from '../../app/layout/MainContainer'
import TopSection from '../../app/layout/TopSection'
import { Text } from '../../app/util/util'

const AboutPage = () => {
    const imageUrl = [
        "https://drive.google.com/uc?id=141a950toxJrurHUNLQcKvXU2wGslrENs",
        "https://drive.google.com/uc?id=1zsWAzj7Ke3xThBG_C8jdJgSTJyzqcb3B",
        "https://drive.google.com/uc?id=1_7UmmBcp5qx1TEvQO5crhyW5lqP9PcH8",
        "https://drive.google.com/uc?id=1CgwKGDLMYAYIO3-08_afDS7AQtBzHacq",
        "https://drive.google.com/uc?id=1tXCiH7AwuwMeGrrFZ6dFo6xOSnQMZJIw"
    ];
    return (
        <Fragment>
            <TopSection text={Text} title="เกี่ยวกับ" backToPageTitle="หน้าแรก" backToPageUrl="/" />
            <MainContainer className="col2-left-layout bounceInUp animated">
                <div className="row">
                    <div className="std">
                        <div className="wrapper_bl" style={{ marginTop: "1px" }}>
                            <div className="form_background">
                                <Row gutter={24}>
                                    <Col span={15}>
                                        <h3 className='text-st'>สำนักงานเกษตรจังหวัดกาญจนบุรีจัดงานจำหน่ายของดีและสินค้าเกษตรปลอดภัย จังหวัดกาญจนบุรี</h3>
                                        <br />
                                        <p className='text-st'>
                                            วันนี้ ( 20 กรกฎาคม 2565 ) เวลา 10.30 น. ที่ศูนย์เรียนรู้การบริหารจัดการสินค้าเกษตร ตลาดเกษตรกร จังหวัดกาญจนบุรี สำนักงานเกษตรจังหวัดกาญจนบุรี อำเภอเมือง จังหวัดกาญจนบุรี นายชำนาญ ชื่นตา รองผู้ว่าราชการจังหวัดกาญจนบุรี เป็นประธานเปิดงานจำหน่ายของดีและสินค้าเกษตรปลอดภัย จังหวัดกาญจนบุรี โดยมี นายประสาน ปานคง เกษตรจังหวัดกาญจนบุรี กล่าวรายงานวัตถุประสงค์ของการจัดงานฯ พร้อมด้วย หัวหน้าส่วนราชการ เจ้าหน้าที่ เกษตรกรและประชาชนเข้าร่วมงานฯ
                                        </p>
                                        <br />
                                        <p className='text-st'>
                                            สำนักงานเกษตรจังหวัดกาญจนบุรีจัดงานจำหน่ายของดีและสินค้าเกษตรปลอดภัย จังหวัดกาญจนบุรี เป็นการดำเนินงานภายใต้กิจกรรมเผยแพร่ประชาสัมพันธ์สินค้าเกษตรปลอดภัยของกลุ่มจังหวัดภาคกลางตอนล่าง 1 โครงการพัฒนาศักยภาพสินค้าเกษตรปลอดภัยและเกษตรอินทรีย์ซึ่งเป็นโครงการตามแผนปฏิบัติราชการกลุ่มจังหวัดภาคกลางตอนล่าง 1 ประจำปีงบประมาณ พ.ศ. 2565 มีวัตถุประสงค์เพื่อเพิ่มช่องทางการตลาดและเพิ่มรายได้ให้กับเกษตรกร สถาบันเกษตรกรและวิสาหกิจชุมชน โดยการส่งเสริมการจำหน่ายสินค้าและผลิตภัณฑ์เกษตรปลอดภัยของจังหวัดกาญจนบุรีและส่งเสริมการประชาสัมพันธ์สินค้าเกษตรและอาหารปลอดภัยของจังหวัดกาญจนบุรี ให้เป็นที่รู้จักแพร่หลายมากยิ่งขึ้น การจัดงานจำหน่ายของดีและสินค้าเกษตรปลอดภัย จังหวัดกาญจนบุรี จัดขึ้นระหว่างวันที่ 20 - 22 กรกฎาคม พ.ศ.2565 เวลา 08.00-14.00 น. ที่ศูนย์เรียนรู้การบริหารจัดการสินค้าเกษตร ตลาดเกษตรกร จังหวัดกาญจนบุรี
                                        </p>
                                        <br />
                                        <p className='text-st'>
                                            สำหรับกิจกรรมภายในงานเป็นการจัดจำหน่ายสินค้าเกษตรและอาหารปลอดภัยโดยเกษตรกรนำผลผลิตทางการเกษตรและสินค้าเกษตรแปรรูปมาจำหน่ายภายในงานฯ จำนวน 48 บูธ มีทั้งอาหารสด อาหารแปรรูป พืชผลทางการเกษตร และมีการจัดกิจกรรมส่งเสริมการขายภายในงาน เช่น การจำหน่ายสินค้าราคาพิเศษนาทีทอง การกด Like และ กด Shere เพจสำนักงานเกษตรจังหวัดกาญจนบุรี เพื่อแลกคูปองเงินสดสำหรับซื้อสินค้าภายในงาน เป็นต้น
                                        </p>
                                    </Col>
                                    <Col span={9}>
                                        <Carousel autoplay>
                                            {imageUrl.map((url, index) =>
                                                <div key={index}>
                                                    <img style={{ width : "100%" , height : "49rem" }} src={url} />
                                                </div>
                                            )}
                                        </Carousel>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </MainContainer>
        </Fragment>
    )
}

export default AboutPage