import { ProxyConfiguration } from '@nangohq/node'
import { AxiosResponse } from 'axios'
import { NangoApi } from './internal/nango'

class Service {
  private nango = new NangoApi()

  async proxy(config: ProxyConfiguration): Promise<AxiosResponse<any, any>> {
    return this.nango.proxy(config)
  }

  async getAccessToken(
    providerKey: string,
    connectionId: string,
  ): Promise<string> {
    return this.nango.getAccessToken(providerKey, connectionId)
  }

  isActive(): boolean {
    return this.nango.isActive()
  }
}

class Singleton {
  static service = new Service()
}

export const NangoService = Singleton.service