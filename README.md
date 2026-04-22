# Aplicação Web com React - Autenticação Google e Cadastro

Este é um projeto acadêmico de aplicação web em React cumprindo os requisitos de autenticação Google Oauth2, tela de apresentação da equipe e cadastro de usuários com importação de dados sociais e exportação local via JSON.

## Descrição do Projeto

O sistema é construído como uma Single Page Application e dispõe de três rotas centrais:
- **Home (`/`)**: Página de entrada simplificada exibindo animações 3D de cenários em tecnologia WebGL, e providenciando o acesso via Google OAuth 2.0.
- **Equipe (`/equipe`)**: Uma página dedicada que se acessa após login e expõe dois desenvolvedores do sistema, detalhando suas áreas de atuação.
- **Cadastro (`/cadastro`)**: Uma área de registro para coleta de informações avulsas que se pré-preenche com nome e e-mail via as credenciais sociais do usuário e formulta um JSON para verificação técnica do lado cliente.

## ecnologias Utilizadas

- **React 19**
- **Vite**
- **Google OAuth 2.0** (`@react-oauth/google`)
- **React Router DOM**
- **Three.js** 

## Integrantes da Dupla

### Ana Maria do Céu Gomes
-  Desenvolvedora Full Stack
- Especialidade: Área de dados, Machine Learning, IA, animação web com 3D, WebGL e React.

### João Victor Garciano
- Desenvolvedor Backend
- Especialidade: Ecossistema corporativo, Java, API REST, Spring Boot, arquitetura de sistemas e curso na Rocketseat.

## Instruções para Execução Local

Siga as diretrizes abaixo para executar o projeto:

```bash
# 1. Instale as dependências com o npm
npm install

# 2. Crie as variáveis de ambiente
# Copie o arquivo .env.example para um novo arquivo .env no diretório raíz da aplicação e preencha o Client ID de seu projeto gerado no Google Cloud (Google Identity/Oauth).
cp .env.example .env

# 3. Rode o ambiente local utilizando vite
npm run dev
```

## Link da Aplicação em Produção

https://jocular-sprite-81f19b.netlify.app
