import { Button } from "../components/Button";
import { IconClock, IconFlame, IconLayers, IconX } from "../components/Icons";
import { useState } from "react";
export function TrainingSession() {
  const [pages, setPages] = useState(1);

  return (
    <main className="h-screen w-full overflow-y-auto bg-[#0C0C0E]">
      <header className="text-white p-4 border-b flex justify-between items-center">
        <Button variant="ghost" className="w-fit">
          <IconX color="white"></IconX>
          Encerrar
        </Button>

        <div className="flex flex-col items-center">
          <span>Sessão ativa</span>
          <h1>PEITO & TRÍCEPS</h1>
        </div>

        <div className="flex items-center gap-4">
          <IconClock color="white"></IconClock>
          <span>04:00</span>
        </div>
      </header>

      <section className="p-4">
        <div>
          <div className="flex">
            <div>
              <span>PEITORAL</span>
              <strong>SUPINO RETO</strong>
            </div>
            <div className=" flex rounded-md text-white bg-[#1E1E22] w-fit p-1 gap-2 mt-4">
              <button
                className={`rounded-md py-1 px-4 cursor-pointer font-sans text-muted-foreground text-sm outline-0 ${pages === 1 && "bg-card text-white"}`}
                onClick={() => setPages(1)}
              >
                Series
              </button>

              <button
                className={`rounded-md py-1 px-4 cursor-pointer text-muted-foreground text-sm outline-0 ${pages === 2 && "bg-card text-white"}`}
                onClick={() => setPages(2)}
              >
                Como Fazer
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <div className="bg-card border border-[#252526] text-white rounded-xl flex flex-col items-center p-5 gap-2 h-full">
                <IconClock color="#6B6B78"></IconClock>
                <p className="text-[18px] font-bold text-center">5555</p>
                <span className="text-[12px] text-muted-foreground nowrap">
                  Duração
                </span>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-card border border-[#252526]  p-4 text-white rounded-xl flex flex-col items-center gap-2 h-full">
                <IconLayers color="#6B6B78"></IconLayers>
                <p className="text-[18px] font-bold text-center">
                  {"exercises"}
                </p>
                <span className="text-[12px] text-muted-foreground">
                  Exercícios
                </span>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-card border border-[#252526]  p-4 text-white rounded-xl flex flex-col items-center gap-2 h-full">
                <IconFlame color="#6B6B78"></IconFlame>
                <p className="text-[18px] font-bold text-center">{`kcal`}</p>
                <span className="text-[12px] text-muted-foreground">
                  Calorias
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
