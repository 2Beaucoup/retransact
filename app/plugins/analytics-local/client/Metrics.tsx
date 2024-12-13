import { ClearOutlined, SyncOutlined } from '@ant-design/icons'
import { AnalyticsLocalMetric } from '@prisma/client'
import { Button, Flex, Skeleton, Typography } from 'antd'
import dayjs from 'dayjs'
import React, { useMemo } from 'react'
import { Api } from '~/core/trpc'
import { MetricCard } from './MetricCard'

const buildTotalMetric = (metrics: AnalyticsLocalMetric[] = []) => {
  const response = {
    countPositiveTotal: 0,
    countNegativeTotal: 0,
    createdAt: null,
    updatedAt: null,
  }

  for (const metric of metrics) {
    response.countPositiveTotal += metric.countPositive
    response.countNegativeTotal += metric.countNegative

    const isCreatedBefore = dayjs(metric.createdAt).isBefore(response.createdAt)
    const isUpdatedAfter = dayjs(metric.updatedAt).isAfter(response.updatedAt)

    if (!response.createdAt || isCreatedBefore) {
      response.createdAt = metric.createdAt
    }

    if (!response.updatedAt || isUpdatedAfter) {
      response.updatedAt = metric.updatedAt
    }
  }

  return response
}

export const Metrics: React.FC = () => {
  const {
    data: metrics,
    isLoading,
    refetch,
  } = Api.analyticsLocalMetric.findMany.useQuery(
    { orderBy: { key: 'asc' } },
    { initialData: [] },
  )

  const { mutateAsync: deleteMany, isLoading: isLoadingDeleteMany } =
    Api.analyticsLocalMetric.deleteMany.useMutation()

  const handleDeleteMany = async () => {
    if (metrics.length === 0) {
      return
    }

    await deleteMany({
      where: { key: { in: metrics.map(metric => metric.key) } },
    })

    refetch()
  }

  const { countPositiveTotal, countNegativeTotal, createdAt, updatedAt } =
    useMemo(() => buildTotalMetric(metrics), [metrics])

  const isEmpty = metrics.length === 0

  if (isLoading) {
    return (
      <>
        <Skeleton />
      </>
    )
  }

  return (
    <Flex vertical gap={8}>
      <Flex justify="space-between" gap={8}>
        <Button icon={<SyncOutlined />} onClick={() => refetch()}>
          Refresh
        </Button>
        <Button
          icon={<ClearOutlined />}
          danger
          onClick={handleDeleteMany}
          loading={isLoadingDeleteMany}
          disabled={metrics.length === 0}
        >
          Reset All
        </Button>
      </Flex>

      {isLoading ? (
        <>
          <Skeleton />
        </>
      ) : isEmpty ? (
        <Flex style={{ padding: '20px' }} align="center" justify="center">
          <Typography.Text type="secondary">No metrics yet</Typography.Text>
        </Flex>
      ) : (
        <>
          <MetricCard
            label="Global"
            countNegative={countNegativeTotal}
            countPositive={countPositiveTotal}
            createdAt={createdAt}
            updatedAt={updatedAt}
          />

          {metrics.map(metric => (
            <MetricCard
              key={metric.key}
              label={metric.key}
              countNegative={metric.countNegative}
              countPositive={metric.countPositive}
              createdAt={metric.createdAt}
              updatedAt={metric.updatedAt}
            />
          ))}
        </>
      )}
    </Flex>
  )
}
