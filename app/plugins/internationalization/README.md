# Internationalization Plugin

Enables language support for your application, making it easy to switch between different languages and provide translations across your app.

## Installation

To get started, add the following line to your `app/root.tsx` file:

```tsx
import '~/plugins/internationalization/client/setup'
```

This will initialize the plugin and make the internationalization functionality available in your app.

## Usage

### Translating Content

To translate content, you can use the `useTranslation` hook. Here's an example of how to use it:

```tsx
import { useTranslation } from 'react-i18next'

export default function ProductPage() {
  const { t } = useTranslation()

  return (
    <PageLayout>
      ...
      <Typography.Text>{t('welcome')}</Typography.Text>
      ...
    </PageLayout>
  )
}
```

In this example, the `t('welcome')` will fetch the translated text for the 'welcome' key based on the current language.

### Adding Content

1. Inside the internationalization plugin you can find a locales folder containing all the translations (`app/plugins/(delete)/internationalization/client/locales`).
2. Add new keys to your different translations in these files to allow more content.

You can also add new languages by creating a folder for them (e.g `es`), then add it to the list index.ts file at the same location.
Edit the `LanguageSelector` component to add the new option (if using the component).

### Language Selector

The plugin includes a `LanguageSelector` component that allows users to switch between available languages.
This component can be used in your app to provide a language-switching interface:

```tsx
export default function Topbar() {
  return (
    <PageLayout>
      ...
      <LanguageSelector />
      ...
    </PageLayout>
  )
}
```
