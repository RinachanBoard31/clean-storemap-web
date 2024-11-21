import { StoreMap } from "../components/StoreMap";
import { useNearStores } from "../hooks/useNearStores";

export const StoreDashboard: React.FC = () => {
  const { trigger, isMutating, data, error, reset } = useNearStores();

  function handleCallGetStores() {
    reset();
    trigger();
  }

  return (
    <>
      <h1>Clean Storemap Web</h1>

      <div className="card">
        <button onClick={handleCallGetStores}>店舗情報を取得</button>
        {isMutating && <p>データ取得中...</p>}
        {error && <p>{error}</p>}
      </div>

      {data && <StoreMap stores={data.stores} />}
    </>
  );
};
