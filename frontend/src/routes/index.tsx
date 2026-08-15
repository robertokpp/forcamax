import { AuthRoutes } from "./auth-router";
import { BrowserRouter } from "react-router";

import { useAuth } from "../hooks/useAuth";
import { Free } from "./free";

export function Routes() {
  const { session } = useAuth();
  
  function Route() {
    if (session) {
      return <Free />;
    }
    return <AuthRoutes />;
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
