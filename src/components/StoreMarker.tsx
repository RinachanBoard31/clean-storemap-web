import React, { useCallback, useState, useEffect } from 'react';
import { AdvancedMarker, InfoWindow, useMap, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import styles from './StoreMarker.module.scss';
import DollarIcon from '../assets/dollar.svg';

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
  const dollarIcon = <img src={DollarIcon} alt="DollarIcon" />;

  function priceLevelToText(priceLevel: string) {
    switch (priceLevel) {
      case "PRICE_LEVEL_UNSPECIFIED":
        return (<p>価格指定なし</p>);
      case "PRICE_LEVEL_FREE":
        return (<p>無料</p>);
      case "PRICE_LEVEL_INEXPENSIVE":
        return (dollarIcon);
      case "PRICE_LEVEL_MODERATE":
        return (<>{dollarIcon}{dollarIcon}</>);
      case "PRICE_LEVEL_EXPENSIVE":
        return (<>{dollarIcon}{dollarIcon}{dollarIcon}</>);
      case "PRICE_LEVEL_VERY_EXPENSIVE":
          return (<>{dollarIcon}{dollarIcon}{dollarIcon}{dollarIcon}</>);
      default:
        return (<p>価格指定なし</p>);
    }
  }

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
          {priceLevelToText(props.store.priceLevel)}
          <ul className={styles.list} >
            {props.store.regularOpeningHours.split(", ").map((regularOpeningHour, index) => (
              <li key={props.store.id + regularOpeningHour + index}>{regularOpeningHour}</li>
            ))}
          </ul>
        </InfoWindow>
      )}
    </>
  )
}