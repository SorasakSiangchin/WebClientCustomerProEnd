import { HeartOutlined, LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, List, Popover } from "antd"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { logout } from "../../features/account/accountSlice";
import { Account } from "../models/Account";
import { useAppDispatch } from "../store/configureStore";
import Lottie from "lottie-react";
import IconUser from "../../assets/icons/User.json";
import "../../App.css";

interface Prop {
    account: Account;
};



export const MyAccountMenu = ({ account }: Prop) => {
    const dispatch = useAppDispatch();
    const dataPrivate = [
        { title: "บัญชีของฉัน", path: "/account", icon: <UserOutlined />, onClick: () => { } },
        { title: "สิงที่ฉันถูกใจ", path: "/product-favorite", icon: <HeartOutlined />, onClick: () => { } },
        {
            title: "ออกจากระบบ", path: null, icon: <LogoutOutlined />, onClick: () => Swal.fire({
                title: 'ออกจากระบบหรือไม่?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: "ยกเลิก",
                confirmButtonText: 'ตกลง'
            }).then((result) => result.isConfirmed && dispatch(logout()))
        }

    ];

    const dataPublic = [
        { title: "เข้าสู่ระบบ", path: "/login", icon: <LoginOutlined />, onClick: () => { } }
    ]


    const content = (
        <List
            dataSource={account ? dataPrivate : dataPublic}
            renderItem={(item) => (
                <List.Item>
                    <Link to={item.path || ""} onClick={item.onClick} >{item.icon}{" "}{item.title}</Link>
                </List.Item>
            )}
        />
    )
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