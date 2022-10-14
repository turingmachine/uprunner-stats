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
import { useState, ReactNode } from 'react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip
)

type Scales = 'hour' | 'day' | 'week' | 'month'
type ChartCardData = { x: string; y: number }[]
type ChartCardProps = {
  title: string
  data: ChartCardData
}

type ScaleDatapoints = {
  [scale in Scales]: number
}
const SCALE_DATAPOINTS: ScaleDatapoints = {
  hour: 24,
  day: 30,
  week: 24,
  month: 24,
}

export const ChartCard = ({ title, data }: ChartCardProps) => {
  const [scale, setScale] = useState<Scales>('day')
  return (
    <Card>
      <Card.Header css={{ flex: 1, justifyContent: 'space-between' }}>
        <Text h3>{title}</Text>
        <Button.Group size="sm" color="secondary">
          <ScaleButton scale={'hour'} currentScale={scale} setScale={setScale}>
            Hour
          </ScaleButton>
          <ScaleButton scale={'day'} currentScale={scale} setScale={setScale}>
            Days
          </ScaleButton>
          <ScaleButton scale={'week'} currentScale={scale} setScale={setScale}>
            Weeks
          </ScaleButton>
          <ScaleButton scale={'month'} currentScale={scale} setScale={setScale}>
            Months
          </ScaleButton>
        </Button.Group>
      </Card.Header>
      <Card.Body
        css={{
          padding: '0 $5 $5 $7',
          flex: 1,
          flexDirection: 'row',
          overflow: 'visible',
        }}
      >
        <Line
          data={{
            datasets: [
              {
                data: aggregateDataForScale(data, scale),
                borderColor: '#7828c8',
                backgroundColor: '#7828c8',
              },
            ],
          }}
          options={{
            layout: {
              autoPadding: false,
            },
            responsive: true,
            aspectRatio: 6,
            elements: {
              line: {
                tension: 0.4,
              },
            },
            scales: {
              x: {
                grid: { display: false },
                stacked: true,
                type: 'time',
                time: {
                  unit: scale,
                  round: scale,
                  displayFormats: {
                    hour: 'HH:mm  ',
                    day: 'dd.MM',
                    week: 'ww',
                    month: 'MMM',
                  },
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
    <Button disabled={scale === currentScale} onClick={onClick}>
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

  return Object.entries(aggregatedData)
    .map((entry: [string, number]) => {
      return {
        x: parse(
          entry[0],
          scale === 'week' ? 'ww-YYYY' : getScaleFormat(scale),
          new Date(),
          {
            weekStartsOn: 1,
            useAdditionalWeekYearTokens: true,
          }
        ),
        y: entry[1],
      }
    })
    .slice(SCALE_DATAPOINTS['month'] * -1)
}

const getScaleFormat = (scale: Scales) => {
  return {
    hour: 'HH-dd-MM-yyyy',
    day: 'dd-MM-yyyy',
    week: 'ww-yyyy',
    month: 'MM-yyyy',
  }[scale]
}

export default ChartCard
