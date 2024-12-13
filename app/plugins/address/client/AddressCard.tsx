import { LoadingOutlined } from '@ant-design/icons'
import { Address } from '@prisma/client'
import { Button, Card, Flex, Tag, Typography } from 'antd'
import React from 'react'
import countryList from 'react-select-country-list'
import { Utility } from '~/core/helpers/utility'
import { FormClient } from '../../form/client'
import { AddressInputs } from './AddressInputs'
import { useUsStates } from './useCountries'

type Props = {
  isLoading?: boolean
  address: Address
  onSetDefault?: () => void
  onChanged?: () => void
}

export const AddressCard: React.FC<Props> = ({
  isLoading,
  address,
  onSetDefault,
  onChanged,
}) => {
  const { UpdateButton, DeleteButton, FormView } = FormClient.useForModel({
    modelName: 'Address',
    onSuccess: onChanged,
  })

  const country = address.countryCode
    ? countryList().getLabel(address.countryCode)
    : null

  const { getLabel } = useUsStates()

  const state =
    address.countryCode === 'US' ? getLabel(address.region) : address.region

  const lines = [
    [address.line1, address.line2],
    [address.city, address.postalCode],
    [country, state],
  ]
    .map(blocs => blocs.filter(bloc => Utility.isDefined(bloc)).join(', '))
    .filter(item => Utility.isDefined(item))

  return (
    <>
      <Card
        title={
          <Flex className="w-full" align="center" gap={8}>
            {address.name}{' '}
            {address.isDefault && (
              <div>
                <Tag color="blue">Default</Tag>
              </div>
            )}
            {isLoading && (
              <Flex flex={1} justify="right">
                <LoadingOutlined />
              </Flex>
            )}
          </Flex>
        }
      >
        <Flex vertical gap={16}>
          <Flex vertical>
            {lines.map((line, index) => (
              <Flex key={index}>
                <Typography.Text>{line}</Typography.Text>
              </Flex>
            ))}
          </Flex>

          <Flex gap={8}>
            <UpdateButton where={{ id: address.id }}>
              {props => <Button {...props}>Edit</Button>}
            </UpdateButton>

            <DeleteButton where={{ id: address.id }}>
              {props => <Button {...props}>Delete</Button>}
            </DeleteButton>

            {!address.isDefault && onSetDefault && (
              <Button onClick={onSetDefault}>Set as Default</Button>
            )}
          </Flex>
        </Flex>
      </Card>

      <FormView>
        <AddressInputs />
      </FormView>
    </>
  )
}
