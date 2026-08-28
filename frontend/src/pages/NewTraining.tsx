import { useEffect, useState } from "react";
import { IconHeart, IconDumbbell } from "../components/Icons";
import { Input, Select, Textarea } from "../components/Input";
import { api } from "../services/api";

interface Exercise {
  id: string;
  name: string;
  description: string;
  equipment: string;
  muscleGroup: string;
}

export function NewTraining() {
  const [exercises, setExercises] = useState<Exercise[]>([]);

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

      <section className="p-4">
        <header className="text-white">
          <h2 className="font-bold">MONTAR TREINO</h2>
          <small className="text-muted-foreground">
            0 exercícios adicionados
          </small>
        </header>

        <Input
          id="buscarTreino"
          placeholder="Buscar exercício por nome ou músculo..."
          className="px-3 mb-2.5"
        ></Input>

        <Select id="exercise" name="exercise">
          {exercises.map((exercise) => (
            <Option value={exercise.id} >{exercise.name}</Option>
          ))}
        </Select>

        <div className="border-2 border-dashed border-[#252526] w-full p-10 flex flex-col justify-center items-center rounded-2xl">
          <IconDumbbell width="48" height="48" color="#28282E"></IconDumbbell>
          <p className="text-muted-foreground">Nenhum exercício ainda</p>
          <p className="text-[#28282E] text-center">
            Busque acima para adicionar exercício ao plano
          </p>
        </div>
      </section>
    </>
  );
}
