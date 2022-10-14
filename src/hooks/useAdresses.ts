import { createGlobalState } from 'react-hooks-global-state'

const EMPTY_POCKETS_ADRESSES = [
  '700af42a002af6f957d8025e9b80820589d84d36',
  'a907bf088f63f94d5419f059ee078c33f983b8f7',
  'bd5bee756231f202987ea85fb0a314294bed45be',
  '95f5f52580984ef652b530675ae3e66100a272e6',
]

const { useGlobalState } = createGlobalState({
  addresses: EMPTY_POCKETS_ADRESSES,
})

export const useAdresses = () => {
  const [addresses, setAddresses] = useGlobalState('addresses')
  return { addresses, setAddresses }
}
