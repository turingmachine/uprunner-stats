import { ReactNode } from 'react'
import { Navbar, Text, Button } from '@nextui-org/react'
import { useRouter } from 'next/router'

export const Navigation = () => {
  return (
    <Navbar variant="sticky">
      <Navbar.Brand>
        <Text b color="inherit" hideIn="xs">
          UpRunner Stats
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" variant="highlight">
        <NavbarLink href="/">Dashboard</NavbarLink>
        <NavbarLink href="/transactions">Transactions</NavbarLink>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <Button auto flat href="#">
            Addresses
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  )
}

type NavbarLinkProps = {
  href: string
  children: ReactNode
}

const NavbarLink = ({ href, children }: NavbarLinkProps) => {
  const router = useRouter()
  return (
    <Navbar.Link href={href} isActive={router.asPath === href}>
      {children}
    </Navbar.Link>
  )
}
