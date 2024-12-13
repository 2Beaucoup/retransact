import { Address } from '@prisma/client'
import React from 'react'
import { FormClient } from '../../form/client'
import { AddressInputs } from './AddressInputs'

type Props = {
  onCreated?: (address: Address) => void
}

export const CreateButton: React.FC<Props> = ({ onCreated }) => {
  const { CreateButton, FormView } = FormClient.useForModel({
    modelName: 'Address',
    onSuccess: onCreated,
  })

  return (
    <>
      <CreateButton />

      <FormView>
        <AddressInputs />
      </FormView>
    </>
  )
}
