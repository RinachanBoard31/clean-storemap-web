import React, { useCallback, useState, useEffect } from 'react';
import { AdvancedMarker, InfoWindow, useMap, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import styles from './StoreMarker.module.scss';

type Props = {
  store: { id: string; name: string; regularOpeningHours: string; priceLevel: string; location: { latitude: string; longitude: string } };
  isActive: boolean;
  onMarkerClick: () => void;
}

export const StoreMarker: React.FC<Props> = (props) => {
  const position = {lat: parseFloat(props.store.location.latitude), lng: parseFloat(props.store.location.longitude)};
  const map = useMap();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const handleMarkerClick = useCallback((ev: google.maps.MapMouseEvent) => {
    if(!map) return;
    if(!ev.latLng) return;
    console.log('marker clicked:', ev.latLng.toString());
    map.panTo(ev.latLng);
    props.onMarkerClick();
  }, [map, props.onMarkerClick]);
  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  useEffect(() => {
    setInfoWindowShown(props.isActive);
  }, [props.isActive]);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={position}
        clickable={true}
        onClick={handleMarkerClick}
      />
      {infoWindowShown && (
        <InfoWindow className={styles.body} anchor={marker} onClose={handleClose}>
          <h2>{props.store.name}</h2>
          <h3>{props.store.priceLevel}</h3>
          <ul className={styles.list} >
            {props.store.regularOpeningHours.split(", ").map((regularOpeningHour) => (
              <li>{regularOpeningHour}</li>
            ))}
          </ul>
        </InfoWindow>
      )}
    </>
  )
}