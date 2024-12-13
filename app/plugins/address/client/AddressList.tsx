import { Address } from '@prisma/client'
import { Col, Flex, message, Row, Skeleton } from 'antd'
import React, { useState } from 'react'
import { useUserContext } from '~/core/context'
import { Api } from '~/core/trpc'
import { AddressCard } from './AddressCard'
import { CreateButton } from './CreateButton'

export const AddressList: React.FC = () => {
  const { user } = useUserContext()

  const [addressLoading, setAddressLoading] = useState<Address>()

  const {
    data: addresses = [],
    isLoading,
    refetch,
  } = Api.address.findMany.useQuery(
    {
      where: user ? { userId: user.id } : undefined,
      orderBy: {
        createdAt: 'asc',
      },
    },
    { initialData: [] },
  )

  const { mutateAsync: updateAddress } = Api.address.update.useMutation()
  const { mutateAsync: updateManyAddress } =
    Api.address.updateMany.useMutation()

  const handleSetDefault = async (address: Address) => {
    setAddressLoading(address)

    try {
      await updateManyAddress({
        where: { userId: user.id },
        data: { isDefault: false },
      })

      await updateAddress({
        where: { id: address.id },
        data: { isDefault: true },
      })

      refetch()
    } catch (error) {
      message.error(`Could not set address as default`)
      console.error(error)
    }

    setAddressLoading(null)
  }

  return (
    <>
      <Flex justify="right" className="mb-4">
        <CreateButton onCreated={() => refetch()} />
      </Flex>

      <Row gutter={[16, 16]}>
        {isLoading && addresses.length === 0 && (
          <>
            <Col xs={24} sm={24} md={12} lg={8} xl={6}>
              <Skeleton />
            </Col>
          </>
        )}

        {addresses.map(address => (
          <Col key={address.id} xs={24} sm={24} md={12} lg={8} xl={6}>
            <AddressCard
              isLoading={addressLoading?.id === address.id}
              address={address}
              onSetDefault={() => handleSetDefault(address)}
              onChanged={() => refetch()}
            />
          </Col>
        ))}
      </Row>
    </>
  )
}
