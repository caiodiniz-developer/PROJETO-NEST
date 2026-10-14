# Nest Clean

API em NestJS com Prisma, PostgreSQL e autenticação JWT (RS256).

## Rodando o projeto

```bash
cp .env.example .env        # preencha as chaves JWT
docker compose up -d
npm install
npx prisma migrate dev
npm run start:dev
```

## Rotas

| Método | Rota         | Auth | Descrição                    |
| ------ | ------------ | ---- | ---------------------------- |
| POST   | `/accounts`  | não  | Cria uma conta               |
| POST   | `/sessions`  | não  | Autentica e retorna o token  |
| POST   | `/questions` | sim  | Cria uma pergunta            |
| GET    | `/questions` | sim  | Lista perguntas (`?page=1`)  |

Use o arquivo `client.http` com a extensão Rest Client para testar as rotas.

## Testes

```bash
npm run test       # unitários
npm run test:e2e   # e2e (precisa do postgres rodando)
```

Cada arquivo de teste e2e roda em um schema isolado do banco, criado e removido automaticamente.
