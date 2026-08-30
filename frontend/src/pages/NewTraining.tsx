import { useEffect, useState } from "react";
import {
  IconHeart,
  IconDumbbell,
  IconChevronLeft,
  IconChevronRight,
  IconCheck,
} from "../components/Icons";
import { Input, Select, Textarea } from "../components/Input";
import { api } from "../services/api";
import { Dropdown, DropdownList } from "../components/Dropdown";
import { Button } from "../components/Button";

interface Exercise {
  id: string;
  name: string;
  description: string;
  equipment: string;
  muscleGroup: string;
}

export function NewTraining() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  async function fetchExercises() {
    const response = await api.get("/exercises");
    setExercises(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <>
      <header className="text-white pl-20 pr-4 py-2 border-b flex justify-between items-center">
        <div>
          <p className="font-bold text-[20px]">TREINOS</p>
        </div>
        <div>
          <div className="flex justify-center items-center p-2 bg-accent/10 rounded-full border border-accent">
            <IconHeart color="#c8f135"></IconHeart>
          </div>
        </div>
      </header>

      {currentPage === 1 && (
        <section className="p-4 flex flex-col gap-8 pb-24">
          <Input
            id="NoneDoPlano"
            label="Nome do Plano *"
            required
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

          <Textarea
            id="description"
            label="Descrição"
            placeholder="Descreva o foco e objetivos deste treino..."
          >
            <label htmlFor="">
              <small className="text-muted-foreground">(opcional)</small>
            </label>
          </Textarea>

          <div>
            <label
              htmlFor="Peitoral"
              className="border-2 border-[#252526] px-3 py-1.5 rounded-lg bg-card text-muted-foreground"
            >
              Peitoral
            </label>
            <input type="checkbox" id="Peitoral" />
          </div>
        </section>
      )}

      {currentPage === 2 && (
        <section className="p-4 pb-24">
          <header className="text-white">
            <h2 className="font-bold">MONTAR TREINO</h2>
            <small className="text-muted-foreground">
              0 exercícios adicionados
            </small>
          </header>

          <Dropdown>
            {exercises.map((exercise) => (
              <DropdownList
                key={exercise.id}
                name={exercise.name}
                muscleGroup={exercise.muscleGroup}
              ></DropdownList>
            ))}
          </Dropdown>

          <div className="border-2 border-dashed border-[#252526] w-full p-10 flex flex-col justify-center items-center rounded-2xl mt-8">
            <IconDumbbell width="48" height="48" color="#28282E"></IconDumbbell>
            <p className="text-muted-foreground">Nenhum exercício ainda</p>
            <p className="text-[#28282E] text-center">
              Busque acima para adicionar exercício ao plano
            </p>
          </div>
        </section>
      )}

      {currentPage === 3 && (
        <section className="p-4 pb-24">
          <header className="text-white">
            <h2 className="font-bold">MONTAR TREINO</h2>
            <small className="text-muted-foreground">
              0 exercícios adicionados
            </small>
          </header>
        </section>
      )}

      <div className="bg-card w-full flex justify-between px-6 py-4 fixed bottom-0 left-0 z-5">
        <div>
          <Button
            variant="ghost"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
          >
            <IconChevronLeft color="#6B6B78" />
            Anterior
          </Button>
        </div>
        <div>
          {currentPage === totalPages ? (
            <Button>
              <IconCheck />
              Salvar Plano</Button>
          ) : (
            <Button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) => Math.min(page + 1, totalPages))
              }
            >
              Próximo
              <IconChevronRight />
            </Button>
          )}
        </div>
      </div>


    </>
  );
}
