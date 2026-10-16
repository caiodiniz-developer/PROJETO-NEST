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

## Arquitetura

```
src/
  core/            # Either, entidades base, eventos de domínio, erros
  domain/
    forum/         # entidades, casos de uso, contratos de repositório e criptografia
    notification/  # notificações e subscribers
  infra/
    auth/          # JWT (RS256), guard global e decorator @Public
    cryptography/  # bcrypt e JWT implementando os gateways do domínio
    database/      # Prisma: service, mappers e repositórios
    env/           # validação e acesso às variáveis de ambiente
    http/          # controllers, pipes e presenters
test/              # factories, repositórios in-memory e stubs
```

O domínio não conhece o Prisma nem o HTTP: os controllers chamam casos de uso,
que dependem de classes abstratas implementadas na camada de infra.
Todas as rotas são privadas por padrão; use `@Public()` para liberar.

## Rotas

| Método | Rota                                | Auth | Descrição                            |
| ------ | ----------------------------------- | ---- | ------------------------------------ |
| POST   | `/accounts`                         | não  | Cria uma conta                       |
| POST   | `/sessions`                         | não  | Autentica e retorna o token          |
| POST   | `/questions`                        | sim  | Cria uma pergunta                    |
| GET    | `/questions`                        | sim  | Lista perguntas recentes (`?page=1`) |
| GET    | `/questions/:slug`                  | sim  | Busca pergunta pelo slug             |
| PUT    | `/questions/:id`                    | sim  | Edita uma pergunta                   |
| DELETE | `/questions/:id`                    | sim  | Deleta uma pergunta                  |
| POST   | `/questions/:questionId/answers`    | sim  | Responde uma pergunta                |
| GET    | `/questions/:questionId/answers`    | sim  | Lista respostas (`?page=1`)          |
| PUT    | `/answers/:id`                      | sim  | Edita uma resposta                   |
| DELETE | `/answers/:id`                      | sim  | Deleta uma resposta                  |
| PATCH  | `/answers/:answerId/choose-as-best` | sim  | Escolhe a melhor resposta            |
| POST   | `/questions/:questionId/comments`   | sim  | Comenta uma pergunta                 |
| GET    | `/questions/:questionId/comments`   | sim  | Lista comentários da pergunta        |
| DELETE | `/questions/comments/:id`           | sim  | Deleta comentário da pergunta        |
| POST   | `/answers/:answerId/comments`       | sim  | Comenta uma resposta                 |
| GET    | `/answers/:answerId/comments`       | sim  | Lista comentários da resposta        |
| DELETE | `/answers/comments/:id`             | sim  | Deleta comentário da resposta        |

Use o arquivo `client.http` com a extensão Rest Client para testar as rotas.

## Testes

```bash
npm run test       # unitários
npm run test:e2e   # e2e (precisa do postgres rodando)
```

Cada arquivo de teste e2e roda em um schema isolado do banco, criado e removido automaticamente.
