import {
  Typography,
  Card,
  Steps,
  Button,
  Progress,
  List,
  Form,
  Input,
  DatePicker,
  Modal,
  message,
} from 'antd'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function TransactionDetailsPage() {
  const { transactionId } = useParams()
  const navigate = useNavigate()
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false)
  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false)
  const [form] = Form.useForm()

  // Fetch transaction data with related entities
  const { data: transaction, refetch } = Api.transaction.findFirst.useQuery({
    where: { id: transactionId },
    include: {
      property: true,
      documents: true,
      transactionParticipants: {
        include: { user: true },
      },
    },
  })

  // Mutations
  const { mutateAsync: updateTransaction } =
    Api.transaction.update.useMutation()
  const { mutateAsync: createDocument } = Api.document.create.useMutation()

  // Transaction status steps
  const transactionSteps = [
    { title: 'Escrow', icon: 'las la-lock' },
    { title: 'Inspection', icon: 'las la-search' },
    { title: 'Financing', icon: 'las la-dollar-sign' },
    { title: 'Appraisal', icon: 'las la-home' },
    { title: 'Closing', icon: 'las la-check-circle' },
  ]

  const currentStep = transactionSteps.findIndex(
    step => step.title.toLowerCase() === transaction?.status?.toLowerCase(),
  )

  const handleStatusChange = async (status: string) => {
    try {
      await updateTransaction({
        where: { id: transactionId },
        data: { status },
      })
      message.success('Transaction status updated successfully')
      refetch()
    } catch (error) {
      message.error('Failed to update transaction status')
    }
  }

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

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-exchange-alt" style={{ marginRight: 8 }}></i>
          Transaction Details
        </Title>

        {/* Status and Progress Section */}
        <Card style={{ marginBottom: 24 }}>
          <Steps
            current={currentStep}
            items={transactionSteps.map(step => ({
              title: step.title,
              icon: <i className={step.icon}></i>,
            }))}
            onChange={current =>
              handleStatusChange(transactionSteps[current].title)
            }
          />
          <Progress
            percent={((currentStep + 1) / transactionSteps.length) * 100}
            status="active"
            style={{ marginTop: 24 }}
          />
        </Card>

        {/* Property and Transaction Info */}
        <Card
          title={
            <>
              <i className="las la-info-circle"></i> Transaction Information
            </>
          }
          style={{ marginBottom: 24 }}
        >
          <Paragraph>
            <Text strong>Property Address:</Text>{' '}
            {transaction?.property?.address}
          </Paragraph>
          <Paragraph>
            <Text strong>Price:</Text> ${transaction?.price}
          </Paragraph>
          <Paragraph>
            <Text strong>Closing Date:</Text>{' '}
            {transaction?.closingDate
              ? dayjs(transaction.closingDate).format('MMMM D, YYYY')
              : 'Not set'}
          </Paragraph>
        </Card>

        {/* Documents Section */}
        <Card
          title={
            <>
              <i className="las la-file-alt"></i> Documents
            </>
          }
          extra={
            <Button
              type="primary"
              onClick={() => document.getElementById('fileUpload')?.click()}
            >
              <i className="las la-upload"></i> Upload Document
            </Button>
          }
          style={{ marginBottom: 24 }}
        >
          <input
            id="fileUpload"
            type="file"
            style={{ display: 'none' }}
            onChange={e =>
              e.target.files?.[0] && handleDocumentUpload(e.target.files[0])
            }
          />
          <List
            dataSource={transaction?.documents}
            renderItem={doc => (
              <List.Item
                actions={[
                  <Button type="link" href={doc.url} target="_blank">
                    <i className="las la-download"></i> Download
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <i className="las la-file-pdf" style={{ fontSize: 24 }}></i>
                  }
                  title={doc.name}
                  description={dayjs(doc.createdAt).format('MMMM D, YYYY')}
                />
              </List.Item>
            )}
          />
        </Card>

        {/* Participants Section */}
        <Card
          title={
            <>
              <i className="las la-users"></i> Participants
            </>
          }
          style={{ marginBottom: 24 }}
        >
          <List
            dataSource={transaction?.transactionParticipants}
            renderItem={participant => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <i
                      className="las la-user-circle"
                      style={{ fontSize: 24 }}
                    ></i>
                  }
                  title={participant.user?.name}
                  description={`Role: ${participant.role}`}
                />
              </List.Item>
            )}
          />
        </Card>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
          <Button type="primary" onClick={() => setIsTaskModalVisible(true)}>
            <i className="las la-tasks"></i> Create Task
          </Button>
          <Button onClick={() => setIsFeedbackModalVisible(true)}>
            <i className="las la-star"></i> Request Feedback
          </Button>
          <Button type="primary">
            <i className="las la-file-pdf"></i> Generate Report
          </Button>
        </div>
      </div>
    </PageLayout>
  )
}
