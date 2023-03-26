import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { MyAccountMenu } from './MyAccountMenu';
import { Account } from '../models/Account';
import { MyCartMenu } from './MyCartMenu';
import { Cart } from '../models/Cart';
import Lottie from "lottie-react";
import IconSearch from "../../assets/icons/search.json";
import { Button, Form, Input } from 'antd';
import { setParams } from '../../app/store/productSlice';
import { pathHome } from '../util/util';

export const midLinks = [
    { title: "หน้าแรก", path: pathHome },
    { title: "เกี่ยวกับ", path: "/about" },
    { title: "สินค้า", path: "/product/list" },
];

const Header = () => {

    const { account } = useAppSelector(state => state.account);
    const { cart } = useAppSelector(state => state.cart);

    return (
        <Fragment>
            <div className="container">
                <header>
                    <div id="header">
                        <div className="container">
                            <div className="header-container row">
                                <div className="logo">
                                    <Link to={pathHome} title="index">
                                        <img src={"https://drive.google.com/uc?id=1F6-VLIM03K13GOPYiyuICjDCWQhdT5BR"} width="200px" alt="logo" />
                                    </Link>
                                </div>
                                <div className="fl-nav-menu">
                                    <nav>
                                        <div className="mm-toggle-wrap">
                                            <div className="mm-toggle">
                                                <i className="icon-align-justify"></i>
                                                <span className="mm-label">Menu</span>
                                            </div>
                                        </div>
                                        <div className="nav-inner">
                                            <ul id="nav" className="hidden-xs">
                                                {midLinks.map((data, index) => <li key={index}> <Link to={data.path} className="level-top"><span>{data.title}</span></Link></li>)}
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                                <div className="fl-header-right">
                                    <MyAccountMenu account={account as Account} />
                                    {account ? <MyCartMenu cart={cart as Cart} /> : ""}
                                    <InputSearch />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </Fragment>
    )
}

const InputSearch = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [infoSearch, setInfoSearch] = useState<string>("");
    const [status, setStatus] = useState<boolean>(false);
    const onChange = (event: any) => {
        dispatch(setParams({ searchTerm: event.target.value }));
        setInfoSearch(event.target.value);
        navigate("/product/list");
    };
    return <div className="collapse navbar-collapse">
        <Form className="navbar-form" role="search">
            <div className="input-group">
                <Input type="text" className="form-control text-st" value={infoSearch} placeholder="ค้นหา" onChange={onChange} />
                <span className="input-group-btn">
                    <Button htmlType="submit" className="search-btn" onClick={() => {
                        if (status) {
                            dispatch(setParams({ searchTerm: "" }));
                            setInfoSearch("");
                        }
                        setStatus(!status);
                    }} >
                        <Lottie style={{ width: "100%", padding: "8px" }} animationData={IconSearch} />
                    </Button>
                </span>
            </div>
        </Form>
    </div>
}




export default Header


