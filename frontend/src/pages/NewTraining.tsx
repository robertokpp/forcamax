import { Button } from "../components/Button";
import { IconHeart } from "../components/Icons";
import { Input } from "../components/Input";

export function NewTraining() {
  return (
    <>
      <header className="text-white pl-20 pr-4 py-2 border-b flex justify-between items-center">
        <div>
          <p className="font-bold text-[20px]">TREINOS</p>
          <p>Sábado, 5 de Julho · Semana 27</p>
        </div>
        <div>
          <div className="flex justify-center items-center p-2 bg-accent/10 rounded-full border border-accent">
            <IconHeart color="#c8f135"></IconHeart>
          </div>
        </div>
      </header>

      <section className="p-4 flex flex-col gap-8">
        <Input
          id="NoneDoPlano"
          label="Nome do Plano *"
          placeholder="Ex: Peito & Tríceps — Hipertrofia"
          className="px-3"
        ></Input>

        <div className="flex justify-between">
          <div>
            <input
              id="Iniciante"
              type="radio"
              name="difficulty"
              className="peer appearance-none"
            ></input>
            <label
              htmlFor="Iniciante"
              className="p-3 bg-[#32d399]/10 peer-checked:bg-accent"
            >
              Iniciante
            </label>
          </div>

          <div>
            <input
              id="Intermediário"
              type="radio"
              name="difficulty"
              className="peer appearance-none"
            ></input>
            <label
              className="w-full p-3 bg-card border border-[#252526] rounded-xl text-muted-foreground peer-checked:border-[#cd7f32] peer-checked:bg-[#cd7f32]/10 peer-checked:text-[#cd7f32]"
              htmlFor="Intermediário"
            >
              Intermediário
            </label>
          </div>

          <div>
            <input
              id="Avançado"
              type="radio"
              name="difficulty"
              className="peer appearance-none"
            ></input>
            <label
              htmlFor="Avançado"
              className="p-3 bg-[#cd7f32] peer-checked:bg-accent"
            >
              Avançado
            </label>
          </div>
        </div>
      </section>
    </>
  );
}
