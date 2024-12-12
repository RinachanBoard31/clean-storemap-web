import React, { useCallback, useState, useEffect } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  useMap,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import styles from "./StoreMarker.module.scss";
import { StoreFavoriteButton } from "./StoreFavoriteButton";
import { PriceLevelIcons } from "./icons/PriceLevelIcons";
import { Store } from "../types/store";
import { useRegisterFavoriteStore } from "../hooks/useRegisterFavoriteStore";

type Props = {
  store: Store;
  isActive: boolean;
  isFavorite: boolean;
  markerColor?: string;
  onMarkerClick: () => void;
};

export const StoreMarker: React.FC<Props> = (props) => {
  const position = {
    lat: parseFloat(props.store.location.latitude),
    lng: parseFloat(props.store.location.longitude),
  };
  const map = useMap();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);
  const handleMarkerClick = useCallback(
    (ev: google.maps.MapMouseEvent) => {
      if (!map) return;
      if (!ev.latLng) return;
      console.log("marker clicked:", ev.latLng.toString());
      map.panTo(ev.latLng);
      props.onMarkerClick();
      setInfoWindowShown(true);
    },
    [map, props.onMarkerClick]
  );
  function handleClose() {
    setInfoWindowShown(false);
  }
  const { trigger } = useRegisterFavoriteStore();
  function handleFavoriteButtonClick() {
    trigger({
      storeId: props.store.id,
      storeName: props.store.name,
      regularOpeningHours: props.store.regularOpeningHours,
      priceLevel: props.store.priceLevel,
      latitude: props.store.location.latitude,
      longitude: props.store.location.longitude,
    });
    setIsFavorite(true);
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
        <InfoWindow
          className={styles.body}
          anchor={marker}
          onClose={handleClose}
        >
          <h2>{props.store.name}</h2>
          {PriceLevelIcons({ priceLevel: props.store.priceLevel })}
          <ul className={styles.list}>
            {props.store.regularOpeningHours
              .split(", ")
              .map((regularOpeningHour, index) => (
                <li key={props.store.id + regularOpeningHour + index}>
                  {regularOpeningHour}
                </li>
              ))}
          </ul>
          <StoreFavoriteButton
            isFavorite={isFavorite}
            onHandleFavoriteButtonClick={handleFavoriteButtonClick}
          />
        </InfoWindow>
      )}
    </>
  );
};
