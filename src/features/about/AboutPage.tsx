import { Fragment } from 'react'
import MainContainer from '../../app/layout/MainContainer'
import TopSection from '../../app/layout/TopSection'
import { Text } from '../../app/util/util'
    
const AboutPage = () => {
    return (
        <Fragment>
            <TopSection text={Text} title="เกี่ยวกับ" backToPageTitle="หน้าแรก" backToPageUrl="/" />
            <MainContainer className="col2-left-layout bounceInUp animated">
                <div className="row">
                    <div className="std">
                        <div className="wrapper_bl" style={{ marginTop: "1px" }}>
                            <div className="form_background">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                                    scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                                    into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                                    release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                                    software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum is simply dummy text of
                                    the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                                    since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
                                    specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                                    containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
                                    PageMaker including versions of Lorem Ipsum</p>
                                <br />
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                                    scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                                    into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                                    release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                                    software like Aldus PageMaker including versions of Lorem IpsumLorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since
                                    the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                                    book. It has survived not only five centuries, but also the leap into electronic typesetting,
                                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
                                    containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
                                    PageMaker including versions of Lorem Ipsum</p>
                                <br />
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                                    scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                                    into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                                    release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                                    software like Aldus PageMaker including versions of Lorem Ipsum</p>
                            </div>
                        </div>
                    </div>
                </div>
            </MainContainer>
        </Fragment>
    )
}

export default AboutPage