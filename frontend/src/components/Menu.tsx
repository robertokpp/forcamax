import { Outlet } from "react-router";

export function Menu() {
  return (
    <div>
      <h1>menu</h1>

      <Outlet />
    </div>
  );
}
