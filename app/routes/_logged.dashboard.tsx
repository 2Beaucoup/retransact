import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useNavigate } from '@remix-run/react'
import {
  Button,
  Card,
  Col,
  List,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'

export default function BuyerAgentDashboard() {
  const navigate = useNavigate()
  const { organization } = useUserContext()
  const [searchText, setSearchText] = useState('')

  // Fetch clients data
  const { data: clients } = Api.client.findMany.useQuery({
    where: {
      organizationId: organization?.id,
      agent: { role: 'BUYERS_AGENT' },
    },
    include: { buyerPreferences: true },
  })

  // Fetch transactions data
  const { data: transactions } = Api.transaction.findMany.useQuery({
    where: {
      organizationId: organization?.id,
      status: 'ACTIVE',
    },
    include: {
      property: true,
      transactionParticipants: {
        include: { user: true },
      },
    },
  })

  // Calculate stats
  const totalClients = clients?.length || 0
  const activeTransactions = transactions?.length || 0
  const pendingTasks =
    transactions?.filter(t =>
      dayjs(t.closingDate).isBefore(dayjs().add(7, 'day')),
    ).length || 0

  // Recent leads - last 5 clients
  const recentLeads = clients?.slice(0, 5) || []

  return (
    <PageLayout>
      <div style={{ padding: '24px' }}>
        <Typography.Title level={2}>Buyer Agent Dashboard</Typography.Title>

        {/* Stats Overview */}
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={8}>
            <Card>
              <Statistic
                title="Total Clients"
                value={totalClients}
                prefix={<i className="las la-users" />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Active Transactions"
                value={activeTransactions}
                prefix={<i className="las la-file-contract" />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Pending Tasks"
                value={pendingTasks}
                prefix={<i className="las la-tasks" />}
              />
            </Card>
          </Col>
        </Row>

        {/* Quick Actions */}
        <Card style={{ marginBottom: 24 }}>
          <Space>
            <Button
              type="primary"
              icon={<i className="las la-user-plus" />}
              onClick={() =>
                navigate(`/organizations/${organization?.id}/members`)
              }
            >
              Invite Client
            </Button>
            <Button
              icon={<i className="las la-file-contract" />}
              onClick={() =>
                navigate(`/organizations/${organization?.id}/transactions/new`)
              }
            >
              Create Transaction
            </Button>
          </Space>
        </Card>

        <Row gutter={24}>
          {/* Recent Leads */}
          <Col span={12}>
            <Card title="Recent Leads" style={{ marginBottom: 24 }}>
              <List
                dataSource={recentLeads}
                renderItem={client => (
                  <List.Item>
                    <List.Item.Meta
                      title={client.name}
                      description={
                        <Space>
                          <span>{client.email}</span>
                          <Tag
                            color={
                              client.preApprovalStatus === 'ACTIVE'
                                ? 'green'
                                : 'orange'
                            }
                          >
                            {client.preApprovalStatus || 'PENDING'}
                          </Tag>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          {/* Active Transactions */}
          <Col span={12}>
            <Card title="Active Transactions">
              <Table
                dataSource={transactions}
                pagination={false}
                columns={[
                  {
                    title: 'Property',
                    dataIndex: ['property', 'address'],
                    key: 'property',
                  },
                  {
                    title: 'Closing Date',
                    dataIndex: 'closingDate',
                    key: 'closingDate',
                    render: (date: string) => dayjs(date).format('MM/DD/YYYY'),
                  },
                  {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status: string) => (
                      <Tag color={status === 'ACTIVE' ? 'green' : 'orange'}>
                        {status}
                      </Tag>
                    ),
                  },
                ]}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
