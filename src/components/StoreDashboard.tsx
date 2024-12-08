import { StoreMap } from "../components/StoreMap";
import { useNearStores } from "../hooks/useNearStores";
import { useFavoriteStores } from "../hooks/useFavoriteStores";

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

  function handleCallGetStores() {
    resetNearStore();
    triggerNearStore();
  }

  const { favoriteStores } = useFavoriteStores(props.userId);

  return (
    <>
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
