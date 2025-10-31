<p align="center">
  <a href="https://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<h1 align="center">🚗 Garage App - Estacionamentos de Shoppings</h1>

<p align="center">
  <b>Backend desenvolvido com Clean Architecture e NestJS</b><br/>
  <sub>Focado em desacoplamento, escalabilidade de código e organização por camadas de domínio.</sub>
</p>

### End-Points:

| Método   | Endpoint                                      | Descrição                      |
| :------- | :-------------------------------------------- | :----------------------------- |
| **POST** | `https://garageapp-api.onrender.com/accounts` | Cria uma nova conta de usuário |

#### Exemplo de Body:

```json
{
  "name": "Lucas Soares",
  "email": "lucas@email.com",
  "password": "123456"
}
```

---

| Método   | Endpoint                                     | Descrição                                      |
| :------- | :------------------------------------------- | :--------------------------------------------- |
| **POST** | `https://garageapp-api.onrender.com/session` | Autenticação de usuário - Retornando jwt-token |

#### Exemplo de Body:

```json
{
  "email": "lucas@email.com",
  "password": "123456"
}
```

---

| Método   | Endpoint                                           | Descrição         |
| :------- | :------------------------------------------------- | :---------------- |
| **POST** | `https://garageapp-api.onrender.com/edit/accounts` | Edição de usuário |

#### Exemplo de Body:

```json
{
  "id": "user.id",
  "email": "teste@example.com",
  "name": "teste de nome",
  "password": "123123"
}
```

---
### OBS: Essa rota só pode ser acessada com token

| Método   | Endpoint                                     | Descrição         |
| :------- | :------------------------------------------- | :---------------- |
| **POST** | `https://garageapp-api.onrender.com/checkin` | Criar checkIn |

#### Exemplo de Body:

```json
{
  "vehicleId": " rkl-9e96",
  "typeVehicle": " Moto",
  "vehiclePhoto": "photo.png",
  "files": ["fileId", "fileId"]
}
```

---
### OBS: Essa rota só pode ser acessada com token
| Método   | Endpoint                                     | Descrição         |
| :------- | :------------------------------------------- | :---------------- |
| **POST** | `https://garageapp-api.onrender.com/delete/accounts` | Deletar usuário |

#### Exemplo de Body:

```json
{
  "id": "user.id",
}
```

---

## 🧠 Sobre o Projeto

O **Garage App** é um backend projetado para gerenciar estacionamentos de shoppings.  
Ele segue os princípios da **Clean Architecture**, garantindo independência de frameworks e fácil manutenção do core da aplicação.

---

OBS: Para rodar este projeto localmente, você precisa criar um arquivo .env e definir as seguintes variáveis:

```bash
# use docker compose para criar o container
DATABASE_URL → URL de conexão com o banco de dados (utilizando as configurações do Docker).

# use os arquivos.txt na raiz do projeto
JWT_PUBLIC_KEY → Chave pública para assinatura de tokens JWT.

JWT_PRIVATE_KEY → Chave privada para assinatura de tokens JWT.

```

## 🧰 Tecnologias e Ferramentas

- ⚙️ **NestJS** → Framework Node.js modular e escalável.
- 🔐 **Passport** → Middleware de autenticação.
- 🎫 **JWT** → Autenticação via tokens seguros.
- 🧩 **Zod** → Validação e tipagem de dados.
- 🗄️ **Prisma** → ORM moderno para banco de dados.
- 🐳 **Docker** → Containers para ambiente isolado e portátil.
- 🧪 **Vitest** → Testes unitários e de integração.
- 🚀 **Supertest** → Testes E2E de endpoints HTTP.
- 🧠 **Faker.js** → Geração de dados falsos para testes.
- 🔒 **bcryptjs** → Criptografia de senhas.

---

## 🚀 Configuração do Projeto

```bash
# Instalar dependências
$ npm install

# Rodar o servidor em modo desenvolvimento
$ npm run start:dev

# Build de produção
$ npm run start:prod


```
