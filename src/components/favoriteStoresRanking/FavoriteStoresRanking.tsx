import React from "react";
import { useShowFavoriteStoresRanking } from "../../hooks/useShowFavoriteStoresRanking.tsx";
import { FavoriteStoresTable } from "./FavoriteStoresTable.tsx";
import { FavoriteStoresTitle } from "./FavoriteStoresTitle.tsx";
import { LoadingIndicator } from "../common/LoadingIndicator.tsx";
import { ErrorMessage } from "../common/ErrorMessage.tsx";

const FavoriteStoresRanking: React.FC = () => {
  const {
    isMutatingFavoriteStore,
    rankedFavoriteStores,
    errorFavoriteStore,
  } = useShowFavoriteStoresRanking();

  if (isMutatingFavoriteStore) {
    return <LoadingIndicator />;
  }

  if (errorFavoriteStore) {
    return <ErrorMessage message={`Error loading stores: ${errorFavoriteStore.message}`} />;
  }

  if (!rankedFavoriteStores || rankedFavoriteStores.length === 0) {
    return <ErrorMessage message="No stores found in the ranking." />;
  }

  return (
    <>
      <FavoriteStoresTitle />
      <FavoriteStoresTable stores={rankedFavoriteStores} />
    </>
  );
};

export default FavoriteStoresRanking;
