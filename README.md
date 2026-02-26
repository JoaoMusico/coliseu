# Clay Gladiators Arena

Um jogo de combate baseado em física onde gladiadores de massinha lutam em uma arena circular.

## Como Jogar

- **Jogador 1 (WASD):**
  - `W`, `A`, `S`, `D`: Movimentação
  - `Espaço`: Pulo / Impulso
  - `Q`: Ataque Básico (Empurrão)

- **Jogador 2 (Setas):**
  - `↑`, `←`, `↓`, `→`: Movimentação
  - `J`: Pulo / Impulso
  - `L`: Ataque Básico (Empurrão)

## Mecânicas
- **Arena do Coliseu:** Permaneça dentro do círculo! A água ao redor está infestada de tubarões.
- **Inimigos:**
  - **Cachorro de Marshmallow:** Rápido e grudento.
  - **Gigante de Algodão:** Lento e pesado.
  - **Zumbi Unicórnio:** Equilibrado e perigoso.
- **Rounds:** A cada 10 segundos (ou quando todos os inimigos são derrotados), uma nova onda surge.

## Instruções para GitHub Desktop e Deploy

1. **Localização do Projeto:** Este projeto foi criado em:
   `C:\Users\26012197\.gemini\antigravity\scratch\clay-gladiators-arena`
2. **GitHub Desktop:**
   - Abra o GitHub Desktop.
   - Vá em `File` > `Add Local Repository`.
   - Selecione a pasta acima.
   - O GitHub Desktop dirá que não é um repositório git. Clique em `Create a repository here`.
   - Dê um nome (ex: `clay-gladiators-arena`) e clique em `Create Repository`.
3. **Commit & Push:**
   - No GitHub Desktop, você verá todos os arquivos que criamos.
   - Digite uma mensagem de commit (ex: "Initial Game Setup").
   - Clique em `Commit to main`.
   - Clique em `Publish repository` para enviar ao GitHub.
4. **GitHub Pages:**
   - No site do GitHub, vá nas configurações (`Settings`) do seu repositório.
   - Procure a aba `Pages`.
   - Em `Build and deployment` > `Source`, selecione `Deploy from a branch`.
   - Selecione a branch `main` e a pasta `/ (root)`.
   - Clique em `Save`.
   - Espere alguns minutos e seu jogo estará online!

## Tecnologias Utilizadas
- **HTML5 Canvas**
- **Vanilla CSS3** (com Glassmorphism)
- **Matter.js** (Motor de Física)
- **Google Fonts** (Outfit)
