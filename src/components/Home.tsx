import { StoreDashboard } from "./StoreDashboard";
import { useSession } from "../hooks/auth/useSession";

export const Home = () => {
  const { getSessionId } = useSession();
  return (
    <>
      <StoreDashboard userId={getSessionId()} />
    </>
  );
};
