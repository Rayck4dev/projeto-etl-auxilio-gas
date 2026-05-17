# 📊 Pipeline ETL - Análise do Auxílio Gás & Vulnerabilidade Social

![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-orange?style=for-the-badge)
![Fase Atual](https://img.shields.io/badge/Fase-ETL%20Conclu%C3%ADdo-success?style=for-the-badge)
![Ferramenta](https://img.shields.io/badge/Apache%20Hop-v2.x-blue?style=for-the-badge&logo=apache)

Este repositório contém a engenharia de dados e a pipeline de **ETL (Extração, Transformação e Carga)** desenvolvida para processar, higienizar e agregar os dados brutos governamentais sobre o programa **Auxílio Gás**, com foco analítico na evolução da chefia de família por mulheres.

--- 

## 🚀 Em Breve: Dashboard Interativo (React + Tailwind + Recharts)

A próxima fase deste projeto consiste no desenvolvimento da camada de entrega visual (Frontend). O dashboard consumirá diretamente os dados estruturados por esta pipeline.

---

## 👥 Equipe responsável

- Ana Luiza [GitHub](https://github.com/AnaLuiza2431)
- Emily Pereira [GitHub](https://github.com/Emily2311)
- Kerollayne Akemy [GitHub](https://github.com/KerollayneAkemy)
- Raycka Castro

---

## 🛠️ Arquitetura da Pipeline de Dados (Apache Hop)

O fluxo de extração, transformação e carga (ETL) foi modelado utilizando o **Apache Hop** rodando em container Docker. Em vez de processar uma única massa de dados bruta no front-end, a engenharia de dados foi dividida de forma modular em **3 pipelines analíticas** independentes. Cada uma delas foi projetada para responder a uma dor de negócio específica e alimentar um quadrante exclusivo do Dashboard React, aplicando técnicas de **Roll-up (OLAP)** que otimizaram o tamanho dos arquivos finais em mais de 99%.

---

### 1. Pipeline de Evolução Financeira (Time Intelligence)
Responsável por estruturar a linha do tempo histórica do benefício para análises de crescimento, queda e sazonalidade.
* **`Text File Input`**: Carga dos microdados brutos do Auxílio Gás.
* **`Strings cut`**: Decomposição cirúrgica da coluna textual conjunta `anomes` (ex: "202512") isolando as dimensões temporais independentes de `ano` (posições 0 a 4) e `mes` (posições 4 a 6).
* **`Memory Group by`**: Agrupamento por Ano e Mês, aplicando a sumarização (`Sum`) no volume de famílias beneficiadas. 
* **Foco no Dashboard**: Permite a criação de gráficos de linha temporais com navegação dinâmica e efeito de **Drill-down** (expandir o ano para visualizar os meses).

### 2. Pipeline de Mapeamento Geográfico (Macro-Regiões)
Projetada para eliminar a necessidade de joins pesados no navegador do usuário, subindo o nível de granularidade dos dados.
* **`Strings cut & Join`**: Extração dos dois primeiros dígitos do `codigo_ibge` municipal para identificar o Estado e cruzamento com tabela auxiliar para trazer o nome do Estado por extenso e sua respectiva Região administrativa.
* **`Memory Group by`**: Consolidação macro-econômica. Os dados deixam a granularidade de município e sobem para o nível de **Estado e Região**, aplicando a soma do volume total de famílias atendidas.
* **Foco no Dashboard**: Alimenta componentes de mapas interativos (Choropleth Maps) e gráficos de distribuição regional de alta performance.

### 3. Pipeline de Densidade de Chefia Familiar Feminina (Fatiamento de Vulnerabilidade)
Focada em auditoria analítica e isolamento de indicadores de extrema vulnerabilidade social, tratando exceções matemáticas.
* **`Filter rows (Anti-Zero)`**: Filtro estratégico de segurança que barra qualquer município com inconsistência de dados ou com total de famílias zerado (`qtd_fam_benef_aux_gas > 0`), blindando o motor do Apache Hop contra erros fatais de divisão por zero (`java.lang.ArithmeticException: / by zero`).
* **`Calculator`**: Recálculo manual e validação da taxa de responsabilidade familiar dividindo a quantidade de mulheres chefes pelo total de famílias (`A / B`) e multiplicando pela constante (`A * B`), garantindo a precisão do indicador de gênero.
* **`Filter rows (Corte de 90%)`**: Fatiamento de dados baseado em regra de negócio estrita, isolando apenas as regiões onde a chefia feminina é esmagadora (superior a 90%).
* **`Memory Group by`**: Agrupamento macro por Estado calculando a média real (`Average`) do percentual e integrando o valor médio financeiro recebido.
* **Foco no Dashboard**: Alimenta cards de KPIs de destaque, alertas de criticidade e rankings de estados com maior índice de chefia feminina.

---

