import { StoreDashboard } from "./StoreDashboard";
import { useSession } from "../hooks/sessionUser";

export const Home = () => {
  const { getSessionId } = useSession();
  return (
    <>
      <StoreDashboard userId={getSessionId()} />
    </>
  );
};
