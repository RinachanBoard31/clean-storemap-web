import { useEffect } from "react";
import useSWRMutation from "swr/mutation";
import api from "../api/api";

export const useFavoriteStores = (userId: string) => {
  const { trigger, data, reset } = useSWRMutation(
    `http://localhost:8080/user/${userId}/favorite-store`,
    api.sendGetRequest
  );

  useEffect(() => {
    reset();
    trigger();
  }, [reset, trigger]);

  return {
    favoriteStores: data?.stores,
  };
};
