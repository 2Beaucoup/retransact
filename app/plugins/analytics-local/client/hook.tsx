import { useState } from 'react'
import { Api } from '~/core/trpc'

export const useAnalyticsLocal = () => {
  const [cacheKeySaved, setCacheKey] = useState<string>()

  const { mutateAsync } = Api.trpc.analyticsLocal.track.useMutation()

  const track = (key: string, type: 'positive' | 'negative' = 'positive') => {
    const cacheKey = `${key};${type}`

    if (cacheKeySaved === cacheKey) {
      return
    }

    setCacheKey(cacheKey)

    mutateAsync({ key, type }).catch(error => {
      console.error(`Could not send event`)
      console.error(error)
    })
  }

  return {
    track,
  }
}
