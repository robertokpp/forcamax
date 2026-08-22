import { useEffect } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { api } from "../services/api";

export function Training() {
  async function fetchTraining() {
    const response = await api.get("/training");

    console.log(response.data);
  }

  useEffect(() => {
    fetchTraining();
  }, []);


  return (
    <div className="w-full h-full flex flex-col">
      <header className="text-white pl-20 pr-4 py-2 border-b flex justify-between items-center">
        <div>
          <p className="font-bold text-[20px]">TREINOS</p>
          <p>Sábado, 5 de Julho · Semana 27</p>
        </div>
        <div>
          <div className="w-10 h-10 bg-accent/10 rounded-full border border-accent"></div>
        </div>
      </header>

      <section className="p-5">
        <div className="text-white flex justify-between">
          <div>
            <p>MEUS TREINOS</p>
            <small>4 planos</small>
          </div>
          <Button className="w-fit">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.16663 10H15.8333"
                stroke="#000"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10 4.16666V15.8333"
                stroke="#000"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Button>
        </div>

        <div className=" flex rounded-md text-white bg-[#1E1E22] w-fit p-1 gap-2">
          <button className="bg-card p-1 rounded-md">Planos</button>
          <button>Histórico</button>
        </div>
      </section>

      <section className="p-4">
        <div>
          <Input
            id="pesquisa"
            label=""
            placeholder="Buscar treino ou músculo..."
          ></Input>
        </div>

        <div className="flex flex-col bg-card p-4 text-white rounded-xl">
          <div className="flex gap-2">
            <div className="bg-accent/10 text-accent rounded-sm px-2">
              <small>PUSH</small>
            </div>
            <div>
              <small>Intermediário</small>
            </div>
          </div>
          <p className="font-bold">PEITO E TRICEPS</p>
          <div className="flex gap-4 text-muted-foreground">
            <small>55 min</small>
            <small>8 ex.</small>
            <small>460</small>
          </div>
        </div>
      </section>
    </div>
  );
}
