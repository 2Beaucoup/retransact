import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { AnalyticsLocalClient } from '@/plugins/analytics-local/client'
import { FormClient } from '@/plugins/form/client'
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from 'antd'
import { useState } from 'react'

const { Title, Text } = Typography

export default function PropertySearchPage() {
  type SearchParams = {
    bedrooms: number | undefined
    bathrooms: number | undefined
    priceMin: string | undefined
    priceMax: string | undefined
    location: string | undefined
  }

  const [searchParams, setSearchParams] = useState<SearchParams>({
    bedrooms: undefined,
    bathrooms: undefined,
    priceMin: undefined,
    priceMax: undefined,
    location: undefined,
  })
  const [selectedClientId, setSelectedClientId] = useState<string>()
  const analytics = AnalyticsLocalClient.use()

  // Fetch data
  const { data: properties } = Api.property.findMany.useQuery({
    where: {
      ...(searchParams.bedrooms && {
        specifications: { path: ['bedrooms'], equals: searchParams.bedrooms },
      }),
      ...(searchParams.bathrooms && {
        specifications: { path: ['bathrooms'], equals: searchParams.bathrooms },
      }),
      ...(searchParams.priceMin && { price: { gte: searchParams.priceMin } }),
      ...(searchParams.priceMax && { price: { lte: searchParams.priceMax } }),
      ...(searchParams.location && {
        address: { contains: searchParams.location },
      }),
    },
  })

  const { data: clients } = Api.client.findMany.useQuery()
  const { data: selectedClient } = Api.client.findFirst.useQuery(
    { where: { id: selectedClientId }, include: { buyerPreferences: true } },
    { enabled: !!selectedClientId },
  )

  // Mutations
  const { mutateAsync: createSavedSearch } =
    Api.savedSearch.create.useMutation()
  const { mutateAsync: createFavorite } =
    Api.favoriteListing.create.useMutation()
  const { mutateAsync: createRecommendation } =
    Api.propertyRecommendation.create.useMutation()

  // Form hooks
  const recommendationForm = FormClient.useForModel({
    modelName: 'PropertyRecommendation',
    onSuccess: () => message.success('Property recommended successfully'),
  })

  const handleSaveSearch = async () => {
    if (!selectedClientId) {
      message.error('Please select a client first')
      return
    }

    try {
      await createSavedSearch({
        data: {
          clientId: selectedClientId,
          criteria: searchParams,
        },
      })
      message.success('Search criteria saved')
    } catch (error) {
      message.error('Failed to save search')
    }
  }

  const handleFavorite = async (propertyId: string) => {
    if (!selectedClientId) {
      message.error('Please select a client first')
      return
    }

    try {
      await createFavorite({
        data: {
          clientId: selectedClientId,
          propertyId,
        },
      })
      analytics.track(`property_favorited_${propertyId}`)
      message.success('Property added to favorites')
    } catch (error) {
      message.error('Failed to add to favorites')
    }
  }

  const generateShareableLink = (clientId: string) => {
    const baseUrl = window.location.origin
    return `${baseUrl}/invite/${clientId}`
  }

  return (
    <PageLayout>
      <div style={{ padding: '24px' }}>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 24 }}
        >
          <Col>
            <Title level={2}>Property Search</Title>
          </Col>
          <Col>
            <Space>
              <Select
                style={{ width: 200 }}
                placeholder="Select Client"
                onChange={setSelectedClientId}
                value={selectedClientId}
              >
                {clients?.map(client => (
                  <Select.Option key={client.id} value={client.id}>
                    {client.name}
                  </Select.Option>
                ))}
              </Select>
              {selectedClientId && (
                <Button
                  onClick={() => {
                    const link = generateShareableLink(selectedClientId)
                    navigator.clipboard.writeText(link)
                    message.success('Shareable link copied to clipboard')
                  }}
                >
                  Copy Invite Link
                </Button>
              )}
            </Space>
          </Col>
        </Row>

        <Card style={{ marginBottom: 24 }}>
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="Bedrooms">
                  <Select
                    placeholder="Select bedrooms"
                    onChange={val =>
                      setSearchParams(prev => ({ ...prev, bedrooms: val }))
                    }
                    value={searchParams.bedrooms}
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <Select.Option key={num} value={num}>
                        {num}+ beds
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Bathrooms">
                  <Select
                    placeholder="Select bathrooms"
                    onChange={val =>
                      setSearchParams(prev => ({ ...prev, bathrooms: val }))
                    }
                    value={searchParams.bathrooms}
                  >
                    {[1, 2, 3, 4].map(num => (
                      <Select.Option key={num} value={num}>
                        {num}+ baths
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Price Range">
                  <Input.Group compact>
                    <Input
                      style={{ width: '50%' }}
                      placeholder="Min"
                      type="number"
                      onChange={e =>
                        setSearchParams(prev => ({
                          ...prev,
                          priceMin: e.target.value,
                        }))
                      }
                      value={searchParams.priceMin}
                    />
                    <Input
                      style={{ width: '50%' }}
                      placeholder="Max"
                      type="number"
                      onChange={e =>
                        setSearchParams(prev => ({
                          ...prev,
                          priceMax: e.target.value,
                        }))
                      }
                      value={searchParams.priceMax}
                    />
                  </Input.Group>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Location">
                  <Input
                    placeholder="Enter location"
                    onChange={e =>
                      setSearchParams(prev => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    value={searchParams.location}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="end">
              <Space>
                <Button onClick={handleSaveSearch} disabled={!selectedClientId}>
                  Save Search
                </Button>
              </Space>
            </Row>
          </Form>
        </Card>

        <Row gutter={[16, 16]}>
          {properties?.map(property => (
            <Col key={property.id} span={8}>
              <Card
                cover={
                  <img
                    alt={property.address}
                    src="https://via.placeholder.com/300x200"
                    style={{ height: 200, objectFit: 'cover' }}
                  />
                }
                actions={[
                  <Button
                    key="favorite"
                    onClick={() => handleFavorite(property.id)}
                  >
                    <i className="las la-heart" /> Save
                  </Button>,
                  <Button
                    key="recommend"
                    onClick={() => {
                      recommendationForm.start({
                        values: {
                          propertyId: property.id,
                          clientId: selectedClientId,
                        },
                      })
                    }}
                  >
                    <i className="las la-share" /> Recommend
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={property.address}
                  description={
                    <>
                      <Text strong>${property.price}</Text>
                      <br />
                      <Space>
                        <Tag>{property.specifications?.bedrooms} beds</Tag>
                        <Tag>{property.specifications?.bathrooms} baths</Tag>
                        <Tag>{property.type}</Tag>
                      </Space>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>

        <recommendationForm.FormView>
          <Form.Item name="propertyId" hidden />
          <Form.Item name="clientId" hidden />
          <Form.Item name="note" label="Recommendation Note">
            <Input.TextArea rows={4} />
          </Form.Item>
        </recommendationForm.FormView>
      </div>
    </PageLayout>
  )
}
