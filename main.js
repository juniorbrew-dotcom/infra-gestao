import { salvarCliente, carregarClientes } from './clientes.js';
import { salvarResponsavel, carregarResponsaveis } from './responsaveis.js';
import { salvarTipoTarefa, carregarTiposTarefa } from './tarefas.js';
import { salvarAgenda, carregarAgenda, aplicarFiltros, exportarPDF, excluirTarefa } from './agenda.js';
import { gerarGraficoTarefas, gerarGraficoClientes, gerarGraficoDatas, atualizarKPIs } from './dashboard.js';
import { aplicarMascaras } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
  // Inicialização dos dados
  carregarClientes();
  carregarResponsaveis();
  carregarTiposTarefa();
  carregarAgenda();
  aplicarMascaras();
  gerarGraficoTarefas();
  gerarGraficoClientes();
  gerarGraficoDatas();
  atualizarKPIs();

  // Eventos de cadastro
  const formCliente = document.getElementById("formCliente");
  if (formCliente) formCliente.addEventListener("submit", salvarCliente);

  const formResponsavel = document.getElementById("formResponsavel");
  if (formResponsavel) formResponsavel.addEventListener("submit", salvarResponsavel);

  const formTarefa = document.getElementById("formTarefa");
  if (formTarefa) formTarefa.addEventListener("submit", salvarTipoTarefa);

  const formAgenda = document.getElementById("formAgenda");
  if (formAgenda) formAgenda.addEventListener("submit", salvarAgenda);

  // Filtros
  const filtroCliente = document.getElementById("filtroCliente");
  const filtroStatus = document.getElementById("filtroStatus");
  if (filtroCliente) filtroCliente.addEventListener("input", aplicarFiltros);
  if (filtroStatus) filtroStatus.addEventListener("input", aplicarFiltros);

  // Exportação
  const btnExportarPDF = document.getElementById("btnExportarPDF");
  if (btnExportarPDF) btnExportarPDF.addEventListener("click", exportarPDF);

  // Excluir tarefa (delegado via window)
  window.excluirTarefa = excluirTarefa;
});
