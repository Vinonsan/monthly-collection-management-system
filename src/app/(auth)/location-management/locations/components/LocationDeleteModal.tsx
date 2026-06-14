'use client'

import Button from '@/src/components/Button'
import Modal from '@/src/components/Modal'

interface LocationDeleteModalProps {
  open: boolean
  locationName: string
  onClose: () => void
  onConfirm: () => void
}

const LocationDeleteModal = (props: LocationDeleteModalProps) => {
  const {
    open,
    locationName,
    onClose,
    onConfirm
  } = props

  return (
    <Modal
      open={ open }
      title="Delete Location"
      size="sm"
      onClose={ onClose }
      footer={ (
        <>
          <Button variant="secondary" appearance="outline" onClick={ onClose }>
            Cancel
          </Button>
          <Button variant="danger" onClick={ onConfirm }>
            Delete
          </Button>
        </>
      ) }
    >
      <p className="text-sm text-slate-600">
        Are you sure you want to delete <strong className="font-semibold text-slate-950">{ locationName }</strong>?
      </p>
    </Modal>
  )
}

export default LocationDeleteModal
