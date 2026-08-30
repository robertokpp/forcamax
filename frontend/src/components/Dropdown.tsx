import { IconPlus, IconSearch } from "./Icons";
import React, { useState } from "react";

type Props = {
  isOpen?: () => boolean;
  children?: React.ReactNode;
};

export function Dropdown({ children }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="w-full bg-secondary py-3 rounded-xl border-2 border-[#2E2E32] text-white focus:border-accent hover:border-accent  relative flex items-center overflow-hidden">
        <label htmlFor="InputDropDown" className="px-4">
          <IconSearch color="#3F3F47"></IconSearch>
        </label>
        <input
          id="InputDropDown"
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          placeholder="Buscar exercício por nome ou músculo..."
          className="p-11 w-full h-full absolute placeholder:text-[14px] placeholder:text-[#3F3F47] focus:outline-0"
        ></input>
      </div>

      <div
        className={`border border-[#252526] rounded-xl overflow-hidden my-1 ${open ? "" : "hidden"}`}
      >
        <ul className="h-64 overflow-auto">{children}</ul>
      </div>
    </>
  );
}

type PropsList = {
  name: string;
  muscleGroup: string;
};

export function DropdownList({ name, muscleGroup }: PropsList) {
  return (
    <li className="px-4 py-3 flex gap-3 items-center bg-card border-b border-[#252526] ">
      <div className="bg-accent/10 w-fit h-fit p-2 rounded-lg">
        <IconPlus color="#C8F135"></IconPlus>
      </div>
      <div className="flex flex-col">
        <span className="text-[#F0F0F2]">{name}</span>
        <small className="text-muted-foreground">{muscleGroup}</small>
      </div>
    </li>
  );
}
