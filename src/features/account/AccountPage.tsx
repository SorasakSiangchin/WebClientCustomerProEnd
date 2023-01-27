import React, { Fragment, useState, useEffect } from 'react';
import MainContainer from '../../app/layout/MainContainer';
import TopSection from '../../app/layout/TopSection';
import { Text } from '../../app/util/util';
import { EditFilled } from '@ant-design/icons';
import { Avatar, Card, Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import { Link } from 'react-router-dom';
import { VscLocation, VscAccount, VscLock, VscOutput } from "react-icons/vsc";
import { useAppSelector } from '../../app/store/configureStore';
import AccountPersonal from './accountMenu/AccountPersonal';
import AccountAddress from './accountMenu/AccountAddress';

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem => {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('ประวัติ', '1', <VscAccount style={{ fontSize: "18px" }} />),
    getItem('ที่อยู่', '2', <VscLocation style={{ fontSize: "18px" }} />),
    getItem('เปลี่ยนรหัสผ่าน', '3', <VscLock style={{ fontSize: "18px" }} />),
    getItem('การซื้อของฉัน', '4', <VscOutput style={{ fontSize: "18px" }} />),
];

const AccountPage = () => {
    const { Meta } = Card;
    const { account } = useAppSelector(state => state.account);
    const [menuKey, setMenuKey] = useState<string>("1");

    const handleMenu = (data: any) => setMenuKey(data.key);

    const ShowItem = () => {
        switch (menuKey) {
            case "1":
                return <AccountPersonal />
            case "2":
                return <AccountAddress />
            default:
                return <></>;
        };
    };

    return (
        <Fragment>
            <TopSection text={Text} title="บัญชีของฉัน" backToPageTitle="หน้าแรก" backToPageUrl="/" />
            <MainContainer className="col2-layout">
                <div className="row">
                    <ColAccount className="col-right sidebar col-sm-3">
                        <div className="block block-account">
                            <Card>
                                <Meta
                                    avatar={<Avatar src={account?.imageUrl} style={{ width: '50px', height: '50px' }} />}
                                    title={account?.firstName + ' ' + account?.lastName}
                                    description={
                                        <Link to="" onClick={() => setMenuKey("1")} >
                                            <EditFilled />
                                            แก้ไขข้อมูลส่วนตัว
                                        </Link>
                                    }
                                />
                            </Card>
                            <Menu
                                className='text-st'
                                style={{ width: "100%" }}
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                onClick={handleMenu}
                                mode={"inline"}
                                theme={"light"}
                                items={items}
                            />
                        </div>
                    </ColAccount>
                    <ShowItem />
                </div>
            </MainContainer>
        </Fragment>
    )
}

export const ColAccount = ({ children, className }: any) => <div className={`${className} col-xs-12 wow bounceInUp animated animated`}>{children}</div>



export default AccountPage;