import { Breadcrumb, Layout, theme } from 'antd';
const { Content, Footer } = Layout;
const LayoutPrivate = ({ children }: any) => {
    const {
        token: { colorBgContainer }
    } = theme.useToken();
    return (
        <Layout>
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                </Breadcrumb>
                <div style={{ padding: 24, minHeight: "100%", background: colorBgContainer }}>
                    {children}
                </div>
            </Content>
            <Footer className='text-st' style={{ textAlign: 'center' }}>นาย สรศักดิ์ เซี่ยงฉิน 63123250109 (เพื่อการศึกษา) </Footer>
        </Layout>
    )
}

export default LayoutPrivate