import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { Prisma } from '@prisma/client'
import { UseTRPCMutationResult } from '@trpc/react-query/shared'
import { Button, message, Modal, ModalProps } from 'antd'
import { ComponentProps, ReactNode, useMemo, useState } from 'react'
import { Utility } from '~/core/helpers/utility'
import { Api } from '~/core/trpc'
import { Form } from './Form'

type Status = 'none' | 'fetching' | 'creating' | 'updating'

type MutationResult<DataType> = UseTRPCMutationResult<DataType, any, any, any>

type WhereCondition = any

type Props<DataType> = {
  modelName: Prisma.ModelName
  isToastOnError?: boolean
  onSuccess?: (values: DataType) => void
  onDelete?: () => void
  onError?: (error: Error) => void
  onChange?: (valuesChanged: Partial<DataType>, valuesUpdated: DataType) => void
  onCancel?: () => void
}

export const useFormForModel = <DataType extends { id?: string }>({
  modelName,
  isToastOnError = true,
  onSuccess,
  onDelete,
  onChange,
  onError,
  onCancel,
}: Props<DataType>) => {
  const api = Api.useUtils()

  const [status, setStatus] = useState<Status>('none')

  const [isLoading, setLoading] = useState(false)
  const [isLoadingDelete, setLoadingDelete] = useState(false)

  const [values, setValues] = useState<DataType>()
  const [valuesUpdated, setValuesUpdated] = useState<DataType>()

  const modelNameClean = modelName[0].toLowerCase() + modelName.slice(1)

  const createMutation: MutationResult<DataType> =
    Api[modelNameClean].create.useMutation()

  const deleteMutation: MutationResult<DataType> =
    Api[modelNameClean].delete.useMutation()

  const updateMutation: MutationResult<DataType> =
    Api[modelNameClean].update.useMutation()

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
    setValuesUpdated(null)
    setStatus('none')

    onCancel?.()
  }

  const handleChange = (
    _valuesChanged: Partial<DataType>,
    valuesUpdated: DataType,
  ) => {
    setValuesUpdated(valuesUpdated)
    onChange?.(_valuesChanged, valuesUpdated)
  }

  const handleSubmit = async (valuesUpdated: DataType) => {
    setLoading(true)

    try {
      const mutation = isUpdating
        ? updateMutation.mutateAsync({
            where: { id: values.id },
            data: valuesUpdated,
          })
        : createMutation.mutateAsync({ data: valuesUpdated })

      const result = await mutation

      onSuccess?.(result)
      handleCancel()
    } catch (error) {
      if (isToastOnError) {
        message.error(`Something went wrong`)
        console.error(error)
      }

      onError?.(error)
    }

    setLoading(false)
  }

  const handleDelete = async where => {
    try {
      setLoadingDelete(true)

      await deleteMutation.mutateAsync({ where })

      onDelete?.()
    } catch (error) {
      message.error(`Could not delete ${modelName}`)
      console.error(error)
    }

    setLoadingDelete(false)
  }

  const handleStart = async (options?: {
    values?: Partial<DataType>
    where?: WhereCondition
  }) => {
    const { where, values = {} } = options ?? {}

    if (Utility.isNull(where)) {
      setStatus('creating')
      setValuesUpdated(values as any)
      return
    }

    setStatus('fetching')

    try {
      const valuesFound = await api[modelNameClean].findFirst.fetch({ where })

      if (!valuesFound) {
        throw new Error(`Could not find values`)
      }

      setValues(valuesFound)
      setValuesUpdated(valuesFound)
      setStatus('updating')
    } catch (error) {
      message.error(`Could not find values`)
      console.error(error)
      setStatus('none')
    }
  }

  /* --------------------------------- VIEW -------------------------------- */

  const FormView = useMemo(() => {
    const buttonLabel = isUpdating ? 'Update' : 'Create'

    const FormViewInternal = (props: {
      children: ReactNode
      propsForm?: Partial<ComponentProps<typeof Form>>
      propsModal?: Partial<ModalProps>
    }) => (
      <>
        {isOpen && (
          <Modal
            open={true}
            onCancel={handleCancel}
            footer={false}
            {...props.propsModal}
          >
            <Form
              buttonLabel={buttonLabel}
              {...props.propsForm}
              values={valuesUpdated}
              isLoading={isLoading}
              isFetching={isFetching}
              onSubmit={handleSubmit}
              onChange={handleChange}
            >
              {props.children}
            </Form>
          </Modal>
        )}
      </>
    )

    return FormViewInternal
  }, [isOpen, isFetching, isLoading])

  const CreateButton = useMemo(() => {
    const CreateButtonInternal = ({
      children,
      ...props
    }: {
      valuesDefault?: DataType
      children?: (props: { onClick(): void }) => ReactNode
    }) => {
      if (children) {
        return children({
          onClick: () => handleStart({ values: props.valuesDefault }),
        })
      }

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
    const UpdateButtonInternal = ({
      children,
      ...props
    }: {
      where: WhereCondition
      children?: (props: { onClick(): void }) => ReactNode
    }) => {
      if (children) {
        return children({ onClick: () => handleStart(props) })
      }

      return <Button onClick={() => handleStart(props)}>Update</Button>
    }

    return UpdateButtonInternal
  }, [])

  const DeleteButton = useMemo(() => {
    const DeleteButtonInternal = ({
      children,
      ...props
    }: {
      where: WhereCondition
      children?: (props: { loading: boolean; onClick(): void }) => ReactNode
    }) => {
      if (children) {
        return children({
          loading: isLoadingDelete,
          onClick: () => handleDelete(props.where),
        })
      }

      return (
        <Button
          icon={<CloseOutlined />}
          danger
          loading={isLoadingDelete}
          type="primary"
          title="Delete"
          onClick={() => handleDelete(props.where)}
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
