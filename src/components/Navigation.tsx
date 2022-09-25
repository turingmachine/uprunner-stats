import { ReactNode } from 'react'
import { Navbar, Text, Button, Link } from '@nextui-org/react'
import { useRouter } from 'next/router'

export const Navigation = () => {
  return (
    <Navbar>
      <Navbar.Brand>
        <Text b color="inherit" hideIn="xs">
          ACME
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" variant="highlight">
        <NavbarLink href="/">Dashboard</NavbarLink>
        <NavbarLink href="/reports">Reports</NavbarLink>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Link color="inherit" href="#">
          Login
        </Navbar.Link>
        <Navbar.Item>
          <Button auto flat as={Link} href="#">
            Sign Up
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
