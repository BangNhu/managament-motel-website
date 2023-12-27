import * as React from 'react';
import { Line } from 'react-chartjs-2';
interface ElectricWaterRecord {
    month_year: string;
    totalWater: number;
    totalElectricity: number;
}
export interface IChartElectricWaterProps {
    chartData: ElectricWaterRecord[];
}

export function ChartElectricWater(props: IChartElectricWaterProps) {
    const [userData, setUserData] = React.useState({
        labels: props.chartData.map((data) => data.month_year),
        datasets: [
            {
                label: 'Số điện sử dụng',
                data: props.chartData.map((data) => data.totalElectricity),
                backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
                borderColor: 'black',
                borderWidth: 2,
            },
            {
                label: 'Số nước sử dụng',
                data: props.chartData.map((data) => data.totalWater),
                backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
                borderColor: 'black',
                borderWidth: 2,
            },
        ],
    });

    return (
        <div style={{ width: 700 }}>
            <Line
                data={{
                    labels: userData.labels,
                    datasets: userData.datasets.map((dataset) => ({
                        data: dataset.data,
                        label: dataset.label,
                    })),
                }}
                options={{
                    scales: {
                        x: {
                            type: 'category',
                        },
                    },
                }}
            />
        </div>
    );
}
