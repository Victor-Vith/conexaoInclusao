// Portal de Inclusão Digital — quiz.js
// Motor genérico de quiz. Cada página de módulo define:
//   window.DADOS_QUIZ = [ { pergunta, opcoes: [...], correta: indice, explicacao }, ... ]
//   window.CHAVE_MODULO = "informatica" | "navegacao" | "servicos"
// e inclui um elemento <div id="quiz-container"></div> no HTML.

(function () {
  "use strict";

  var CHAVE_PROGRESSO = "pid_progresso";
  var NOTA_MINIMA = 0.7; // 70% de acertos aprova o módulo

  function lerProgresso() {
    try {
      var bruto = window.localStorage.getItem(CHAVE_PROGRESSO);
      return bruto ? JSON.parse(bruto) : {};
    } catch (erro) {
      return {};
    }
  }

  function gravarProgresso(progresso) {
    try {
      window.localStorage.setItem(CHAVE_PROGRESSO, JSON.stringify(progresso));
    } catch (erro) {
      /* Sem armazenamento local disponível: o quiz ainda funciona nesta
         visita, só não fica salvo para a emissão do certificado depois. */
    }
  }

  window.marcarModuloConcluido = function (chaveModulo) {
    var progresso = lerProgresso();
    progresso[chaveModulo] = true;
    gravarProgresso(progresso);
  };

  window.obterProgresso = lerProgresso;

  function criarPergunta(pergunta, indice, respostas) {
    var bloco = document.createElement("div");
    bloco.className = "pergunta-quiz";
    bloco.setAttribute("role", "group");
    bloco.setAttribute("aria-labelledby", "pergunta-" + indice);

    var enunciado = document.createElement("p");
    enunciado.className = "enunciado";
    enunciado.id = "pergunta-" + indice;
    enunciado.textContent = (indice + 1) + ". " + pergunta.pergunta;
    bloco.appendChild(enunciado);

    var lista = document.createElement("ul");
    lista.className = "opcoes-quiz";

    var explicacao = document.createElement("div");
    explicacao.className = "explicacao";
    explicacao.textContent = pergunta.explicacao || "";

    pergunta.opcoes.forEach(function (texto, opcaoIndice) {
      var item = document.createElement("li");
      var botao = document.createElement("button");
      botao.type = "button";
      botao.className = "opcao-quiz";
      botao.setAttribute("aria-pressed", "false");
      botao.textContent = texto;

      botao.addEventListener("click", function () {
        if (respostas[indice] !== undefined) return; // já respondida
        respostas[indice] = opcaoIndice;

        var todosBotoes = lista.querySelectorAll(".opcao-quiz");
        todosBotoes.forEach(function (b, i) {
          b.disabled = true;
          if (i === pergunta.correta) b.classList.add("correta");
          if (i === opcaoIndice && i !== pergunta.correta) b.classList.add("incorreta");
        });

        explicacao.classList.add("mostrar");
      });

      item.appendChild(botao);
      lista.appendChild(item);
    });

    bloco.appendChild(lista);
    bloco.appendChild(explicacao);
    return bloco;
  }

  function iniciarQuiz(perguntas, chaveModulo) {
    var container = document.getElementById("quiz-container");
    if (!container || !perguntas || !perguntas.length) return;

    var respostas = {};
    var caixa = document.createElement("div");
    caixa.className = "bloco-quiz";

    var titulo = document.createElement("h3");
    titulo.textContent = "Teste o que você aprendeu";
    caixa.appendChild(titulo);

    var intro = document.createElement("p");
    intro.textContent = "Responda às " + perguntas.length + " perguntas abaixo. Você precisa acertar pelo menos " + Math.round(NOTA_MINIMA * 100) + "% para concluir este módulo.";
    caixa.appendChild(intro);

    perguntas.forEach(function (pergunta, indice) {
      caixa.appendChild(criarPergunta(pergunta, indice, respostas));
    });

    var botaoEnviar = document.createElement("button");
    botaoEnviar.type = "button";
    botaoEnviar.className = "botao botao-primario";
    botaoEnviar.textContent = "Ver meu resultado";

    var resultado = document.createElement("div");
    resultado.className = "resultado-quiz";
    resultado.setAttribute("role", "status");
    resultado.style.display = "none";

    botaoEnviar.addEventListener("click", function () {
      var faltam = perguntas.length - Object.keys(respostas).length;
      if (faltam > 0) {
        resultado.style.display = "block";
        resultado.className = "resultado-quiz reprovado";
        resultado.textContent = "Faltam " + faltam + " pergunta(s) para responder antes de ver o resultado.";
        return;
      }

      var acertos = 0;
      perguntas.forEach(function (pergunta, indice) {
        if (respostas[indice] === pergunta.correta) acertos++;
      });
      var proporcao = acertos / perguntas.length;
      var aprovado = proporcao >= NOTA_MINIMA;

      resultado.style.display = "block";
      resultado.className = "resultado-quiz " + (aprovado ? "aprovado" : "reprovado");

      if (aprovado) {
        window.marcarModuloConcluido(chaveModulo);
        resultado.innerHTML = "<strong>Parabéns! Você acertou " + acertos + " de " + perguntas.length + ".</strong><br>Módulo concluído. Você já pode buscar seu certificado ou seguir para o próximo módulo.";
      } else {
        resultado.innerHTML = "<strong>Você acertou " + acertos + " de " + perguntas.length + ".</strong><br>Reveja o conteúdo acima e tente novamente — é assim que se aprende!";
        var botaoRefazer = document.createElement("button");
        botaoRefazer.type = "button";
        botaoRefazer.className = "botao botao-contorno";
        botaoRefazer.style.marginTop = "1rem";
        botaoRefazer.textContent = "Tentar novamente";
        botaoRefazer.addEventListener("click", function () {
          window.location.reload();
        });
        resultado.appendChild(botaoRefazer);
      }

      botaoEnviar.disabled = true;
      resultado.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    caixa.appendChild(botaoEnviar);
    caixa.appendChild(resultado);
    container.appendChild(caixa);
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (window.DADOS_QUIZ && window.CHAVE_MODULO) {
      iniciarQuiz(window.DADOS_QUIZ, window.CHAVE_MODULO);
    }
  });
})();
