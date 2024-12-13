import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { Trpc } from '~/core/trpc/base'
import { MapboxService } from './mapbox.service'

export const MapboxRouter = Trpc.createRouter({
  addressToCoordinates: Trpc.procedure
    .input(
      z.object({
        address: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      if (!input.address) return null

      if (!process.env.VITE_MAPBOX_TOKEN) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message:
            'Set VITE_MAPBOX_TOKEN required in your .env to activate Mapbox',
        })
      }

      const { longitude, latitude } = await MapboxService.addressToCoordinates({
        address: input.address,
      })

      return {
        longitude,
        latitude,
      }
    }),
})
