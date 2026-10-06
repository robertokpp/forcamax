import { Button } from "../components/Button";
import {
  IconCheck,
  IconClock,
  IconPause,
  IconX,
} from "../components/Icons";
import { useState } from "react";
export function TrainingSession() {
  const [pages, setPages] = useState(1);

  return (
    <main className="h-screen w-full overflow-y-auto bg-[#0C0C0E]">
      <header className="text-white p-4 border-b flex justify-between items-center">
        <Button variant="ghost" className="w-fit text-muted-foreground">
          <IconX color="#6B6B78"></IconX>
          Encerrar
        </Button>

        <div className="flex flex-col items-center">
          <span>Sessão ativa</span>
          <h1>PEITO & TRÍCEPS</h1>
        </div>

        <div className="flex items-center gap-4 bg-[#1E1E22] px-3 py-1 rounded-lg">
          <IconClock color="#C8F135"></IconClock>
          <span>04:00</span>
        </div>
      </header>

      <section className="px-6 py-8">
        <div>
          <div className="flex justify-between bg-accent/20 p-6 items-center rounded-t-2xl">
            <div className="flex flex-col text-white">
              <span className="font-sans text-muted-foreground">PEITORAL</span>
              <strong className="font-heading font-bold text-2xl">
                SUPINO RETO
              </strong>
            </div>

            <div className="flex gap-2">
              <div className="flex rounded-md text-white bg-[#1E1E22] w-fit px-1 py-1 gap-2">
                <button
                  className={`rounded-md py-2 px-4 cursor-pointer font-sans text-muted-foreground text-sm outline-0 ${pages === 1 && "bg-card text-white"}`}
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

              <div className="flex rounded-md text-white bg-accent p-2 items-center">
                <span>1/8</span>
              </div>
            </div>
          </div>

          {pages === 1 && (
            <div className="p-6 bg-card border border-[#252526] rounded-b-2xl">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="bg-[#252526] text-white rounded-xl flex flex-col items-center p-5 h-full justify-center">
                    <span className="text-[0.75rem] text-muted-foreground uppercase">
                      Séries
                    </span>
                    <p className="text-[24px] font-bold text-center">0/4</p>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="bg-[#252526] text-white rounded-xl flex flex-col items-center p-5 h-full justify-center">
                    <span className="text-[0.75rem] text-muted-foreground uppercase">
                      Reps
                    </span>
                    <p className="text-[24px] font-bold text-center">8-10</p>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="bg-[#252526] text-white rounded-xl flex flex-col items-center p-5 h-full justify-center">
                    <span className="text-[0.75rem] text-muted-foreground uppercase">
                      carga
                    </span>
                    <p className="text-[24px] font-bold text-center">80kg</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-1 py-4">
                <div
                  className="bg-[#1E1E22] w-fit p-1 rounded-full
                "
                >
                  <span className="p-2 text-muted-foreground">1</span>
                </div>
                <div
                  className="bg-[#1E1E22] w-fit p-1 rounded-full
                "
                >
                  <span className="p-2 text-muted-foreground">2</span>
                </div>
                <div
                  className="bg-[#1E1E22] w-fit p-1 rounded-full
                "
                >
                  <span className="p-2 text-muted-foreground">3</span>
                </div>
                <div
                  className="bg-[#1E1E22] w-fit p-1 rounded-full
                "
                >
                  <span className="p-2 text-muted-foreground">4</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button>
                  <IconCheck></IconCheck>
                  Concluir Série 1
                </Button>
                <Button className="w-fit bg-[#1E1E22] border border-[#2E2E32]">
                  <IconPause color="white"></IconPause>
                </Button>
              </div>
              <div className="items-center flex justify-center pt-3">
                <span className="text-[0.75rem] text-muted-foreground ">Descanso: 90s entre séries</span>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
