import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { HistoricalChart } from "../../config/api";
import { useParams } from "react-router-dom";
import { cryptoContext } from "../../cryptoContext";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
} from "chart.js";

const Chart = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Legend
  );
  const { id } = useParams();
  const [chartData, setChartData] = useState([]);

  const { symbol, currency } = useContext(cryptoContext);

  const fetchchartData = async () => {
    try {
      let chartDetail = await axios.get(HistoricalChart(id, 1, currency));
      setChartData(chartDetail.data.prices);
    } catch (error) {
      console.log("Error::", error.message);
    }
  };

  useEffect(() => {
    fetchchartData();
  }, [currency]);

  return (
    <div className="h-[300px] mt-[2%] tablet:h-[400px] laptop:h-[550px] laptop:flex-[76%] laptop:mt-[4%]">
      {chartData && (
        <Line
          data={{
            labels: chartData.map((coin) => {
              let date = new Date(coin[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
              return time;
            }),
            datasets: [
              {
                data: chartData.map((coin) => {
                  return coin[1];
                }),
                label: `Current Day Price in ${currency}`,
                borderColor: "#EEBC1D",
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      )}
    </div>
  );
};

export default Chart;
