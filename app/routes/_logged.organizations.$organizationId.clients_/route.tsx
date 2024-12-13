import {
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Card,
  Tag,
  Drawer,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ClientsPage() {
  const { organizationId } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [form] = Form.useForm()

  const { data: clients, refetch } = Api.client.findMany.useQuery({
    where: { organizationId },
    orderBy: { createdAt: 'desc' },
  })

  const { mutateAsync: createClient } = Api.client.create.useMutation()
  const { mutateAsync: updateClient } = Api.client.update.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      if (selectedClient) {
        await updateClient({
          where: { id: selectedClient.id },
          data: {
            ...values,
            preferences: JSON.stringify(values.preferences || {}),
          },
        })
      } else {
        await createClient({
          data: {
            ...values,
            organizationId,
            preferences: JSON.stringify(values.preferences || {}),
          },
        })
      }
      setIsModalOpen(false)
      form.resetFields()
      refetch()
    } catch (error) {
      console.error('Error saving client:', error)
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'First-Time Buyer' ? 'green' : 'blue'}>{type}</Tag>
      ),
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (record: any) => (
        <Space direction="vertical" size="small">
          <Text>
            <i className="las la-envelope"></i> {record.email}
          </Text>
          <Text>
            <i className="las la-phone"></i> {record.phone}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Pre-Approval Status',
      dataIndex: 'preApprovalStatus',
      key: 'preApprovalStatus',
      render: (status: string) => (
        <Tag color={status === 'Approved' ? 'success' : 'warning'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('MMM D, YYYY'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setSelectedClient(record)
              form.setFieldsValue({
                ...record,
                preferences: JSON.parse(record.preferences || '{}'),
              })
              setIsModalOpen(true)
            }}
          >
            <i className="las la-edit"></i>
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <Title level={2}>
            <i className="las la-users"></i> Client Management
          </Title>
          <Button
            type="primary"
            onClick={() => {
              setSelectedClient(null)
              form.resetFields()
              setIsModalOpen(true)
            }}
          >
            <i className="las la-plus"></i> Add New Client
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={clients}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />

        <Modal
          title={selectedClient ? 'Edit Client' : 'Add New Client'}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          width={800}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="email" label="Email">
              <Input type="email" />
            </Form.Item>

            <Form.Item name="phone" label="Phone">
              <Input />
            </Form.Item>

            <Form.Item name="type" label="Client Type">
              <Select>
                <Select.Option value="First-Time Buyer">
                  First-Time Buyer
                </Select.Option>
                <Select.Option value="Investor">Investor</Select.Option>
                <Select.Option value="Seller">Seller</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="preApprovalStatus" label="Pre-Approval Status">
              <Select>
                <Select.Option value="Pending">Pending</Select.Option>
                <Select.Option value="Approved">Approved</Select.Option>
                <Select.Option value="Rejected">Rejected</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name={['preferences', 'notes']} label="Notes">
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {selectedClient ? 'Update' : 'Create'} Client
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
