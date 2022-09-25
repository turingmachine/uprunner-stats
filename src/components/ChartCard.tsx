import { useState, ReactNode } from 'react'
import { Card, Text, Button } from '@nextui-org/react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js'
import 'chartjs-adapter-date-fns'
import { parse, parseISO, format } from 'date-fns'

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip
)

type Scales = 'day' | 'week' | 'month' | 'year'
type ChartCardData = { x: string; y: number }[]
type ChartCardProps = {
  title: string
  data: ChartCardData
}

export const ChartCard = ({ title, data }: ChartCardProps) => {
  const [scale, setScale] = useState<Scales>('month')
  return (
    <Card>
      <Card.Header css={{ flex: 1, justifyContent: 'space-between' }}>
        <Text h3>{title}</Text>
        <Button.Group>
          <ScaleButton scale={'day'} currentScale={scale} setScale={setScale}>
            Days
          </ScaleButton>
          {/*
          <ScaleButton scale={'week'} currentScale={scale} setScale={setScale}>
            Weeks
          </ScaleButton>
          */}
          <ScaleButton scale={'month'} currentScale={scale} setScale={setScale}>
            Months
          </ScaleButton>
          <ScaleButton scale={'year'} currentScale={scale} setScale={setScale}>
            Years
          </ScaleButton>
        </Button.Group>
      </Card.Header>
      <Card.Body>
        <Line
          data={{
            datasets: [{ data: aggregateDataForScale(data, scale) }],
          }}
          options={{
            responsive: true,
            aspectRatio: 4,
            scales: {
              x: {
                stacked: true,
                type: 'time',
                time: {
                  unit: scale,
                  round: scale,
                },
              },
            },
          }}
        />
      </Card.Body>
    </Card>
  )
}

type ScaleButtonProps = {
  scale: Scales
  currentScale: string
  setScale: (scale: Scales) => void
  children: ReactNode
}

const ScaleButton = ({
  scale,
  currentScale,
  setScale,
  children,
}: ScaleButtonProps) => {
  const onClick = () => setScale(scale)
  return (
    <Button flat disabled={scale === currentScale} onClick={onClick}>
      {children}
    </Button>
  )
}

const aggregateDataForScale = (data: ChartCardData, scale: Scales) => {
  const aggregatedData = data.reduce((acc, dataPoint) => {
    const date = format(parseISO(dataPoint.x), getScaleFormat(scale))
    return {
      ...acc,
      [date]: dataPoint.y + (acc[date] ?? 0),
    }
  }, {} as { [key: string]: number })
  return Object.entries(aggregatedData).map((entry: [string, number]) => {
    return {
      x: parse(entry[0], getScaleFormat(scale), new Date()),
      y: entry[1],
    }
  })
}

const getScaleFormat = (scale: Scales) => {
  return { day: 'dd-MM-yyyy', week: 'ww-yyyy', month: 'MM-yyyy', year: 'yyyy' }[
    scale
  ]
}

export default ChartCard
