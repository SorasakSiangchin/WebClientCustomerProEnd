

import { Card, Col, Row, Avatar, Space, Dropdown, DatePicker, Empty } from 'antd';
import { useEffect, useState } from "react";
import { currencyFormat, Ts } from '../../app/util/util';
import LayoutPrivate from './LayoutPrivate';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import Chart1 from '../../app/components/charts/Chart1';
import Chart2 from '../../app/components/charts/Chart2';
import useProducts from '../../app/hooks/useProducts';
import useReport from '../../app/hooks/useReport';
import locale from 'antd/es/date-picker/locale/th_TH';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { reSetProductStatistics, reSetSalesStatistics } from '../../app/store/reportSlice';
import useDropdownChart from '../../app/hooks/useDropdownChart';
import { TypeProductStatisticsRequest, TypeSalesStatisticsRequest } from '../../app/models/Report';
import { setParams } from '../../app/store/productSlice';
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

interface TypeDataChart {
    label: any;
    value: any;
    color: any;
}

interface TypeDataChart {
    label: any;
    value: any;
    color: any;
}

const dataMonth = [
    {
        key: 1,
        label: "ม.ค.",
        value: 0
    },
    {
        key: 2,
        label: "ก.พ.",
        value: 0
    },
    {
        key: 3,
        label: "มี.ค.",
        value: 0
    },
    {
        key: 4,
        label: "เม.ย.",
        value: 0
    },
    {
        key: 5,
        label: "พ.ค.",
        value: 0
    },
    {
        key: 6,
        label: "มิ.ย.",
        value: 0
    },
    {
        key: 7,
        label: "ก.ค.",
        value: 0
    },
    {
        key: 8,
        label: "ส.ค.",
        value: 0
    },
    {
        key: 9,
        label: "ก.ย.",
        value: 0
    },
    {
        key: 10,
        label: "ต.ค.",
        value: 0
    },
    {
        key: 11,
        label: "พ.ย.",
        value: 0
    },
    {
        key: 12,
        label: "ธ.ค.",
        value: 0
    }
];



const DashboardPage = () => {
    const { products } = useProducts();
    const { account } = useAppSelector(state => state.account);
    const [number, setNumber] = useState(5);
    const [year, setYear] = useState(new Date().getFullYear());
    const dispatch = useAppDispatch();
    const { productStatistics, dispatchProduct, salesStatistics, dispatchSales } = useReport();

    useEffect(() => {
        dispatch(setParams({ accountID: account?.id }));
    }, [dispatch, account]);

    const {
        DropdownChartPerspectiveProductStatistics,
        DropdownChartTypeProductStatistics,
        perspective,
        typeChartProductStatistics,
        DropdownChartTypeSalesStatistics,
        typeChartSalesStatistics
    } = useDropdownChart();

    const data = dataMonth.map(data => {
        const percent = salesStatistics?.sales.filter(e => e.month === data.key).reduce((curNumber, item) => {
            return curNumber + item.percent;
        }, 0);;
        return {
            label: data.label,
            value: percent
        }
    });

    const dataChartProductStatistics: TypeDataChart[] = productStatistics?.map(info => ({
        label: info.product.name,
        value: info.numPercen,
    })) as TypeDataChart[];



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
                            {dataChartProductStatistics?.length > 0 ? <Card title="สถิติสินค้า" extra={
                                <Space>
                                    <DatePicker.RangePicker
                                        style={{ width: "25rem" }}
                                        locale={locale}
                                        className="text-st"
                                        onChange={(_, dateString) => {
                                            dispatchProduct({ type: TypeProductStatisticsRequest.DateStart, payload: new Date(dateString[0]).toLocaleDateString("th-TH") });
                                            dispatchProduct({ type: TypeProductStatisticsRequest.DateEnd, payload: new Date(dateString[1]).toLocaleDateString("th-TH") });
                                            dispatch(reSetProductStatistics());
                                        }}
                                    />
                                    {DropdownChartTypeProductStatistics}
                                    {DropdownChartPerspectiveProductStatistics}
                                </Space>
                            } className='text-st' bordered={false} style={{ width: "100%" }}>
                                <Chart1
                                    data={dataChartProductStatistics?.slice(0, number)}
                                    dataAll={dataChartProductStatistics}
                                    ReactFC={ReactFC}
                                    typeChart={typeChartProductStatistics}
                                    perspective={perspective}
                                    setNumber={setNumber}
                                />
                            </Card> :
                                <Card title="สถิติสินค้า" className='text-st' bordered={false} style={{ width: "100%" }}>
                                    <div style={{ height: "40rem" }} className="center">
                                        <Empty className='text-st' description="ไม่มีสถิติสินค้า" />
                                    </div>
                                </Card>
                            }
                        </Col>
                        <Col className="gutter-row center" span={12}>


                            {salesStatistics &&
                                salesStatistics.sales?.length > 0 ? <Card title="สถิติการขาย" extra={
                                    <Space>
                                        <DatePicker
                                            locale={locale}
                                            className='text-st'
                                            placeholder='เลือกปี'
                                            onChange={(_, dateString) => {
                                                dispatchSales({ type: TypeSalesStatisticsRequest.DateYear, payload: new Date(dateString).toLocaleDateString("th-TH") });
                                                if (dateString) setYear(new Date(dateString).getFullYear());
                                                else setYear(new Date().getFullYear())
                                                dispatch(reSetSalesStatistics());
                                            }}
                                            picker="year"
                                        />
                                        {DropdownChartTypeSalesStatistics}
                                    </Space>
                                } className='text-st' bordered={false} style={{ width: "100%" }}>
                                <Chart2
                                    data={data}
                                    typeChart={typeChartSalesStatistics}
                                    ReactFC={ReactFC}
                                    toTalPrice={salesStatistics?.totalPrice}
                                    year={year}
                                />
                            </Card> :
                                <Card title="สถิติสินค้า" className='text-st' bordered={false} style={{ width: "100%" }}>
                                    <div style={{ height: "40rem" }} className="center">
                                        <Empty className='text-st' description="ไม่มีสถิติสินค้า" />
                                    </div>
                                </Card>
                            }

                        </Col>
                    </Row>
                </div>
            </Space>

        </LayoutPrivate>
    )
}

export default DashboardPage;