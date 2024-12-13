import { MapboxRouter } from './mapbox.router'
import { MapboxService } from './mapbox.service'

export namespace MapboxServer {
  export const service = MapboxService

  export const trpcRouter = MapboxRouter
}
