import React from 'react';

interface Props {
  ReactFC: any;
  data: any;
  typeChart: string;
}

const Doughnut3D = ({ ReactFC, data, typeChart }: Props) => {
  const chartConfigs = {
    type: typeChart,
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        numberPrefix: "$",
        theme: "fusion"
      },
      data
    }
  };
  return (
    <ReactFC  {...chartConfigs} />
  )
}

export default Doughnut3D