import { HeartOutlined, LoginOutlined, LogoutOutlined, ShopOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, List, Popover } from "antd"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { logout, reSetStatusLogin } from "../../app/store/accountSlice";
import { Account } from "../models/Account";
import { useAppDispatch } from "../store/configureStore";
import Lottie from "lottie-react";
import IconUser from "../../assets/icons/User.json";
import "../../App.css";
import { GoogleLogout } from "react-google-login";
import { clientId } from "../util/util";

interface Prop {
    account: Account;
};

export const MyAccountMenu = ({ account }: Prop) => {
    const dispatch = useAppDispatch();
    const onLogout = (renderProps: any) => {
        dispatch(logout());
        dispatch(reSetStatusLogin());
        renderProps.onClick();
    };
    const showSweet = (renderProps: any, onLogout: any) => Swal.fire({
        title: 'ออกจากระบบหรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: "ยกเลิก",
        confirmButtonText: 'ตกลง'
    }).then((result) => {
        if (result.isConfirmed) onLogout(renderProps);
    });

    const googleLogout = <GoogleLogout
        clientId={clientId}
        render={renderProps => (
            <Link to={"#"} onClick={() => {
                showSweet(renderProps, onLogout);
            }}>ออกจากระบบ</Link>
        )}
    />

    const customer = [
        { title: "บัญชีของฉัน", path: "/account", icon: <UserOutlined />, onClick: () => { } },
        { title: "สิงที่ฉันถูกใจ", path: "/product/favorite", icon: <HeartOutlined />, onClick: () => { } },
        {
            title: googleLogout,
            path: null,
            icon: <LogoutOutlined />,
            onClick: () => {
            }
        }

    ];

    const seller = [
        { title: "บัญชีของฉัน", path: "/account", icon: <UserOutlined />, onClick: () => { } },
        { title: "สิงที่ฉันถูกใจ", path: "/product/favorite", icon: <HeartOutlined />, onClick: () => { } },
        { title: "ร้านของฉัน", path: "/private/dashboard", icon: <ShopOutlined />, onClick: () => { } },
        {
            title: googleLogout, path: null, icon: <LogoutOutlined />, onClick: () => {
            }
        }

    ];
    const dataPrivate = account?.role.name.toLowerCase() !== "seller" && account?.role.name.toLowerCase() !== "admin" ? customer : seller;

    const dataPublic = [
        { title: "เข้าสู่ระบบ", path: "/login", icon: <LoginOutlined />, onClick: () => { } }
    ];

    const content = (
        <List
            dataSource={account ? dataPrivate as any : dataPublic as any}
            renderItem={(item: any) => (
                <List.Item>
                    <Link className="text-st" to={item.path || ""} onClick={item.onClick} >{item.icon}{" "}{item.title}</Link>
                </List.Item>
            )}
        />
    );

    return (
        <div className="fl-links">
            <div className="no-js">
                <Popover content={content}>
                    <Avatar size={51} src={account ? account.imageUrl : null} style={{ backgroundColor: '#F79921' }} icon={<Lottie style={{ width: "100%", padding: "8px" }} animationData={IconUser} />} />
                </Popover>
            </div>
        </div>
    )
}