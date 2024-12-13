import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { SocketClient } from '@/plugins/socket/client'
import { useUploadPublic } from '@/plugins/upload/client'
import { useParams } from '@remix-run/react'
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Steps,
  Table,
  Tag,
  Typography,
  Upload,
} from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { InviteParticipantModal } from './components/InviteParticipantModal'
const { Title, Text } = Typography

export default function TransactionDetailsPage() {
  const { transactionId } = useParams()
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false)
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false)
  const [form] = Form.useForm()

  // Socket for real-time updates
  SocketClient.useEvent('transaction-update', payload => {
    refetch()
  })

  // Fetch transaction data
  const { data: transaction, refetch } = Api.transaction.findFirst.useQuery({
    where: { id: transactionId },
    include: {
      property: true,
      transactionParticipants: {
        include: { user: true },
      },
      documents: true,
      fees: true,
    },
  })

  // Mutations
  const { mutateAsync: updateTransaction } =
    Api.transaction.update.useMutation()
  const { mutateAsync: createDocument } = Api.document.create.useMutation()
  const { mutateAsync: createFee } = Api.transactionFee.create.useMutation()
  const { mutateAsync: sendNotification } =
    Api.pwa.sendNotification.useMutation()

  // Transaction milestones
  const milestones = [
    { title: 'Contract', icon: 'las la-file-contract' },
    { title: 'Inspection', icon: 'las la-search' },
    { title: 'Appraisal', icon: 'las la-home' },
    { title: 'Financing', icon: 'las la-dollar-sign' },
    { title: 'Closing', icon: 'las la-check-circle' },
  ]

  const currentStep = milestones.findIndex(
    step => step.title.toLowerCase() === transaction?.status?.toLowerCase(),
  )

  // Handle milestone update
  const handleMilestoneChange = async (status: string) => {
    try {
      await updateTransaction({
        where: { id: transactionId },
        data: { status },
      })

      // Send notification to participants
      const participantIds =
        transaction?.transactionParticipants.map(p => p.user.id) || []
      await sendNotification({
        title: 'Transaction Update',
        message: `Transaction status updated to ${status}`,
        userIds: participantIds,
      })

      message.success('Milestone updated successfully')
      refetch()
    } catch (error) {
      message.error('Failed to update milestone')
    }
  }

  // Handle document upload
  const handleDocumentUpload = async (file: File) => {
    const { mutateAsync: upload } = useUploadPublic()
    try {
      const { url } = await upload({ file })
      await createDocument({
        data: {
          name: file.name,
          url,
          transactionId,
          type: file.type,
        },
      })
      message.success('Document uploaded successfully')
      refetch()
    } catch (error) {
      message.error('Failed to upload document')
    }
  }

  // Handle fee creation
  const handleFeeSubmit = async (values: any) => {
    try {
      await createFee({
        data: {
          transactionId,
          amount: parseFloat(values.amount),
          status: 'PENDING',
          paidBy: values.paidBy,
        },
      })
      message.success('Fee added successfully')
      form.resetFields()
      refetch()
    } catch (error) {
      message.error('Failed to add fee')
    }
  }

  return (
    <PageLayout>
      <div style={{ padding: '24px' }}>
        <Title level={2}>Transaction Details</Title>

        {/* Milestone Tracking */}
        <Card style={{ marginBottom: 24 }}>
          <Steps
            current={currentStep}
            items={milestones.map(step => ({
              title: step.title,
              icon: <i className={step.icon}></i>,
            }))}
            onChange={current =>
              handleMilestoneChange(milestones[current].title)
            }
          />
        </Card>

        <Row gutter={24}>
          {/* Property Info */}
          <Col span={8}>
            <Card title="Property Details" style={{ marginBottom: 24 }}>
              <Text strong>Address: </Text>
              <Text>{transaction?.property?.address}</Text>
              <br />
              <Text strong>Price: </Text>
              <Text>${transaction?.price}</Text>
              <br />
              <Text strong>Closing Date: </Text>
              <Text>
                {dayjs(transaction?.closingDate).format('MMMM D, YYYY')}
              </Text>
            </Card>
          </Col>

          {/* Participants */}
          <Col span={8}>
            <Card
              title="Participants"
              extra={
                <Button onClick={() => setIsInviteModalVisible(true)}>
                  <i className="las la-user-plus"></i> Invite
                </Button>
              }
              style={{ marginBottom: 24 }}
            >
              <Table
                dataSource={transaction?.transactionParticipants}
                columns={[
                  {
                    title: 'Name',
                    dataIndex: ['user', 'name'],
                    key: 'name',
                  },
                  {
                    title: 'Role',
                    dataIndex: 'role',
                    key: 'role',
                    render: (role: string) => <Tag color="blue">{role}</Tag>,
                  },
                ]}
                pagination={false}
              />
            </Card>
          </Col>

          {/* Transaction Fees */}
          <Col span={8}>
            <Card title="Transaction Fees" style={{ marginBottom: 24 }}>
              <Table
                dataSource={transaction?.fees}
                columns={[
                  {
                    title: 'Amount',
                    dataIndex: 'amount',
                    key: 'amount',
                    render: (amount: number) => `$${amount}`,
                  },
                  {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status: string) => (
                      <Tag color={status === 'PAID' ? 'green' : 'orange'}>
                        {status}
                      </Tag>
                    ),
                  },
                ]}
                pagination={false}
              />
              <Button
                type="primary"
                onClick={() => form.submit()}
                style={{ marginTop: 16 }}
              >
                Add Fee
              </Button>
            </Card>
          </Col>
        </Row>

        {/* Documents Section */}
        <Card
          title="Documents"
          extra={
            <Upload
              beforeUpload={file => {
                handleDocumentUpload(file)
                return false
              }}
            >
              <Button icon={<i className="las la-upload"></i>}>
                Upload Document
              </Button>
            </Upload>
          }
        >
          <Table
            dataSource={transaction?.documents}
            columns={[
              {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
              },
              {
                title: 'Actions',
                key: 'actions',
                render: (record: any) => (
                  <Space>
                    <Button type="link" href={record.url} target="_blank">
                      <i className="las la-download"></i> Download
                    </Button>
                  </Space>
                ),
              },
            ]}
          />
        </Card>

        {/* Modals */}
        <InviteParticipantModal
          open={isInviteModalVisible}
          onClose={() => setIsInviteModalVisible(false)}
          onSuccess={() => {
            refetch()
            setIsInviteModalVisible(false)
          }}
        />

        <Modal
          title="Add Transaction Fee"
          open={isTaskModalVisible}
          onCancel={() => setIsTaskModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleFeeSubmit} layout="vertical">
            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true }]}
            >
              <Input prefix="$" type="number" />
            </Form.Item>
            <Form.Item
              name="paidBy"
              label="Paid By"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="buyer">Buyer</Select.Option>
                <Select.Option value="seller">Seller</Select.Option>
                <Select.Option value="split">Split</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Fee
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
