import videoSource from "../assets/earth.mp4";
import "../css/EarthVideo.css";
export const EarthVideo = () => {
  return (
    <>
      <video autoPlay muted loop className="video">
        <source src={videoSource} type="video/mp4" />
      </video>
    </>
  );
};
