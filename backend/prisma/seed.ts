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

  const targetMuscle = await prisma.targetMuscles.findMany({});

  if (targetMuscle.length === 0) {
    await prisma.targetMuscles.createMany({
      data: [
        {
          name: "Peitoral",
        },
        {
          name: "Dorsal",
        },
        {
          name: "Bíceps",
        },
        {
          name: "Tríceps",
        },
        {
          name: "Ombros",
        },
        {
          name: "Quadríceps",
        },
        {
          name: "Posteriores",
        },
        {
          name: "Glúteos",
        },
        {
          name: "Panturrilha",
        },
        {
          name: "Core",
        },
        {
          name: "Abdômen",
        },
        {
          name: "Trapézio",
        },
        {
          name: "Antebraço",
        },
        {
          name: "Cardio",
        },
      ],
    });
  }

  const exerciseTable = await prisma.exercise.findMany({});

  if (exerciseTable.length === 0) {
    await prisma.exercise.createMany({
      data: [
        // =========================
        // PEITO
        // =========================
        {
          name: "Flexão de braços",
          description:
            "Apoie as mãos no chão, abaixe o peito mantendo o corpo alinhado e estenda os braços para retornar.",
          muscleGroup: "Peito, ombros e tríceps",
          equipment: "Nenhum",
        },
        {
          name: "Flexão inclinada",
          description:
            "Apoie as mãos em uma superfície elevada, abaixe o peito e empurre o corpo de volta.",
          muscleGroup: "Peito e tríceps",
          equipment: "Banco ou apoio elevado",
        },
        {
          name: "Flexão declinada",
          description:
            "Apoie os pés em uma superfície elevada e execute a flexão mantendo o corpo alinhado.",
          muscleGroup: "Peito superior, ombros e tríceps",
          equipment: "Banco ou apoio elevado",
        },
        {
          name: "Flexão diamante",
          description:
            "Posicione as mãos próximas formando um triângulo e execute a flexão de braços.",
          muscleGroup: "Tríceps e peito",
          equipment: "Nenhum",
        },
        {
          name: "Supino reto com barra",
          description:
            "Deitado no banco, abaixe a barra até próximo ao peito e empurre até estender os braços.",
          muscleGroup: "Peito, ombros e tríceps",
          equipment: "Barra e banco",
        },
        {
          name: "Supino reto com halteres",
          description:
            "Deitado no banco, abaixe os halteres lateralmente ao peito e empurre para cima.",
          muscleGroup: "Peito, ombros e tríceps",
          equipment: "Halteres e banco",
        },
        {
          name: "Supino inclinado com barra",
          description:
            "Em banco inclinado, abaixe a barra em direção à parte superior do peito e empurre novamente.",
          muscleGroup: "Peito superior, ombros e tríceps",
          equipment: "Barra e banco inclinado",
        },
        {
          name: "Supino inclinado com halteres",
          description:
            "Em banco inclinado, abaixe os halteres e empurre-os para cima de forma controlada.",
          muscleGroup: "Peito superior, ombros e tríceps",
          equipment: "Halteres e banco inclinado",
        },
        {
          name: "Supino declinado",
          description:
            "Em banco declinado, abaixe a carga em direção ao peito e empurre novamente.",
          muscleGroup: "Peito inferior e tríceps",
          equipment: "Barra ou halteres",
        },
        {
          name: "Crucifixo reto",
          description:
            "Deitado no banco, abra os braços mantendo leve flexão nos cotovelos e aproxime os halteres acima do peito.",
          muscleGroup: "Peito",
          equipment: "Halteres e banco",
        },
        {
          name: "Crucifixo inclinado",
          description:
            "Em banco inclinado, abra os braços lateralmente e aproxime os halteres acima do peito.",
          muscleGroup: "Peito superior",
          equipment: "Halteres e banco inclinado",
        },
        {
          name: "Crossover",
          description:
            "Puxe os cabos das laterais para frente até aproximar as mãos diante do corpo.",
          muscleGroup: "Peito",
          equipment: "Polia",
        },
        {
          name: "Peck deck",
          description:
            "Aproxime os braços à frente do corpo contra a resistência da máquina.",
          muscleGroup: "Peito",
          equipment: "Máquina peck deck",
        },

        // =========================
        // COSTAS
        // =========================
        {
          name: "Remada curvada",
          description:
            "Incline o tronco e puxe a carga em direção ao abdômen mantendo os cotovelos próximos ao corpo.",
          muscleGroup: "Costas e bíceps",
          equipment: "Barra ou halteres",
        },
        {
          name: "Remada unilateral",
          description:
            "Com uma mão apoiada, puxe o halter em direção ao quadril e retorne lentamente.",
          muscleGroup: "Costas e bíceps",
          equipment: "Halter e banco",
        },
        {
          name: "Remada baixa",
          description:
            "Sentado, puxe o cabo em direção ao abdômen mantendo o peito aberto.",
          muscleGroup: "Costas e bíceps",
          equipment: "Polia baixa",
        },
        {
          name: "Remada cavalinho",
          description:
            "Puxe a barra em direção ao tronco mantendo a coluna firme e os cotovelos direcionados para trás.",
          muscleGroup: "Costas e bíceps",
          equipment: "Barra ou máquina",
        },
        {
          name: "Remada máquina",
          description:
            "Puxe as alças em direção ao tronco e retorne de forma controlada.",
          muscleGroup: "Costas e bíceps",
          equipment: "Máquina",
        },
        {
          name: "Puxada frontal",
          description:
            "Puxe a barra em direção à parte superior do peito mantendo o tronco estável.",
          muscleGroup: "Costas e bíceps",
          equipment: "Polia alta",
        },
        {
          name: "Puxada pegada neutra",
          description:
            "Puxe a barra ou triângulo em direção ao peito usando uma pegada neutra.",
          muscleGroup: "Costas e bíceps",
          equipment: "Polia alta",
        },
        {
          name: "Puxada supinada",
          description:
            "Puxe a barra em direção ao peito com as palmas das mãos voltadas para você.",
          muscleGroup: "Costas e bíceps",
          equipment: "Polia alta",
        },
        {
          name: "Barra fixa pronada",
          description:
            "Suspenda o corpo e puxe-se para cima até aproximar o peito da barra.",
          muscleGroup: "Costas e bíceps",
          equipment: "Barra fixa",
        },
        {
          name: "Barra fixa supinada",
          description:
            "Suspenda o corpo com pegada supinada e puxe-se para cima.",
          muscleGroup: "Costas e bíceps",
          equipment: "Barra fixa",
        },
        {
          name: "Pulldown braço reto",
          description:
            "Com os braços quase estendidos, puxe a barra da polia para baixo em direção às coxas.",
          muscleGroup: "Dorsais",
          equipment: "Polia alta",
        },
        {
          name: "Pullover com halter",
          description:
            "Deitado no banco, leve o halter para trás da cabeça e retorne sobre o peito.",
          muscleGroup: "Dorsais e peito",
          equipment: "Halter e banco",
        },

        // =========================
        // OMBROS
        // =========================
        {
          name: "Desenvolvimento com halteres",
          description:
            "Empurre os halteres acima da cabeça até estender os braços e retorne lentamente.",
          muscleGroup: "Ombros e tríceps",
          equipment: "Halteres",
        },
        {
          name: "Desenvolvimento com barra",
          description:
            "Empurre a barra acima da cabeça mantendo o tronco estabilizado.",
          muscleGroup: "Ombros e tríceps",
          equipment: "Barra",
        },
        {
          name: "Desenvolvimento máquina",
          description:
            "Empurre as alças da máquina acima da cabeça e retorne de forma controlada.",
          muscleGroup: "Ombros e tríceps",
          equipment: "Máquina",
        },
        {
          name: "Arnold press",
          description:
            "Comece com os halteres à frente do rosto e faça uma rotação enquanto os empurra acima da cabeça.",
          muscleGroup: "Ombros",
          equipment: "Halteres",
        },
        {
          name: "Elevação lateral",
          description:
            "Eleve os braços lateralmente até aproximadamente a altura dos ombros e desça lentamente.",
          muscleGroup: "Ombros",
          equipment: "Halteres",
        },
        {
          name: "Elevação lateral na polia",
          description:
            "Eleve o braço lateralmente contra a resistência da polia.",
          muscleGroup: "Ombros",
          equipment: "Polia baixa",
        },
        {
          name: "Elevação frontal",
          description:
            "Eleve os braços à frente do corpo até aproximadamente a altura dos ombros.",
          muscleGroup: "Ombros",
          equipment: "Halteres ou anilha",
        },
        {
          name: "Crucifixo inverso",
          description:
            "Incline o tronco e abra os braços lateralmente contraindo a parte posterior dos ombros.",
          muscleGroup: "Ombros posteriores e costas",
          equipment: "Halteres",
        },
        {
          name: "Face pull",
          description:
            "Puxe a corda em direção ao rosto abrindo os cotovelos para os lados.",
          muscleGroup: "Ombros posteriores e trapézio",
          equipment: "Polia e corda",
        },
        {
          name: "Remada alta",
          description:
            "Puxe a barra verticalmente em direção ao peito mantendo os cotovelos elevados.",
          muscleGroup: "Ombros e trapézio",
          equipment: "Barra ou polia",
        },
        {
          name: "Encolhimento de ombros",
          description:
            "Eleve os ombros em direção às orelhas e retorne lentamente.",
          muscleGroup: "Trapézio",
          equipment: "Halteres ou barra",
        },

        // =========================
        // BÍCEPS
        // =========================
        {
          name: "Rosca direta",
          description:
            "Flexione os cotovelos aproximando a carga dos ombros sem movimentar excessivamente o tronco.",
          muscleGroup: "Bíceps",
          equipment: "Barra ou halteres",
        },
        {
          name: "Rosca alternada",
          description:
            "Flexione um braço de cada vez levando o halter em direção ao ombro.",
          muscleGroup: "Bíceps",
          equipment: "Halteres",
        },
        {
          name: "Rosca martelo",
          description:
            "Flexione os cotovelos mantendo as palmas das mãos voltadas uma para a outra.",
          muscleGroup: "Bíceps e antebraços",
          equipment: "Halteres",
        },
        {
          name: "Rosca concentrada",
          description:
            "Sentado, apoie o braço na parte interna da coxa e flexione o cotovelo.",
          muscleGroup: "Bíceps",
          equipment: "Halter",
        },
        {
          name: "Rosca Scott",
          description:
            "Apoie os braços no banco Scott e flexione os cotovelos contra a resistência.",
          muscleGroup: "Bíceps",
          equipment: "Banco Scott e barra",
        },
        {
          name: "Rosca na polia",
          description:
            "Flexione os cotovelos puxando a barra da polia em direção aos ombros.",
          muscleGroup: "Bíceps",
          equipment: "Polia baixa",
        },
        {
          name: "Rosca inversa",
          description: "Flexione os cotovelos usando pegada pronada.",
          muscleGroup: "Bíceps e antebraços",
          equipment: "Barra",
        },
        {
          name: "Rosca inclinada",
          description:
            "Em banco inclinado, flexione os cotovelos levando os halteres aos ombros.",
          muscleGroup: "Bíceps",
          equipment: "Halteres e banco inclinado",
        },

        // =========================
        // TRÍCEPS
        // =========================
        {
          name: "Tríceps pulley",
          description:
            "Estenda os cotovelos empurrando a barra para baixo e retorne lentamente.",
          muscleGroup: "Tríceps",
          equipment: "Polia",
        },
        {
          name: "Tríceps corda",
          description:
            "Estenda os cotovelos puxando a corda para baixo e afastando as extremidades ao final.",
          muscleGroup: "Tríceps",
          equipment: "Polia e corda",
        },
        {
          name: "Tríceps testa",
          description:
            "Deitado no banco, flexione os cotovelos levando a barra em direção à testa e estenda novamente.",
          muscleGroup: "Tríceps",
          equipment: "Barra e banco",
        },
        {
          name: "Tríceps francês",
          description:
            "Segure a carga acima da cabeça, flexione os cotovelos e estenda os braços novamente.",
          muscleGroup: "Tríceps",
          equipment: "Halter",
        },
        {
          name: "Tríceps coice",
          description:
            "Com o tronco inclinado, estenda o cotovelo levando o halter para trás.",
          muscleGroup: "Tríceps",
          equipment: "Halter",
        },
        {
          name: "Tríceps no banco",
          description:
            "Apoie as mãos em um banco, flexione os cotovelos e empurre o corpo para cima.",
          muscleGroup: "Tríceps",
          equipment: "Banco",
        },
        {
          name: "Mergulho nas paralelas",
          description:
            "Suspenda o corpo entre as barras paralelas, flexione os cotovelos e empurre para cima.",
          muscleGroup: "Tríceps, peito e ombros",
          equipment: "Barras paralelas",
        },

        // =========================
        // QUADRÍCEPS / PERNAS
        // =========================
        {
          name: "Agachamento livre",
          description:
            "Flexione joelhos e quadril mantendo a coluna alinhada e retorne à posição inicial.",
          muscleGroup: "Quadríceps, glúteos e posteriores",
          equipment: "Barra opcional",
        },
        {
          name: "Agachamento frontal",
          description:
            "Mantenha a barra apoiada na parte frontal dos ombros e execute o agachamento.",
          muscleGroup: "Quadríceps e glúteos",
          equipment: "Barra",
        },
        {
          name: "Agachamento goblet",
          description:
            "Segure um halter ou kettlebell junto ao peito e execute o agachamento.",
          muscleGroup: "Quadríceps e glúteos",
          equipment: "Halter ou kettlebell",
        },
        {
          name: "Agachamento sumô",
          description:
            "Afaste os pés e execute o agachamento com os joelhos acompanhando a direção dos pés.",
          muscleGroup: "Glúteos, adutores e quadríceps",
          equipment: "Halter opcional",
        },
        {
          name: "Agachamento no Smith",
          description:
            "Execute o agachamento utilizando a barra guiada da máquina Smith.",
          muscleGroup: "Quadríceps e glúteos",
          equipment: "Máquina Smith",
        },
        {
          name: "Hack squat",
          description:
            "Flexione os joelhos na máquina hack e empurre a plataforma para retornar.",
          muscleGroup: "Quadríceps e glúteos",
          equipment: "Máquina hack",
        },
        {
          name: "Leg press 45 graus",
          description:
            "Flexione os joelhos controlando a descida da plataforma e empurre-a novamente.",
          muscleGroup: "Quadríceps e glúteos",
          equipment: "Leg press",
        },
        {
          name: "Leg press horizontal",
          description:
            "Empurre a plataforma afastando-a do corpo e retorne de forma controlada.",
          muscleGroup: "Quadríceps e glúteos",
          equipment: "Leg press horizontal",
        },
        {
          name: "Cadeira extensora",
          description:
            "Estenda os joelhos contra a resistência da máquina e retorne lentamente.",
          muscleGroup: "Quadríceps",
          equipment: "Máquina extensora",
        },
        {
          name: "Afundo alternado",
          description:
            "Dê um passo à frente, flexione os joelhos e retorne antes de alternar a perna.",
          muscleGroup: "Quadríceps e glúteos",
          equipment: "Halteres opcionais",
        },
        {
          name: "Passada",
          description:
            "Avance alternando as pernas enquanto flexiona os joelhos a cada passo.",
          muscleGroup: "Quadríceps e glúteos",
          equipment: "Halteres opcionais",
        },
        {
          name: "Afundo búlgaro",
          description:
            "Apoie o pé traseiro em um banco e flexione a perna da frente.",
          muscleGroup: "Quadríceps e glúteos",
          equipment: "Banco e halteres opcionais",
        },
        {
          name: "Step up",
          description:
            "Suba em um banco ou caixa utilizando uma perna de cada vez.",
          muscleGroup: "Quadríceps e glúteos",
          equipment: "Banco ou caixa",
        },
        {
          name: "Agachamento isométrico na parede",
          description:
            "Encoste as costas na parede e mantenha os joelhos flexionados aproximadamente em 90 graus.",
          muscleGroup: "Quadríceps",
          equipment: "Parede",
        },

        // =========================
        // POSTERIORES
        // =========================
        {
          name: "Mesa flexora",
          description:
            "Flexione os joelhos levando os calcanhares em direção aos glúteos.",
          muscleGroup: "Posteriores da coxa",
          equipment: "Mesa flexora",
        },
        {
          name: "Cadeira flexora",
          description: "Flexione os joelhos contra a resistência da máquina.",
          muscleGroup: "Posteriores da coxa",
          equipment: "Máquina flexora",
        },
        {
          name: "Stiff",
          description:
            "Incline o tronco pelo quadril mantendo a coluna neutra e retorne contraindo glúteos e posteriores.",
          muscleGroup: "Posteriores da coxa e glúteos",
          equipment: "Barra ou halteres",
        },
        {
          name: "Levantamento terra romeno",
          description:
            "Desça a carga mantendo os joelhos levemente flexionados e o quadril deslocado para trás.",
          muscleGroup: "Posteriores, glúteos e lombar",
          equipment: "Barra ou halteres",
        },
        {
          name: "Good morning",
          description:
            "Com a barra apoiada nas costas, incline o tronco através do movimento do quadril e retorne.",
          muscleGroup: "Posteriores, glúteos e lombar",
          equipment: "Barra",
        },

        // =========================
        // GLÚTEOS
        // =========================
        {
          name: "Elevação pélvica",
          description:
            "Eleve o quadril contraindo os glúteos e retorne lentamente.",
          muscleGroup: "Glúteos e posteriores da coxa",
          equipment: "Banco ou colchonete",
        },
        {
          name: "Hip thrust",
          description:
            "Com as costas apoiadas em um banco, eleve o quadril contra a resistência e contraia os glúteos.",
          muscleGroup: "Glúteos",
          equipment: "Banco e barra",
        },
        {
          name: "Glúteo na polia",
          description:
            "Estenda a perna para trás contra a resistência da polia.",
          muscleGroup: "Glúteos",
          equipment: "Polia",
        },
        {
          name: "Coice de glúteo",
          description:
            "Em quatro apoios, eleve uma das pernas para trás mantendo o joelho flexionado.",
          muscleGroup: "Glúteos",
          equipment: "Nenhum",
        },
        {
          name: "Abdução de quadril",
          description:
            "Afaste as pernas contra a resistência mantendo o tronco estável.",
          muscleGroup: "Glúteo médio e abdutores",
          equipment: "Máquina abdutora",
        },
        {
          name: "Abdução com elástico",
          description: "Afaste as pernas contra a resistência do elástico.",
          muscleGroup: "Glúteos e abdutores",
          equipment: "Faixa elástica",
        },
        {
          name: "Caminhada lateral com elástico",
          description:
            "Caminhe lateralmente mantendo tensão constante na faixa elástica.",
          muscleGroup: "Glúteos e abdutores",
          equipment: "Faixa elástica",
        },

        // =========================
        // ADUTORES
        // =========================
        {
          name: "Cadeira adutora",
          description: "Aproxime as pernas contra a resistência da máquina.",
          muscleGroup: "Adutores",
          equipment: "Máquina adutora",
        },
        {
          name: "Adução na polia",
          description:
            "Puxe uma das pernas em direção ao centro do corpo contra a resistência da polia.",
          muscleGroup: "Adutores",
          equipment: "Polia",
        },

        // =========================
        // PANTURRILHAS
        // =========================
        {
          name: "Panturrilha em pé",
          description:
            "Eleve os calcanhares, sustente a contração e desça de forma controlada.",
          muscleGroup: "Panturrilhas",
          equipment: "Degrau opcional",
        },
        {
          name: "Panturrilha sentado",
          description:
            "Sentado, eleve os calcanhares contra a resistência e retorne lentamente.",
          muscleGroup: "Panturrilhas",
          equipment: "Máquina ou peso",
        },
        {
          name: "Panturrilha no leg press",
          description:
            "Movimente a plataforma apenas com a extensão dos tornozelos.",
          muscleGroup: "Panturrilhas",
          equipment: "Leg press",
        },
        {
          name: "Panturrilha unilateral",
          description: "Eleve o calcanhar utilizando apenas uma perna.",
          muscleGroup: "Panturrilhas",
          equipment: "Degrau opcional",
        },

        // =========================
        // ABDÔMEN / CORE
        // =========================
        {
          name: "Prancha abdominal",
          description:
            "Sustente o corpo alinhado sobre os antebraços e as pontas dos pés.",
          muscleGroup: "Core e abdômen",
          equipment: "Colchonete opcional",
        },
        {
          name: "Prancha lateral",
          description:
            "Sustente o corpo lateralmente apoiado em um antebraço e nos pés.",
          muscleGroup: "Oblíquos e core",
          equipment: "Colchonete opcional",
        },
        {
          name: "Abdominal tradicional",
          description:
            "Eleve o tronco contraindo o abdômen e retorne lentamente.",
          muscleGroup: "Abdômen",
          equipment: "Colchonete opcional",
        },
        {
          name: "Abdominal bicicleta",
          description:
            "Alterne a aproximação do cotovelo ao joelho oposto enquanto estende a outra perna.",
          muscleGroup: "Abdômen e oblíquos",
          equipment: "Colchonete opcional",
        },
        {
          name: "Abdominal infra",
          description:
            "Eleve as pernas ou o quadril utilizando a força do abdômen inferior.",
          muscleGroup: "Abdômen",
          equipment: "Colchonete",
        },
        {
          name: "Elevação de pernas",
          description: "Deitado, eleve as pernas mantendo o abdômen contraído.",
          muscleGroup: "Abdômen",
          equipment: "Colchonete",
        },
        {
          name: "Elevação de pernas na barra",
          description:
            "Suspenso na barra, eleve as pernas mantendo o tronco controlado.",
          muscleGroup: "Abdômen e flexores do quadril",
          equipment: "Barra fixa",
        },
        {
          name: "Abdominal na polia",
          description:
            "Ajoelhado, flexione o tronco contra a resistência da polia.",
          muscleGroup: "Abdômen",
          equipment: "Polia",
        },
        {
          name: "Russian twist",
          description: "Sentado, gire o tronco alternadamente para os lados.",
          muscleGroup: "Abdômen e oblíquos",
          equipment: "Peso opcional",
        },
        {
          name: "Dead bug",
          description:
            "Deitado, alterne a extensão de braço e perna opostos mantendo a lombar estável.",
          muscleGroup: "Core",
          equipment: "Colchonete",
        },
        {
          name: "Bird dog",
          description:
            "Em quatro apoios, estenda simultaneamente um braço e a perna oposta.",
          muscleGroup: "Core, glúteos e lombar",
          equipment: "Colchonete opcional",
        },
        {
          name: "Hollow body hold",
          description:
            "Mantenha braços e pernas elevados enquanto sustenta a lombar próxima ao chão.",
          muscleGroup: "Core",
          equipment: "Colchonete",
        },
        {
          name: "Mountain climber",
          description:
            "Na posição de prancha, alterne os joelhos em direção ao peito.",
          muscleGroup: "Core, ombros e pernas",
          equipment: "Nenhum",
        },

        // =========================
        // LOMBAR
        // =========================
        {
          name: "Superman",
          description:
            "Deitado de barriga para baixo, eleve braços e pernas mantendo o abdômen apoiado.",
          muscleGroup: "Lombar, glúteos e costas",
          equipment: "Colchonete",
        },
        {
          name: "Extensão lombar",
          description:
            "Flexione e estenda o tronco de maneira controlada mantendo a coluna alinhada.",
          muscleGroup: "Lombar e glúteos",
          equipment: "Banco romano",
        },

        // =========================
        // ANTEBRAÇO
        // =========================
        {
          name: "Rosca de punho",
          description: "Movimente os punhos para cima contra a resistência.",
          muscleGroup: "Antebraços",
          equipment: "Halteres ou barra",
        },
        {
          name: "Rosca de punho inversa",
          description:
            "Estenda os punhos contra a resistência utilizando pegada pronada.",
          muscleGroup: "Antebraços",
          equipment: "Halteres ou barra",
        },
        {
          name: "Farmer walk",
          description:
            "Caminhe segurando cargas pesadas ao lado do corpo mantendo postura firme.",
          muscleGroup: "Antebraços, trapézio, core e pernas",
          equipment: "Halteres ou kettlebells",
        },

        // =========================
        // CORPO INTEIRO
        // =========================
        {
          name: "Levantamento terra",
          description:
            "Retire a carga do chão estendendo quadril e joelhos mantendo a coluna estabilizada.",
          muscleGroup: "Costas, glúteos, posteriores e core",
          equipment: "Barra",
        },
        {
          name: "Levantamento terra sumô",
          description:
            "Com os pés afastados, retire a barra do chão estendendo quadril e joelhos.",
          muscleGroup: "Glúteos, posteriores, adutores e costas",
          equipment: "Barra",
        },
        {
          name: "Kettlebell swing",
          description:
            "Projete o quadril para frente impulsionando o kettlebell até aproximadamente a altura do peito.",
          muscleGroup: "Glúteos, posteriores, core e ombros",
          equipment: "Kettlebell",
        },
        {
          name: "Thruster",
          description:
            "Combine um agachamento frontal com um desenvolvimento acima da cabeça.",
          muscleGroup: "Pernas, glúteos, ombros e tríceps",
          equipment: "Halteres ou barra",
        },
        {
          name: "Clean",
          description:
            "Eleve a barra do chão até a posição frontal dos ombros utilizando extensão explosiva do quadril.",
          muscleGroup: "Corpo inteiro",
          equipment: "Barra",
        },
        {
          name: "Clean and press",
          description:
            "Eleve a carga até os ombros e em seguida empurre-a acima da cabeça.",
          muscleGroup: "Corpo inteiro",
          equipment: "Barra ou halteres",
        },

        // =========================
        // CARDIO / FUNCIONAL
        // =========================
        {
          name: "Polichinelo",
          description:
            "Salte abrindo simultaneamente as pernas e os braços e retorne à posição inicial.",
          muscleGroup: "Corpo inteiro",
          equipment: "Nenhum",
        },
        {
          name: "Burpee",
          description:
            "Agache, leve os pés para trás, retorne e finalize com um salto.",
          muscleGroup: "Corpo inteiro",
          equipment: "Nenhum",
        },
        {
          name: "Corrida estacionária",
          description:
            "Corra sem sair do lugar alternando rapidamente as pernas.",
          muscleGroup: "Pernas e cardiovascular",
          equipment: "Nenhum",
        },
        {
          name: "Joelho alto",
          description: "Corra no lugar elevando os joelhos alternadamente.",
          muscleGroup: "Pernas, core e cardiovascular",
          equipment: "Nenhum",
        },
        {
          name: "Salto no caixote",
          description:
            "Salte com os dois pés sobre uma caixa e desça de forma controlada.",
          muscleGroup: "Pernas e glúteos",
          equipment: "Caixa pliométrica",
        },
        {
          name: "Pular corda",
          description:
            "Realize saltos ritmados enquanto gira a corda ao redor do corpo.",
          muscleGroup: "Panturrilhas, pernas e cardiovascular",
          equipment: "Corda",
        },
        {
          name: "Battle rope",
          description:
            "Movimente as cordas rapidamente criando ondas alternadas ou simultâneas.",
          muscleGroup: "Ombros, braços, core e cardiovascular",
          equipment: "Corda naval",
        },
        {
          name: "Sled push",
          description:
            "Empurre o trenó mantendo o tronco inclinado e produzindo força com as pernas.",
          muscleGroup: "Pernas, glúteos e core",
          equipment: "Trenó",
        },
        {
          name: "Sled pull",
          description:
            "Puxe o trenó utilizando uma corda ou alças mantendo o corpo estabilizado.",
          muscleGroup: "Costas, braços, pernas e core",
          equipment: "Trenó",
        },
        {
          name: "Bear crawl",
          description:
            "Desloque-se em quatro apoios mantendo os joelhos próximos ao chão.",
          muscleGroup: "Core, ombros e pernas",
          equipment: "Nenhum",
        },

        // =========================
        // CARDIO EM EQUIPAMENTOS
        // =========================
        {
          name: "Caminhada na esteira",
          description:
            "Caminhe em ritmo constante ou variável utilizando a esteira.",
          muscleGroup: "Pernas e cardiovascular",
          equipment: "Esteira",
        },
        {
          name: "Corrida na esteira",
          description: "Corra em ritmo controlado utilizando a esteira.",
          muscleGroup: "Pernas e cardiovascular",
          equipment: "Esteira",
        },
        {
          name: "Bicicleta ergométrica",
          description:
            "Pedale mantendo cadência e resistência adequadas ao treino.",
          muscleGroup: "Pernas e cardiovascular",
          equipment: "Bicicleta ergométrica",
        },
        {
          name: "Bicicleta horizontal",
          description:
            "Pedale sentado com as costas apoiadas mantendo movimento contínuo.",
          muscleGroup: "Pernas e cardiovascular",
          equipment: "Bicicleta horizontal",
        },
        {
          name: "Elíptico",
          description:
            "Movimente braços e pernas de forma sincronizada mantendo ritmo constante.",
          muscleGroup: "Corpo inteiro e cardiovascular",
          equipment: "Elíptico",
        },
        {
          name: "Simulador de escada",
          description:
            "Suba degraus continuamente mantendo ritmo e postura controlados.",
          muscleGroup: "Quadríceps, glúteos e cardiovascular",
          equipment: "Simulador de escada",
        },
        {
          name: "Remo ergométrico",
          description:
            "Empurre com as pernas e puxe a alça em direção ao tronco em movimento coordenado.",
          muscleGroup: "Costas, pernas, braços e cardiovascular",
          equipment: "Remo ergométrico",
        },

        // =========================
        // MOBILIDADE / ALONGAMENTO
        // =========================
        {
          name: "Alongamento de posterior da coxa",
          description:
            "Estenda uma das pernas e incline o tronco suavemente em direção ao pé.",
          muscleGroup: "Posteriores da coxa",
          equipment: "Nenhum",
        },
        {
          name: "Alongamento de quadríceps",
          description:
            "Flexione o joelho levando o calcanhar em direção ao glúteo e segure o pé.",
          muscleGroup: "Quadríceps",
          equipment: "Nenhum",
        },
        {
          name: "Alongamento de panturrilha",
          description:
            "Mantenha o calcanhar apoiado no chão enquanto inclina o corpo para frente.",
          muscleGroup: "Panturrilhas",
          equipment: "Parede opcional",
        },
        {
          name: "Alongamento de peitoral",
          description:
            "Apoie o braço em uma parede ou estrutura e gire suavemente o tronco.",
          muscleGroup: "Peito",
          equipment: "Parede",
        },
        {
          name: "Alongamento de ombros",
          description: "Puxe suavemente um braço cruzado à frente do corpo.",
          muscleGroup: "Ombros",
          equipment: "Nenhum",
        },
        {
          name: "Alongamento de tríceps",
          description:
            "Leve uma das mãos atrás da cabeça e pressione suavemente o cotovelo.",
          muscleGroup: "Tríceps",
          equipment: "Nenhum",
        },
        {
          name: "Alongamento gato-vaca",
          description:
            "Em quatro apoios, alterne suavemente entre arredondar e estender a coluna.",
          muscleGroup: "Coluna e core",
          equipment: "Colchonete opcional",
        },
        {
          name: "Rotação torácica",
          description:
            "Em posição estável, gire o tronco de forma controlada ampliando a mobilidade torácica.",
          muscleGroup: "Coluna torácica e core",
          equipment: "Nenhum",
        },
      ],
    });

    const trainingTest = await prisma.training.create({
      data: {
        name: "Peito & triceps",
        difficulty: "intermediary",
        description: "Primeiro treino para teste",
        tag: "pull",
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
