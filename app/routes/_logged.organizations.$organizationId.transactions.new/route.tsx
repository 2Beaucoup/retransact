import { Typography, Form, Input, Select, DatePicker, Button, Card, message } from 'antd'
import { useNavigate, useParams, useSearchParams } from '@remix-run/react'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useEffect } from 'react'

const { Title } = Typography

export default function NewTransactionPage() {
  const navigate = useNavigate()
  const { organizationId } = useParams()
  const [searchParams] = useSearchParams()
  const propertyId = searchParams.get('propertyId')
  const [form] = Form.useForm()

  const { data: property } = Api.property.findFirst.useQuery({
    where: { id: propertyId || '' },
  })

  const { mutateAsync: createTransaction, isLoading } = Api.transaction.create.useMutation()

  useEffect(() => {
    if (!propertyId) {
      message.error('Property ID is required')
      navigate(`/organizations/${organizationId}/properties`)
    }
  }, [propertyId, navigate, organizationId])

  const handleSubmit = async (values: any) => {
    try {
      const transaction = await createTransaction({
        data: {
          organizationId,
          propertyId: propertyId || '',
          type: values.type,
          price: values.price,
          closingDate: values.closingDate.format('YYYY-MM-DD'),
          status: 'pending'
        },
      })
      message.success('Transaction created successfully')
      navigate(`/organizations/${organizationId}/transactions/${transaction.id}`)
    } catch (error) {
      message.error('Failed to create transaction')
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}>
        <Title level={2} style={{ marginBottom: 24 }}>
          <i className="las la-plus" /> New Transaction
        </Title>

        <Card title="Property Details" style={{ marginBottom: 24 }}>
          <p><strong>Address:</strong> {property?.address}</p>
          <p><strong>Price:</strong> ${property?.price}</p>
          <p><strong>Type:</strong> {property?.type}</p>
        </Card>

        <Card title="Transaction Details">
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="type"
              label="Transaction Type"
              rules={[{ required: true, message: 'Please select transaction type' }]}
            >
              <Select>
                <Select.Option value="seller">Representing Seller</Select.Option>
                <Select.Option value="buyer">Helping Buyer</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: 'Please enter price' }]}
            >
              <Input prefix="$" type="number" />
            </Form.Item>

            <Form.Item
              name="closingDate"
              label="Closing Date"
              rules={[{ required: true, message: 'Please select closing date' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading} block>
                Create Transaction
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </PageLayout>
  )
}
