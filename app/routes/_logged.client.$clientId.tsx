import { PageLayout } from '@/designSystem'
import { DesignBox } from '@/plugins/designbox'
import { EmailServer } from '@/plugins/email/server'
import { FormClient } from '@/plugins/form/client'
import { Prisma } from '@prisma/client'
import { useParams } from '@remix-run/react'
import {
  Button,
  Card,
  Form,
  Input,
  List,
  Select,
  Space,
  Tabs,
  Tag,
  Timeline,
  Typography,
  message,
} from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { trpc } from '~/core/trpc'

type SavedSearchWithRelations = Prisma.SavedSearchGetPayload<{}>
type FavoriteWithProperty = Prisma.FavoriteListingGetPayload<{
  include: { property: true }
}>
type RecommendationWithRelations = Prisma.PropertyRecommendationGetPayload<{
  include: { property: true; agent: true }
}>

const { Title, Text } = Typography
const { TabPane } = Tabs

export default function ClientDetailsPage() {
  const { clientId } = useParams()
  const [activeTab, setActiveTab] = useState('1')

  // Fetch client data
  const { data: client, refetch } = trpc.client.findFirst.useQuery({
    where: { id: clientId },
    include: {
      buyerPreferences: true,
      savedSearches: true,
      favoriteListing: { include: { property: true } },
      recommendations: { include: { property: true, agent: true } },
    },
  })

  // Form handling
  const { FormView, UpdateButton } = FormClient.useForModel({
    modelName: 'BuyerPreferences',
    onSuccess: () => {
      message.success('Preferences updated successfully')
      refetch()
    },
  })

  // Email reminder setup
  const setupEmailReminder = async () => {
    try {
      await EmailServer.service.send({
        email: client?.email || '',
        subject: 'Property Updates Available',
        templateKey: 'welcome',
        variables: {
          name: client?.name || '',
          date: dayjs().format('MMMM D, YYYY'),
        },
      })
      message.success('Email reminder scheduled')
    } catch (error) {
      message.error('Failed to schedule email reminder')
    }
  }

  return (
    <PageLayout>
      <div style={{ padding: '24px' }}>
        <Card>
          <Title level={2}>{client?.name}'s Profile</Title>
          <Text type="secondary">Client Management Dashboard</Text>

          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            style={{ marginTop: 24 }}
          >
            <TabPane tab="Preferences" key="1">
              <FormView>
                <Form.Item name="bedrooms" label="Bedrooms">
                  <Select>
                    {[1, 2, 3, 4, 5].map(num => (
                      <Select.Option key={num} value={num}>
                        {num}+ beds
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="bathrooms" label="Bathrooms">
                  <Select>
                    {[1, 2, 3, 4].map(num => (
                      <Select.Option key={num} value={num}>
                        {num}+ baths
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="priceMin" label="Minimum Price">
                  <Input prefix="$" type="number" />
                </Form.Item>
                <Form.Item name="priceMax" label="Maximum Price">
                  <Input prefix="$" type="number" />
                </Form.Item>
                <Form.Item name="location" label="Preferred Location">
                  <Input />
                </Form.Item>
              </FormView>
            </TabPane>

            <TabPane tab="Saved Searches" key="2">
              <List
                dataSource={client?.savedSearches}
                renderItem={(search: SavedSearchWithRelations) => (
                  <List.Item
                    actions={[
                      <Button key="view" type="link">
                        View Results
                      </Button>,
                      <Button key="delete" type="link" danger>
                        Delete
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={`Search from ${dayjs(search.createdAt).format(
                        'MMM D, YYYY',
                      )}`}
                      description={
                        <Space>
                          {Object.entries(search.criteria).map(
                            ([key, value]) => (
                              <Tag key={key}>{`${key}: ${value}`}</Tag>
                            ),
                          )}
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </TabPane>

            <TabPane tab="Favorite Listings" key="3">
              <DesignBox.Gallery
                items={client?.favoriteListing || []}
                colProps={{ xs: 24, sm: 12, md: 8, lg: 6 }}
                rowProps={{}}
              >
                {(favorite: FavoriteWithProperty) => (
                  <Card
                    cover={
                      <img
                        src="https://via.placeholder.com/300x200"
                        alt={favorite.property.address}
                      />
                    }
                    actions={[
                      <Button key="view" type="link">
                        View Details
                      </Button>,
                      <Button key="remove" type="link" danger>
                        Remove
                      </Button>,
                    ]}
                  >
                    <Card.Meta
                      title={favorite.property.address}
                      description={`$${favorite.property.price}`}
                    />
                  </Card>
                )}
              </DesignBox.Gallery>
            </TabPane>

            <TabPane tab="Recommendations" key="4">
              <List
                dataSource={client?.recommendations}
                renderItem={(rec: RecommendationWithRelations) => (
                  <List.Item>
                    <List.Item.Meta
                      title={rec.property.address}
                      description={
                        <>
                          <Text>Recommended by: {rec.agent.name}</Text>
                          <br />
                          <Text>Note: {rec.note}</Text>
                        </>
                      }
                    />
                    <Button type="primary">Contact Agent</Button>
                  </List.Item>
                )}
              />
            </TabPane>

            <TabPane tab="Activity Timeline" key="5">
              <Timeline>
                {[
                  ...(client?.savedSearches || []),
                  ...(client?.favoriteListing || []),
                  ...(client?.recommendations || []),
                ]
                  .sort(
                    (a, b) =>
                      dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix(),
                  )
                  .map((activity, index) => (
                    <Timeline.Item key={index}>
                      <Text strong>
                        {activity.hasOwnProperty('criteria')
                          ? 'Saved Search'
                          : activity.hasOwnProperty('note')
                          ? 'Received Recommendation'
                          : 'Favorited Property'}
                      </Text>
                      <br />
                      <Text type="secondary">
                        {dayjs(activity.createdAt).format('MMM D, YYYY HH:mm')}
                      </Text>
                    </Timeline.Item>
                  ))}
              </Timeline>
            </TabPane>
          </Tabs>
        </Card>

        <Button
          type="primary"
          onClick={setupEmailReminder}
          style={{ marginTop: 24 }}
        >
          Schedule Email Updates
        </Button>
      </div>
    </PageLayout>
  )
}
