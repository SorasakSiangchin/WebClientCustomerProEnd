
import { Breadcrumb, Layout, theme } from 'antd';
import { useCallback } from 'react';
import useSiderPrivate from '../../app/hooks/useSiderPrivate';
import { useNavigate } from "react-router-dom";
import HomePage from '../home/HomePage';

const { Content, Footer } = Layout;

interface Props {
}

const MainPrivate = ({ }: Props) => {
    const { Sider, keyMenu } = useSiderPrivate();
    const navigate = useNavigate();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const ShowPage = useCallback(({ key = "1" }: any) => {
        switch (key) {
            case "1":
                return <>ssss</>;
            case "9":
                navigate("/" , { replace: true });
                return <></>;
            default:
                return <></>;
        }
    }, [keyMenu]);
    
    return (
        <>
            {Sider}
            <Layout className="site-layout">
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    </Breadcrumb>
                    <div style={{ padding: 24, minHeight: "100%", background: colorBgContainer }}>
                        {ShowPage({ key: keyMenu })}
                    </div>
                </Content>
                <Footer className='text-st' style={{ textAlign: 'center' }}>นาย สรศักดิ์ เซี่ยงฉิน 63123250109 (เพื่อการศึกษา) {keyMenu}</Footer>
            </Layout>
        </>
    )
}

export default MainPrivate;