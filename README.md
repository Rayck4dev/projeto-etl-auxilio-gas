# 📊 Pipeline ETL & Dashboard - Análise do Auxílio Gás & Vulnerabilidade Social

![Status do Projeto](https://img.shields.io/badge/Status-Conclu%C3%ADdo-success?style=for-the-badge)
![Fase Atual](https://img.shields.io/badge/Fase-Dashboard%20Operacional-blue?style=for-the-badge)

Este repositório contém a engenharia de dados, a pipeline de **ETL (Extração, Transformação e Carga)** desenvolvida no Apache Hop e a camada visual em React focada no mapeamento e auditoria dos dados do programa **Auxílio Gás**, com ênfase analítica na evolução da chefia de família por mulheres.

---

## 🛠️ Tecnologias Utilizadas

### 🛢️ Engenharia de Dados e Infraestrutura
[![Apache Hop](https://img.shields.io/badge/Apache%20Hop-8A2BE2?style=for-the-badge&logo=apache-hop&logoColor=white)](https://hop.apache.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

### 🎨 Frontend
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

---

## 👥 Equipe e Divisão de Responsabilidades

O projeto foi dividido de forma modular entre a engenharia de dados (esteiras de ETL no Apache Hop) e o desenvolvimento da interface gerencial:

* **Ana Luiza** [GitHub](https://github.com/AnaLuiza2431) — Engenharia de Dados: Desenvolvimento da *Pipeline 1 (Evolução Financeira e Time Intelligence)*.
* **Emily Pereira** [GitHub](https://github.com/Emily2311) — Engenharia de Dados: Co-desenvolvedora das *Pipelines 2 (Mapeamento Geográfico)* e *3 (Densidade de Chefia Familiar Feminina)*.
* **Kerollayne Akemy** [GitHub](https://github.com/KerollayneAkemy) — Engenharia de Dados: Co-desenvolvedora das *Pipelines 2 (Mapeamento Geográfico)* e *3 (Densidade de Chefia Familiar Feminina)*.
* **Raycka Castro** — Engenharia de Software & Frontend: Arquitetura, desenvolvimento do **Dashboard Interativo** (React, Tailwind CSS, Recharts) e integração ponta a ponta dos dados gerados pelo ETL.

---

## 🛠️ Arquitetura da Pipeline de Dados (Apache Hop)

O fluxo de extração, transformação e carga (ETL) foi modelado utilizando o **Apache Hop** rodando em containers Docker. Em vez de processar uma única massa de dados bruta no front-end (o que travaria o navegador do usuário), a engenharia de dados mitigou a complexidade agregando as regras de negócio em **3 pipelines analíticas independentes**, aplicando técnicas de agregação que otimizaram drasticamente a performance de leitura do Dashboard.

---

### 1. Pipeline 01: Evolução Financeira (Time Intelligence)
*Desenvolvido por: Ana Luiza*

Responsável por estruturar a linha do tempo histórica do benefício para análises de crescimento, queda e sazonalidade.

![Fluxo da Pipeline 01](./images/pipeline_evolucao_financeira.png) (em breve a imagem sera adicionada)

#### 🗂️ Saída: `dados_evolucaofinanceira.csv`

---

### 2. Pipeline 02: Mapeamento Geográfico dos Repasses
*Desenvolvido por: Emily Pereira & Kerollayne Akemy*

Projetada para eliminar a necessidade de joins pesados em runtime, subindo o nível de granularidade dos dados e integrando bases distintas do Governo e do IBGE.

![Fluxo da Pipeline 02](./images/pipeline_mapeamento_geografico.png) (em breve a imagem sera adicionada)

#### 🗂️ Saída: `dados_ibge_map.csv`

---

### 3. Pipeline 03: Densidade de Chefia Familiar Feminina
*Desenvolvido por: Emily Pereira & Kerollayne Akemy*

Focada em auditoria analítica e isolamento de indicadores de extrema vulnerabilidade social, tratando exceções matemáticas e aplicando fatiamento estrito de regras de negócio.

![Fluxo da Pipeline 03](./images/pipeline_chefia_feminina.png) (em breve a imagem sera adicionada)

#### 🗂️ Saída: `dados_chefia.csv`

---

## 💻 Camada de Entrega: Dashboard Gerencial (React)
*Desenvolvido por: Raycka Castro*

O frontend consome diretamente as saídas otimizadas geradas pelas esteiras de ETL do Apache Hop. A arquitetura foi planejada usando **React 18**, estilização com **Tailwind CSS** para alta densidade de dados em modo escuro (*Dark Mode*) e gráficos de performance com **Recharts**.

### Funcionalidades Implementadas:
* **Filtros Demográficos Dinâmicos:** Controles reativos que permitem isolar a análise temporal por Mês de Referência e por Unidade Federativa (UF).
* **Chefia Cards (KPIs de Alto Nível):** * *Mães Chefe de Família:* Volume bruto e absoluto consolidado do indicador carregado.
    * *Volume Injetado:* Cruzamento de dados através do cálculo financeiro real de impacto ($\text{Quantidade Média de Mulheres} \times \text{Valor Médio do Benefício}$).
    * *Maior Concentração & Cota do Benefício:* Exibição de picos históricos e médias de repasse por linha de auditoria.
* **Distribuição de Mães Chefe por Região:** Gráficos de barras interativos com formatação simplificada em milhares (K) e Tooltips customizadas.
* **Tabela de Auditoria do Apache Hop:** Uma tabela integrada diretamente na aba de Chefia Familiar que serve como espelho e validação do banco de dados gerado no ETL, exibindo a visão limpa por Competência (`Mês/Ano`), `Localidade (UF)`, `Média da Chefia Feminina` e `Valor Médio Recebido`.

---

## ⚙️ Como Executar o Projeto

### Camada de Dados (Apache Hop)
1. Certifique-se de possuir o Apache Hop (GUI ou via Container) configurado.
2. Importe os arquivos `.hpl` contidos na pasta `/pipelines`.
3. Certifique-se de mapear os arquivos CSV brutos do governo na pasta de inputs.

### Camada Visual (Frontend)
1. Instale as dependências na pasta raiz do painel:
   ```bash
   npm install
   ```
   
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   
3. O painel estará disponível localmente no endereço indicado pelo Vite:
   ```bash
   http://localhost:5173
   ```
