export type fetcherRequestInit = {
  body?: any
  params?: any
  timeout?: number
} & Omit<RequestInit, 'body'>

export const fetcher = async (
  url: RequestInfo,
  options?: fetcherRequestInit
) => {
  const queryString = options?.params
    ? '?' + new URLSearchParams(options.params).toString()
    : ''

  const headers = {
    ...(['POST', 'PUT', 'DELETE'].includes(options?.method ?? '') && {
      'Content-Type': 'application/json',
    }),
    ...options?.headers,
  }
  const response = await fetch(url + queryString, {
    ...options,
    headers,
    body: options?.body ? JSON.stringify(options.body) : undefined,
  })

  if (!response.ok) {
    throw new Error(response.status.toString(), await readResponse(response))
  }

  return await readResponse(response)
}

const readResponse = async (response: any) => {
  return typeof response.json === 'function' &&
    response.headers.get('content-type')?.includes('application/json')
    ? response.json()
    : response.text()
}
