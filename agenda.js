import { gerarPDF } from './utils.js';
import { atualizarKPIs } from './dashboard.js';

export function salvarAgenda(event) {
  event.preventDefault();

  const clienteIndex = document.getElementById("clienteSelect").value;
  const responsavelIndex = document.getElementById("responsavelSelect").value;
  const tarefaIndex = document.getElementById("tarefaSelect").value;
  const data = document.getElementById("dataTarefa").value;
  const status = document.getElementById("statusTarefa").value;

  const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");
  const responsaveis = JSON.parse(localStorage.getItem("responsaveis") || "[]");
  const tipos = JSON.parse(localStorage.getItem("tiposTarefa") || "[]");

  const tarefa = {
    cliente: clientes[clienteIndex]?.nome || "",
    responsavel: responsaveis[responsavelIndex]?.nome || "",
    tipo: tipos[tarefaIndex]?.nome || "",
    data,
    status
  };

  const agenda = JSON.parse(localStorage.getItem("agendaTarefas") || "[]");
  agenda.push(tarefa);
  localStorage.setItem("agendaTarefas", JSON.stringify(agenda));

  document.getElementById("formAgenda").reset();
  carregarAgenda();
  atualizarKPIs();
}

export function carregarAgenda() {
  const tbody = document.querySelector("#tabelaTarefas tbody");
  if (!tbody) return;

  tbody.innerHTML = "";
  const agenda = JSON.parse(localStorage.getItem("agendaTarefas") || "[]");

  agenda.forEach((tarefa, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${tarefa.cliente}</td>
      <td>${tarefa.responsavel}</td>
      <td>${tarefa.tipo}</td>
      <td>${tarefa.data}</td>
      <td>${tarefa.status}</td>
      <td>
        <button onclick="excluirTarefa(${index})">Excluir</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

export function excluirTarefa(index) {
  const agenda = JSON.parse(localStorage.getItem("agendaTarefas") || "[]");
  agenda.splice(index, 1);
  localStorage.setItem("agendaTarefas", JSON.stringify(agenda));
  carregarAgenda();
  atualizarKPIs();
}

export function aplicarFiltros() {
  const filtroCliente = document.getElementById("filtroCliente").value.toLowerCase();
  const filtroStatus = document.getElementById("filtroStatus").value.toLowerCase();

  const agenda = JSON.parse(localStorage.getItem("agendaTarefas") || "[]");
  const tbody = document.querySelector("#tabelaTarefas tbody");
  tbody.innerHTML = "";

  agenda
    .filter(tarefa =>
      tarefa.cliente.toLowerCase().includes(filtroCliente) &&
      tarefa.status.toLowerCase().includes(filtroStatus)
    )
    .forEach((tarefa, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${tarefa.cliente}</td>
        <td>${tarefa.responsavel}</td>
        <td>${tarefa.tipo}</td>
        <td>${tarefa.data}</td>
        <td>${tarefa.status}</td>
        <td>
          <button onclick="excluirTarefa(${index})">Excluir</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
}

export function exportarPDF() {
  const agenda = JSON.parse(localStorage.getItem("agendaTarefas") || "[]");
  gerarPDF(agenda);
}
