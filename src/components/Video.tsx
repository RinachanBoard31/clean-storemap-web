import videoSource from "../assets/earth.mp4"; // 動画ファイルをインポート
export const EarthVideo = () => {
  return (
    <>
      <video autoPlay muted loop className="video">
        <source src={videoSource} type="video/mp4" />
      </video>
    </>
  );
};
