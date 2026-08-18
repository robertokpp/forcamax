import { Outlet } from "react-router";
import { HeaderLogo } from "./HeaderLogo";
import { menu } from "../configs/menus";

import { useAuth } from "../hooks/useAuth";
import { NavItem } from "./NavItem";
import { useState } from "react";


export function Menu() {
  const { session } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
  
  return (
    <div className="flex min-h-screen">
      
      <div className={`bg-sidebar w-fit min-h-screen p-4 flex flex-col ${isOpen ? "flex" : "hidden" }`}>
        <aside className="p-4">
          <HeaderLogo />
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
              <span className="text-accent font-bold">R</span>
            </div>

            <div>
              <p className="text-white">{session?.user.name}</p>
              <small className="text-muted-foreground">Intermediário</small>
            </div>
          </footer>
        </div>
      </div>

      <main className="w-full min-h-screen bg-[#0C0C0E]">
        <Outlet />
      </main>
    </div>
  );
}


