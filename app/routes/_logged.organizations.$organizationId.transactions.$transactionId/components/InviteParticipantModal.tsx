import { Button, Form, Input, Modal, Select, message } from 'antd'
import { useState } from 'react'
import { Api } from '@/core/trpc'
import { useInvitation } from '~/routes/_logged.organizations.$organizationId.members_/hooks/useInvitation'
import { useUserContext } from '@/core/context'
import { useParams } from '@remix-run/react'

type Props = {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export const InviteParticipantModal = ({ open, onClose, onSuccess }: Props) => {
  const { organization } = useUserContext()
  const { transactionId } = useParams()
  const [form] = Form.useForm()
  const [email, setEmail] = useState('')

  const { invite, isLoadingInvitation } = useInvitation({ 
    organization, 
    email 
  })

  const { mutateAsync: createParticipant, isLoading: isLoadingCreate } = 
    Api.transactionParticipant.create.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      // First invite/create the user
      const inviteSuccess = await invite()
      
      if (!inviteSuccess) {
        return
      }

      // Then create the transaction participant record
      await createParticipant({
        data: {
          transactionId,
          role: values.role,
          userId: values.userId
        }
      })

      message.success('Participant invited successfully')
      form.resetFields()
      onSuccess()
      onClose()
    } catch (error) {
      message.error('Failed to invite participant')
    }
  }

  return (
    <Modal
      title="Invite Participant" 
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Email is required' }]}
        >
          <Input 
            type="email"
            placeholder="Enter participant email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Role is required' }]}
        >
          <Select placeholder="Select role">
            <Select.Option value="agent">Agent</Select.Option>
            <Select.Option value="buyer">Buyer</Select.Option>
            <Select.Option value="seller">Seller</Select.Option>
            <Select.Option value="inspector">Inspector</Select.Option>
            <Select.Option value="appraiser">Appraiser</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit"
            loading={isLoadingInvitation || isLoadingCreate}
            block
          >
            Invite Participant
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
