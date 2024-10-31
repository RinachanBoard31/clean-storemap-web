import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { StoreMarkers } from './StoreMarkers';

const containerStyle = {
  width: "500px",
  height: "500px",
};

type Props = {
  stores: { id: string; name: string; regularOpeningHours: string; priceLevel: string; location: { latitude: string; longitude: string } }[];
}

export const StoreMap: React.FC<Props> = (props) => {
  const defaultCenter = {lat: parseFloat(props.stores[0].location.latitude), lng: parseFloat(props.stores[0].location.longitude)};

  return (
    <div>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
          mapId="map"
          style={containerStyle}
          defaultCenter={defaultCenter}
          defaultZoom={15}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        />
        <StoreMarkers stores={props.stores} />
      </APIProvider>
    </div>
  )
}
