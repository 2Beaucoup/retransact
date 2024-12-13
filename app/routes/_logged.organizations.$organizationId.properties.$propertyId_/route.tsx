import {
  Typography,
  Card,
  Descriptions,
  Button,
  Table,
  Upload,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Tag,
  Spin,
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

export default function PropertyDetailsPage() {
  const { propertyId, organizationId } = useParams()
  const navigate = useNavigate()
  const [isEditMode, setIsEditMode] = useState(false)
  const [documentModal, setDocumentModal] = useState(false)
  const [form] = Form.useForm()
  const { mutateAsync: upload } = useUploadPublic()

  // Fetch property data with related information
  const {
    data: property,
    isLoading,
    refetch,
  } = Api.property.findFirst.useQuery({
    where: { id: propertyId },
    include: {
      transactions: true,
      documents: true,
      appointments: true,
    },
  })

  // Mutations
  const { mutateAsync: updateProperty } = Api.property.update.useMutation()
  const { mutateAsync: createDocument } = Api.document.create.useMutation()

  const handleStatusUpdate = async (status: string) => {
    await updateProperty({
      where: { id: propertyId },
      data: { status },
    })
    refetch()
  }

  const handlePropertyUpdate = async (values: any) => {
    await updateProperty({
      where: { id: propertyId },
      data: values,
    })
    setIsEditMode(false)
    refetch()
  }

  const handleDocumentUpload = async (file: File) => {
    const { url } = await upload({ file })
    await createDocument({
      data: {
        name: file.name,
        url,
        propertyId,
        type: file.type,
        permissions: { viewAll: true },
      },
    })
    setDocumentModal(false)
    refetch()
  }

  if (isLoading || !property) return <Spin size="large" />

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <Title level={2}>
            <i className="las la-home" /> Property Details
          </Title>
          <Space>
            <Button onClick={() => setIsEditMode(!isEditMode)}>
              <i className="las la-edit" />{' '}
              {isEditMode ? 'Cancel Edit' : 'Edit Property'}
            </Button>
            <Button onClick={() => setDocumentModal(true)}>
              <i className="las la-file" /> Add Document
            </Button>
          </Space>
        </div>

        <Card>
          {isEditMode ? (
            <Form
              initialValues={property}
              onFinish={handlePropertyUpdate}
              layout="vertical"
            >
              <Form.Item name="address" label="Address">
                <Input />
              </Form.Item>
              <Form.Item name="price" label="Price">
                <Input />
              </Form.Item>
              <Form.Item name="type" label="Property Type">
                <Select>
                  <Select.Option value="HOUSE">House</Select.Option>
                  <Select.Option value="APARTMENT">Apartment</Select.Option>
                  <Select.Option value="CONDO">Condo</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="description" label="Description">
                <Input.TextArea />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Form>
          ) : (
            <Descriptions bordered>
              <Descriptions.Item label="Address">
                {property.address}
              </Descriptions.Item>
              <Descriptions.Item label="Price">
                ${property.price}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Select
                  value={property.status}
                  onChange={handleStatusUpdate}
                  style={{ width: 120 }}
                >
                  <Select.Option value="ACTIVE">Active</Select.Option>
                  <Select.Option value="PENDING">Pending</Select.Option>
                  <Select.Option value="SOLD">Sold</Select.Option>
                </Select>
              </Descriptions.Item>
              <Descriptions.Item label="Type">
                {property.type}
              </Descriptions.Item>
              <Descriptions.Item label="MLS ID">
                {property.mlsId}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                {property.description}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Card>

        <Title level={3} style={{ marginTop: 24 }}>
          <i className="las la-history" /> Transaction History
        </Title>
        <Table
          dataSource={property.transactions}
          columns={[
            { title: 'Type', dataIndex: 'type' },
            { title: 'Status', dataIndex: 'status' },
            {
              title: 'Price',
              dataIndex: 'price',
              render: price => `$${price}`,
            },
            { title: 'Closing Date', dataIndex: 'closingDate' },
            {
              title: 'Actions',
              render: (_, record) => (
                <Button
                  onClick={() =>
                    navigate(
                      `/organizations/${organizationId}/transactions/${record.id}`,
                    )
                  }
                >
                  View Details
                </Button>
              ),
            },
          ]}
        />

        <Title level={3} style={{ marginTop: 24 }}>
          <i className="las la-file-alt" /> Documents
        </Title>
        <Table
          dataSource={property.documents}
          columns={[
            { title: 'Name', dataIndex: 'name' },
            { title: 'Type', dataIndex: 'type' },
            {
              title: 'Added Date',
              dataIndex: 'createdAt',
              render: date => dayjs(date).format('MM/DD/YYYY'),
            },
            {
              title: 'Actions',
              render: (_, record) => (
                <Button href={record.url} target="_blank">
                  <i className="las la-download" /> Download
                </Button>
              ),
            },
          ]}
        />

        <Modal
          title="Upload Document"
          open={documentModal}
          onCancel={() => setDocumentModal(false)}
          footer={null}
        >
          <Upload.Dragger
            customRequest={({ file }) => handleDocumentUpload(file as File)}
            showUploadList={false}
          >
            <p className="ant-upload-drag-icon">
              <i className="las la-cloud-upload-alt" style={{ fontSize: 48 }} />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Upload.Dragger>
        </Modal>
      </div>
    </PageLayout>
  )
}
