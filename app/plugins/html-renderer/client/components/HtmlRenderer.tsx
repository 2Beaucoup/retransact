import { useEffect } from 'react'
import { HtmlRendererProps } from '../types'
import { BrowserContainer } from './BrowserContainer'

export const HtmlRenderer = ({
  content,
  search,
  onNavigate,
}: HtmlRendererProps) => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'navigate' && onNavigate) {
        const targetPage = event.data.href?.slice(1)
        if (targetPage) {
          onNavigate(targetPage)
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [onNavigate])

  return (
    <BrowserContainer search={search}>
      <iframe
        style={{
          width: '100%',
          height: 'calc(100% - 80px)',
          border: 'none',
        }}
        srcDoc={content}
        sandbox="allow-scripts allow-forms allow-same-origin"
        onLoad={e => {
          const iframeDocument = e.target['contentDocument']
          const script = iframeDocument.createElement('script')
          script.textContent = `
            document.body.addEventListener('click', (event) => {
              const target = event.target;
              const href = target.getAttribute('href');
              if (href) {
                window.parent.postMessage({ type: 'navigate', href }, '*');
                event.preventDefault();
              }
            });
          `
          iframeDocument.body.appendChild(script)
        }}
      />
    </BrowserContainer>
  )
}
