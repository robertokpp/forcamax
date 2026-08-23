import { Routes, Route } from "react-router";

import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { NotFound } from "../pages/NotFound";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" index element={<SignIn />} />
      <Route path="/cadastrar" element={<SignUp />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
