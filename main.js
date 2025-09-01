import { salvarCliente, carregarClientes } from './clientes.js';
import { salvarResponsavel, carregarResponsaveis } from './responsaveis.js';
import { salvarTipoTarefa, carregarTiposTarefa } from './tarefas.js';
import { salvarAgenda, carregarAgenda, aplicarFiltros, exportarPDF } from './agenda.js';
import { aplicarMascaras } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
  // Inicialização
  carregarClientes();
  carregarResponsaveis();
  carregarTiposTarefa();
  carregarAgenda();
  aplicarMascaras();

  // Eventos de cadastro
  document.getElementById("formCliente").addEventListener("submit", salvarCliente);
  document.getElementById("formResponsavel").addEventListener("submit", salvarResponsavel);
  document.getElementById("formTarefa").addEventListener("submit", salvarTipoTarefa);
  document.getElementById("formAgenda").addEventListener("submit", salvarAgenda);

  // Filtros
  document.getElementById("filtroCliente").addEventListener("input", aplicarFiltros);
  document.getElementById("filtroStatus").addEventListener("input", aplicarFiltros);

  // Exportação
  document.getElementById("btnExportarPDF").addEventListener("click", exportarPDF);
});
<section id="dashboard">
  <h2>Dashboard</h2>
  <canvas id="graficoTarefas" width="400" height="200"></canvas>
</section>
import { gerarGraficoTarefas } from './dashboard.js';
gerarGraficoTarefas();