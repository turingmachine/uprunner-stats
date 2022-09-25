import { ReactNode } from 'react'
import { Spacer } from '@nextui-org/react'
import { Navigation } from './Navigation'

interface LayoutProps {
  children?: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navigation />
      <Spacer y={1} />
      <div style={{ maxWidth: '1352px', margin: '0 auto' }}>{children}</div>
    </>
  )
}
