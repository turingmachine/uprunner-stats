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
  Tooltip
)

type ChartCardProps = {
  title: string
  labels: string[]
  data: number[]
}

export const ChartCard = ({ title, labels, data }: ChartCardProps) => {
  const options = {
    responsive: true,
  }
  const datasets = {
    labels,
    datasets: [
      {
        data,
      },
    ],
  }

  return (
    <Card>
      <Card.Header>
        <Text h3>{title}</Text>
      </Card.Header>
      <Card.Body>
        <Line data={datasets} options={options} />
      </Card.Body>
    </Card>
  )
}

export default ChartCard
