# Blog Erik Figueiredo

Blog pessoal feito com [Eleventy (11ty)](https://www.11ty.dev/), focado em dicas, artigos e reflexões para programadores de todos os níveis. O projeto prioriza SEO, acessibilidade, responsividade, automação de build/deploy e boas práticas modernas de web.

## ✨ Funcionalidades

- **SEO avançado**: meta tags, Open Graph, Twitter Card, canonical, sitemap.xml e robots.txt.
- **Responsivo**: layout adaptado para desktop e mobile.
- **Dark mode**: alternância de tema claro/escuro.
- **Acessibilidade**: uso de aria-labels, alt em imagens, âncoras descritivas e navegação por teclado.
- **Posts com tags**: organização por tags e páginas de listagem.
- **Artigos recomendados**: sugestões no final de cada post.
- **Imagens otimizadas**: loading="lazy", proporção responsiva e alt.
- **Sitemap dinâmico**: gerado automaticamente após build.
- **Deploy automatizado**: via GitHub Actions para GitHub Pages.
- **Partials e includes**: código limpo e reutilizável.

## 🚀 Como rodar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/erikfig/blog-erik-figueiredo.git
   cd SEU_REPO
   ```
2. Instale as dependências:
   ```bash
   yarn install
   ```
3. Rode o servidor de desenvolvimento:
   ```bash
   yarn serve
   ```
4. Acesse em [http://localhost:8080](http://localhost:8080)

## 🛠️ Deploy automático

- O deploy é feito automaticamente no GitHub Pages via GitHub Actions.
- O site é publicado na branch `gh-pages` (ou conforme configurado no Pages).

## 📁 Estrutura principal

- `posts/` — Markdown dos artigos
- `assets/` — CSS, imagens e JS
- `_partials/` — Includes Nunjucks (header, footer, etc)
- `.eleventy.js` — Configuração do Eleventy
- `.github/workflows/` — Workflows de build e deploy

## 💡 Contribua!

Adoro receber PRs de ajuda, melhorias, correções ou novas ideias! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## 📄 Licença

MIT

---

Feito com ❤️ por Erik Figueiredo
