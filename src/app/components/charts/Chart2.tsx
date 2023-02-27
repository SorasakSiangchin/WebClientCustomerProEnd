import { SalesStatistics } from "../../models/Report";

interface Props {
  ReactFC: any;
  data: any;
  typeChart: string;
  toTalPrice: number | undefined;
  year : any;
}
const Chart2 = ({ ReactFC, data, typeChart, toTalPrice , year }: Props) => {
  const chartConfigs = {
    type: typeChart,
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        yAxisMaxValue: "100",
        caption: `ยอดรวมของปีนี้ ${new Intl.NumberFormat().format(toTalPrice as any)}`,
        subCaption: `ปี ${year}`,
        base: "10",
        numberprefix: "%",
        theme: "fusion"
      },
      data: data
    }
  };
  return (
    <ReactFC  {...chartConfigs} />
  )
}

export default Chart2