'use client'

import Button from '@/src/components/Button'
import Modal from '@/src/components/Modal'

interface CollectorDeleteModalProps {
  open: boolean
  collectorName: string
  onClose: () => void
  onConfirm: () => void
}

const CollectorDeleteModal = (props: CollectorDeleteModalProps) => {
  const {
    open,
    collectorName,
    onClose,
    onConfirm
  } = props

  return (
    <Modal
      open={open}
      title="Delete Collector"
      size="sm"
      onClose={onClose}
      footer={(
        <>
          <Button variant="danger" onClick={onConfirm}>
            Delete
          </Button>
        </>
      )}
    >
      <p className="text-sm text-slate-600">
        Are you sure you want to delete{' '}
        <strong className="font-semibold text-slate-950">
          {collectorName}
        </strong>
        ? This action will permanently remove the collector from the system and
        may also affect related records, assignments, and collection history
        linked to this collector.
      </p>
    </Modal>
  )
}

export default CollectorDeleteModal
