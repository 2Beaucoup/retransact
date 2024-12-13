import { TranslationOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { useTranslation } from 'react-i18next'

export const LanguageSelector = () => {
  const { i18n } = useTranslation()

  const items = [
    {
      label: 'French',
      key: 'fr',
    },
    {
      label: 'English',
      key: 'en',
    },
  ]

  const handleChange = ({ key }) => {
    i18n.changeLanguage(key)
  }

  return (
    <Menu
      mode="horizontal"
      items={items}
      selectedKeys={[i18n.language]}
      style={{ width: 46 }}
      overflowedIndicator={<TranslationOutlined />}
      onClick={handleChange}
    />
  )
}
