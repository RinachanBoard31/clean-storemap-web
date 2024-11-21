import { StoreMap } from "../components/StoreMap";
import { useNearStores } from "../hooks/useNearStores";
import { useFavoriteStores } from "../hooks/useFavoriteStores";

export const StoreDashboard: React.FC = () => {
  const {
    triggerNearStore,
    isMutatingNearStore,
    nearStores,
    errorNearStore,
    resetNearStore,
  } = useNearStores();

  const { isMutatingFavoriteStore, favoriteStores, errorFavoriteStore } =
    useFavoriteStores("1");

  function handleCallGetStores() {
    resetNearStore();
    triggerNearStore();
  }

  return (
    <>
      <h1>Clean Storemap Web</h1>

      <div className="card">
        <button onClick={handleCallGetStores}>店舗情報を取得</button>
        {isMutatingNearStore && <p>データ取得中...</p>}
        {errorNearStore && <p>{errorNearStore}</p>}
      </div>

      {nearStores && favoriteStores && (
        <StoreMap nearStores={nearStores} favoriteStores={favoriteStores} />
      )}
    </>
  );
};
