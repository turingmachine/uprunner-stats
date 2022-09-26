import { Text, Button, Modal, Textarea } from '@nextui-org/react'

type AddressesModalProps = {
  visible: boolean
  closeHandler: () => void
}

export const AddressesModal = ({
  closeHandler,
  visible,
}: AddressesModalProps) => {
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
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto onClick={closeHandler}>
          Load
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
