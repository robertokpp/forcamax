import { Routes, Route } from "react-router";

import { Training } from "../pages/Training";
import { Menu } from "../components/Menu";

export function Free() {
  return (
    <Routes>
      <Route path="/" element={<Menu/>}>
      <Route path="/" index element={<Training />} />
      </Route>
    </Routes>
  );
}
