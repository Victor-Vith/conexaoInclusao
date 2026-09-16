// Portal de Inclusão Digital — certificado.js
// Mostra o progresso da pessoa nos 3 módulos e, quando todos estiverem
// concluídos, permite gerar um certificado simples em imagem (PNG),
// desenhado em um <canvas>, com o nome informado.

(function () {
  "use strict";

  var MODULOS = [
    { chave: "informatica", rotulo: "Informática Básica" },
    { chave: "navegacao", rotulo: "Navegação Segura" },
    { chave: "servicos", rotulo: "Serviços Digitais" }
  ];

  function formatarDataExtenso() {
    var hoje = new Date();
    return hoje.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  }

  function desenharCertificado(nome) {
    var canvas = document.getElementById("canvas-certificado");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var largura = 1200, altura = 850;
    canvas.width = largura;
    canvas.height = altura;

    // Fundo
    ctx.fillStyle = "#F7F2E7";
    ctx.fillRect(0, 0, largura, altura);

    // Moldura dupla
    ctx.strokeStyle = "#1F3A2E";
    ctx.lineWidth = 10;
    ctx.strokeRect(28, 28, largura - 56, altura - 56);
    ctx.strokeStyle = "#C97A1E";
    ctx.lineWidth = 3;
    ctx.strokeRect(48, 48, largura - 96, altura - 96);

    ctx.textAlign = "center";

    // Selo/emblema simples (escudo)
    ctx.save();
    ctx.translate(largura / 2, 150);
    ctx.fillStyle = "#4F6E93";
    ctx.beginPath();
    ctx.moveTo(0, -55);
    ctx.quadraticCurveTo(55, -40, 55, 0);
    ctx.quadraticCurveTo(55, 55, 0, 80);
    ctx.quadraticCurveTo(-55, 55, -55, 0);
    ctx.quadraticCurveTo(-55, -40, 0, -55);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#F7F2E7";
    ctx.font = "bold 46px Georgia, serif";
    ctx.fillText("✓", 0, 15);
    ctx.restore();

    ctx.fillStyle = "#1F3A2E";
    ctx.font = "bold 30px Georgia, serif";
    ctx.fillText("PORTAL DE INCLUSÃO DIGITAL", largura / 2, 270);
    ctx.font = "20px Georgia, serif";
    ctx.fillStyle = "#4F6E93";
    ctx.fillText("Canela e Gramado — RS", largura / 2, 302);

    ctx.fillStyle = "#55493A";
    ctx.font = "22px 'Segoe UI', Arial, sans-serif";
    ctx.fillText("Certificamos que", largura / 2, 380);

    ctx.fillStyle = "#1F3A2E";
    ctx.font = "bold 52px Georgia, serif";
    var nomeExibido = nome && nome.trim() ? nome.trim() : "Nome da pessoa participante";
    ctx.fillText(nomeExibido, largura / 2, 450);

    ctx.strokeStyle = "#C97A1E";
    ctx.lineWidth = 2;
    ctx.beginPath();
    var larguraLinha = Math.min(600, 60 + ctx.measureText(nomeExibido).width);
    ctx.moveTo(largura / 2 - larguraLinha / 2, 470);
    ctx.lineTo(largura / 2 + larguraLinha / 2, 470);
    ctx.stroke();

    ctx.fillStyle = "#55493A";
    ctx.font = "22px 'Segoe UI', Arial, sans-serif";
    ctx.fillText("concluiu a trilha de aprendizagem do Portal de Inclusão Digital,", largura / 2, 520);
    ctx.fillText("com os módulos de Informática Básica, Navegação Segura e Serviços Digitais.", largura / 2, 552);

    ctx.font = "italic 18px Georgia, serif";
    ctx.fillStyle = "#4F6E93";
    ctx.fillText("Um projeto de extensão universitária para a comunidade da Serra Gaúcha.", largura / 2, 610);

    ctx.font = "18px 'Segoe UI', Arial, sans-serif";
    ctx.fillStyle = "#2A241D";
    ctx.fillText("Emitido em " + formatarDataExtenso(), largura / 2, 700);

    ctx.font = "16px 'Segoe UI', Arial, sans-serif";
    ctx.fillStyle = "#55493A";
    ctx.fillText("Tecnologia Aplicada à Inclusão Digital", largura / 2, 760);
    ctx.fillText("© 2026 VithTech — Todos os direitos reservados.", largura / 2, 784);
  }

  function atualizarChecklist() {
    var progresso = (window.obterProgresso && window.obterProgresso()) || {};
    var lista = document.getElementById("lista-progresso");
    if (!lista) return;
    lista.innerHTML = "";

    var todosConcluidos = true;
    MODULOS.forEach(function (modulo) {
      var concluido = !!progresso[modulo.chave];
      if (!concluido) todosConcluidos = false;

      var item = document.createElement("li");
      var marcador = document.createElement("span");
      marcador.className = "marcador-status" + (concluido ? " completo" : "");
      marcador.textContent = concluido ? "✓" : "…";
      marcador.setAttribute("aria-hidden", "true");

      var texto = document.createElement("span");
      texto.textContent = modulo.rotulo + ": " + (concluido ? "concluído" : "ainda não concluído");

      item.appendChild(marcador);
      item.appendChild(texto);
      lista.appendChild(item);
    });

    var painelForm = document.getElementById("painel-formulario-certificado");
    var avisoIncompleto = document.getElementById("aviso-incompleto");
    if (painelForm) painelForm.style.display = todosConcluidos ? "block" : "none";
    if (avisoIncompleto) avisoIncompleto.style.display = todosConcluidos ? "none" : "block";
  }

  document.addEventListener("DOMContentLoaded", function () {
    atualizarChecklist();

    var formulario = document.getElementById("form-certificado");
    if (formulario) {
      formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        var campoNome = document.getElementById("campo-nome");
        var nome = campoNome ? campoNome.value : "";
        desenharCertificado(nome);

        var tela = document.getElementById("tela-certificado");
        if (tela) {
          tela.classList.add("mostrar");
          tela.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        var botaoBaixar = document.getElementById("botao-baixar-certificado");
        var canvas = document.getElementById("canvas-certificado");
        if (botaoBaixar && canvas) {
          botaoBaixar.onclick = function () {
            var link = document.createElement("a");
            link.download = "certificado-inclusao-digital.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
          };
        }
      });
    }
  });
})();
