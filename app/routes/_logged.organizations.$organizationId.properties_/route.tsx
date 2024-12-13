import {
  Typography,
  Table,
  Button,
  Input,
  Modal,
  Form,
  Upload,
  Tag,
  Space,
  Select,
  Card,
  Row,
  Col,
  message,
} from 'antd'
import { useState } from 'react'
import type { Property } from '@prisma/client'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function PropertiesPage() {
  const { organizationId } = useParams()
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [form] = Form.useForm()
  const { mutateAsync: upload } = useUploadPublic()

  // Fetch properties
  const { data: properties, refetch } = Api.property.findMany.useQuery({
    where: { organizationId },
    orderBy: { createdAt: 'desc' },
  })

  // Mutations
  const { mutateAsync: createProperty } = Api.property.create.useMutation()
  const { mutateAsync: updateProperty } = Api.property.update.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      if (editingProperty) {
        await updateProperty({
          where: { id: editingProperty.id },
          data: values,
        })
      } else {
        await createProperty({
          data: {
            ...values,
            organizationId,
          },
        })
      }
      message.success(
        `Property ${editingProperty ? 'updated' : 'created'} successfully`,
      )
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      message.error('An error occurred')
    }
  }

  const columns = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (text: string, record: Property) => (
        <a
          onClick={() =>
            navigate(`/organizations/${organizationId}/properties/${record.id}`)
          }
        >
          {text}
        </a>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'ACTIVE' ? 'green' : 'orange'}>{status}</Tag>
      ),
    },
    {
      title: 'MLS ID',
      dataIndex: 'mlsId',
      key: 'mlsId',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Property) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setEditingProperty(record)
              form.setFieldsValue(record)
              setIsModalVisible(true)
            }}
          >
            <i className="las la-edit" /> Edit
          </Button>
          <Button
            type="primary"
            onClick={() => navigate(`/organizations/${organizationId}/transactions/new?propertyId=${record.id}`)}
          >
            <i className="las la-plus" /> Create Transaction
          </Button>
        </Space>
      ),
    },
  ]

  const filteredProperties = properties?.filter(
    property =>
      (property.address.toLowerCase().includes(searchText.toLowerCase()) ||
      property.mlsId?.toLowerCase().includes(searchText.toLowerCase())) &&
      (statusFilter === 'all' || property.status === statusFilter)
  )

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 24 }}
        >
          <Col>
            <Title level={2}>
              <i className="las la-home" /> Properties
            </Title>
            <Text>Manage your real estate inventory</Text>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                setEditingProperty(null)
                form.resetFields()
                setIsModalVisible(true)
              }}
            >
              <i className="las la-plus" /> Add Property
            </Button>
          </Col>
        </Row>

        <Card style={{ marginBottom: 24 }}>
          <Space>
            <Input.Search
              placeholder="Search by address or MLS ID"
              allowClear
              onChange={e => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
            <Select
              defaultValue="all"
              style={{ width: 120 }}
              onChange={value => setStatusFilter(value)}
            >
              <Select.Option value="all">All Status</Select.Option>
              <Select.Option value="ACTIVE">Active</Select.Option>
              <Select.Option value="PENDING">Pending</Select.Option>
              <Select.Option value="SOLD">Sold</Select.Option>
            </Select>
          </Space>
        </Card>

        <Table
          columns={columns}
          dataSource={filteredProperties}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />

        <Modal
          title={`${editingProperty ? 'Edit' : 'Add'} Property`}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please input the address!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>
            <Form.Item name="type" label="Property Type">
              <Select>
                <Select.Option value="RESIDENTIAL">Residential</Select.Option>
                <Select.Option value="COMMERCIAL">Commercial</Select.Option>
                <Select.Option value="INDUSTRIAL">Industrial</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="status" label="Status">
              <Select>
                <Select.Option value="ACTIVE">Active</Select.Option>
                <Select.Option value="PENDING">Pending</Select.Option>
                <Select.Option value="SOLD">Sold</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="mlsId" label="MLS ID">
              <Input />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {editingProperty ? 'Update' : 'Create'}
                </Button>
                <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
