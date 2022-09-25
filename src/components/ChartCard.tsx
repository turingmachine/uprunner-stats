import { Card, Text } from '@nextui-org/react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

type ChartCardProps = {
  title: string
  labels: string[]
  data: number[]
}

export const ChartCard = ({ title, labels, data }: ChartCardProps) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }
  const datasets = {
    labels,
    datasets: [
      {
        label: 'CHF',
        data,
      },
    ],
  }

  return (
    <Card>
      <Card.Body>
        <Text h3>{title}</Text>
        <Line data={datasets} options={options} />
      </Card.Body>
    </Card>
  )
}

export default ChartCard
