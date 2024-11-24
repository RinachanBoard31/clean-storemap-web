import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { FavoriteStoresMarker } from "./FavoriteStoresMarker";
import { Store } from "../../types/store";

const containerStyle = {
  width: "800px",
  height: "400px",
};

type Props = {
  stores: Store[];
};

export const FavoriteStoresMap: React.FC<Props> = ({ stores }) => {
  if (stores.length === 0) {
    return <p>No stores available to display on the map.</p>;
  }

  const center = {
    lat: parseFloat(stores[0].location.latitude),
    lng: parseFloat(stores[0].location.longitude),
  };

  return (
    <div style={{ margin: "20px auto", textAlign: "center" }}>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
          mapId="favorite-stores-map"
          style={containerStyle}
          defaultCenter={center}
          defaultZoom={14}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        />
        {stores.slice(0, 3).map((store, index) => (
          <FavoriteStoresMarker key={store.id} store={store} rank={index + 1} />
        ))}
      </APIProvider>
    </div>
  );
};
