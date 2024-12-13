import { Col, Form, Input, Row, Select } from 'antd'
import { useCountries, useUsStates } from './useCountries'

const UsState = () => {
  const { states } = useUsStates()

  return (
    <Form.Item
      label="State"
      name="region"
      rules={[{ required: true, message: 'State is required' }]}
    >
      <Select
        showSearch
        placeholder="Select a state"
        options={states.map(({ code, label }) => ({
          value: code,
          label,
        }))}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
      />
    </Form.Item>
  )
}

const UsZipcode = () => {
  return (
    <Form.Item
      label="Zip Code"
      name="postalCode"
      rules={[
        { required: true, message: 'Zip code is required' },
        {
          pattern: /^\d{5}(-\d{4})?$/,
          message: 'Invalid ZIP code format (e.g., 12345 or 12345-6789)',
        },
      ]}
    >
      <Input placeholder="12345" />
    </Form.Item>
  )
}

const UkPostalCode = () => {
  return (
    <Form.Item
      label="Postal Code"
      name="postalCode"
      rules={[
        { required: true, message: 'Postal Code is required' },
        {
          pattern: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/,
          message: 'Invalid UK postal code format (e.g., SW1A 1AA)',
        },
      ]}
    >
      <Input placeholder="Postal Code" />
    </Form.Item>
  )
}

const PostalCode = () => {
  return (
    <Form.Item
      label="Postal Code"
      name="postalCode"
      rules={[{ required: true, message: 'Postal Code is required' }]}
    >
      <Input placeholder="Postal Code" />
    </Form.Item>
  )
}

export const AddressInputs = () => {
  const { countries } = useCountries()

  const updateForCountry = (valuesBefore, valuesAfter) => {
    return valuesBefore.countryCode !== valuesAfter.countryCode
  }

  return (
    <>
      <Form.Item
        label="Name / Company Name"
        name="name"
        rules={[{ required: true, message: 'Name is required' }]}
      >
        <Input placeholder="Name" />
      </Form.Item>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Country"
            name="countryCode"
            rules={[{ required: true, message: 'Country is required' }]}
          >
            <Select
              showSearch
              placeholder="Select a country"
              options={countries.map(({ value, label }) => ({
                value,
                label,
              }))}
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item shouldUpdate={updateForCountry}>
            {({ getFieldValue }) => {
              const countryCode = getFieldValue('countryCode')
              const isUS = countryCode === 'US'
              const isGB = countryCode === 'GB'

              if (isUS) {
                return <UsState />
              } else if (isGB) {
                return <UkPostalCode />
              } else {
                return <PostalCode />
              }
            }}
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Line 1"
        name="line1"
        rules={[{ required: true, message: 'Line 1 is required' }]}
      >
        <Input placeholder="Street Address" />
      </Form.Item>

      <Form.Item label="Line 2 (optional)" name="line2">
        <Input placeholder="Apartment, Suite, Unit, etc." />
      </Form.Item>

      <Row gutter={[16, 16]} className="pb-2">
        <Col xs={24} md={12}>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: 'City is required' }]}
          >
            <Input placeholder="City" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item shouldUpdate={updateForCountry}>
            {({ getFieldValue }) => {
              const countryCode = getFieldValue('countryCode')
              const isUS = countryCode === 'US'

              if (isUS) {
                return <UsZipcode />
              } else {
                return (
                  <Form.Item label="Region" name="region">
                    <Input placeholder="Region" />
                  </Form.Item>
                )
              }
            }}
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}
