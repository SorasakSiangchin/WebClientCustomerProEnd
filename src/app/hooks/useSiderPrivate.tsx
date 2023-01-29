import { Layout, Menu, MenuProps } from 'antd';
import React, { useState } from 'react'
import { VscChevronLeft, VscDashboard, VscPackage } from 'react-icons/vsc';
const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode ,
  key: React.Key ,
  icon?: React.ReactNode ,
  children?: MenuItem[] ,
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const useSiderPrivate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [keyMenu, setKeyMenu] = useState<string>("1");
  const items: MenuItem[] = [
    getItem('แดชบอร์ด', '1', <VscDashboard style={{ fontSize: "20px" }} /> , ),
    getItem('สินค้า', '2', <VscPackage style={{ fontSize: "20px" }} />),
    getItem('กลับ', '9', <VscChevronLeft style={{ fontSize: "20px" }} />),
  ];
  return {
    Sider: (
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu onClick={(e) => setKeyMenu(e.key)} className='text-st' theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
      </Sider>
    ),
    keyMenu: keyMenu
  }
}

export default useSiderPrivate