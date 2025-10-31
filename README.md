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

---

## 🧠 Sobre o Projeto

O **Garage App** é um backend projetado para gerenciar estacionamentos de shoppings.  
Ele segue os princípios da **Clean Architecture**, garantindo independência de frameworks e fácil manutenção do core da aplicação.

---
| Método     | Endpoint Completo                                        | Descrição                                      |
| :--------- | :------------------------------------------------------- | :--------------------------------------------- |
| **POST**    | `https://garageapp-api.onrender.com/accounts`| Criar conta de usuário | ```json<br>{<br>  "name": "Lucas Soares",<br>  "email": "lucas@email.com",<br>  "password": "123456"<br>}``` |
| **POST**    | `https://garageapp-api.onrender.com/session`| Autenticação de Usuário, retornando token-Jwt para futuras requisições      |
| **POST**   | `https://garageapp-api.onrender.com/edit/accounts` | editar dados de usuário               |
| **POST**    | `https://garageapp-api.onrender.com/edit/accounts/:id`   | Atualiza as informações de uma conta existente |
| **POST** | `https://garageapp-api.onrender.com/delete/accounts/` | Exclui uma conta existente                     |


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


