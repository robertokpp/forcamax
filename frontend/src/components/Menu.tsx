import { Outlet } from "react-router";
import { HeaderLogo } from "./HeaderLogo";
import { menu } from "../configs/menus";

import { useAuth } from "../hooks/useAuth";
import { NavItem } from "./NavItem";
import { useState } from "react";

export function Menu() {
  const { session } = useAuth();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden">
      {isOpenMenu && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setIsOpenMenu(false)}
          className="fixed inset-0 z-10 cursor-default bg-black/20"
        />
      )}

      <div
        className={`fixed top-0 left-0 z-20 h-screen transition-transform duration-500 ease-in-out ${
          isOpenMenu ? "translate-x-0" : "-translate-x-full pointer-events-none"
        }`}
      >
        <div className="bg-sidebar w-fit min-h-screen p-4 flex-col flex shadow-xl">
          <aside className="p-4 flex items-center justify-between gap-8">
            <HeaderLogo />

            <button
              type="button"
              aria-label="Fechar menu"
              title="Fechar menu"
              onClick={() => setIsOpenMenu(false)}
              className="text-gray-400 hover:text-white text-2xl leading-none cursor-pointer"
            >
              &times;
            </button>
          </aside>
          <div className="flex flex-1 flex-col justify-between">
            <nav>
              {menu.map((item) => (
                <NavItem
                  key={item.path}
                  title={item.title}
                  path={item.path}
                  icon={item.icon}
                />
              ))}
            </nav>

            <footer className="flex gap-3 items-center">
              <div className="bg-accent/20 w-8 h-8 flex items-center justify-center rounded-full border-2 border-accent">
                <span className="text-accent font-bold uppercase">{session?.user.name[0]}</span>
              </div>

              <div>
                <p className="text-white">{session?.user.name.split(" ")[0]}</p>
                <small className="text-muted-foreground">Intermediário</small>
              </div>
            </footer>
          </div>
        </div>
      </div>
      <main className="relative h-screen w-full overflow-y-auto bg-[#0C0C0E]">
        {!isOpenMenu && (
          <button
            type="button"
            aria-label="Abrir menu"
            title="Abrir menu"
            onClick={() => setIsOpenMenu(true)}
            className="absolute top-1 left-2 z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-sidebar text-2xl text-white shadow-lg hover:bg-white/10 cursor-pointer"
          >
            &#9776;
          </button>
        )}

        <Outlet />
      </main>
    </div>
  );
}
