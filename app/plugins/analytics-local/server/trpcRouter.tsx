import { z } from 'zod'
import { Trpc } from '~/core/trpc/base'

const TrackInputSchema = z.object({
  type: z.enum(['positive', 'negative']),
  key: z.string(),
})

export const trpcRouter = Trpc.createRouter({
  track: Trpc.procedurePublic
    .input(TrackInputSchema)
    .mutation(async ({ input, ctx }) => {
      const { type, key } = input

      try {
        const values =
          await ctx.databaseUnprotected.analyticsLocalMetric.findUnique({
            where: { key },
          })

        let countPositive = values?.countPositive ?? 0
        let countNegative = values?.countNegative ?? 0

        if (type === 'negative') {
          countNegative += 1
        } else {
          countPositive += 1
        }

        if (values) {
          await ctx.databaseUnprotected.analyticsLocalMetric.update({
            where: { key },
            data: {
              countPositive,
              countNegative,
            },
          })
        } else {
          await ctx.databaseUnprotected.analyticsLocalMetric.create({
            data: {
              key,
              countPositive,
              countNegative,
            },
          })
        }
      } catch (error) {
        console.warn(`Could no track "${key}"`)
        console.error(error)
      }

      return {}
    }),
})
