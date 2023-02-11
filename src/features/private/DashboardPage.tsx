

import { Card, Col, Row, Avatar, Space, Dropdown, MenuProps } from 'antd';
import React, { useState } from "react";
import { currencyFormat, Ts } from '../../app/util/util';
import LayoutPrivate from './LayoutPrivate';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import Doughnut3D from '../../app/components/charts/Doughnut3D';
import Column3D from '../../app/components/charts/Column3D';
import useProducts from '../../app/hooks/useProducts';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const chartData = [
    {
        label: "Venezuela",
        value: "290",
        color: "#CB4335"
    },
    {
        label: "Saudi",
        value: "260",
        color: "#633974"
    },
    {
        label: "Canada",
        value: "180",
        color: "#2471A3"
    },
    {
        label: "Iran",
        value: "140",
        color: "#229954"
    },
    {
        label: "Russia",
        value: "115",
        color: "#F1C40F"
    },
    {
        label: "UAE",
        value: "100",
        color: "#E67E22"
    },
    {
        label: "US",
        value: "30",
        color: "#424949"
    },
    {
        label: "China",
        value: "30",
        color: "#1B2631"
    }
];

const DashboardPage = () => {
    const { products } = useProducts();
    const [typeChart, setTypeChart] = useState<string>("doughnut3d");

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <Ts>โดนัท</Ts>,
            onClick: () => setTypeChart("doughnut3d")

        },
        {
            key: '2',
            label: <Ts>คอลัมน์</Ts>,
            onClick: () => setTypeChart("column3d")
        },
        {
            key: '3',
            label: <Ts>พาย</Ts>,
            onClick: () => setTypeChart("pie3d")
        },
        {
            key: '4',
            label: <Ts>บาร์</Ts>,
            onClick: () => setTypeChart("bar3d")
        },
    ];

    const DropdownChart01 = <Dropdown.Button menu={{ items }} >
        <Ts>เลือก</Ts>
    </Dropdown.Button>;

    return (
        <LayoutPrivate>
            <Space direction='vertical' size={"large"} style={{ display: "flex" }} >
                <div>
                    <Row gutter={16} >
                        <Col className="gutter-row center" span={8}>
                            <Card style={{ width: "100%" }}>
                                <Card.Meta
                                    className='text-st'
                                    avatar={<Avatar size={64} src="https://drive.google.com/uc?id=113BOJ69xtQy73KqGJIOIvn6j-ODh-vaX" />}
                                    title="รายได้ทั้งหมด"
                                    description={currencyFormat(100000)}
                                />
                            </Card>
                        </Col>
                        <Col className="gutter-row center" span={8}>
                            <Card style={{ width: "100%" }}>
                                <Card.Meta
                                    className='text-st'
                                    avatar={<Avatar size={64} src="https://drive.google.com/uc?id=1R2a9kAzyOb6XRDCPyKkX3zxKFdKMTnwn" />}
                                    title="ยอดสั่งซื้อทั้งหมด"
                                    description={543}
                                />
                            </Card>
                        </Col>
                        <Col className="gutter-row center" span={8}>
                            <Card style={{ width: "100%" }}>
                                <Card.Meta
                                    className='text-st'
                                    avatar={<Avatar size={64} src="https://drive.google.com/uc?id=15oL9g0yWVo_1Q-mUTOxZTdgLmMyyvXRR" />}
                                    title="สินค้าทั้งหมด"
                                    description={products.length}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row gutter={16}>
                        <Col className="gutter-row center" span={12}>
                            <Card title="สถิติสินค้า" extra={DropdownChart01} className='text-st' bordered={false} style={{ width: "100%" }}>
                                <Doughnut3D data={chartData} ReactFC={ReactFC} typeChart={typeChart} />
                            </Card>
                        </Col>
                        <Col className="gutter-row center" span={12}>
                            <Card title="สถิติการขาย" className='text-st' bordered={false} style={{ width: "100%" }}>
                                <Column3D data={chartData} ReactFC={ReactFC} />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Space>

        </LayoutPrivate>
    )
}

export default DashboardPage;