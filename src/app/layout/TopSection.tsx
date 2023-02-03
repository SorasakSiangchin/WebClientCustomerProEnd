import { EditOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import useFavorite from '../hooks/useFavorite';

interface Props {
    title: string;
    text: string;
    backToPageTitle: string;
    backToPageUrl: string;
    isMode?: boolean;
    textSize?: boolean;
    onEditMode?: any;
    onDoneMode?: any;
    editStatus?: boolean;
    disliked?: any;
    onDisliked?: any;

}

const TopSection = (props: Props) => {
    const { infoFavorite } = useFavorite();

    return (
        <Fragment>
            <TopSectionContainer>
                <div className="container">
                    <div className="inside-header">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="page-heading">
                                        {!props.isMode ? <div className="breadcrumbs">
                                            <div className="row">
                                                <div className="col-xs-12">
                                                    <ul>
                                                        <li className="home"> <Link to={props.backToPageUrl} title="Go to Home Page">{props.backToPageTitle}</Link> <span>&rsaquo; </span> </li>
                                                        <li className="category1601"> <strong>{props.title}</strong> </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div> : ""}
                                        <div className="page-title text-st">
                                            {props.textSize ? <h3 style={{ color: "#2a5b6c", fontSize: "40px" }}>{props.title}</h3> : <h2>{props.title}</h2>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="desc-text">
                        <div className="container">
                            {!props.isMode ? <p>{props.text} </p> :
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <p>{infoFavorite.length} รายการสินค้า</p>
                                    <div className='desc-div'>
                                        {
                                            !props.editStatus ?
                                                <Button onClick={props.onEditMode} icon={<EditOutlined />}>แก้ไข</Button> :
                                                <Space>
                                                    <Button type='primary' danger onClick={() => props.onDisliked(props.disliked)} >เลิกถูกใจ {props.disliked.length}</Button>
                                                    <Button type='primary' onClick={props.onDoneMode} >เสร็จสิน</Button>
                                                </Space>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </TopSectionContainer>
        </Fragment >
    )
};

const TopSectionContainer = ({ children }: any) => (
    <div className="top-section">
        {children}
    </div>
);



export default TopSection