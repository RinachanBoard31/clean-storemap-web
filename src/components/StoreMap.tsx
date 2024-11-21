import { useState, useCallback } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { StoreMarker } from "./StoreMarker";
import { Store } from "../types/store";

const containerStyle = {
  width: "500px",
  height: "500px",
};

type Props = {
  nearStores: Store[];
  favoriteStores: Store[];
};

export const StoreMap: React.FC<Props> = (props) => {
  const defaultCenter = props.nearStores.length > 0 && {
    lat: parseFloat(props.nearStores[0].location.latitude),
    lng: parseFloat(props.nearStores[0].location.longitude),
  };
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);
  const favoriteStoreIds = props.favoriteStores.map((store) => store.id);
  const handleMarkerClick = useCallback((id: string) => {
    setActiveMarkerId(id);
  }, []);

  return (
    <div>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        {defaultCenter ? (
          <>
            <Map
              mapId="map"
              style={containerStyle}
              defaultCenter={defaultCenter}
              defaultZoom={15}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
            />
            {props.nearStores.map((store) => (
              <StoreMarker
                key={store.id}
                store={store}
                isActive={activeMarkerId === store.id}
                isFavorite={favoriteStoreIds.includes(store.id)}
                onMarkerClick={() => handleMarkerClick(store.id)}
              />
            ))}
          </>
        ) : (
          <p>周辺に店舗がありません</p>
        )}
      </APIProvider>
    </div>
  );
};
