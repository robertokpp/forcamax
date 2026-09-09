import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { api } from "../services/api";
import { IconHeart, IconPlus } from "../components/Icons";
import { Card } from "../components/Card";
import { CardExercise } from "../components/CardExercise";
import { data, useNavigate } from "react-router";

interface Training {
  id: string;
  name: string;
  description: string;
  difficulty: "beginner" | "intermediary" | "advanced";
  tag: "push" | "pull" | "legs" | "full" | "core" | "hit";
}

interface Exercises {
  id: string;
  name: string;
  muscleGroup: string;
  interval: string;
  weight: string;
  repetitions: string;
  set: string;
}

export function Training() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [exercises, setExercises] = useState<Exercises[]>([]);
  const [openCard, setOpenCard] = useState(null);
  const [pages, setPages] = useState(1);

  const navigate = useNavigate();

  async function fetchTraining() {
    const response = await api.get("/training");
    setTrainings(response.data);
    console.log(response.data);
  }

  async function openCards(trainingId: string) {
    const response = await api.get(`/exercises/${trainingId}`);
    setExercises(response.data);
  }

  useEffect(() => {
    fetchTraining();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <header className="text-white pl-20 pr-4 py-2 border-b flex justify-between items-center">
        <div>
          <h2 className="font-bold font-heading text-xl">TREINOS</h2>
        </div>
        <div>
          <div className="flex justify-center items-center p-2 bg-accent/10 rounded-full border border-accent">
            <IconHeart color="#c8f135"></IconHeart>
          </div>
        </div>
      </header>

      <section className="p-6">
        <div className="text-white flex justify-between">
          <div>
            <h3 className="font-bold font-heading text-2xl">MEUS TREINOS</h3>
            {trainings.length === 0 && (
              <small className="font-sans text-xs text-muted-foreground">
                Ainda não há treinos
              </small>
            )}
            {trainings.length === 1 ? (
              <small className="font-sans text-xs text-muted-foreground">
                {trainings.length}
                <small className="font-sans text-xs text-muted-foreground">
                  {" "}
                  Plano
                </small>
              </small>
            ) : (
              <small className="font-sans text-xs text-muted-foreground">
                {trainings.length}
                <small className="font-sans text-xs text-muted-foreground">
                  {" "}
                  Planos
                </small>
              </small>
            )}
          </div>
          <Button
            title="Novo treino"
            className="w-fit"
            onClick={() => navigate("/Novo-treino")}
          >
            <IconPlus />
          </Button>
        </div>

        <div className=" flex rounded-md text-white bg-[#1E1E22] w-fit p-1 gap-2 mt-4">
          <button
            className={`rounded-md py-1 px-4 cursor-pointer font-sans text-muted-foreground text-sm outline-0 ${pages === 1 && "bg-card text-white"}`}
            onClick={() => setPages(1)}
          >
            Planos
          </button>

          <button
            className={`rounded-md py-1 px-4 cursor-pointer text-muted-foreground text-sm outline-0 ${pages === 2 && "bg-card text-white"}`}
            onClick={() => setPages(2)}
          >
            Histórico
          </button>
        </div>
      </section>

      {pages === 1 && (
        <section className="p-4 flex flex-col gap-4">
          {trainings.map((item) => (
            <Card
              onClick={() => openCards(item.id)}
              className="cursor"
              key={item.id}
              tag={item.tag}
              title={item.name}
              difficulty={item.difficulty}
            ></Card>
          ))}

          {exercises.map((exercise, index) => (
            <CardExercise
              key={exercise.id}
              index={index}
              name={exercise.name}
              muscleGroup={exercise.muscleGroup}
              set={exercise.set}
              repetitions={exercise.repetitions}
              interval={exercise.interval}
              weight={exercise.weight}
            ></CardExercise>
          ))}
        </section>
      )}

      {pages === 2 && (
        <section className="p-4 flex flex-col gap-2">
          <div>
            <p className="text-white">
              AQUI VAI FICAR OS DIAS QUER FOI REALIZADOS OS TREINOS
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
