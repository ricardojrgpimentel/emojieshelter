# 📋 Emoji Shelter - Roadmap de Melhorias

Este documento detalha as funcionalidades e melhorias planeadas para o projeto, mantendo a arquitetura "No-Backend" (Client-side apenas).

---

## 🚀 Fase 1: Experiência de Navegação (UX)
- [x] **Tags Clicáveis**
  - **O que fazer:** Ao clicar numa tag dentro de um `EmojiSquare`, a galeria deve ser filtrada automaticamente por essa tag.
  - **Impacto:** Facilita a descoberta de emojis semelhantes.
- [x] **Histórico de Recentes**
  - **O que fazer:** Criar uma secção/categoria automática no topo que guarda os últimos 10 emojis copiados no `localStorage`.
  - **Impacto:** Rapidez no uso frequente.
- [x] **Partilha Direta via URL**
  - **O que fazer:** Sincronizar o estado da pesquisa e categoria selecionada com os query parameters do URL (ex: `?search=happy`).
  - **Impacto:** Permite partilhar resultados específicos.

## 🛠️ Fase 2: Funcionalidades Core
- [x] **Criação de Emojis Customizados**
  - **O que fazer:** Adicionar um modal/formulário para o utilizador introduzir texto e tags. Guardar no `localStorage` e mostrar junto aos outros.
  - **Impacto:** Personalização total.
- [x] **Exportar/Importar Shelter**
  - **O que fazer:** Botões para descarregar um ficheiro JSON com os favoritos e uma área de drop para restaurar.
  - **Impacto:** Portabilidade de dados sem base de dados.
- [x] **Live Preview**
  - **O que fazer:** Input de texto fixo onde o utilizador pode ver o emoji inserido numa frase de exemplo.
  - **Impacto:** Ver o contexto real de uso.

## 🎨 Fase 3: UI & Offline
- [x] **Modo Zen**
  - **O que fazer:** Botão para ocultar Header, Footer e About, deixando apenas o grid de emojis.
  - **Impacto:** Foco na utilidade.
- [x] **Suporte PWA (Offline)**
  - **O que fazer:** Configurar Service Worker e melhorar o `manifest.json`.
  - **Impacto:** Uso fiável em qualquer situação.

## 📚 Fase 4: Conteúdo
- [x] **Expansão da Biblioteca**
  - **O que fazer:** Adicionar categorias como `music`, `food`, `nature`.
  - [x] Adicionar +20 emojis de música e natureza.
- [x] **Secção de ASCII Art**
  - **O que fazer:** Nova categoria para artes unicode de múltiplas linhas.
  - **Impacto:** Oferecer algo além de emojis simples.
