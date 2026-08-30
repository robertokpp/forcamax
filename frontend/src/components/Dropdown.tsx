import { IconPlus, IconSearch } from "./Icons";
import { useState } from "react";

type Props = {
  isOpen: () => boolean;
};

export function Dropdown() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <button className="w-full bg-secondary py-3 px-4 rounded-xl border-2 border-[#2E2E32] focus:outline-0 focus:border-accent hover:border-accent placeholder:text-[#3F3F47]">
        <div className="flex gap-2">
          <IconSearch color="#6B6B78"></IconSearch>
          <span className="text-[14px] text-[#3F3F47]">
            Buscar exercício por nome ou músculo...
          </span>
        </div>
      </button>

      <div
        className={`border border-[#252526] rounded-xl overflow-hidden my-1 ${open ? "" : "hidden"}`}
      >
        <ul className="">
          <li className="px-4 py-3 flex gap-3 items-center bg-card border-b border-[#252526] ">
            <div className="bg-accent/10 w-fit h-fit p-2 rounded-lg">
              <IconPlus color="#C8F135"></IconPlus>
            </div>
            <div className="flex flex-col">
              <span className="text-[#F0F0F2]">Supino Reto</span>
              <small className="text-muted-foreground">Peitoral · Barra</small>
            </div>
          </li>
          <li className="px-4 py-3 flex gap-3 items-center bg-card">
            <div className="bg-accent/10 w-fit h-fit p-2 rounded-lg">
              <IconPlus color="#C8F135"></IconPlus>
            </div>
            <div className="flex flex-col">
              <span className="text-[#F0F0F2]">Supino Reto</span>
              <small className="text-muted-foreground">Peitoral · Barra</small>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
