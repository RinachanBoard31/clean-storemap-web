import React, { useCallback } from 'react';
import { AdvancedMarker, useMap } from '@vis.gl/react-google-maps';

type Props = {
  stores: { id: string; name: string; regularOpeningHours: string; priceLevel: string; location: { latitude: string; longitude: string } }[];
}

export const StoreMarkers: React.FC<Props> = (props) => {
  const map = useMap();
  const handleClick = useCallback((ev: google.maps.MapMouseEvent) => {
    if(!map) return;
    if(!ev.latLng) return;
    console.log('marker clicked:', ev.latLng.toString());
    map.panTo(ev.latLng);
  });

  return (
    <>
      {props.stores.map((store) => (
        <AdvancedMarker
          key={store.id}
          position={{lat: parseFloat(store.location.latitude), lng: parseFloat(store.location.longitude)}}
          clickable={true}
          onClick={handleClick}
        />
      ))}
    </>
  )
}