import { Typography, Card, Row, Col, Button } from 'antd'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const navigate = useNavigate()

  const roles = [
    {
      title: 'Buyer',
      icon: 'las la-home',
      description: 'Find and purchase your dream property with ease',
      features: [
        'Property search',
        'Document management',
        'Transaction tracking',
      ],
    },
    {
      title: 'Seller',
      icon: 'las la-key',
      description: 'List and sell your property efficiently',
      features: ['Property listing', 'Buyer management', 'Document handling'],
    },
    {
      title: 'Agent',
      icon: 'las la-user-tie',
      description: 'Manage your clients and properties professionally',
      features: [
        'Client management',
        'Property portfolio',
        'Transaction oversight',
      ],
    },
    {
      title: 'Investor',
      icon: 'las la-chart-line',
      description: 'Track and grow your property investments',
      features: [
        'Investment analytics',
        'Portfolio management',
        'Market insights',
      ],
    },
  ]

  const testimonials = [
    {
      name: 'John Smith',
      role: 'Real Estate Agent',
      content:
        'This platform has revolutionized how I manage my real estate business. Everything is streamlined and efficient.',
      avatar: 'las la-user-circle',
    },
    {
      name: 'Sarah Johnson',
      role: 'Property Buyer',
      content:
        'Finding and purchasing my dream home was so much easier with this platform. The process was transparent and smooth.',
      avatar: 'las la-user-circle',
    },
    {
      name: 'Michael Brown',
      role: 'Property Investor',
      content:
        'The investment tracking features are outstanding. I can manage my portfolio with confidence.',
      avatar: 'las la-user-circle',
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Title level={1}>Welcome to Your Real Estate Platform</Title>
          <Paragraph style={{ fontSize: 18 }}>
            Streamline your real estate journey with our comprehensive platform
            designed for all stakeholders
          </Paragraph>
        </div>

        {/* Role Selection */}
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
          Choose Your Role
        </Title>
        <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
          {roles.map((role, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card
                hoverable
                style={{ height: '100%', textAlign: 'center' }}
                onClick={() => navigate('/organizations/new')}
              >
                <i
                  className={role.icon}
                  style={{ fontSize: 48, marginBottom: 16, color: '#1890ff' }}
                ></i>
                <Title level={3}>{role.title}</Title>
                <Text>{role.description}</Text>
                <ul style={{ textAlign: 'left', marginTop: 16 }}>
                  {role.features.map((feature, idx) => (
                    <li key={idx}>
                      <Text>{feature}</Text>
                    </li>
                  ))}
                </ul>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Testimonials */}
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
          What Our Users Say
        </Title>
        <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
          {testimonials.map((testimonial, index) => (
            <Col xs={24} md={8} key={index}>
              <Card style={{ height: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <i
                    className={testimonial.avatar}
                    style={{ fontSize: 48, color: '#1890ff' }}
                  ></i>
                </div>
                <Paragraph style={{ fontSize: 16, fontStyle: 'italic' }}>
                  "{testimonial.content}"
                </Paragraph>
                <div style={{ marginTop: 16 }}>
                  <Text strong>{testimonial.name}</Text>
                  <br />
                  <Text type="secondary">{testimonial.role}</Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Security Section */}
        <Card style={{ textAlign: 'center', marginBottom: 48 }}>
          <i
            className="las la-shield-alt"
            style={{ fontSize: 48, color: '#52c41a', marginBottom: 16 }}
          ></i>
          <Title level={2}>Security & Compliance</Title>
          <Paragraph>
            Our platform ensures the highest level of security for all your
            transactions and data. We comply with industry standards and
            regulations to provide you with a safe and reliable service.
          </Paragraph>
          <Row justify="center" gutter={[24, 24]}>
            <Col>
              <i className="las la-lock"></i> <Text>Encrypted Data</Text>
            </Col>
            <Col>
              <i className="las la-file-contract"></i>{' '}
              <Text>Secure Documents</Text>
            </Col>
            <Col>
              <i className="las la-user-shield"></i>{' '}
              <Text>Privacy Protection</Text>
            </Col>
          </Row>
        </Card>

        {/* Call to Action */}
        <div style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate('/organizations/new')}
          >
            Get Started Now <i className="las la-arrow-right"></i>
          </Button>
        </div>
      </div>
    </PageLayout>
  )
}
