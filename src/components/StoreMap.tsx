import { useState, useCallback } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { StoreMarker } from './StoreMarker';

const containerStyle = {
  width: "500px",
  height: "500px",
};

type Props = {
  stores: { id: string; name: string; regularOpeningHours: string; priceLevel: string; location: { latitude: string; longitude: string } }[];
}

export const StoreMap: React.FC<Props> = (props) => {
  const defaultCenter = {lat: parseFloat(props.stores[0].location.latitude), lng: parseFloat(props.stores[0].location.longitude)};
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);
  const handleMarkerClick = useCallback((id: string) => {
    setActiveMarkerId(id);
  }, []);

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
        {props.stores.map((store) => (
          <StoreMarker
            key={store.id}
            store={store}
            isActive={activeMarkerId === store.id}
            onMarkerClick={() => handleMarkerClick(store.id)}
          />
        ))}
      </APIProvider>
    </div>
  )
}
