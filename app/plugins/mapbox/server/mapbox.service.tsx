export class Service {
  constructor() {}

  async addressToCoordinates(options: {
    address: string
  }): Promise<{ latitude: number; longitude: number }> {
    const response = await fetch(
      `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
        options.address,
      )}&access_token=${process.env.VITE_MAPBOX_TOKEN}`,
    )

    const data = await response.json()

    if (!data.features?.length) return null

    const longitude = data.features[0].properties?.coordinates?.longitude
    const latitude = data.features[0].properties?.coordinates?.latitude

    return {
      longitude,
      latitude,
    }
  }
}

class Singleton {
  static service = new Service()
}

export const MapboxService = Singleton.service
