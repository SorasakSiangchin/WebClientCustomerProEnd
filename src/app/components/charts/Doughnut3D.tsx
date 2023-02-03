import React from 'react';

interface Props {
  ReactFC: any;
  data: any;
}

const Doughnut3D = ({ ReactFC, data }: Props) => {
  const chartConfigs = {
    type: "doughnut3d",
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