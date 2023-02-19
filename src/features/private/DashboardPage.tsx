

import { Card, Col, Row, Avatar, Space, Dropdown, DatePicker } from 'antd';
import { useState } from "react";
import { currencyFormat, Ts } from '../../app/util/util';
import LayoutPrivate from './LayoutPrivate';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import Chart1 from '../../app/components/charts/Chart1';
import Chart2 from '../../app/components/charts/Chart2';
import useProducts from '../../app/hooks/useProducts';
import useReport, { TypeRequest } from '../../app/hooks/useReport';
import locale from 'antd/es/date-picker/locale/th_TH';
import { useAppDispatch } from '../../app/store/configureStore';
import { reSetProductStatistics } from '../../app/store/reportSlice';
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

interface TypeDataChart {
    label: any;
    value: any;
    color: any;
}

const chartData: TypeDataChart[] = [
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
    const dispatch = useAppDispatch();
    const [typeChart, setTypeChart] = useState<string>("doughnut");
    const [perspective, setPerspective] = useState<string>("2d");
    const { productStatistics, dispatchProduct, salesStatistics, stateProduct } = useReport();

    const dataChartProductStatistics: TypeDataChart[] = productStatistics?.map(info => ({
        label: info.product.name,
        value: info.numPercen,
    })) as TypeDataChart[];

    const items01 = [
        {
            key: '1',
            label: <Ts>โดนัท</Ts>,
            onClick: () => setTypeChart("doughnut")

        },
        {
            key: '2',
            label: <Ts>คอลัมน์</Ts>,
            onClick: () => setTypeChart("column")
        },
        {
            key: '3',
            label: <Ts>พาย</Ts>,
            onClick: () => setTypeChart("pie")
        },
        {
            key: '4',
            label: <Ts>บาร์</Ts>,
            onClick: () => setTypeChart("bar")
        },
    ];

    const items02 = [
        {
            key: '1',
            label: <Ts>2D</Ts>,
            onClick: () => setPerspective("2d")

        },
        {
            key: '2',
            label: <Ts>3D</Ts>,
            onClick: () => setPerspective("3d")
        }
    ];

    const DropdownChartTypeProductStatistics = <Dropdown.Button menu={{ items: items01 }} >
        <Ts>{typeChart}</Ts>
    </Dropdown.Button>;

    const DropdownChartPerspectiveProductStatistics = <Dropdown.Button menu={{ items: items02 }} >
        <Ts>{perspective}</Ts>
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
                            <Card title="สถิติสินค้า" extra={
                                <Space>
                                    <DatePicker.RangePicker
                                        style={{ width: "25rem" }}
                                        locale={locale}
                                        className="text-st"
                                        onChange={(_, dateString) => {
                                            dispatchProduct({ type: TypeRequest.DateStart, payload: new Date(dateString[0]).toLocaleDateString("th-TH") });
                                            dispatchProduct({ type: TypeRequest.DateEnd, payload: new Date(dateString[1]).toLocaleDateString("th-TH") });
                                            dispatch(reSetProductStatistics());
                                        }}
                                    />
                                    {DropdownChartTypeProductStatistics}
                                    {DropdownChartPerspectiveProductStatistics}
                                </Space>
                            } className='text-st' bordered={false} style={{ width: "100%" }}>
                                <Chart1
                                    data={dataChartProductStatistics}
                                    ReactFC={ReactFC}
                                    typeChart={typeChart}
                                    perspective={perspective}
                                />
                            </Card>
                        </Col>
                        <Col className="gutter-row center" span={12}>
                            <Card title="สถิติการขาย" extra={
                                <Space>
                                    <DatePicker.RangePicker
                                        style={{ width: "25rem" }}
                                        locale={locale}
                                        className="text-st"
                                        onChange={(_, dateString) => {
                                            dispatchProduct({ type: TypeRequest.DateStart, payload: new Date(dateString[0]).toLocaleDateString("th-TH") });
                                            dispatchProduct({ type: TypeRequest.DateEnd, payload: new Date(dateString[1]).toLocaleDateString("th-TH") });
                                            dispatch(reSetProductStatistics());
                                        }}
                                    />
                                    {DropdownChartTypeProductStatistics}
                                    {DropdownChartPerspectiveProductStatistics}
                                </Space>
                            } className='text-st' bordered={false} style={{ width: "100%" }}>
                                <Chart2 data={chartData} ReactFC={ReactFC} />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Space>

        </LayoutPrivate>
    )
}

export default DashboardPage;