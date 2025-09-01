export function gerarGraficoTarefas() {
  const ctx = document.getElementById("graficoTarefas").getContext("2d");
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
        backgroundColor: ["#f39c12", "#3498db", "#2ecc71"]
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