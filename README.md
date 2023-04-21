![Banner](ui_01.png)

<h2 align="center">DashSchool Gerenciador de Cursos | Front end | Back end</h1>

  <p align="center">
    <a href="#sobre-o-projeto">Sobre o projeto</a> •
    <a href="#funcionalidades">Funcionalidades</a> •
    <a href="#stacks-utilizadas">Stacks utilizadas</a> •
    <a href="#screenshots">Screenshots</a> •
    <a href="#instalação-e-execução-local">Instalação e execução local</a>
  </p>

  <h2 align="center" id="sobre-o-projeto">Sobre o projeto</h2>

  <p align="center">
    <a href="http://localhost:3000/signin">
      Veja o projeto ao vivo
    </a>
  <p>

    para acessar o projeto, basta clicar no link acima e fazer o login com o usuário e senha abaixo:

  <ul>
    <li>
      Usuário: usuario: dashschool@dashschool.com,
    </li>
    <li>
      senha: dashschool@dashschool.com
    </li>
  </ul>

  <p align="center">Este é um projeto de gerenciador de cursos desenvolvido com Next.js e Prisma, usando o framework
    Chakra UI para estilização.</p>

  <p align="center">
    Com uma interface de usuário intuitiva e fácil de usar, você poderá criar novos cursos, adicionar e remover alunos,
    visualizar a lista de alunos matriculados em um determinado
  </p>

  <h2 align="center" id="funcionalidades">Funcionalidades</h2>

  <b>Com este aplicativo, você pode:</b>
  <ul>
    <li>Criar um curso e adicionar alunos</li>
    <li>Editar um curso e adicionar/remover alunos</li>
    <li>Excluir um curso e todos os alunos matriculados</li>
    <li>Adicionar um aluno a um curso</li>
    <li>Remover um aluno de um curso</li>
    <li>Listar todos os cursos</li>
    <li>Ver detalhes de um curso, incluindo a lista de alunos matriculados</li>
  </ul>
  <h2 align="center" id="stacks-utilizadas">Stacks utilizadas</h2>

  <b>Este projeto utiliza as seguintes stacks:</b>

  <ul>
    <li>Next.js</li>
    <li>Prisma</li>
    <li>Chakra UI</li>
    <li>planet-scale para banco de dados</li>
    <li>api routes do next.js</li>
    <li>next-auth</li>
  </ul>
  <h2 align="center">Rotas da api do projeto</h2>
  <ul>
    <li>Rotas para criação de cursos e alunos</li>
    <li>Rotas para edição de cursos e alunos</li>
    <li>Rotas para listagem de cursos e alunos</li>
  </ul>
  <h2 align="center" id="screenshots">Screenshots</h2>

  <b>Algumas screenshots da sua aplicação abaixo:</b>

  <div>
    <b id="photo">
      Login e Cadastro de Usuário
    </b>
    <img src="ui_02.png" width="400px">
    <b id="photo">
      Dashboard e Cadastro de Cursos e Alunos
    </b>
  </div>


  <img src="ui_03.png" width="400px">
  <img src="ui_04.png" width="400px">
  <img src="ui_05.png" width="400px">
  <img src="ui_06.gif" width="400px">
  -
  ![Screenshot 1](ui_02.png)

  - Dashboard e Cadastro de Cursos e Alunos
  ![Screenshot 2](ui_03.png)

  - Formulário de Cadastro de Cursos e Alunos
  ![Screenshot 3](ui_04.png)

  - Busca de Cursos e Alunos e gerenciamento de alunos em um curso
  ![Screenshot 4](ui_05.png)

  - Busca Alunos e gerenciamento de alunos em um curso
  ![Screenshot 5](ui_06.gif)

  <h2 align="center"> Instalação e execução local

    Para executar este aplicativo localmente, siga estas etapas:

    Claro, segue abaixo as instruções para criar um arquivo .env e executar o docker-compose:

    - Crie um arquivo chamado .env na raiz do seu projeto e adicione os valores das variáveis de ambiente que você
    precisa definir:

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