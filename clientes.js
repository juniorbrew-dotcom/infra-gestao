import { validarEmail, validarCNPJ, validarTelefone } from './utils.js';

export function salvarCliente(event) {
  event.preventDefault();

  const nome = document.getElementById("nomeCliente").value.trim();
  const email = document.getElementById("emailCliente").value.trim();
  const telefone = document.getElementById("telefoneCliente").value.trim();
  const cnpj = document.getElementById("cnpjCliente").value.trim();

  if (!nome || !email || !telefone || !cnpj) {
    alert("Preencha todos os campos do cliente.");
    return;
  }

  if (!validarEmail(email)) {
    alert("E-mail inválido.");
    return;
  }

  if (!validarCNPJ(cnpj)) {
    alert("CNPJ inválido.");
    return;
  }

  if (!validarTelefone(telefone)) {
    alert("Telefone inválido.");
    return;
  }

  const cliente = { nome, email, telefone, cnpj };
  const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
  clientes.push(cliente);
  localStorage.setItem("clientes", JSON.stringify(clientes));

  document.getElementById("formCliente").reset();
  carregarClientes();
}

export function carregarClientes() {
  const select = document.getElementById("clienteSelect");
  if (!select) return;

  select.innerHTML = "";
  const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");

  clientes.forEach((cliente, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = cliente.nome;
    select.appendChild(option);
  });
}
