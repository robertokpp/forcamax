import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { api } from "../services/api";
import {
  IconArrowLeft,
  IconArrowRight,
  IconClock,
  IconFlame,
  IconHeart,
  IconLayers,
  IconPlay,
  IconPlus,
} from "../components/Icons";
import { Card } from "../components/Card";
import { CardExercise } from "../components/CardExercise";
import { useNavigate } from "react-router";

interface Training {
  id: string;
  name: string;
  description: string;
  exercises: [
    {
      id: string;
      name: string;
      muscleGroup: string;
      interval: string;
      weight: string;
      repetitions: string;
      set: string;
    },
  ];
  difficulty: "beginner" | "intermediary" | "advanced";
  tag: "push" | "pull" | "legs" | "full" | "core" | "hit";
}

export function Training() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [exercises, setExercises] = useState<Training>();
  const [openCard, setOpenCard] = useState("");
  const [pages, setPages] = useState(1);

  const navigate = useNavigate();

  async function fetchTraining() {
    const response = await api.get("/training");
    setTrainings(response.data);
  }

  async function openCards(trainingId: Training) {
    setExercises(trainingId);
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
                {`${trainings.length} Plano`}
              </small>
            ) : (
              <small className="font-sans text-xs text-muted-foreground">
                {`${trainings.length} Planos`}
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
          {trainings.map((item, index) => (
            <Card
              onClick={() => {
                openCards(trainings[index]);
                setOpenCard(item.id);
              }}
              className={`${openCard === item.id && "border-accent"}`}
              key={item.id}
              tag={item.tag}
              title={item.name}
              difficulty={item.difficulty}
              exercises={item.exercises.length}
            ></Card>
          ))}

          {exercises && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="bg-card border border-[#252526] text-white rounded-xl flex flex-col items-center p-5 gap-2 h-full">
                      <IconClock color="#6B6B78"></IconClock>
                      <p className="text-[18px] font-bold text-center">{`${exercises.exercises.length * 6} min`}</p>
                      <span className="text-[12px] text-muted-foreground nowrap">
                        Duração
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-card border border-[#252526]  p-4 text-white rounded-xl flex flex-col items-center gap-2 h-full">
                      <IconLayers color="#6B6B78"></IconLayers>
                      <p className="text-[18px] font-bold text-center">
                        {exercises.exercises.length}
                      </p>
                      <span className="text-[12px] text-muted-foreground">
                        Exercícios
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-card border border-[#252526]  p-4 text-white rounded-xl flex flex-col items-center gap-2 h-full">
                      <IconFlame color="#6B6B78"></IconFlame>
                      <p className="text-[18px] font-bold text-center">{`${exercises.exercises.length * 60} kcal`}</p>
                      <span className="text-[12px] text-muted-foreground">
                        Calorias
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground text-[12px] font-sans">
                    {exercises.description}
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <h2 className="font-heading font-bold text-[18px] text-white">
                  EXERCÍCIOS
                </h2>
                <span className="text-muted-foreground">{`${exercises?.exercises.length} movimentos`}</span>
              </div>

              {exercises?.exercises.map((exercise, index) => (
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
              <div>
                <Button>
                  <IconPlay></IconPlay>
                  INICIAR TREINO
                  <IconArrowRight></IconArrowRight>
                </Button>
              </div>
            </div>
          )}
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
