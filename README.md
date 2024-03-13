# Guia de Uso da API e Casos de Teste

Este documento fornece um guia detalhado sobre como usar a API, incluindo descrições dos endpoints disponíveis e exemplos de casos de teste. O objetivo é ajudar os usuários a entender como interagir com a API e testar suas funcionalidades.

### Endpoints 

#### POST /verify
Este endpoint é usado para verificar um token.

#### Corpo da Solicitação:
```json
{
    "token": "seu_token_aqui"
}
```
#### Resposta:
```json
{
    "isValid": true
}
```




## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/jjuniordev/backend-challenge-jadilson
```

Entre no diretório do projeto

```bash
  cd backend-challenge-jadilson
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```


## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm test
```


## Massa de Testes

### Caso 1:
Entrada:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiQWRtaW4iLCJTZWVkIjoiNzg0MSIsIk5hbWUiOiJUb25pbmhvIEFyYXVqbyIsImlhdCI6MTcxMDI1MjM0N30.9173MoFd1jwDOpBBmx-GbvYhyDRW_Be5oS076-PWrtY
```
Saida:
```
verdadeiro
```
Justificativa:
Abrindo o JWT, as informações contidas atendem a descrição:
```json
{
  "Role": "Admin",
  "Seed": "7841",
  "Name": "Toninho Araujo"
}
```

### Caso 2:
Entrada:
```
eyJhbGciOiJzI1NiJ9.dfsdfsfryJSr2xrIjoiQWRtaW4iLCJTZrkIjoiNzg0MSIsIk5hbrUiOiJUb25pbmhvIEFyYXVqbyJ9.QY05fsdfsIjtrcJnP533kQNk8QXcaleJ1Q01jWY_ZzIZuAg
```
Saida:
```
falso
```
Justificativa:
JWT invalido

### Caso 3:
Entrada:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiRXh0ZXJuYWwiLCJTZWVkIjoiNzIzNDEiLCJOYW1lIjoiTTRyaWEgT2xpdmlhIiwiaWF0IjoxNzEwMjUyMzk2fQ.dORCUVPwFcfHJnzZnmqKF_auiXzsNH6PB5vBl2zbkBw
```
Saida:
```
falso
```
Justificativa:
Abrindo o JWT, a Claim Name possui caracter de números
```json
{
  "Role": "External",
  "Seed": "72341",
  "Name": "M4ria Olivia"
}
```

### Caso 4:
Entrada:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSb2xlIjoiTWVtYmVyIiwiT3JnIjoiQlIiLCJTZWVkIjoiMTQ2MjciLCJOYW1lIjoiVmFsZGlyIEFyYW5oYSIsImlhdCI6MTcxMDI1MjQ0OH0.YyEMNPsbccZRYsr3fYIGcmSruJVGmfKh_lXnTm9JExo
```
Saida:
```
falso
```
Justificativa:
Abrindo o JWT, foi encontrado mais de 3 claims.
```json
{
  "Role": "Member",
  "Org": "BR",
  "Seed": "14627",
  "Name": "Valdir Aranha"
}
```
## Autores

- [@jjuniordev](https://github.com/jjuniordev)


## 🚀 Sobre mim
Olá! Meu nome é Jadilson Jr e sou um desenvolvedor de software com 13 anos de experiência. Tenho uma paixão por código e engenharia de software.

Aqui estão algumas coisas que você deve saber sobre mim:

- 🎓 Eu me formei em 2012.
- 💼 Atualmente, estou trabalhando na comunidade BuildersHub e sou Ituber há quase 3 anos.
- 🛠️ Minhas principais habilidades técnicas incluem [listar suas principais habilidades técnicas].
- 🌱 Atualmente, estou aprendendo AWS.

Se tiver alguma dúvida ou comentário, sinta-se à vontade para entrar em contato comigo!

