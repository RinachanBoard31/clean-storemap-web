import { StoreDashboard } from "./StoreDashboard";
import { useSession } from "../hooks/user/useSession";

export const Home = () => {
  const { getSessionId } = useSession();
  return (
    <>
      <StoreDashboard userId={getSessionId()} />
    </>
  );
};
