import useSWRMutation from "swr/mutation";
import api from "../api/api";

export const useRegisterFavoriteStore = () => {
  const { trigger } = useSWRMutation(
    `http://localhost:8080/user/favorite-store`,
    api.sendPostRequest
  );

  return { trigger };
};
