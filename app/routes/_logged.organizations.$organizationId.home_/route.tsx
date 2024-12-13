import {
  Typography,
  Card,
  Row,
  Col,
  Statistic,
  Select,
  DatePicker,
  Space,
  Badge,
  Table,
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

export default function HomePage() {
  const { organization } = useUserContext()
  const { organizationId } = useParams()
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [roleFilter, setRoleFilter] = useState<string>('all')

  // Fetch transactions with related data
  const { data: transactions } = Api.transaction.findMany.useQuery({
    where: { organizationId },
    include: {
      property: true,
      transactionParticipants: {
        include: { user: true },
      },
    },
  })

  // Fetch appointments
  const { data: appointments } = Api.appointment.findMany.useQuery({
    where: { organizationId },
    include: { property: true },
  })

  // Calculate metrics
  const activeTransactions =
    transactions?.filter(t => t.status === 'ACTIVE')?.length || 0
  const closedTransactions =
    transactions?.filter(t => t.status === 'CLOSED')?.length || 0
  const pendingAppointments =
    appointments?.filter(a => a.status === 'PENDING')?.length || 0

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
        <Badge
          status={status === 'ACTIVE' ? 'processing' : 'success'}
          text={status}
        />
      ),
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
      render: (date: string) => dayjs(date).format('MMM DD, YYYY'),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <Title level={2}>
          <i className="las la-chart-line" style={{ marginRight: '8px' }}></i>
          Dashboard Overview
        </Title>
        <Text type="secondary">
          Monitor your real estate transactions and performance metrics
        </Text>

        {/* Key Metrics */}
        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Active Transactions"
                value={activeTransactions}
                prefix={<i className="las la-file-contract"></i>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Closed Deals"
                value={closedTransactions}
                prefix={<i className="las la-check-circle"></i>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Pending Appointments"
                value={pendingAppointments}
                prefix={<i className="las la-calendar"></i>}
              />
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Card style={{ marginTop: '24px' }}>
          <Space size="large">
            <div>
              <Text strong>Status: </Text>
              <Select
                defaultValue="all"
                style={{ width: 120 }}
                onChange={setStatusFilter}
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'active', label: 'Active' },
                  { value: 'closed', label: 'Closed' },
                ]}
              />
            </div>
            <div>
              <Text strong>Role: </Text>
              <Select
                defaultValue="all"
                style={{ width: 120 }}
                onChange={setRoleFilter}
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'listing', label: 'Listing Agent' },
                  { value: 'buyer', label: "Buyer's Agent" },
                ]}
              />
            </div>
            <div>
              <Text strong>Date Range: </Text>
              <DatePicker.RangePicker />
            </div>
          </Space>
        </Card>

        {/* Transactions Table */}
        <Card
          title={
            <Space>
              <i className="las la-list"></i>
              <span>Active Transactions</span>
            </Space>
          }
          style={{ marginTop: '24px' }}
        >
          <Table
            dataSource={transactions}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </div>
    </PageLayout>
  )
}
