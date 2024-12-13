import {
  Typography,
  Table,
  Button,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
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

export default function TransactionsPage() {
  const { organizationId } = useParams()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [form] = Form.useForm()
  const { user } = useUserContext()

  // Fetch transactions with related data
  const { data: transactions, refetch } = Api.transaction.findMany.useQuery({
    where: { organizationId },
    include: {
      property: true,
      transactionParticipants: {
        include: { user: true },
      },
    },
  })

  // Fetch team members for assignment
  const { data: teamMembers } = Api.user.findMany.useQuery({})

  // Create transaction mutation
  const { mutateAsync: createTransaction } =
    Api.transaction.create.useMutation()

  // Bulk update mutation
  const { mutateAsync: updateMany } = Api.transaction.updateMany.useMutation()

  const handleCreate = async (values: any) => {
    try {
      await createTransaction({
        data: {
          organizationId,
          propertyId: values.propertyId,
          status: 'pending',
          type: values.type,
          price: values.price,
          closingDate: values.closingDate.format('YYYY-MM-DD'),
        },
      })
      message.success('Transaction created successfully')
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      message.error('Failed to create transaction')
    }
  }

  const handleBulkUpdate = async (selectedRows: any[], newStatus: string) => {
    try {
      await updateMany({
        where: { id: { in: selectedRows.map(row => row.id) } },
        data: { status: newStatus },
      })
      message.success('Transactions updated successfully')
      refetch()
    } catch (error) {
      message.error('Failed to update transactions')
    }
  }

  const columns = [
    {
      title: 'Property',
      dataIndex: ['property', 'address'],
      key: 'property',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color={
            status === 'pending'
              ? 'orange'
              : status === 'active'
              ? 'green'
              : status === 'closed'
              ? 'blue'
              : 'default'
          }
        >
          {status?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: string) => `$${price}`,
    },
    {
      title: 'Closing Date',
      dataIndex: 'closingDate',
      key: 'closingDate',
      render: (date: string) => dayjs(date).format('MM/DD/YYYY'),
    },
    {
      title: 'Team Members',
      dataIndex: 'transactionParticipants',
      key: 'team',
      render: (participants: any[]) => (
        <div>
          {participants?.map((p: any) => (
            <Tag key={p.id} color="blue">
              {p.user.name} ({p.role})
            </Tag>
          ))}
        </div>
      ),
    },
  ]

  const filteredTransactions = transactions?.filter(t =>
    selectedStatus === 'all' ? true : t.status === selectedStatus,
  )

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
          <div>
            <Title level={2}>
              <i
                className="las la-exchange-alt"
                style={{ marginRight: '8px' }}
              ></i>
              Transactions
            </Title>
            <Text type="secondary">Manage your real estate transactions</Text>
          </div>
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            <i className="las la-plus"></i> New Transaction
          </Button>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Select
            value={selectedStatus}
            onChange={setSelectedStatus}
            style={{ width: 200 }}
          >
            <Select.Option value="all">All Status</Select.Option>
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="closed">Closed</Select.Option>
          </Select>
        </div>

        <Table
          columns={columns}
          dataSource={filteredTransactions}
          rowKey="id"
          rowSelection={{
            onChange: (_, selectedRows) => {
              // Enable bulk actions
            },
          }}
        />

        <Modal
          title="Create New Transaction"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleCreate} layout="vertical">
            <Form.Item
              name="propertyId"
              label="Property ID"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="type"
              label="Transaction Type"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="sale">Sale</Select.Option>
                <Select.Option value="purchase">Purchase</Select.Option>
                <Select.Option value="rental">Rental</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
              <Input prefix="$" />
            </Form.Item>
            <Form.Item
              name="closingDate"
              label="Closing Date"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Transaction
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
