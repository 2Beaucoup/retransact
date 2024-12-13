import {
  Typography,
  Card,
  Button,
  Table,
  Modal,
  Form,
  Select,
  message,
  Popconfirm,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useParams } from '@remix-run/react'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import dayjs from 'dayjs'

export default function TransactionDetailsPage() {
  const { transactionId } = useParams()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  // Fetch transaction data
  const { data: transaction, refetch } = Api.transaction.findFirst.useQuery({
    where: { id: transactionId },
    include: { property: true },
  })

  // Fetch participants
  const { data: participants } = Api.transactionParticipant.findMany.useQuery({
    where: { transactionId },
    include: { user: true },
  })

  // Mutations
  const { mutateAsync: createParticipant } = Api.transactionParticipant.create.useMutation()
  const { mutateAsync: updateParticipant } = Api.transactionParticipant.update.useMutation()
  const { mutateAsync: deleteParticipant } = Api.transactionParticipant.delete.useMutation()

  const handleAddParticipant = async (values: any) => {
    try {
      await createParticipant({
        data: {
          transactionId,
          userId: values.userId,
          role: values.role,
        },
      })
      message.success('Participant added successfully')
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      message.error('Failed to add participant')
    }
  }

  const handleUpdateRole = async (participantId: string, role: string) => {
    try {
      await updateParticipant({
        where: { id: participantId },
        data: { role },
      })
      message.success('Role updated successfully')
      refetch()
    } catch (error) {
      message.error('Failed to update role')
    }
  }

  const handleRemoveParticipant = async (participantId: string) => {
    try {
      await deleteParticipant({
        where: { id: participantId },
      })
      message.success('Participant removed successfully')
      refetch()
    } catch (error) {
      message.error('Failed to remove participant')
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: ['user', 'name'],
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: ['user', 'email'],
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string, record: any) => (
        <Select
          value={role}
          onChange={(value) => handleUpdateRole(record.id, value)}
          style={{ width: 120 }}
        >
          <Select.Option value="agent">Agent</Select.Option>
          <Select.Option value="buyer">Buyer</Select.Option>
          <Select.Option value="seller">Seller</Select.Option>
          <Select.Option value="inspector">Inspector</Select.Option>
          <Select.Option value="appraiser">Appraiser</Select.Option>
        </Select>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Popconfirm
          title="Are you sure you want to remove this participant?"
          onConfirm={() => handleRemoveParticipant(record.id)}
        >
          <Button danger type="link">Remove</Button>
        </Popconfirm>
      ),
    },
  ]

  return (
    <PageLayout>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>Transaction Details</Title>

        {/* Transaction Info */}
        <Card title="Transaction Information" style={{ marginBottom: 24 }}>
          <Text strong>Property Address: </Text>
          <Text>{transaction?.property?.address}</Text>
          <br />
          <Text strong>Status: </Text>
          <Text>{transaction?.status}</Text>
          <br />
          <Text strong>Price: </Text>
          <Text>${transaction?.price}</Text>
          <br />
          <Text strong>Closing Date: </Text>
          <Text>{transaction?.closingDate ? dayjs(transaction.closingDate).format('MMMM D, YYYY') : 'Not set'}</Text>
        </Card>

        {/* Participants Section */}
        <Card
          title="Participants"
          extra={
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              Invite Participant
            </Button>
          }
        >
          <Table
            columns={columns}
            dataSource={participants}
            rowKey="id"
          />
        </Card>

        {/* Invite Modal */}
        <Modal
          title="Invite Participant"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleAddParticipant} layout="vertical">
            <Form.Item
              name="userId"
              label="User"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                placeholder="Select a user"
                optionFilterProp="children"
              >
                {/* Add user options here */}
              </Select>
            </Form.Item>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select a role">
                <Select.Option value="agent">Agent</Select.Option>
                <Select.Option value="buyer">Buyer</Select.Option>
                <Select.Option value="seller">Seller</Select.Option>
                <Select.Option value="inspector">Inspector</Select.Option>
                <Select.Option value="appraiser">Appraiser</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Participant
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
