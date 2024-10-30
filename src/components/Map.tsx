import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 35.68554104748237,
  lng: 139.7528246814339,
};

type Props = {
  handleCallGetStores: () => void;
}

export const Map: React.FC<Props> = (props) => {
  return (
    <div>
      <div className="card">
        <button onClick={props.handleCallGetStores}>押すぅ！</button>
      </div>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={17}
        ></GoogleMap>
      </LoadScript>
    </div>
  )
}
