import { prisma } from "../src/lib/prisma";
import { hash } from "bcrypt";

async function seed() {
  const email = "roberto@teste.com";
  const password = await hash("12345678", 10);

  await prisma.user.upsert({
    where: { email },
    create: { name: "roberto", email, password },
    update: { name: "roberto", password },
  });

  const exerciseTable = await prisma.exercise.findMany({});

  if (exerciseTable.length === 0) {
    await prisma.exercise.createMany({
      data: [
        {
          name: "Agachamento livre",
          description:
            "Flexione os joelhos e o quadril, mantendo a coluna alinhada, e retorne à posição inicial.",
          muscleGroup: "Pernas e glúteos",
          equipment: "Opcional",
        },
        {
          name: "Flexão de braços",
          description:
            "Apoie as mãos no chão, abaixe o peito e estenda os braços para retornar.",
          muscleGroup: "Peito, ombros e tríceps",
          equipment: "Nenhum",
        },
        {
          name: "Remada curvada",
          description:
            "Incline o tronco e puxe a carga em direção ao abdômen, mantendo os cotovelos próximos ao corpo.",
          muscleGroup: "Costas e bíceps",
          equipment: "Halteres ou barra",
        },
        {
          name: "Prancha abdominal",
          description:
            "Sustente o corpo alinhado sobre os antebraços e as pontas dos pés.",
          muscleGroup: "Abdômen e core",
          equipment: "Colchonete opcional",
        },
        {
          name: "Afundo alternado",
          description:
            "Dê um passo à frente, flexione os joelhos e retorne antes de alternar a perna.",
          muscleGroup: "Pernas e glúteos",
          equipment: "Halteres opcionais",
        },
        {
          name: "Elevação lateral",
          description:
            "Eleve os braços lateralmente até a altura dos ombros e desça de forma controlada.",
          muscleGroup: "Ombros",
          equipment: "Halteres",
        },
        {
          name: "Rosca direta",
          description:
            "Flexione os cotovelos para aproximar a carga dos ombros sem movimentar o tronco.",
          muscleGroup: "Bíceps",
          equipment: "Halteres ou barra",
        },
        {
          name: "Tríceps no banco",
          description:
            "Apoie as mãos em um banco, flexione os cotovelos e empurre o corpo para cima.",
          muscleGroup: "Tríceps",
          equipment: "Banco ou cadeira",
        },
        {
          name: "Elevação pélvica",
          description:
            "Deitado, eleve o quadril contraindo os glúteos e retorne lentamente.",
          muscleGroup: "Glúteos e posteriores da coxa",
          equipment: "Colchonete opcional",
        },
        {
          name: "Polichinelo",
          description:
            "Salte abrindo simultaneamente as pernas e os braços, retornando em seguida.",
          muscleGroup: "Corpo inteiro",
          equipment: "Nenhum",
        },
        {
          name: "Abdominal bicicleta",
          description:
            "Alterne a aproximação do cotovelo ao joelho oposto enquanto estende a outra perna.",
          muscleGroup: "Abdômen e oblíquos",
          equipment: "Colchonete opcional",
        },
        {
          name: "Panturrilha em pé",
          description:
            "Eleve os calcanhares, sustente a contração e desça de forma controlada.",
          muscleGroup: "Panturrilhas",
          equipment: "Degrau opcional",
        },
        {
          name: "Burpee",
          description:
            "Agache, leve os pés para trás, faça uma flexão opcional e finalize com um salto.",
          muscleGroup: "Corpo inteiro",
          equipment: "Nenhum",
        },
        {
          name: "Superman",
          description:
            "Deitado de barriga para baixo, eleve braços e pernas enquanto mantém o abdômen apoiado.",
          muscleGroup: "Lombar, glúteos e costas",
          equipment: "Colchonete opcional",
        },
        {
          name: "Mountain climber",
          description:
            "Na posição de prancha, alterne rapidamente os joelhos em direção ao peito.",
          muscleGroup: "Abdômen, ombros e pernas",
          equipment: "Nenhum",
        },
      ],
    });

    const trainingTest = await prisma.training.create({
      data: {
        name: "Peito & triceps",
        difficulty: "intermediary",
        description: "Primeiro treino para teste",
        user: {
          connect: { email },
        },
        exercises: {
          connect: [
            { id: exerciseTable[0].id },
            { id: exerciseTable[1].id },
            { id: exerciseTable[2].id },
            { id: exerciseTable[3].id },
            { id: exerciseTable[4].id },
          ],
        },
      },
    });

    await prisma.trainingExercise.createMany({
      data: [
        {
          trainingId: trainingTest.id,
          exerciseId: exerciseTable[0].id,
          sets: 2,
          repetitions: "10",
          weight: "5kg",
          interval: "1",
        },
        {
          trainingId: trainingTest.id,
          exerciseId: exerciseTable[1].id,
          sets: 5,
          repetitions: "10",
          weight: "12kg",
          interval: "1",
        },
        {
          trainingId: trainingTest.id,
          exerciseId: exerciseTable[2].id,
          sets: 3,
          repetitions: "8",
          weight: "10kg",
          interval: "1",
        },
        {
          trainingId: trainingTest.id,
          exerciseId: exerciseTable[3].id,
          sets: 5,
          repetitions: "15",
          weight: "45kg",
          interval: "4",
        },
        {
          trainingId: trainingTest.id,
          exerciseId: exerciseTable[4].id,
          sets: 2,
          repetitions: "10",
          weight: "2kg",
          interval: "2",
        },
      ],
    });
  }
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
