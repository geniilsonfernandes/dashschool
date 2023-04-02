![Banner](ui_01.png)

<h2 align="center">DashSchool Gerenciador de Cursos</h1>

<p align="center">
  <a href="http://localhost:3000/signin">
    Veja o projeto ao vivo
  </a>
<p>

<p align="center">
  <a href="#sobre-o-projeto">Sobre o projeto</a> •
  <a href="#funcionalidades">Funcionalidades</a> •
  <a href="#stacks-utilizadas">Stacks utilizadas</a> •
  <a href="#screenshots">Screenshots</a> •
  <a href="#instalação-e-execução-local">Instalação e execução local</a>
</p>

<p align="center">Este é um projeto de gerenciador de cursos desenvolvido com Next.js e Prisma, usando o framework Chakra UI para estilização.</p>

<p>
Com uma interface de usuário intuitiva e fácil de usar, você poderá criar novos cursos, adicionar e remover alunos, visualizar a lista de alunos matriculados em um determinado
</p>

## Funcionalidades

Com este aplicativo, você pode:

- Criar um curso e adicionar alunos
- Editar um curso e adicionar/remover alunos
- Excluir um curso e todos os alunos matriculados
- Adicionar um aluno a um curso
- Remover um aluno de um curso
- Listar todos os cursos
- Ver detalhes de um curso, incluindo a lista de alunos matriculados

## Stacks utilizadas

Este projeto utiliza as seguintes stacks:

- Next.js
- Prisma
- Chakra UI

## Screenshots

Algumas screenshots da sua aplicação abaixo:

- Login e Cadastro de Usuário
  ![Screenshot 1](ui_02.png)

- Dashboard e Cadastro de Cursos e Alunos
  ![Screenshot 2](ui_03.png)

- Formulário de Cadastro de Cursos e Alunos
  ![Screenshot 3](ui_04.png)

## Instalação e execução local

Para executar este aplicativo localmente, siga estas etapas:

Claro, segue abaixo as instruções para criar um arquivo .env e executar o docker-compose:

- Crie um arquivo chamado .env na raiz do seu projeto e adicione os valores das variáveis de ambiente que você precisa definir:

```

DATABASE_URL="mysql://root:123456@localhost:3306/dash"

NEXTAUTH_SECRET=dashschool
DATABASE_PASSWORD=123456
SERVICE_NAME=dash
DATABASE_SCHEMA=dash

```

- Execute o comando docker-compose up -d para criar o container do banco de dados( Nessesaio ter o docker instalado)

```
  docker-compose up -d
```

- Execute o comando yarn prisma migrate dev para criar as tabelas no banco de dados

```
  yarn prisma migrate dev
```

- Execute o comando yarn dev para iniciar o servidor de desenvolvimento

```
  yarn dev
```

## Contato e redes sociais

- Linkedin - [https://www.linkedin.com/in/genilson-fernandes/](https://www.linkedin.com/in/genilson-fernandes/)
- Email - geniilsonfernandes@gmail.com

