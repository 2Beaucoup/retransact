import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useNavigate, useParams } from '@remix-run/react'
import { Card, Input, Select, Space, Table, Tag, Typography } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
const { Title, Text } = Typography

export default function TransactionsPage() {
  const { organizationId } = useParams()
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchText, setSearchText] = useState('')

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
            status === 'active'
              ? 'green'
              : status === 'pending'
              ? 'orange'
              : 'blue'
          }
        >
          {status?.toUpperCase()}
        </Tag>
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
      render: (date: string) => dayjs(date).format('MM/DD/YYYY'),
    },
    {
      title: 'Participants',
      dataIndex: 'transactionParticipants',
      key: 'participants',
      render: (participants: any[]) => participants?.length || 0,
    },
  ]

  const filteredTransactions = transactions?.filter(t => {
    const matchesStatus =
      statusFilter === 'all' ? true : t.status === statusFilter
    const matchesSearch = t.property.address
      .toLowerCase()
      .includes(searchText.toLowerCase())
    return matchesStatus && matchesSearch
  })

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
        </div>

        <Card style={{ marginBottom: '16px' }}>
          <Space>
            <Input.Search
              placeholder="Search by property address"
              allowClear
              onChange={e => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 200 }}
            >
              <Select.Option value="all">All Status</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="closed">Closed</Select.Option>
            </Select>
          </Space>
        </Card>

        <Table
          columns={columns}
          dataSource={filteredTransactions}
          rowKey="id"
          onRow={record => ({
            onClick: () =>
              navigate(
                `/organizations/${organizationId}/transactions/${record.id}`,
              ),
            style: { cursor: 'pointer' },
          })}
        />
      </div>
    </PageLayout>
  )
}
