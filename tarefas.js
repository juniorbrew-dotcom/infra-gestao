export function salvarTipoTarefa(event) {
  event.preventDefault();

  const nome = document.getElementById("nomeTarefa").value.trim();
  const checklistTexto = document.getElementById("checklistTarefa").value.trim();

  if (!nome || !checklistTexto) {
    alert("Preencha todos os campos.");
    return;
  }

  const checklist = checklistTexto.split(",").map(item => item.trim()).filter(item => item !== "");

  const tipoTarefa = { nome, checklist };
  const tipos = JSON.parse(localStorage.getItem("tiposTarefa") || "[]");
  tipos.push(tipoTarefa);
  localStorage.setItem("tiposTarefa", JSON.stringify(tipos));

  document.getElementById("formTarefa").reset();
  carregarTiposTarefa();
}

export function carregarTiposTarefa() {
  const select = document.getElementById("tarefaSelect");
  if (!select) return;

  select.innerHTML = "";
  const tipos = JSON.parse(localStorage.getItem("tiposTarefa") || "[]");

  tipos.forEach((tipo, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = tipo.nome;
    select.appendChild(option);
  });
}