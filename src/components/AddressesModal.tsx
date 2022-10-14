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
    setAddresses(textarea.split('\n').filter(Boolean))
    closeHandler()
  }

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      width="425px"
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
          minRows={10}
          maxRows={20}
          value={textarea}
          onChange={handleChange}
          css={{ fontFamily: 'mono' }}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto onClick={handleSubmit}>
          Load
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
