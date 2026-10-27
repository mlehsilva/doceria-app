# 🍰 Doceria Açúcar & Afeto — MVP de E-commerce

Este projeto é um MVP (Minimum Viable Product) de um e-commerce/cardápio digital focado na experiência do usuário e otimizado para dispositivos móveis (**Mobile-First**). Desenvolvido como parte de um Hackathon de 3 dias, o sistema simula um ambiente de vendas real para a confeitaria artesanal **Açúcar & Afeto**.

---

## 🎨 Identidade Visual e UI/UX

O design foi inspirado em plataformas modernas de delivery (como o *OxeMenu*), utilizando uma estética limpa, fluida e focada em imagens de alta definição dos produtos.
*   **Cor Principal:** Rosa Pastel (`#FFF0F5` e `#FFE4E1`), trazendo a atmosfera doce e artesanal de uma confeitaria.
*   **Detalhes e Destaques:** Amarelo Pastel (`#FEF08A`), aplicado estrategicamente em botões de ação para guiar o fluxo de compra do cliente.
*   **Componentes Modernos:** Transições suaves nos botões, grid responsivo e uma sacola lateral em estilo *drawer* (gaveta) de fácil acesso.

---

## 🚀 Tecnologias Utilizadas

O ecossistema do projeto foi construído utilizando as ferramentas mais modernas do desenvolvimento front-end:

*   **React (SPA):** Estrutura base para a construção de uma interface componentizada e reativa.
*   **Vite:** Ferramenta de build ultra-rápida para o ambiente de desenvolvimento.
*   **Tailwind CSS v4:** Nova geração da biblioteca de estilização utilitária, configurada de forma nativa e centralizada via `@theme` no CSS global.
*   **Context API (React Hooks):** Gerenciamento de estado global centralizado para controle de dados do carrinho.

---

## ⚙️ Arquitetura do Sistema e Funcionalidades

O projeto cumpre todos os requisitos obrigatórios e boas práticas avaliadas pela banca:

1. **Catálogo Dinâmico (`src/data/produtos.json`):** Lista de doces finos mockada com imagens profissionais locais, descrições detalhadas e preços formatados.
2. **Gerenciamento de Estado Global (`src/context/CartContext.jsx`):**
    *   **Impedimento de duplicidade:** O sistema varre o carrinho e incrementa a quantidade se o doce já tiver sido adicionado.
    *   **Cálculos em Tempo Real:** Atualização automática do subtotal e do contador flutuante de itens.
    *   **Controle de Itens:** Funções para adicionar, aumentar, diminuir quantidades ou remover itens diretamente.
3. **Sacola Lateral Interativa:** Gaveta de visualização que desliza na tela ao acionar o botão flutuante inferior, otimizando o espaço útil no celular.
4. **Finalização de Pedido:** Fluxo contínuo que compila os dados finais da sacola e encerra a jornada do usuário.

---

## 🛠️ Como Executar o Projeto Localmente

Siga os passos abaixo no seu terminal para rodar o MVP na sua máquina:

1. Clonar o repositório ou acessar a pasta do projeto:
   ```bash
   cd doceria-app
   ```

2. Instalar as dependências do projeto:
   ```bash
   npm install
   ```

3. Instalar o plugin oficial do Tailwind v4 para o Vite:
   ```bash
   npm install @tailwindcss/vite
   ```

4. Iniciar o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Abra o navegador no endereço indicado pelo terminal (geralmente `http://localhost:5173`).

---

## 👥 Desenvolvido por:
*   Maria Letícia da Silva
