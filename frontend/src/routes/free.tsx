import { Routes, Route } from "react-router";

import { Training } from "../pages/Training";

export function Free() {
  return (
    <Routes>
      <Route path="/" index element={<Training />} />
    </Routes>
  );
}
