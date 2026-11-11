<div align="center">

# Vanessa de Mendonça | Vivo Empresas

### 🌐 Projeto em produção

🚀 **[Acessar a landing page](https://vanessademendonca.vercel.app)**

### Landing page de apresentação comercial B2B

**Uma experiência digital para apresentar soluções empresariais e facilitar o primeiro contato comercial.**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

---

## Sobre o projeto

Landing page desenvolvida para apresentar a atuação comercial de **Vanessa de Mendonça**, executiva B2B voltada a empresas interessadas em soluções de conectividade e tecnologia.

O site reúne informações sobre soluções empresariais, diferenciais do atendimento consultivo e um formulário que prepara uma mensagem para contato via **WhatsApp**.

> **Aviso:** este é um projeto de apresentação e atendimento comercial independente. Não é um portal institucional oficial da Vivo.

## Funcionalidades

- **Layout responsivo:** adaptação para desktop, tablet e celular.
- **Navegação por seções:** links com indicação visual da seção ativa.
- **Apresentação de soluções empresariais:** conteúdos sobre telefonia, internet, PABX, cloud, segurança digital e IoT.
- **Identidade visual:** globo digital decorativo e efeitos visuais.
- **Formulário de contato:** validação de campos, incluindo **CNPJ obrigatório**.
- **Integração com WhatsApp:** preparação de uma mensagem personalizada para continuidade do atendimento humano.

**Importante:** o formulário **não grava informações em banco de dados**. O envio da mensagem depende da confirmação da pessoa no WhatsApp.

## Tecnologias utilizadas

| Tecnologia | Aplicação |
| --- | --- |
| **React** | Construção da interface com componentes |
| **TypeScript** | Tipagem e organização do código |
| **Vite** | Ambiente de desenvolvimento e build |
| **Tailwind CSS** | Estilização da interface |
| **React Hook Form** | Gerenciamento do formulário |
| **Zod** | Validação dos dados de entrada |
| **Lucide React** | Ícones da interface |

## Estrutura do projeto

```text
vanessa-vivo-landing/
├── public/
│   └── images/                 # Imagens utilizadas no site
├── src/
│   ├── components/
│   │   └── GlobeNetwork.tsx    # Componente visual do globo
│   ├── App.tsx                 # Página e seções principais
│   ├── main.tsx                # Ponto de entrada da aplicação
│   └── styles.css              # Estilos da interface
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## Executar localmente

**Pré-requisitos:** Node.js e npm instalados.

1. Clone o repositório:

   ```bash
   git clone https://github.com/MarciaFogaca/vanessa-vivo-landing.git
   ```

2. Entre na pasta do projeto:

   ```bash
   cd vanessa-vivo-landing
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o ambiente de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Abra no navegador o endereço informado pelo Vite no terminal.

## Build de produção

Para gerar os arquivos otimizados:

```bash
npm run build
```

Os arquivos resultantes são gerados na pasta `dist/`.

## Publicação

O projeto está publicado na **Vercel**, com implantação a partir do repositório no GitHub.

🔗 **Site em produção:** [https://vanessademendonca.vercel.app](https://vanessademendonca.vercel.app)

| Configuração | Valor |
| --- | --- |
| Framework | Vite |
| Comando de build | `npm run build` |
| Diretório de saída | `dist` |

## Privacidade e contato

O formulário solicita informações de contato e dados da empresa para preparar uma mensagem no WhatsApp. Antes de utilizar o site em campanhas, é importante revisar os textos de privacidade, o tratamento dos dados e os links de contato.

## Desenvolvimento

Desenvolvido por **Márcia Telles**.

[GitHub](https://github.com/MarciaFogaca) · [LinkedIn](https://www.linkedin.com/in/marciatellesfogaca/)

---

<div align="center">
  <sub>Projeto de apresentação comercial independente • Vanessa de Mendonça | Vivo Empresas</sub>
</div>
