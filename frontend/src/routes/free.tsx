import { Routes, Route } from "react-router";

import { Training } from "../pages/Training";
import { Dashboard } from "../pages/Dashboard";
import { Progress } from "../pages/Progress";
import { Profile } from "../pages/Profile";
import { Agenda } from "../pages/Agenda";
import { Conquest } from "../pages/Conquest";
import { Menu } from "../components/Menu";

export function Free() {
  return (
    <Routes>
      <Route path="/" element={<Menu />}>
        <Route path="/" index element={<Dashboard />} />
        <Route path="/Treinos" element={<Training />} />
        <Route path="/Agenda" element={<Agenda />} />
        <Route path="/Progresso" element={<Progress />} />
        <Route path="/Conquistas" element={<Conquest />} />
        <Route path="/Perfil" element={<Profile />} />
      </Route>
    </Routes>
  );
}
