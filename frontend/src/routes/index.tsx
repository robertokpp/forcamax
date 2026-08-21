import { AuthRoutes } from "./auth-routes";
import { BrowserRouter } from "react-router";

import { useAuth } from "../hooks/useAuth";
import { AppRoutes } from "./app-routes";

import { Loading } from "../components/Loading";

export function Routes() {
  const { session, isLoading } = useAuth();

  function Route() {
    if (isLoading) {
      return <Loading className="min-h-screen"/>; 
    }

    if (session?.user.id && session?.token) {
      return <AppRoutes />;
    }
    return <AuthRoutes />;
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
