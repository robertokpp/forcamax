# Deploy do ForçaMax no Render

Este guia usa três recursos: PostgreSQL, um Web Service para a API e um Static Site para o frontend. Como o projeto é um monorepo, configure `backend` e `frontend` como diretórios raiz separados.

## 1. Preparar o repositório

1. Envie o projeto para um repositório Git conectado ao Render.
2. Confirme que `backend/prisma/migrations` está versionado.
3. Não envie arquivos `.env`, credenciais ou segredos.

## 2. Criar o PostgreSQL

Crie um PostgreSQL no Dashboard do Render, de preferência na mesma região da API, e copie sua URL interna. Consulte os preços e limites atuais antes de escolher o plano.

## 3. Criar a API

Crie um Web Service com estas configurações:

| Campo | Valor |
| --- | --- |
| Name | `forcamax-api` |
| Language | `Node` |
| Branch | `main` ou a branch utilizada |
| Root Directory | `backend` |
| Build Command | `npm ci --include=dev && npx prisma generate && npm run build` |
| Start Command | `npx prisma migrate deploy && npm start` |
| Health Check Path | `/health` |

Use Node.js 22 ou uma versão posterior compatível. Configure:

| Chave | Valor |
| --- | --- |
| `NODE_ENV` | `production` |
| `DATABASE_URL` | URL interna do PostgreSQL |
| `APP_ORIGIN` | URL pública do frontend, definida depois |
| `SECRET` | Valor longo, aleatório e exclusivo |

O Render fornece `PORT`; não é necessário defini-la. O build instala dependências de desenvolvimento porque Prisma e TypeScript são necessários para gerar o client e compilar a API. O comando inicial aplica migrations pendentes antes de iniciar o servidor.

Teste a URL real da API:

```text
https://forcamax-api.onrender.com/health
```

Resposta esperada: `{"status":"ok"}`.

## 4. Criar o frontend

Crie um Static Site:

| Campo | Valor |
| --- | --- |
| Name | `forcamax` |
| Branch | `main` ou a branch utilizada |
| Root Directory | `frontend` |
| Build Command | `npm ci && npm run build` |
| Publish Directory | `dist` |

Configure `VITE_API_URL` com a URL HTTPS da API, sem barra no final:

```text
VITE_API_URL=https://forcamax-api.onrender.com
```

Essa variável é incorporada ao JavaScript e não pode conter segredos. Faça outro deploy do frontend se alterá-la.

Em **Redirects/Rewrites**, adicione:

| Source | Destination | Action |
| --- | --- | --- |
| `/*` | `/index.html` | `Rewrite` |

Isso permite atualizar diretamente rotas como `/Treinos`.

## 5. Configurar o CORS

No serviço da API, defina a URL final do frontend:

```text
APP_ORIGIN=https://forcamax.onrender.com
```

Para mais de uma origem, separe valores exatos e sem barra final por vírgula:

```text
APP_ORIGIN=https://forcamax.onrender.com,https://www.seudominio.com
```

## 6. Checklist

- [ ] As migrations foram aplicadas.
- [ ] `DATABASE_URL` usa a URL interna correta.
- [ ] `SECRET` é forte e exclusivo.
- [ ] O health check retorna `{"status":"ok"}`.
- [ ] `VITE_API_URL` aponta para a API HTTPS.
- [ ] `APP_ORIGIN` contém a URL exata do frontend.
- [ ] A regra `/*` → `/index.html` está configurada.
- [ ] Cadastro e login funcionam no domínio publicado.

## Referências

- [Node/Express no Render](https://render.com/docs/deploy-node-express-app)
- [Monorepos](https://render.com/docs/monorepo-support)
- [Static Sites](https://render.com/docs/static-sites)
- [PostgreSQL](https://render.com/docs/databases)
