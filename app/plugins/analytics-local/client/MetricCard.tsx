import { Card, Flex, Typography } from 'antd'
import dayjs from 'dayjs'
import React, { ReactNode } from 'react'
import { DesignBox } from '../../designbox'

const Bar = (props: {
  width: string
  color?: string
  children?: ReactNode
}) => (
  <div
    style={{
      flex: 1,
      height: '8px',
      background: props.color ?? '#52c41a',
      borderRadius: '6px',
      width: props.width,
    }}
  >
    {props.children}
  </div>
)

type Props = {
  countPositive: number
  countNegative: number
  label: string
  createdAt?: Date
  updatedAt?: Date
}

export const MetricCard: React.FC<Props> = ({
  label,
  countPositive,
  countNegative,
  createdAt,
  updatedAt,
}) => {
  const count = countPositive + countNegative

  const percentagePositive = (countPositive / count) * 100
  const percentageNegative = 100 - percentagePositive

  const dateCreated = dayjs(createdAt).format('MMM DD, YYYY HH:mm')
  const dateUpdated = dayjs(updatedAt).format('MMM DD, YYYY HH:mm')

  const countDays = dayjs(updatedAt).diff(dayjs(createdAt), 'days')

  return (
    <>
      <Card>
        <Flex vertical gap={8}>
          <Flex>
            <Flex flex={1}>
              <Typography.Title level={5} style={{ margin: 0 }}>
                {label}
              </Typography.Title>
            </Flex>

            <DesignBox.TooltipBadge
              tooltipContent={
                <Flex vertical>
                  <span>From {dateCreated}</span>
                  <span>To {dateUpdated}</span>
                </Flex>
              }
              propsTooltip={{ placement: 'left' }}
            >
              <span />
            </DesignBox.TooltipBadge>
          </Flex>
          <Flex justify="space-between">
            <Typography.Text style={{ textAlign: 'left' }}>
              {percentagePositive.toFixed(2)}%{' '}
              <Typography.Text type="secondary">
                +{countPositive}
              </Typography.Text>
            </Typography.Text>
            <Typography.Text style={{ textAlign: 'right' }}>
              <Typography.Text type="secondary">
                -{countNegative}
              </Typography.Text>{' '}
              {percentageNegative.toFixed(2)}%
            </Typography.Text>
          </Flex>

          <Bar width="100%" color="#ff4d4f">
            <Bar width={`${percentagePositive}%`} />
          </Bar>

          <Flex>
            <Typography.Text type="secondary">{countDays} days</Typography.Text>
          </Flex>
        </Flex>
      </Card>
    </>
  )
}
