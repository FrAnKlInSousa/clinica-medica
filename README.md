<div align="center">

# 🏥 Sistema de Gestão para Clínica Médica

**Aplicação full stack para gerenciamento de clínicas médicas**

![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-TypeScript-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)

</div>

Aplicação com módulos de autenticação, usuários, pacientes, médicos e especialidades, preparada para receber agendas, agendamentos, consultas e prontuários.

Este guia explica como preparar o ambiente e executar todo o projeto localmente no **Windows**, **macOS** e **Linux**.

> [!IMPORTANT]
> Os exemplos consideram as pastas `backend/` e `frontend/`. Caso o repositório utilize nomes diferentes, ajuste os caminhos nos comandos.

## 📑 Sumário

- [Tecnologias](#-tecnologias)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Portas utilizadas](#-portas-utilizadas)
- [Programas necessários](#1-programas-necessários)
- [Instalação no Windows](#2-instalação-no-windows)
- [Instalação no macOS](#3-instalação-no-macos)
- [Instalação no Linux](#4-instalação-no-linux)
- [Baixar o projeto](#5-baixar-o-projeto)
- [Variáveis de ambiente](#6-configurar-as-variáveis-de-ambiente)
- [PostgreSQL com Docker](#7-executar-o-postgresql-com-docker)
- [Executar o backend](#9-executar-o-backend)
- [Executar o frontend](#10-executar-o-frontend)
- [Build de produção](#13-build-de-produção)
- [Testes](#14-testes)
- [Fluxo com Git](#17-fluxo-básico-com-git)
- [Problemas comuns](#19-problemas-comuns)
- [Checklist](#20-checklist-de-primeira-execução)
- [Resumo rápido](#21-resumo-rápido)
- [Segurança](#22-segurança)

## 🧰 Tecnologias

### Backend

- Java 21;
- Spring Boot 3;
- Spring Security e JWT;
- Spring Data JPA;
- Bean Validation;
- Flyway;
- PostgreSQL;
- Maven Wrapper;
- Swagger/OpenAPI.

### Frontend

- React;
- TypeScript;
- Vite;
- Tailwind CSS;
- npm;
- Integração com API REST.

### Infraestrutura e ferramentas

- Git;
- Docker Desktop ou Docker Engine, recomendado para o banco local;
- Postman ou Insomnia, opcional;
- DBeaver ou pgAdmin, opcional;
- IntelliJ IDEA, Eclipse ou VS Code, opcional.

## 📁 Estrutura do projeto

```text
clinica-medica/
├── backend/
│   ├── src/
│   ├── mvnw
│   ├── mvnw.cmd
│   └── pom.xml
├── frontend/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 🔌 Portas utilizadas

| Serviço | Endereço padrão |
| :--- | :--- |
| Frontend | `http://localhost:5173` |
| Backend | `http://localhost:8080` |
| Swagger | `http://localhost:8080/swagger-ui/index.html` |
| PostgreSQL | `localhost:5432` |

Antes de iniciar, verifique se essas portas estão livres.

## 1. Programas necessários

Instale:

1. Git;
2. Java JDK 21;
3. Node.js LTS, preferencialmente Node 22, acompanhado do npm;
4. Docker, recomendado para executar o PostgreSQL;
5. Uma IDE ou editor de sua preferência.

O Maven não precisa ser instalado globalmente quando o repositório possui `mvnw` e `mvnw.cmd`.

### Conferir as instalações

Abra o Terminal, PowerShell ou Prompt de Comando e execute:

```bash
git --version
java -version
node --version
npm --version
docker --version
docker compose version
```

Resultados esperados:

- Java `21.x`;
- Node.js `22.x` ou outra versão LTS compatível;
- Docker e Docker Compose disponíveis.

## 2. Instalação no Windows

### Opção recomendada: Winget

Abra o PowerShell como administrador:

```powershell
winget install --id Git.Git -e
winget install --id EclipseAdoptium.Temurin.21.JDK -e
winget install --id OpenJS.NodeJS.LTS -e
winget install --id Docker.DockerDesktop -e
winget install --id Microsoft.VisualStudioCode -e
```

Reinicie o terminal após as instalações.

Abra o Docker Desktop e aguarde até o serviço indicar que está em execução. Em algumas máquinas será necessário habilitar o WSL 2 e a virtualização na BIOS/UEFI.

### Configurar `JAVA_HOME`, se necessário

O instalador normalmente configura o Java. Caso `java -version` não funcione:

1. Pesquise por **Variáveis de Ambiente** no Windows;
2. Crie a variável `JAVA_HOME` apontando para a pasta do JDK 21;
3. Adicione `%JAVA_HOME%\bin` à variável `Path`;
4. Feche e abra o terminal.

Exemplo de caminho:

```text
C:\Program Files\Eclipse Adoptium\jdk-21...
```

## 3. Instalação no macOS

Instale o Homebrew, caso ainda não possua, seguindo as instruções do [site oficial do Homebrew](https://brew.sh/).

Depois execute:

```bash
brew install git
brew install --cask temurin@21
brew install node@22
brew install --cask docker
brew install --cask visual-studio-code
```

Se o Node não ficar disponível automaticamente:

```bash
brew link --overwrite --force node@22
```

Abra o aplicativo Docker e aguarde sua inicialização.

Em Macs Apple Silicon, as imagens Docker utilizadas devem possuir suporte à arquitetura `arm64`.

## 4. Instalação no Linux

Os comandos abaixo usam Ubuntu ou Debian como referência.

```bash
sudo apt update
sudo apt install -y git curl unzip
sudo apt install -y openjdk-21-jdk
```

Para o Node.js, recomenda-se o NVM, pois facilita a troca de versões:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

Feche e abra o terminal e depois execute:

```bash
nvm install 22
nvm use 22
nvm alias default 22
```

Instale o Docker Engine e o plugin Docker Compose de acordo com a documentação da sua distribuição. No Ubuntu/Debian, após configurar o repositório oficial do Docker:

```bash
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker "$USER"
```

Saia e entre novamente na sessão para usar Docker sem `sudo`.

## 5. Baixar o projeto

Substitua a URL abaixo pela URL real do repositório:

```bash
git clone https://github.com/ORGANIZACAO/clinica-medica.git
cd clinica-medica
```

Para repositório privado, autentique-se no GitHub ou utilize SSH:

```bash
git clone git@github.com:ORGANIZACAO/clinica-medica.git
cd clinica-medica
```

Confirme a branch principal:

```bash
git branch --show-current
git pull origin main
```

## 6. Configurar as variáveis de ambiente

Nunca envie senhas, tokens ou arquivos `.env` reais para o Git.

### Backend

Se houver um exemplo no projeto, copie-o.

Windows PowerShell:

```powershell
Copy-Item backend\.env.example backend\.env
```

Windows Prompt de Comando:

```bat
copy backend\.env.example backend\.env
```

macOS e Linux:

```bash
cp backend/.env.example backend/.env
```

Modelo sugerido para `backend/.env`:

```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_NAME=clinica
DB_USERNAME=clinica
DB_PASSWORD=clinica_local

JWT_SECRET=troque-por-uma-chave-local-com-pelo-menos-32-caracteres
JWT_EXPIRATION=3600000

FRONTEND_URL=http://localhost:5173
SPRING_PROFILES_ACTIVE=dev
```

> [!NOTE]
> Se o Spring Boot não carregar `.env` diretamente, configure as variáveis no terminal, na IDE ou por meio do `application-dev.yml`. Não copie segredos para o `application.yml`.

Exemplo de configuração em `backend/src/main/resources/application-dev.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://${DB_HOST:localhost}:${DB_PORT:5432}/${DB_NAME:clinica}
    username: ${DB_USERNAME:clinica}
    password: ${DB_PASSWORD:clinica_local}
  jpa:
    hibernate:
      ddl-auto: validate
  flyway:
    enabled: true

app:
  jwt:
    secret: ${JWT_SECRET}
    expiration: ${JWT_EXPIRATION:3600000}
```

O `ddl-auto` deve permanecer como `validate`; a criação e evolução do banco devem ser realizadas pelo Flyway.

### Frontend

Windows PowerShell:

```powershell
Copy-Item frontend\.env.example frontend\.env.local
```

Windows Prompt de Comando:

```bat
copy frontend\.env.example frontend\.env.local
```

macOS e Linux:

```bash
cp frontend/.env.example frontend/.env.local
```

Modelo sugerido para `frontend/.env.local`:

```dotenv
VITE_API_URL=http://localhost:8080/api
```

No Vite, somente variáveis iniciadas por `VITE_` ficam disponíveis no frontend. Nunca coloque segredos ou a chave JWT nesse arquivo.

## 7. Executar o PostgreSQL com Docker

Esta é a opção recomendada para padronizar o ambiente da equipe.

Exemplo de `docker-compose.yml` na raiz:

```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: clinica-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: clinica
      POSTGRES_USER: clinica
      POSTGRES_PASSWORD: clinica_local
    ports:
      - "5432:5432"
    volumes:
      - clinica_postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U clinica -d clinica"]
      interval: 5s
      timeout: 5s
      retries: 10

volumes:
  clinica_postgres_data:
```

Subir o banco:

```bash
docker compose up -d postgres
```

Verificar o estado:

```bash
docker compose ps
docker compose logs -f postgres
```

Interrompa a visualização dos logs com `Ctrl + C`. Isso não encerra o banco.

Parar os containers sem apagar os dados:

```bash
docker compose stop
```

Subir novamente:

```bash
docker compose start
```

Parar e remover apenas os containers e a rede:

```bash
docker compose down
```

> [!CAUTION]
> O comando `docker compose down -v` apaga o volume e todos os dados do banco local. Use-o somente quando realmente quiser recriar o banco do zero.

## 8. Alternativa: PostgreSQL instalado localmente

Se não utilizar Docker, instale PostgreSQL 16 e crie o usuário e o banco:

```sql
CREATE USER clinica WITH PASSWORD 'clinica_local';
CREATE DATABASE clinica OWNER clinica;
GRANT ALL PRIVILEGES ON DATABASE clinica TO clinica;
```

Depois confirme em `backend/.env`:

```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_NAME=clinica
DB_USERNAME=clinica
DB_PASSWORD=clinica_local
```

Não é necessário criar tabelas manualmente. O Flyway executará as migrations ao iniciar o backend.

## 9. Executar o backend

Abra um terminal na raiz do projeto.

### Windows PowerShell ou Prompt de Comando

```powershell
cd backend
.\mvnw.cmd clean spring-boot:run
```

### macOS e Linux

Na primeira execução, conceda permissão ao wrapper se necessário:

```bash
cd backend
chmod +x mvnw
./mvnw clean spring-boot:run
```

Para informar o perfil explicitamente:

Windows:

```powershell
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=dev"
```

macOS e Linux:

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

Na inicialização, o backend deve:

1. Conectar ao PostgreSQL;
2. Executar as migrations pendentes do Flyway;
3. Validar o mapeamento das entidades;
4. Iniciar na porta `8080`.

Teste a aplicação:

Acesse o Swagger em [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html).

Para encerrar, pressione `Ctrl + C`.

## 10. Executar o frontend

Abra outro terminal na raiz do projeto.

```bash
cd frontend
npm ci
npm run dev
```

Use `npm ci` quando existir `package-lock.json`, pois ele instala exatamente as versões registradas. Se ainda não existir lockfile, utilize:

```bash
npm install
npm run dev
```

Acesse:

Acesse o frontend em [http://localhost:5173](http://localhost:5173).

Para encerrar, pressione `Ctrl + C`.

## 11. Ordem correta para iniciar o projeto

Em cada dia de desenvolvimento:

1. Abra o Docker Desktop, no Windows ou macOS;
2. Suba o PostgreSQL;
3. Inicie o backend;
4. Confirme o Swagger ou endpoint de saúde;
5. Inicie o frontend;
6. Acesse o sistema pelo navegador.

Comandos resumidos:

Terminal 1, na raiz:

```bash
docker compose up -d postgres
```

Terminal 2, backend no Windows:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Terminal 2, backend no macOS/Linux:

```bash
cd backend
./mvnw spring-boot:run
```

Terminal 3:

```bash
cd frontend
npm ci
npm run dev
```

## 12. Executar por uma IDE

### IntelliJ IDEA

1. Abra a pasta `backend` ou o arquivo `pom.xml`;
2. Selecione o JDK 21 no Project SDK;
3. Aguarde a sincronização do Maven;
4. Configure as variáveis do `backend/.env` na Run Configuration, caso não exista carregamento automático;
5. Execute a classe principal anotada com `@SpringBootApplication`.

### VS Code

Extensões recomendadas:

- Extension Pack for Java;
- Spring Boot Extension Pack;
- ESLint;
- Prettier;
- Tailwind CSS IntelliSense;
- Docker;
- GitLens, opcional.

Abra a raiz do repositório para trabalhar com backend e frontend na mesma janela.

## 13. Build de produção

### Backend

Windows:

```powershell
cd backend
.\mvnw.cmd clean package
```

macOS e Linux:

```bash
cd backend
./mvnw clean package
```

O arquivo `.jar` será gerado em `backend/target/`.

Executar o JAR:

```bash
java -jar target/NOME-DO-ARQUIVO.jar
```

### Frontend

```bash
cd frontend
npm ci
npm run build
```

Os arquivos serão gerados em `frontend/dist/`.

Validar o build localmente:

```bash
npm run preview
```

## 14. Testes

### Testes do backend

Windows:

```powershell
cd backend
.\mvnw.cmd test
```

macOS e Linux:

```bash
cd backend
./mvnw test
```

### Testes e validações do frontend

Os scripts disponíveis podem ser consultados em `frontend/package.json`:

```bash
cd frontend
npm run
```

Scripts comuns:

```bash
npm run lint
npm run test
npm run build
```

Execute apenas os scripts existentes no `package.json`.

### Cypress, quando configurado

```bash
cd frontend
npx cypress open
```

Modo headless:

```bash
npx cypress run
```

Para testes de ponta a ponta, banco, backend e frontend devem estar executando, e os dados de teste devem estar preparados.

## 15. Flyway e banco de dados

As migrations ficam normalmente em:

```text
backend/src/main/resources/db/migration/
```

Padrão de nome:

```text
V1__criar_tabela_usuarios.sql
V2__criar_tabela_pacientes.sql
V3__criar_tabela_especialidades.sql
```

Regras:

- Nunca altere uma migration que já foi executada e compartilhada;
- Crie uma nova migration para cada mudança;
- Mantenha versões únicas e em ordem crescente;
- Use duas sublinhas entre a versão e a descrição;
- Não crie tabelas manualmente no ambiente compartilhado;
- Revise índices, chaves estrangeiras e restrições.

Consultar o histórico:

```sql
SELECT * FROM flyway_schema_history ORDER BY installed_rank;
```

## 16. Usuário inicial

Se o projeto possuir seed ou migration para o primeiro administrador, documente aqui somente credenciais exclusivas do ambiente local.

Exemplo:

```text
E-mail: admin@clinica.local
Senha: definida para o ambiente local
```

Não mantenha senhas reais, de homologação ou produção no README. Se ainda não existir seed, o administrador deverá ser criado pelo fluxo definido no backend.

## 17. Fluxo básico com Git

Atualizar a branch principal:

```bash
git switch main
git pull origin main
```

Criar uma branch de trabalho:

```bash
git switch -c feature/nome-da-tarefa
```

Conferir as alterações:

```bash
git status
git diff
```

Salvar e enviar:

```bash
git add .
git commit -m "feat: descreve a alteração"
git push -u origin feature/nome-da-tarefa
```

Evite commits contendo `.env`, tokens, senhas, dumps de banco, logs ou arquivos gerados.

## 18. Arquivos que não devem ser versionados

Confirme se o `.gitignore` contém pelo menos:

```gitignore
# Variáveis e segredos
.env
.env.*
!.env.example

# Java/Maven
backend/target/
*.log

# Node/Vite
frontend/node_modules/
frontend/dist/

# IDEs e sistema operacional
.idea/
.vscode/
*.iml
.DS_Store
Thumbs.db
```

Se a equipe compartilhar configurações úteis do VS Code, ajuste a regra de `.vscode/` de forma controlada.

## 19. Problemas comuns

### `java` não é reconhecido

- Instale o JDK 21;
- Configure `JAVA_HOME`;
- Adicione o diretório `bin` ao `Path`;
- Abra um novo terminal;
- Confira com `java -version`.

### `Unsupported class file major version` ou versão incompatível

O projeto está sendo executado com uma versão incorreta do Java. Confirme:

```bash
java -version
```

Também verifique o JDK selecionado pela IDE.

### `Permission denied: ./mvnw`

No macOS ou Linux:

```bash
chmod +x backend/mvnw
```

### Erro de conexão com o PostgreSQL

Verifique:

```bash
docker compose ps
docker compose logs postgres
```

Confirme host, porta, banco, usuário e senha. Se a porta `5432` já estiver ocupada, encerre o PostgreSQL local ou altere o mapeamento do Docker e a variável `DB_PORT`.

### `Port 8080 was already in use`

Windows:

```powershell
netstat -ano | findstr :8080
tasklist /FI "PID eq NUMERO_DO_PID"
```

macOS e Linux:

```bash
lsof -i :8080
```

Encerre apenas o processo conhecido que estiver usando a porta ou configure outra porta para o backend.

### Porta `5173` ocupada

O Vite poderá selecionar outra porta automaticamente. Nesse caso, atualize a origem permitida pelo CORS no backend ou encerre o processo que está usando a porta.

### Erro de CORS

Confirme se o backend permite a origem exata do frontend:

```text
http://localhost:5173
```

Não use liberação global de CORS em produção.

### Flyway acusa checksum inválido

Uma migration já executada provavelmente foi alterada. Não apague o histórico para esconder o erro. Reverta a mudança no arquivo antigo e crie uma nova migration.

### `npm ci` falha porque não existe `package-lock.json`

Execute uma vez:

```bash
npm install
```

Depois versione o `package-lock.json`.

### Dependências do frontend apresentam comportamento inesperado

Primeiro tente uma instalação limpa usando o lockfile. Exclua `node_modules` pelo gerenciador de arquivos ou por um comando seguro direcionado especificamente à pasta, e depois execute:

```bash
npm ci
```

Evite atualizar todas as dependências sem revisar as mudanças.

### Backend inicia, mas o frontend recebe `401`

- Confirme se o login retornou um token;
- Verifique se o token está sendo enviado no cabeçalho `Authorization`;
- Confirme se não expirou;
- Não registre o token completo nos logs ou evidências.

### Backend recebe `403`

O usuário está autenticado, mas não possui o perfil necessário para a operação. Teste com o perfil correto e confirme as regras do endpoint.

## 20. Checklist de primeira execução

- [ ] Git instalado;
- [ ] JDK 21 instalado e selecionado;
- [ ] Node.js LTS e npm instalados;
- [ ] Docker instalado e em execução;
- [ ] Repositório clonado;
- [ ] Branch `main` atualizada;
- [ ] Arquivos de ambiente criados;
- [ ] Segredos locais não versionados;
- [ ] PostgreSQL em execução;
- [ ] Backend conectado ao banco;
- [ ] Migrations executadas sem erro;
- [ ] Swagger acessível;
- [ ] Dependências do frontend instaladas;
- [ ] Frontend acessível;
- [ ] Login e permissões validados;
- [ ] Testes executados.

## 21. Resumo rápido

Depois de instalar Git, Java 21, Node.js e Docker:

```bash
git clone URL_DO_REPOSITORIO
cd clinica-medica
docker compose up -d postgres
```

Backend no Windows:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Backend no macOS/Linux:

```bash
cd backend
chmod +x mvnw
./mvnw spring-boot:run
```

Frontend em outro terminal:

```bash
cd frontend
npm ci
npm run dev
```

Acessos:

| Serviço | URL |
| :--- | :--- |
| Frontend | [http://localhost:5173](http://localhost:5173) |
| Swagger | [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html) |
| API | [http://localhost:8080/api](http://localhost:8080/api) |

## 22. Segurança

- Não compartilhe tokens, senhas ou documentos pessoais em commits e evidências;
- Use dados fictícios nos testes;
- Não registre CPF, telefone, e-mail ou token completos nos logs;
- Mantenha dependências atualizadas com revisão;
- Restrinja CORS e permissões por ambiente;
- Utilize chaves JWT fortes e diferentes em cada ambiente;
- Nunca reutilize credenciais locais em homologação ou produção;
- Revise o conteúdo preparado antes de abrir um pull request.

## 📄 Licença e responsáveis

Defina aqui a licença do projeto, a equipe responsável, o canal de suporte e o processo para contribuição.

```text
Projeto: Sistema de Gestão para Clínica Médica
Equipe responsável: preencher
Canal de suporte: preencher
Licença: preencher
```
