# HTML Renderer

Renders HTML content in a browser-like container with navigation capabilities

## Usage

```tsx
import { HtmlRenderer } from '~/plugins/html-renderer/client'
import { HtmlRendererProps } from '~/plugins/html-renderer/client/types'

const MyComponent = ({ content }: { content: string }) => {
  return (
    <HtmlRenderer
      content={content}
      search="Optional search text"
      onNavigate={path => console.log('Navigated to:', path)}
    />
  )
}
```

## Props

| Prop       | Type                   | Required | Description            |
| ---------- | ---------------------- | -------- | ---------------------- |
| content    | string                 | Yes      | HTML content to render |
| search     | string                 | No       | Search query           |
| onNavigate | (path: string) => void | No       | Navigation callback    |

## Example

```tsx
import { HtmlRenderer } from '@/plugins/html-renderer/client'

const MyComponent = () => {
  return (
    <HtmlRenderer
      content="<h1>Hello World</h1>"
      search="query"
      onNavigate={path => console.log(path)}
    />
  )
}
```
