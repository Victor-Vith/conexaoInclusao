# Portal de Inclusão Digital — Canela e Gramado/RS

Projeto de **Atividade Extensionista II: Tecnologia Aplicada à Inclusão Digital**, do curso de CST em Análise e Desenvolvimento de Sistemas — Centro Universitário Internacional UNINTER (Escola Superior Politécnica).

**Aluno:** Victor Vith Vieira (RU 5321556)

## Sobre o projeto

Portal web gratuito, feito em **HTML, CSS e JavaScript puros** (sem frameworks ou build steps), voltado a jovens e pessoas idosas das comunidades de **Canela e Gramado (RS)** que desejam aprender informática básica, navegação segura e uso de serviços digitais — com foco especial em **prevenção contra golpes digitais**.

Alinhado aos Objetivos de Desenvolvimento Sustentável (ODS) **04 — Educação de qualidade** e **10 — Redução das desigualdades**.

## Estrutura do site

```
portal-inclusao-digital/
├── index.html                        # Página inicial
├── sobre.html                        # Sobre o projeto (proposta, ODS, metodologia)
├── certificado.html                  # Progresso e emissão do certificado
├── modulos/
│   ├── informatica-basica.html       # Módulo 1
│   ├── navegacao-segura.html         # Módulo 2 (foco em segurança)
│   └── servicos-digitais.html        # Módulo 3
├── css/
│   └── style.css
└── js/
    ├── main.js                       # Barra de acessibilidade (fonte e contraste)
    ├── quiz.js                       # Motor de quiz dos módulos
    └── certificado.js                # Checklist de progresso + geração do certificado
```

## Funcionalidades

- **3 módulos de aprendizagem** com conteúdo em linguagem simples e caixas de destaque (dicas e alertas de segurança).
- **Quiz ao final de cada módulo** (70% de acertos aprova o módulo).
- **Progresso salvo no navegador** (localStorage) — ao concluir os 3 módulos, a pessoa pode gerar um **certificado simples em imagem (PNG)**, com nome e data.
- **Barra de acessibilidade**: aumentar/diminuir o tamanho da fonte e ativar alto contraste — pensada para o público idoso.
- Layout responsivo, navegação por teclado e leitura por fonte acessível (Atkinson Hyperlegible).

## Como publicar (GitHub Pages)

1. Suba esta pasta para um repositório no GitHub.
2. Em **Settings → Pages**, selecione a branch principal e a pasta raiz (`/`).
3. O site ficará disponível em `https://seu-usuario.github.io/nome-do-repositorio/`.

## Como usar localmente

Basta abrir o arquivo `index.html` em qualquer navegador — não é necessário instalar nada.

## Próximos passos sugeridos (para a etapa de Trabalho Final)

- Gravar e inserir os vídeos indicados nos espaços reservados (`.moldura-video`) de cada módulo.
- Aplicar o portal com a comunidade local e registrar um vídeo de até 5 minutos comprovando o uso.
- Adicionar o link deste repositório e do vídeo no relatório final da Atividade Extensionista.
