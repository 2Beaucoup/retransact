import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import {
  usePlaidAccounts,
  usePlaidExchange,
  usePlaidInit,
} from '@/plugins/plaid/client'
import { useUploadPrivate } from '@/plugins/upload/client'
import {
  BankOutlined,
  EyeOutlined,
  SendOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
  Typography,
  Upload,
} from 'antd'
import { RcFile } from 'antd/es/upload'
import { useState } from 'react'
import { usePlaidLink } from 'react-plaid-link'

const { Title } = Typography

export default function OfferCreationPage() {
  const [form] = Form.useForm()
  const [preApprovalFiles, setPreApprovalFiles] = useState([])
  const [additionalFiles, setAdditionalFiles] = useState([])
  const [previewVisible, setPreviewVisible] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState(null)
  const { mutateAsync: uploadPrivate } = useUploadPrivate()
  const { mutateAsync: createOffer } = Api.offer.create.useMutation()
  const { data: templates } = Api.offerTemplate.findMany.useQuery()

  const { linkToken } = usePlaidInit()
  const { exchangeToken } = usePlaidExchange()
  const { accounts, isLoading: isLoadingAccounts } = usePlaidAccounts()

  const { open: openPlaid, ready: plaidReady } = usePlaidLink({
    token: linkToken,
    onSuccess: async (public_token, metadata) => {
      await exchangeToken(public_token)
      message.success('Bank account verified successfully')
    },
  })

  const handlePreApprovalUpload = async (file: RcFile) => {
    try {
      const { url } = await uploadPrivate({ file })
      setPreApprovalFiles([...preApprovalFiles, { name: file.name, url }])
      return false // Prevent default upload behavior
    } catch (error) {
      message.error('Failed to upload pre-approval letter')
    }
  }

  const handleAdditionalUpload = async (file: RcFile) => {
    try {
      const { url } = await uploadPrivate({ file })
      setAdditionalFiles([...additionalFiles, { name: file.name, url }])
      return false // Prevent default upload behavior
    } catch (error) {
      message.error('Failed to upload document')
    }
  }

  const handleSubmit = async values => {
    try {
      const offer = await createOffer({
        ...values,
        preApprovalFiles,
        additionalFiles,
        bankAccount: selectedAccount,
      })
      message.success('Offer created and sent successfully')
    } catch (error) {
      message.error('Failed to create and send offer')
    }
  }

  const handlePreview = () => {
    const formValues = form.getFieldsValue()
    setPreviewVisible(true)
  }

  return (
    <PageLayout>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>Create New Offer</Title>

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Card title="Offer Details" style={{ marginBottom: 24 }}>
            <Form.Item
              name="templateId"
              label="Offer Template"
              rules={[{ required: true, message: 'Please select a template' }]}
            >
              <Select>
                {templates?.map(template => (
                  <Select.Option key={template.id} value={template.id}>
                    {template.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="amount"
              label="Offer Amount"
              rules={[{ required: true, message: 'Please enter offer amount' }]}
            >
              <Input prefix="$" type="number" />
            </Form.Item>
          </Card>

          <Card title="Pre-Approval Letter" style={{ marginBottom: 24 }}>
            <Upload
              beforeUpload={handlePreApprovalUpload}
              fileList={preApprovalFiles}
              multiple={false}
            >
              <Button icon={<UploadOutlined />}>
                Upload Pre-Approval Letter
              </Button>
            </Upload>
          </Card>

          <Card title="Bank Account Verification" style={{ marginBottom: 24 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button
                onClick={() => openPlaid()}
                disabled={!plaidReady}
                icon={<BankOutlined />}
              >
                Verify Bank Account
              </Button>

              {accounts && accounts.length > 0 && (
                <Form.Item
                  name="bankAccount"
                  label="Select Bank Account"
                  rules={[
                    { required: true, message: 'Please select a bank account' },
                  ]}
                >
                  <Select
                    loading={isLoadingAccounts}
                    onChange={value => setSelectedAccount(value)}
                  >
                    {accounts.map(account => (
                      <Select.Option key={account.id} value={account.id}>
                        {account.name} - {account.mask}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            </Space>
          </Card>

          <Card title="Additional Documents" style={{ marginBottom: 24 }}>
            <Upload
              beforeUpload={handleAdditionalUpload}
              fileList={additionalFiles}
              multiple={true}
            >
              <Button icon={<UploadOutlined />}>
                Upload Additional Documents
              </Button>
            </Upload>
          </Card>

          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button icon={<EyeOutlined />} onClick={handlePreview}>
              Preview
            </Button>
            <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
              Send Offer
            </Button>
          </Space>
        </Form>

        <Modal
          title="Offer Preview"
          open={previewVisible}
          onCancel={() => setPreviewVisible(false)}
          footer={null}
          width={800}
        >
          <div>
            <h3>Offer Details</h3>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>

            <h3>Attached Documents</h3>
            <ul>
              {preApprovalFiles.map(file => (
                <li key={file.url}>{file.name}</li>
              ))}
              {additionalFiles.map(file => (
                <li key={file.url}>{file.name}</li>
              ))}
            </ul>
          </div>
        </Modal>
      </div>
    </PageLayout>
  )
}
