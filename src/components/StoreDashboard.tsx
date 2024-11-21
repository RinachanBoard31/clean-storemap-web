import { StoreMap } from "../components/StoreMap";
import { useNearStores } from "../hooks/useNearStores";
// import { useFavoriteStores } from "../hooks/useFavoriteStores";
import { Store } from "../types/store";

type Props = {
  userId: string;
};

export const StoreDashboard: React.FC<Props> = (props) => {
  const {
    triggerNearStore,
    isMutatingNearStore,
    nearStores,
    errorNearStore,
    resetNearStore,
  } = useNearStores();

  // const { isMutatingFavoriteStore, favoriteStores, errorFavoriteStore } =
  //   useFavoriteStores(props.userId);
  // userIdを使ってお気に入りの店舗情報を取得するエンドポイントが完成したら切り替える
  const favoriteStores: Store[] = [];

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
        <StoreMap
          userId={props.userId}
          nearStores={nearStores}
          favoriteStores={favoriteStores}
        />
      )}
    </>
  );
};
