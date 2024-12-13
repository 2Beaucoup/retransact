import { Button, Flex, Form as FormAntd, Skeleton } from 'antd'
import { ReactNode, useEffect } from 'react'

type Props<DataType> = {
  children: ReactNode
  defaultValues?: DataType
  values?: DataType
  buttonLabel?: ReactNode
  isFetching?: boolean
  isLoading?: boolean
  onSubmit(values: DataType): void
  onChange?(valuesChanged: Partial<DataType>, values: DataType): void
  renderButton?: (props: { loading: boolean; htmlType: 'submit' }) => ReactNode
}

export const Form = <DataType extends Record<string, any>>({
  values,
  defaultValues,
  buttonLabel = 'Save',
  isFetching = false,
  isLoading = false,
  children,
  onSubmit,
  onChange,
  renderButton,
}: Props<DataType>) => {
  const [form] = FormAntd.useForm<DataType>()

  const handleSubmit = async (values: DataType) => {
    onSubmit(values)
  }

  useEffect(() => {
    form.setFieldsValue(values)
  }, [values])

  return (
    <>
      <FormAntd
        initialValues={defaultValues}
        form={form}
        onFinish={handleSubmit}
        onValuesChange={onChange}
        layout="vertical"
        requiredMark={false}
      >
        <Flex vertical gap={8}>
          {isFetching && <Skeleton paragraph={{ rows: 5 }} />}

          {!isFetching && (
            <>
              {children}

              {renderButton &&
                renderButton({ loading: isLoading, htmlType: 'submit' })}

              {!renderButton && (
                <Flex className="w-full" justify="center">
                  <Button
                    className="w-full"
                    htmlType="submit"
                    type="primary"
                    loading={isLoading}
                  >
                    {buttonLabel}
                  </Button>
                </Flex>
              )}
            </>
          )}
        </Flex>
      </FormAntd>
    </>
  )
}
