import { useEffect } from "react";
import { changeVideoBoxShadowColor } from "../hooks/home/useChangeVideoBoxShadowColor";
import videoSource from "../assets/earth.mp4";
import "../css/EarthVideo.css";
export const EarthVideo = () => {
  useEffect(() => {
    setInterval(() => changeVideoBoxShadowColor(), 30);
  }, []);
  return (
    <>
      <video autoPlay muted loop className="video">
        <source src={videoSource} type="video/mp4" />
      </video>
    </>
  );
};
