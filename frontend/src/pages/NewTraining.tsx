import { useEffect, useState } from "react";
import {
  IconHeart,
  IconDumbbell,
  IconChevronLeft,
  IconChevronRight,
  IconCheck,
  IconPlus,
  IconTrash,
} from "../components/Icons";
import { Input, Textarea, InputDifficulty } from "../components/Input";
import { api } from "../services/api";
import { Dropdown } from "../components/Dropdown";
import { Button } from "../components/Button";

interface Exercise {
  id: string;
  name: string;
  description: string;
  equipment: string;
  muscleGroup: string;
}

type difficulty = "beginner" | "intermediary" | "advanced";

export function NewTraining() {
  const [availableExercises, setAvailableExercises] = useState<Exercise[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<difficulty>();

  async function fetchExercises() {
    const response = await api.get("/exercises");
    setAvailableExercises(response.data);
  }

  function include(item: Exercise) {
    setAvailableExercises((exercises) =>
      exercises.filter((exercise) => exercise.id !== item.id),
    );
    setSelectedExercises((exercises) => [...exercises, item]);
  }

  function remove(item: Exercise) {
    setSelectedExercises((exercises) =>
      exercises.filter((exercise) => exercise.id !== item.id),
    );
    setAvailableExercises((exercises) => [...exercises, item]);
  }

  useEffect(() => {
    fetchExercises();
  }, []);

  useEffect(() => {
    console.log(difficulty);
  }, [difficulty]);

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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3"
          ></Input>

          <ul className="flex gap-2">
            <InputDifficulty
              variant="beginner"
              name="difficulty"
              id="beginner"
              value="beginner"
              checked={difficulty === "beginner"}
              onChange={(e) => setDifficulty(e.target.value as difficulty)}
            >
              Iniciante
            </InputDifficulty>
            <InputDifficulty
              variant="intermediary"
              name="difficulty"
              id="intermediary"
              value={"intermediary"}
              checked={difficulty === "intermediary"}
              onChange={(e) => setDifficulty(e.target.value as difficulty)}
            >
              Intermediário
            </InputDifficulty>
            <InputDifficulty
              variant="advanced"
              name="difficulty"
              id="advanced"
              value={"advanced"}
              checked={difficulty === "advanced"}
              onChange={(e) => setDifficulty(e.target.value as difficulty)}
            >
              Avançado
            </InputDifficulty>
          </ul>

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
              {selectedExercises.length} exercício(s) adicionado(s)
            </small>
          </header>

          <Dropdown>
            {availableExercises.map((exercise) => (
              <li
                key={exercise.id}
                className="px-4 py-3 flex gap-3 items-center bg-card border-b border-[#252526]"
                onClick={() => include(exercise)}
              >
                <div className="bg-accent/10 w-fit h-fit p-2 rounded-lg">
                  <IconPlus color="#C8F135"></IconPlus>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#F0F0F2]">{exercise.name}</span>
                  <small className="text-muted-foreground">
                    {exercise.muscleGroup}
                  </small>
                </div>
              </li>
            ))}
          </Dropdown>

          {selectedExercises.length === 0 ? (
            <div className="border-2 border-dashed border-[#252526] w-full p-10 flex flex-col justify-center items-center rounded-2xl mt-8">
              <IconDumbbell
                width="48"
                height="48"
                color="#28282E"
              ></IconDumbbell>
              <p className="text-muted-foreground">Nenhum exercício ainda</p>
              <p className="text-[#28282E] text-center">
                Busque acima para adicionar exercício ao plano
              </p>
            </div>
          ) : (
            <ul className="mt-8 overflow-hidden rounded-2xl border border-[#252526]">
              {selectedExercises.map((exercise) => (
                <li
                  key={exercise.id}
                  className="flex items-center gap-3 border-b border-[#252526] bg-card px-4 py-3 last:border-b-0"
                >
                  <div className="h-fit w-fit rounded-lg bg-accent/10 p-2">
                    <IconDumbbell color="#C8F135" />
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <div className="flex flex-col ">
                      <span className="text-[#F0F0F2]">{exercise.name}</span>
                      <small className="text-muted-foreground">
                        {exercise.muscleGroup}
                      </small>
                    </div>

                    <button onClick={() => remove(exercise)}>
                      <IconTrash color="#4C4C55"></IconTrash>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
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
              Salvar Plano
            </Button>
          ) : (
            <Button
              disabled={
                (currentPage === 1 && name.length < 3) ||
                (currentPage === 2 && selectedExercises.length === 0)
              }
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
