# ForçaMax

Aplicação web para acompanhamento de treinos, agenda, progresso e conquistas. O projeto é um monorepo com frontend React e API Node.js.

## Estado atual

- cadastro de usuário e login com JWT;
- validação da sessão ao recarregar a aplicação;
- rotas autenticadas no frontend;
- telas de dashboard, treinos, agenda, progresso, conquistas e perfil;
- usuários persistidos no PostgreSQL;
- limitação de tentativas nas rotas de cadastro e login;
- health check da API.

As telas da área autenticada ainda estão em desenvolvimento. No backend, somente cadastro, login e validação de sessão estão implementados até o momento.

## Tecnologias

- React 19, Vite, TypeScript e Tailwind CSS;
- Node.js, Express e TypeScript;
- Prisma e PostgreSQL;
- Docker Compose para executar a API e o banco localmente.

## Executar localmente

### Requisitos

- Docker Desktop com Docker Compose;
- Node.js 22 ou superior;
- npm.

### 1. Configurar o ambiente

Na raiz do projeto:

```powershell
Copy-Item .env.example .env
```

O arquivo é usado pelo Docker Compose. Troque `SECRET` e as credenciais padrão antes de usar o projeto fora do ambiente local.

### 2. Iniciar a API e o PostgreSQL

```bash
docker compose up --build -d
```

O Compose aguarda o banco, aplica as migrations e inicia a API. Para conferir os serviços:

```bash
docker compose ps
docker compose logs -f backend
```

A API estará em `http://localhost:3333`. `GET /health` deve responder:

```json
{"status":"ok"}
```

### 3. Iniciar o frontend

Em outro terminal:

```bash
cd frontend
npm ci
npm run dev
```

Abra `http://localhost:5173`.

### 4. Encerrar

```bash
docker compose down
```

Isso preserva o banco. Para remover também os volumes locais:

```bash
docker compose down --volumes
```

## Backend fora do Docker

Inicie somente o banco com `docker compose up -d database`. Depois:

```powershell
cd backend
Copy-Item .env.example .env
npm ci
npx prisma generate
npx prisma migrate deploy
npm run dev
```

O `DATABASE_URL` do exemplo do backend aponta para o PostgreSQL do Compose em `localhost:5432`.

## Variáveis de ambiente

| Arquivo | Variável | Finalidade |
| --- | --- | --- |
| `.env` | `POSTGRES_DB` | Nome do banco |
| `.env` | `POSTGRES_USER` | Usuário do PostgreSQL |
| `.env` | `POSTGRES_PASSWORD` | Senha do PostgreSQL |
| `.env` | `POSTGRES_PORT` | Porta local do banco |
| `.env` | `API_PORT` | Porta local da API |
| `.env` | `APP_ORIGIN` | Origens CORS, separadas por vírgula |
| `.env` | `SECRET` | Segredo usado nos tokens JWT |
| `frontend/.env` | `VITE_API_URL` | URL base da API |

Sem `VITE_API_URL`, o frontend usa `http://localhost:3333`.

## Endpoints disponíveis

| Método | Rota | Autenticação | Descrição |
| --- | --- | --- | --- |
| `GET` | `/health` | Não | Verifica se a API está ativa |
| `POST` | `/user` | Não | Cria um usuário |
| `POST` | `/session` | Não | Autentica e devolve usuário e token |
| `GET` | `/session/validate` | Bearer token | Valida a sessão atual |

Cadastro:

```json
{"name":"Maria","email":"maria@example.com","password":"senha-segura"}
```

Login:

```json
{"email":"maria@example.com","password":"senha-segura"}
```

## Scripts

Frontend: `npm run dev`, `npm run build` e `npm run preview`.

Backend: `npm run dev`, `npm run build` e `npm start`.

## Estrutura

```text
forcamax/
├── backend/
│   ├── prisma/               # schema e migrations
│   └── src/
│       ├── config/           # ambiente e autenticação
│       ├── controllers/      # regras dos endpoints
│       ├── lib/              # cliente Prisma
│       ├── middlewares/      # autenticação, erros e rate limit
│       └── routes/           # rotas HTTP
├── frontend/
│   └── src/
│       ├── components/
│       ├── contexts/
│       ├── pages/
│       ├── routes/
│       └── services/
├── compose.yaml
└── .env.example
```

Para publicar no Render, consulte [DEPLOY_RENDER.md](./DEPLOY_RENDER.md).
