import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { styled } from "styled-components";
import ApexCharts from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHistorycal {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Loader = styled.div`
  text-align: center;
`;

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorycal[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
                name: "Price",
                data: data?.map(v => v.close) as number[],
            },
          ]}
          options={{
            theme: {
                mode:"dark"
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false
              },
              background: "transparent"
            },
            grid: {
                show:false
            },
            stroke: {
                curve: "smooth",
                width: 4
            },
            yaxis: {
                show:false
            },
            xaxis: {
                labels:{show:false},
                axisTicks: {show:false},
                axisBorder: {show:false},
                type: "datetime",
                categories: data?.map(v => v.time_close)
            },
            fill: {
                type:"gradient", gradient: {gradientToColors: ["#0be881"], stops: [0, 100]}
            },
            colors: ["#0fbcf9"],
            tooltip: {
                y: {
                    formatter: (v) => `$ ${v.toFixed(3)}`
                }
            }
          }}
        ></ApexCharts>
      )}
    </div>
  );
}

export default Chart;
