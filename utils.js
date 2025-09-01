export function gerarGraficoTarefas() {
  const ctx = document.getElementById("graficoTarefas")?.getContext("2d");
  if (!ctx) return;

  const tarefas = JSON.parse(localStorage.getItem("agendaTarefas") || "[]");

  const statusContagem = tarefas.reduce((acc, tarefa) => {
    acc[tarefa.status] = (acc[tarefa.status] || 0) + 1;
    return acc;
  }, {});

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(statusContagem),
      datasets: [{
        label: "Tarefas por Status",
        data: Object.values(statusContagem),
        backgroundColor: ["#f59e0b", "#3b82f6", "#10b981"]
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

export function gerarGraficoClientes() {
  const ctx = document.getElementById("graficoClientes")?.getContext("2d");
  if (!ctx) return;

  const tarefas = JSON.parse(localStorage.getItem("agendaTarefas") || "[]");

  const contagemPorCliente = tarefas.reduce((acc, tarefa) => {
    acc[tarefa.cliente] = (acc[tarefa.cliente] || 0) + 1;
    return acc;
  }, {});

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(contagemPorCliente),
      datasets: [{
        label: "Tarefas por Cliente",
        data: Object.values(contagemPorCliente),
        backgroundColor: [
          "#6366f1", "#ec4899", "#22c55e", "#f97316", "#0ea5e9"
        ]
      }]
    },
    options: {
      responsive: true
    }
  });
}

export function gerarGraficoDatas() {
  const ctx = document.getElementById("graficoDatas")?.getContext("2d");
  if (!ctx) return;

  const tarefas = JSON.parse(localStorage.getItem("agendaTarefas") || "[]");

  const contagemPorData = tarefas.reduce((acc, tarefa) => {
    acc[tarefa.data] = (acc[tarefa.data] || 0) + 1;
    return acc;
  }, {});

  const datasOrdenadas = Object.keys(contagemPorData).sort();

  new Chart(ctx, {
    type: "line",
    data: {
      labels: datasOrdenadas,
      datasets: [{
        label: "Tarefas por Data",
        data: datasOrdenadas.map(data => contagemPorData[data]),
        borderColor: "#2563eb",
        backgroundColor: "#93c5fd",
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

export function atualizarKPIs() {
  const tarefas = JSON.parse(localStorage.getItem("agendaTarefas") || "[]");
  const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");

  const total = tarefas.length;
  const pendentes = tarefas.filter(t => t.status === "pendente").length;
  const concluidas = tarefas.filter(t => t.status === "concluída").length;

  const kpiTotal = document.getElementById("kpiTotal");
  const kpiPendentes = document.getElementById("kpiPendentes");
  const kpiConcluidas = document.getElementById("kpiConcluidas");
  const kpiClientes = document.getElementById("kpiClientes");

  if (kpiTotal) kpiTotal.textContent = `Total de Tarefas: ${total}`;
  if (kpiPendentes) kpiPendentes.textContent = `Pendentes: ${pendentes}`;
  if (kpiConcluidas) kpiConcluidas.textContent = `Concluídas: ${concluidas}`;
  if (kpiClientes) kpiClientes.textContent = `Clientes: ${clientes.length}`;
}
