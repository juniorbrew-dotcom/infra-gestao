import { validarEmail } from './utils.js';

export function salvarResponsavel(event) {
  event.preventDefault();

  const nome = document.getElementById("nomeResponsavel").value.trim();
  const email = document.getElementById("emailResponsavel").value.trim();

  if (!nome || !email) {
    alert("Preencha todos os campos do responsável.");
    return;
  }

  if (!validarEmail(email)) {
    alert("E-mail inválido.");
    return;
  }

  const responsavel = { nome, email };
  const responsaveis = JSON.parse(localStorage.getItem("responsaveis") || "[]");
  responsaveis.push(responsavel);
  localStorage.setItem("responsaveis", JSON.stringify(responsaveis));

  document.getElementById("formResponsavel").reset();
  carregarResponsaveis();
}

export function carregarResponsaveis() {
  const select = document.getElementById("responsavelSelect");
  if (!select) return;

  select.innerHTML = "";
  const responsaveis = JSON.parse(localStorage.getItem("responsaveis") || "[]");

  responsaveis.forEach((resp, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = resp.nome;
    select.appendChild(option);
  });
}
