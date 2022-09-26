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
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ margin: '12px' }}>{children}</div>
      </div>
    </>
  )
}
