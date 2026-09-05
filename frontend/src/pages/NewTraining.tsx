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
import { Tags } from "../components/Tags";

interface Exercise {
  id: string;
  name: string;
  description: string;
  equipment: string;
  muscleGroup: string;
}

type difficulty = "beginner" | "intermediary" | "advanced";
type tags = "push" | "pull" | "legs" | "full" | "core" | "hit";

export function NewTraining() {
  const [availableExercises, setAvailableExercises] = useState<Exercise[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const [name, setName] = useState("");
  const [tags, setTags] = useState<tags>("push");
  const [difficulty, setDifficulty] = useState<difficulty>("intermediary");
  const [description, setDescription] = useState("");

  const [sets, setSets] = useState("3");
  const [repetitions, setRepetitions] = useState("10-12");
  const [weight, setWeight] = useState("");
  const [interval, setInterval] = useState("60s");

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

          <div className="flex justify-between gap-2 flex-wrap">
            <Tags
              variant="push"
              label="push"
              id="push"
              name="tags"
              value={"push"}
              checked={tags === "push"}
              onChange={(e) => setTags(e.target.value as tags)}
            ></Tags>
            <Tags
              variant="pull"
              label="pull"
              id="pull"
              name="tags"
              value={"pull"}
              checked={tags === "pull"}
              onChange={(e) => setTags(e.target.value as tags)}
            ></Tags>
            <Tags
              variant="legs"
              label="legs"
              id="legs"
              name="tags"
              value={"legs"}
              checked={tags === "legs"}
              onChange={(e) => setTags(e.target.value as tags)}
            ></Tags>
            <Tags
              variant="full"
              label="full"
              id="full"
              name="tags"
              value={"full"}
              checked={tags === "full"}
              onChange={(e) => setTags(e.target.value as tags)}
            ></Tags>
            <Tags
              variant="core"
              label="core"
              id="core"
              name="tags"
              value={"core"}
              checked={tags === "core"}
              onChange={(e) => setTags(e.target.value as tags)}
            ></Tags>
            <Tags
              variant="hit"
              label="hiit"
              id="hit"
              name="tags"
              value={"hit"}
              checked={tags === "hit"}
              onChange={(e) => setTags(e.target.value as tags)}
            ></Tags>
          </div>

          <ul className="flex gap-2 flex-wrap">
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
            <label htmlFor="">
              <small className="text-muted-foreground">(opcional)</small>
            </label>
          </Textarea>

          <div className="flex flex-wrap">
            <div>
              <input checked={true} type="checkbox" id="Peitoral" className="peer" />
              <label
                htmlFor="Peitoral"
                className="border-2 border-[#252526] px-3 py-1.5 rounded-lg bg-card text-muted-foreground peer-checked:bg-accent/10 peer-checked:text-accent peer-checked:border-accent"
              >
                Peitoral
              </label>
            </div>
           
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
            <ul className="flex flex-col gap-4 mt-10">
              {selectedExercises.map((exercise) => (
                <li
                  key={exercise.id}
                  className="flex flex-col not-last:items-center border border-[#252526] bg-card  last:border-b-0 overflow-hidden rounded-2xl "
                >
                  <div className="flex w-full gap-2 items-center px-4 py-3">
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

                      <button
                        className="cursor-pointer"
                        onClick={() => remove(exercise)}
                      >
                        <IconTrash color="#4C4C55"></IconTrash>
                      </button>
                    </div>
                  </div>

                  <div className="flex w-full">
                    <div className="p-3 flex-1 border-t border-r border-[#2E2E32]">
                      <p className="uppercase text-muted-foreground mb-3">
                        Séries
                      </p>
                      <input
                        className="uppercase text-white w-full outline-0"
                        placeholder="3"
                        value={sets}
                        onChange={(e) => setSets(e.target.value)}
                      ></input>
                    </div>
                    <div className="p-3 flex-1 border-t border-[#2E2E32]">
                      <p className="uppercase text-muted-foreground mb-3 ">
                        Reps
                      </p>
                      <input
                        className="uppercase text-white w-full outline-0"
                        placeholder="10-12"
                        value={repetitions}
                        onChange={(e) => setRepetitions(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <div className="p-3 flex-1 border-t border-r border-[#2E2E32]">
                      <p className="uppercase text-muted-foreground mb-3">
                        Carga
                      </p>
                      <input
                        className="uppercase text-white w-full outline-0"
                        placeholder="60KG"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      ></input>
                    </div>
                    <div className="p-3 flex-1 border-t border-[#2E2E32]">
                      <p className="uppercase text-muted-foreground mb-3 ">
                        Descanso
                      </p>
                      <input
                        className="uppercase text-white w-full outline-0"
                        placeholder="60s"
                        value={interval}
                        onChange={(e) => setInterval(e.target.value)}
                      ></input>
                    </div>
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
            <h2 className="font-bold uppercase">REVISAR PLANO</h2>
            <small className="text-muted-foreground">
              Confira os detalhes antes de salvar
            </small>
          </header>

          <div className=" bg-card rounded-2xl mt-10 border border-muted-foreground overflow-hidden ">
            <div className="p-6">
              <div className="w-fit flex gap-2">
                <Tags
                  variant={tags}
                  label={tags}
                  id={tags}
                  name={tags}
                  value={tags}
                  checked={tags === tags}
                  onChange={(e) => setTags(e.target.value as tags)}
                  className="px-2 py-0.5"
                ></Tags>

                <InputDifficulty
                  variant={difficulty}
                  name={difficulty}
                  id={difficulty}
                  value={difficulty}
                  checked={difficulty === difficulty}
                  onChange={(e) => setDifficulty(e.target.value as difficulty)}
                  className="px-2 py-0.5"
                >
                  Iniciante
                </InputDifficulty>
              </div>

              <div className="pt-3">
                <p className="font-bold text-[24px] text-white">{name}</p>
                <p className=" pt-3 text-[14px] text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
            <div className="flex w-full items-center">
              <div className="flex-1">
                <div className="flex flex-col justify-center items-center border-t border-b border-muted-foreground p-4">
                  <p>{selectedExercises.length}</p>
                  <p>
                    {selectedExercises.length === 1
                      ? "Exercício"
                      : "Exercícios"}
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col justify-center items-center border border-muted-foreground p-4">
                  <p>{selectedExercises.length}</p>
                  <p>
                    {selectedExercises.length === 1
                      ? "Exercício"
                      : "Exercícios"}
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col justify-center items-center border-t border-b border-muted-foreground p-4">
                  <p>{selectedExercises.length}</p>
                  <p>
                    {selectedExercises.length === 1
                      ? "Exercício"
                      : "Exercícios"}
                  </p>
                </div>
              </div>
            </div>
          </div>
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
