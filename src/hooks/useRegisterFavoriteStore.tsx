import useSWRMutation from "swr/mutation";
import api from "../api/api";

export const useRegisterFavoriteStore = () => {
  const { trigger } = useSWRMutation(
    "http://localhost:8080/stores/favorite",
    api.sendPostRequest
  );

  return { trigger };
};
