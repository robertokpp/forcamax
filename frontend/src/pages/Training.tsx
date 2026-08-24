import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { api } from "../services/api";
import { IconHeart, IconPlus } from "../components/Icons";
import { Card } from "../components/Card";
import { CardExercise } from "../components/CardExercise";

interface Training {
  id: string;
  name: string;
  difficulty: string;
}

interface Exercises {
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

  async function fetchTraining() {
    const response = await api.get("/training");
    setTrainings(response.data);
  }

  async function openCards(trainingId: string) {
    const response = await api.get(`/exercises/${trainingId}`);
    setExercises(response.data);
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
          <div className="flex justify-center items-center p-2 bg-accent/10 rounded-full border border-accent">
            <IconHeart color="#c8f135"></IconHeart>
          </div>
        </div>
      </header>

      <section className="p-5">
        <div className="text-white flex justify-between">
          <div>
            <p>MEUS TREINOS</p>
            {trainings.length === 0 && <small>Ainda não há treinos</small>}
            {trainings.length === 1 ? (
              <small>
                {trainings.length}
                <small> Plano</small>
              </small>
            ) : (
              <small>
                {trainings.length}
                <small> Planos</small>
              </small>
            )}
          </div>
          <Button title="Novo treino" className="w-fit">
            <IconPlus />
          </Button>
        </div>

        <div className=" flex rounded-md text-white bg-[#1E1E22] w-fit p-1 gap-2">
          <button className="bg-card p-1 rounded-md">Planos</button>
          <button>Histórico</button>
        </div>
      </section>

      <section className="p-4 flex flex-col gap-4">
        {trainings.map((item) => (
          <Card
            onClick={() => openCards(item.id)}
            className="cursor"
            key={item.id}
            title={item.name}
            difficulty={item.difficulty}
          ></Card>
        ))}
      </section>

      <section className="p-4 flex flex-col gap-2">
        {exercises.map((exercise, index) => (
          <CardExercise index={index} name={exercise.name}></CardExercise>
        ))}
      </section>
    </div>
  );
}
