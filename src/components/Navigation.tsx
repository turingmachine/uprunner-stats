import { ReactNode, useState } from 'react'
import { Navbar, Text, Button } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { AddressesModal } from './AddressesModal'

export const Navigation = () => {
  const [addressesModalVisible, setAddressesModalVisible] = useState(false)
  const addressesModalOpenHandler = () => {
    setAddressesModalVisible(true)
  }
  const addressesModalCloseHandler = () => {
    setAddressesModalVisible(false)
  }
  return (
    <>
      <AddressesModal
        visible={addressesModalVisible}
        closeHandler={addressesModalCloseHandler}
      />
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
            <Button
              color="gradient"
              shadow
              auto
              onClick={addressesModalOpenHandler}
            >
              Addresses
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </>
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
