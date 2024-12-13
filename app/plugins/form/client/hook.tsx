import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, message, Modal } from 'antd'
import { ReactNode, useMemo, useState } from 'react'
import { Api } from '~/core/trpc'
import { Form } from './Form'

type Status = 'none' | 'fetching' | 'creating' | 'updating'

type Props<DataType> = {
  onChange?: (valuesChanged: Partial<DataType>, values: DataType) => void
  onSubmit: (values: DataType) => Promise<void> | void
  onDelete?: (values: DataType) => Promise<void> | void
}

export const useForm = <DataType extends { id?: string }>({
  onDelete,
  onChange,
  onSubmit,
}: Props<DataType>) => {
  const api = Api.useUtils()

  const [status, setStatus] = useState<Status>('none')

  const [isLoading, setLoading] = useState(false)
  const [isLoadingDelete, setLoadingDelete] = useState(false)
  const [values, setValues] = useState<DataType>()

  const isUpdating = status === 'updating'
  const isFetching = status === 'fetching'
  const isOpen =
    status === 'creating' || status === 'updating' || status === 'fetching'

  /* -------------------------------- HANDLERS -------------------------------- */

  const handleCancel = () => {
    if (status === 'fetching') {
      return
    }

    setValues(null)
    setStatus('none')
  }

  const handleSubmit = async (valuesUpdated: DataType) => {
    setLoading(true)

    try {
      await onSubmit(valuesUpdated)

      handleCancel()
    } catch (error) {
      message.error(`Something went wrong`)
      console.error(error)
    }

    setLoading(false)
  }

  const handleDelete = async (options: { values: DataType }) => {
    try {
      setLoadingDelete(true)

      await onDelete(options.values)
    } catch (error) {
      message.error(`Could not delete item`)
      console.error(error)
    }

    setLoadingDelete(false)
  }

  const handleStart = async (options?: {
    values?: Partial<DataType>
    status?: 'updating' | 'creating'
  }) => {
    setValues(options?.values as DataType)
    setStatus(options?.status ?? 'creating')
  }

  /* --------------------------------- VIEW -------------------------------- */

  const FormView = useMemo(() => {
    const buttonLabel = isUpdating ? 'Update' : 'Create'

    const FormViewInternal = (props: { children: ReactNode }) => (
      <>
        {isOpen && (
          <Modal open={true} footer={false} onCancel={handleCancel}>
            <Form
              {...props}
              values={values}
              buttonLabel={buttonLabel}
              isLoading={isLoading}
              isFetching={isFetching}
              onSubmit={handleSubmit}
              onChange={onChange}
            />
          </Modal>
        )}
      </>
    )

    return FormViewInternal
  }, [isOpen, isFetching, isLoading])

  const CreateButton = useMemo(() => {
    const CreateButtonInternal = (props: {
      valuesDefault?: Partial<DataType>
    }) => {
      return (
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => handleStart({ values: props.valuesDefault })}
        >
          Create
        </Button>
      )
    }

    return CreateButtonInternal
  }, [])

  const UpdateButton = useMemo(() => {
    const UpdateButtonInternal = (props: { values: DataType }) => {
      return (
        <Button onClick={() => handleStart({ ...props, status: 'updating' })}>
          Update
        </Button>
      )
    }
    return UpdateButtonInternal
  }, [])

  const DeleteButton = useMemo(() => {
    const DeleteButtonInternal = (props: { values: DataType }) => {
      return (
        <Button
          icon={<CloseOutlined />}
          danger
          type="primary"
          title="Delete"
          loading={isLoadingDelete}
          onClick={() => handleDelete(props)}
        />
      )
    }

    return DeleteButtonInternal
  }, [])

  return {
    start: handleStart,
    FormView,
    CreateButton,
    UpdateButton,
    DeleteButton,
  }
}
