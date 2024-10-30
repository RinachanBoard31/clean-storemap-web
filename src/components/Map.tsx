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
  stores: { id: string; name: string; regularOpeningHours: string; priceLevel: string }[];
}

export const Map: React.FC<Props> = (props) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>regularOpeningHours</th>
            <th>priceLevel</th>
          </tr>
        </thead>
        <tbody>
          {props.stores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.regularOpeningHours}</td>
              <td>{store.priceLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={17}
        ></GoogleMap>
      </LoadScript> */}
    </div>
  )
}
