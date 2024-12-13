# Analytics Local

Integrate simple green/red points analytics directly into your app — no third-party services required.

## Why Use It?

If you need quick, basic metrics to gauge your app's traction, this plugin is perfect. Track user interest with easy-to-understand visuals.

## How It Works: Green / Red Points

- **Green Points**: Record when users perform a positive action (e.g., click "Learn More").
- **Red Points**: Record when users leave without taking the desired action.

The result is a percentage bar showing how close you are to 100% positive interactions.

---

## Installation

1. Update your `models.zmodel` to include the `AnalyticsLocalMetric` model

   ```
   model AnalyticsLocalMetric {
       key           String   @id
       countPositive Int      @default(0)
       countNegative Int      @default(0)

       createdAt     DateTime @default(now())
       updatedAt     DateTime @updatedAt @default(now())

       @@allow('all', auth().globalRole == 'ADMIN')
   }
   ```

1. Add the `analyticsLocal` router into the `app/server/index.tsx` appRouter

   ```tsx
   import { AnalyticsLocalServer } from '~/plugins/analytics-local/server'

   export const appRouter = Trpc.mergeRouters(
   ...
   Trpc.createRouter({
      ...
      analyticsLocal: AnalyticsLocalServer.trpcRouter,
      ...
   })
   ...
   )
   ```

1. Add a new router page, e.g., `/admins.analytics_/route.tsx`, and use the `AnalyticsLocalClient.Metrics` component

   ```tsx
   import { PageLayout } from '@/designSystem'
   import { AnalyticsLocalClient } from '~/plugins/analytics-local/client'

   export default function AdminAnalyticsPage() {
     return (
       <PageLayout layout="narrow">
         <AnalyticsLocalClient.Metrics />
       </PageLayout>
     )
   }
   ```

1. Done. Once you start tracking metrics, analytics will be displayed here.

## Usage

Let’s track a new metric, e.g. `product-learn-more`

1. Import the `AnalyticsLocalClient.use()` hook

   ```tsx
   import { AnalyticsLocalClient } from '~/plugins/analytics-local/client'

   const { track } = AnalyticsLocalClient.use()
   ```

1. Record positive (green) points

   ```tsx
   track('product-learn-more', 'positive')
   ```

1. Record negative (red) points

   ```tsx
   track('product-learn-more', 'negative')
   ```
