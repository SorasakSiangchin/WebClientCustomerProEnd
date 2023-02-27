import { Dropdown } from 'antd';
import { useState } from 'react'
import { Ts } from '../util/util';

const useDropdownChart = () => {
    const [typeChartProductStatistics, setTypeChartProductStatistics] = useState<string>("doughnut");
    const [typeChartSalesStatistics, setTypeChartSalesStatistics] = useState<string>("column2d");
    const [perspective, setPerspective] = useState<string>("2d");
    const itemsTypeProductStatistics = [
        {
            key: '1',
            label: <Ts>โดนัท</Ts>,
            onClick: () => setTypeChartProductStatistics("doughnut")

        },
        {
            key: '2',
            label: <Ts>คอลัมน์</Ts>,
            onClick: () => setTypeChartProductStatistics("column")
        },
        {
            key: '3',
            label: <Ts>พาย</Ts>,
            onClick: () => setTypeChartProductStatistics("pie")
        },
        {
            key: '4',
            label: <Ts>บาร์</Ts>,
            onClick: () => setTypeChartProductStatistics("bar")
        },
    ];

    const itemsTypeSalesStatistics = [
        {
            key: '2',
            label: <Ts>คอลัมน์</Ts>,
            onClick: () => setTypeChartSalesStatistics("column2d")
        },
        {
            key: '1',
            label: <Ts>เส้น</Ts>,
            onClick: () => setTypeChartSalesStatistics("line")

        },

    ];

    const itemsPerspectiveProductStatistics = [
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

    const DropdownChartTypeProductStatistics = <Dropdown.Button menu={{ items: itemsTypeProductStatistics }} >
        <Ts>{typeChartProductStatistics}</Ts>
    </Dropdown.Button>;

    const DropdownChartTypeSalesStatistics = <Dropdown.Button menu={{ items: itemsTypeSalesStatistics }} >
        <Ts>{typeChartSalesStatistics}</Ts>
    </Dropdown.Button>;

    const DropdownChartPerspectiveProductStatistics = <Dropdown.Button menu={{ items: itemsPerspectiveProductStatistics }} >
        <Ts>{perspective}</Ts>
    </Dropdown.Button>;
    return {
        DropdownChartTypeProductStatistics,
        DropdownChartPerspectiveProductStatistics,
        typeChartProductStatistics,
        perspective,
        DropdownChartTypeSalesStatistics,
        typeChartSalesStatistics
    }
}

export default useDropdownChart