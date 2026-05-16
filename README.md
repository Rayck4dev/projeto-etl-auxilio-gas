# 📊 Pipeline ETL - Análise do Auxílio Gás & Vulnerabilidade Social

![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-orange?style=for-the-badge)
![Fase Atual](https://img.shields.io/badge/Fase-ETL%20Conclu%C3%ADdo-success?style=for-the-badge)
![Ferramenta](https://img.shields.io/badge/Apache%20Hop-v2.x-blue?style=for-the-badge&logo=apache)

Este repositório contém a engenharia de dados e a pipeline de **ETL (Extração, Transformação e Carga)** desenvolvida para processar, higienizar e agregar os dados brutos governamentais sobre o programa **Auxílio Gás**, com foco analítico na evolução da chefia de família por mulheres.

---

## 🛠️ A Pipeline de Dados (Apache Hop)

O fluxo foi modelado utilizando o **Apache Hop** rodando via container Docker. A arquitetura da pipeline (`auxiliogas.hpl`) segue um conceito linear e performático para engenharia de dados:

1. **`Text File Input`**: Carga de dados brutos com mais de 33 mil registros de municípios brasileiros.
2. **`Strings cut`**: Decomposição do campo cronológico bruto (`anomes`) para gerar as dimensões analíticas independentes de `ano` e `mes`.
3. **`Filter rows`**: Regra de negócio aplicada para remover dados inconsistentes (`qtd_fam_benef_aux_gas > 0`), blindando o sistema contra erros de divisão por zero.
4. **`Memory Group by`**: Aplicação de técnica **OLAP (Roll-up)**. Os dados municipais foram consolidados e sumarizados em totais de famílias e de chefia feminina por competência mensal, otimizando o tamanho do arquivo em mais de 99%.
5. **`Text File Output`**: Geração do arquivo tratado (`auxilio_gas_final.csv`).

---

## 📁 Estrutura dos Arquivos Entrega

* 📄 `auxiliogas.hpl`: Arquivo nativo do Apache Hop contendo toda a lógica do fluxo de dados estruturado.
* 📊 `auxilio_gas_final.csv`: Base de dados resultante do processo de ETL, agregada por Ano e Mês.

---

## 🚀 Em Breve: Dashboard Interativo (React + Tailwind + Recharts)

A próxima fase deste projeto consiste no desenvolvimento da camada de entrega visual (Frontend). O dashboard consumirá diretamente os dados estruturados por esta pipeline.
