import { useNango } from '@/plugins/nango/client'
import { useParams } from '@remix-run/react'
import {
  Button,
  Calendar,
  DatePicker,
  Form,
  Modal,
  Select,
  Space,
  Tag,
  Typography,
} from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useUserContext } from '~/core/context'
import { Api } from '~/core/trpc'
import { PageLayout } from '~/designSystem'
const { Title, Text } = Typography
const { RangePicker } = DatePicker

export default function CalendarPage() {
  const { organizationId } = useParams()
  const { user } = useUserContext()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const nango = useNango()

  const { mutateAsync: nangoProxy } = Api.nango.proxy.useMutation()

  // Fetch appointments
  const { data: appointments, refetch } = Api.appointment.findMany.useQuery({
    where: { organizationId },
    include: {
      property: true,
      transaction: true,
    },
  })

  // Fetch transactions for filtering
  const { data: transactions } = Api.transaction.findMany.useQuery({
    where: { organizationId },
  })

  // Create appointment mutation
  const { mutateAsync: createAppointment } =
    Api.appointment.create.useMutation()

  const handleCreateAppointment = async (values: any) => {
    try {
      await createAppointment({
        data: {
          type: values.type,
          startTime: values.dateRange[0].toISOString(),
          endTime: values.dateRange[1].toISOString(),
          status: 'SCHEDULED',
          organizationId,
          propertyId: values.propertyId,
          transactionId: values.transactionId,
        },
      })

      // Sync with Google Calendar if connected
      if (user?.id) {
        try {
          const config = {
            method: 'POST',
            endpoint:
              'https://www.googleapis.com/calendar/v3/calendars/primary/events',
            providerConfigKey: 'google-calendar',
            connectionId: user.id,
            data: {
              summary: values.type,
              start: { dateTime: values.dateRange[0].toISOString() },
              end: { dateTime: values.dateRange[1].toISOString() },
            },
          }
          await nangoProxy(config)
        } catch (error) {
          console.error('Failed to sync with Google Calendar:', error)
        }
      }

      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      console.error('Failed to create appointment:', error)
    }
  }

  const dateCellRender = (value: any) => {
    const dateAppointments = appointments?.filter(
      appointment =>
        dayjs(appointment.startTime).format('YYYY-MM-DD') ===
        value.format('YYYY-MM-DD'),
    )

    return (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {dateAppointments?.map(appointment => (
          <li key={appointment.id}>
            <Tag color={getAppointmentColor(appointment.type)}>
              <i className="las la-calendar-check"></i>
              {` ${appointment.type} - ${dayjs(appointment.startTime).format(
                'HH:mm',
              )}`}
            </Tag>
          </li>
        ))}
      </ul>
    )
  }

  const getAppointmentColor = (type: string | null) => {
    switch (type?.toLowerCase()) {
      case 'showing':
        return 'blue'
      case 'inspection':
        return 'green'
      case 'closing':
        return 'red'
      default:
        return 'default'
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Title level={2}>
            <i className="las la-calendar"></i> Calendar
          </Title>
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            <i className="las la-plus"></i> New Appointment
          </Button>
        </div>

        <Calendar dateCellRender={dateCellRender} />

        <Modal
          title="Schedule New Appointment"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form
            form={form}
            onFinish={handleCreateAppointment}
            layout="vertical"
          >
            <Form.Item
              name="type"
              label="Appointment Type"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="SHOWING">Showing</Select.Option>
                <Select.Option value="INSPECTION">Inspection</Select.Option>
                <Select.Option value="CLOSING">Closing</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="dateRange"
              label="Date and Time"
              rules={[{ required: true }]}
            >
              <RangePicker showTime format="YYYY-MM-DD HH:mm" />
            </Form.Item>

            <Form.Item name="transactionId" label="Related Transaction">
              <Select allowClear>
                {transactions?.map(transaction => (
                  <Select.Option key={transaction.id} value={transaction.id}>
                    {transaction.type} - {transaction.status}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Schedule
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
