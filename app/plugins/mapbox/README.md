# Mapbox Plugin

Mapbox is implemented via react-map-gl and mapbox-gl that are already installed.

## Activation

### Sign up to Mapbox and add the API Key in your .env

```bash
VITE_MAPBOX_TOKEN=
```

### Add `mapbox: MapboxServer.trpcRouter` in your appRouter:

`/app/server/index.tsx`

```tsx
mapbox: MapboxServer.trpcRouter
```

## Initialize a Map

```tsx
import Map from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function Page() {
  <Map
    mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
    initialViewState={{
      longitude: -122.4,
      latitude: 37.8,
      zoom: 14,
    }}
    style={{ width: 600, height: 400 }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  />
)
```

## Display Markers

```tsx
import * as React from 'react'
import Map, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function Page() {
  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 3.5,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker longitude={-100} latitude={40} anchor="bottom" />
    </Map>
  )
}
```

## Display Popup on Markers

```tsx
import * as React from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function Page() {
  const [selectedMarker, setSelectedMarker] = useState(null)

  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 3.5,
      }}
      onClick={e => {
        e.originalEvent.stopPropagation()
        setSelectedMarker({
          title: 'title',
          latitude: 40,
          longitude: -100,
        })
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker longitude={-100} latitude={40} anchor="bottom" />
      {selectedMarker && (
        <Popup
          longitude={Number(selectedMarker.longitude)}
          latitude={Number(selectedMarker.latitude)}
          anchor="bottom"
          onClose={() => setSelectedMarker(null)}
        >
          <h1>{selectedMarker.title}</h1>
        </Popup>
      )}
    </Map>
  )
}
```

## Retrieve Coordinates from an address

```tsx
const { mutateAsync: getCoordinates } =
  Api.mapbox.addressToCoordinates.useMutation()

const handleSubmit = async (values: any) => {
  const { longitude, latitude } = await getCoordinates({
    address: values.address,
  })
}
```

## Recommendations

- Make sure you have longitude: Float?, latitude: Float? on the object in your models file.

- Making API calls using the `addressToCoordinates` is expensive so it's best to store longitude, latitude in your models file and query those on creation of an item in the database.
