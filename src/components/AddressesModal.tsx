import { Text, Button, Modal, Textarea, FormElement } from '@nextui-org/react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useAdresses } from '../hooks/useAdresses'

type AddressesModalProps = {
  visible: boolean
  closeHandler: () => void
}

export const AddressesModal = ({
  closeHandler,
  visible,
}: AddressesModalProps) => {
  const { addresses, setAddresses } = useAdresses()
  const [textarea, setTextarea] = useState(addresses.join('\n'))

  const handleChange = (event: ChangeEvent<FormElement>) => {
    setTextarea(event.currentTarget.value)
  }

  const handleSubmit = (event: FormEvent<HTMLButtonElement>) => {
    setAddresses(textarea.split('\n'))
    event.preventDefault()
    closeHandler()
  }

  return (
    <Modal
      closeButton
      aria-labelledby="add-addresses"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Load Addresses
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Textarea
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="one address per line"
          value={textarea}
          onChange={handleChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto onSubmit={handleSubmit}>
          Load
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
