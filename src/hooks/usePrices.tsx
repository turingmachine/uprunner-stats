import { useState, useEffect } from 'react'
import { format, parse } from 'date-fns'

type ResponseData = string[][]
export type Prices = { [key: string]: number }

export const usePrices = (): Prices => {
  const [responseData, setResponseDbata] = useState<ResponseData | null>(null)
  useEffect(() => {
    fetch(getPricesUrl())
      .then((response) => response.text())
      .then((data) => setResponseData(parseCsv(data)))
  }, [])

  if (!responseData) {
    return {}
  }

  const prices: [string, number][] = responseData.map((priceLine) => {
    const date = format(
      parse(priceLine[0], 'LLL-dd-yyyy', new Date()),
      'dd-MM-yyyy'
    )
    const price = parseFloat(priceLine[1]) + parseFloat(priceLine[4]) / 2
    return [date, price]
  })

  return Object.fromEntries(prices)
}

const parseCsv = (csv: string) => {
  return csv
    .split('\n')
    .map((price) => price.split(','))
    .slice(1)
}

const getPricesUrl = () => {
  return 'https://raw.githubusercontent.com/turingmachine/UpRunner/main/pocket-network-2022.csv'
}
