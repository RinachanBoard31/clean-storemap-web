import React, { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { Store } from "../../types/store";

type Props = {
  store: Store;
  rank: number;
};

export const FavoriteStoresMarker: React.FC<Props> = ({ store, rank }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const position = {
      lat: parseFloat(store.location.latitude),
      lng: parseFloat(store.location.longitude),
    };

    // グラデーション付きのSVGアイコンを生成
    const generateIcon = (color1: string, color2: string, strokeColor: string) => {
      return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
              <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d="M12 2C8.13401 2 5 5.13401 5 9c0 5.25 7 12.742 7 12.742S19 14.25 19 9c0-3.86599-3.134-7-7-7zm0 10.5c-1.381 0-2.5-1.119-2.5-2.5S10.619 7.5 12 7.5s2.5 1.119 2.5 2.5S13.381 12.5 12 12.5z" 
            fill="url(#grad1)" 
            stroke="${strokeColor}" 
            stroke-width="2" />
        </svg>
      `)}`;
    };

    const iconColors: Record<number, { start: string; end: string; stroke: string }> = {
      1: { start: "#FFD700", end: "#FFB700", stroke: "#B8860B" }, // 金色 + 濃い金色の縁
      2: { start: "#C0C0C0", end: "#A9A9A9", stroke: "#808080" }, // 銀色 + 濃い銀色の縁
      3: { start: "#CD7F32", end: "#B87333", stroke: "#8B4513" }, // 銅色 + 濃い銅色の縁
    };

    const color = iconColors[rank] || { start: "#646cff", end: "#4646ff", stroke: "#000080" }; // デフォルトは青系
    const iconUrl = generateIcon(color.start, color.end, color.stroke);

    const marker = new google.maps.Marker({
      position,
      map,
      icon: {
        url: iconUrl,
        scaledSize: new google.maps.Size(40, 40),
      },
      clickable: true,
    });

    return () => {
      marker.setMap(null);
    };
  }, [map, store, rank]);

  return null;
};
