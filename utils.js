// Validação de e-mail
export function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Validação de CNPJ (formato XX.XXX.XXX/XXXX-XX)
export function validarCNPJ(cnpj) {
  const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
  return regex.test(cnpj);
}

// Validação de telefone (formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX)
export function validarTelefone(telefone) {
  const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return regex.test(telefone);
}

// Aplicar máscaras com Inputmask
export function aplicarMascaras() {
  if (window.Inputmask) {
    Inputmask("(99) 99999-9999").mask(document.getElementById("telefoneCliente"));
    Inputmask("99.999.999/9999-99").mask(document.getElementById("cnpjCliente"));
  } else {
    console.warn("Inputmask não carregado.");
  }
}

// Gerar PDF da agenda com jsPDF + autoTable
export function gerarPDF(tarefas) {
  if (!window.jspdf || !window.jspdf.autoTable) {
    alert("Biblioteca jsPDF não carregada.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("Agenda de Tarefas", 14, 20);

  const rows = tarefas.map(tarefa => [
    tarefa.cliente,
    tarefa.responsavel,
    tarefa.tipo,
    tarefa.data,
    tarefa.status
  ]);

  doc.autoTable({
    head: [["Cliente", "Responsável", "Tarefa", "Data", "Status"]],
    body: rows,
    startY: 30,
    theme: "grid"
  });

  doc.save("agenda_tarefas.pdf");
}
