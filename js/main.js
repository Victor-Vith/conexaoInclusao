// Portal de Inclusão Digital — main.js
// Controla a barra de acessibilidade (tamanho de fonte e alto contraste).
// Guarda a preferência da pessoa no navegador para as próximas visitas.

(function () {
  "use strict";

  var CHAVE_ESCALA = "pid_escala_fonte";
  var CHAVE_CONTRASTE = "pid_alto_contraste";
  var raiz = document.documentElement;

  function lerArmazenamento(chave) {
    try {
      return window.localStorage.getItem(chave);
    } catch (erro) {
      return null;
    }
  }

  function gravarArmazenamento(chave, valor) {
    try {
      window.localStorage.setItem(chave, valor);
    } catch (erro) {
      /* Sem suporte a armazenamento local: a página continua funcionando,
         só não guarda a preferência entre visitas. */
    }
  }

  function aplicarEscala(escala) {
    raiz.style.setProperty("--escala-fonte", escala);
    gravarArmazenamento(CHAVE_ESCALA, escala);
  }

  function aplicarContraste(ativo) {
    if (ativo) {
      raiz.setAttribute("data-contraste", "alto");
    } else {
      raiz.removeAttribute("data-contraste");
    }
    gravarArmazenamento(CHAVE_CONTRASTE, ativo ? "1" : "0");
    var botao = document.getElementById("botao-contraste");
    if (botao) botao.setAttribute("aria-pressed", ativo ? "true" : "false");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var escalaSalva = parseFloat(lerArmazenamento(CHAVE_ESCALA)) || 1;
    aplicarEscala(escalaSalva);
    aplicarContraste(lerArmazenamento(CHAVE_CONTRASTE) === "1");

    var botaoMais = document.getElementById("botao-fonte-mais");
    var botaoMenos = document.getElementById("botao-fonte-menos");
    var botaoContraste = document.getElementById("botao-contraste");

    if (botaoMais) {
      botaoMais.addEventListener("click", function () {
        var atual = parseFloat(raiz.style.getPropertyValue("--escala-fonte")) || 1;
        aplicarEscala(Math.min(atual + 0.1, 1.4).toFixed(2));
      });
    }
    if (botaoMenos) {
      botaoMenos.addEventListener("click", function () {
        var atual = parseFloat(raiz.style.getPropertyValue("--escala-fonte")) || 1;
        aplicarEscala(Math.max(atual - 0.1, 0.9).toFixed(2));
      });
    }
    if (botaoContraste) {
      botaoContraste.addEventListener("click", function () {
        var ativo = raiz.getAttribute("data-contraste") === "alto";
        aplicarContraste(!ativo);
      });
    }

    // Menu mobile simples (mostra/esconde os links de navegação)
    var botaoMenu = document.getElementById("botao-menu");
    var listaNav = document.getElementById("links-nav");
    if (botaoMenu && listaNav) {
      botaoMenu.addEventListener("click", function () {
        var aberto = listaNav.classList.toggle("aberto");
        botaoMenu.setAttribute("aria-expanded", aberto ? "true" : "false");
      });
    }
  });
})();
