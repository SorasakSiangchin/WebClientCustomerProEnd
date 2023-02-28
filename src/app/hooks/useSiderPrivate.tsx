import { ShoppingOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import { FiTruck } from 'react-icons/fi';
import { VscAccount, VscChevronLeft, VscDashboard, VscPackage } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { resetProductParams } from '../../app/store/productSlice';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { resetParams, setParams } from '../store/orderSlice';
const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
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
  const { account } = useAppSelector(state => state.account);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items: MenuItem[] = account?.roleID !== 2 ?
    [
      getItem('แดชบอร์ด', '1', <VscDashboard style={{ fontSize: "20px" }} />,),
      getItem('ผู้ใช้งาน', '3', <VscAccount style={{ fontSize: "20px" }} />),
      getItem('สินค้า', '2', <VscPackage style={{ fontSize: "20px" }} />),
      getItem('การสั่งซื้อ', '4', <ShoppingOutlined style={{ fontSize: "20px" }} />),
      getItem('กลับ', '9', <VscChevronLeft style={{ fontSize: "20px" }} />),
    ] :
    [
      getItem('แดชบอร์ด', '1', <VscDashboard style={{ fontSize: "20px" }} />,),
      getItem('สินค้า', '2', <VscPackage style={{ fontSize: "20px" }} />),
      getItem('การจัดส่ง', '5', <FiTruck style={{ fontSize: "20px" }} />),
      getItem('กลับ', '9', <VscChevronLeft style={{ fontSize: "20px" }} />),
    ];

  interface Page {
    key?: string;
  }

  const onPage = ({ key }: Page) => {
    switch (key) {
      case "1":
        navigate("/private/dashboard");
        break;
      case "2":
        navigate("/private/product");
        break;
      case "3":
        navigate("/private/user");
        break;
      case "4":
        navigate("/private/order");
        break;
      case "5":
        navigate("/private/delivery");
        break;
      case "9":
        navigate("/");
        dispatch(resetProductParams());
        break;
      default:
        break;
    }
  };

  return {
    Sider: (
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Container className='center' style={{ padding: "10px" }}>
          <img src='https://drive.google.com/uc?id=1cCYCdUJx1b3U3mx91nPtdGCZOlU1dhSJ' alt='logo image' width={50} />
        </Container>
        <Menu onClick={(e) => onPage({ key: e.key })} className='text-st' theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
    ),
    onPage: onPage,
  }
}

export default useSiderPrivate