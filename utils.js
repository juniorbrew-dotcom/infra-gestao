// Validação de e-mail
export function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Validação de CNPJ (simplificada)
export function validarCNPJ(cnpj) {
  const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
  return regex.test(cnpj);
}

// Validação de telefone
export function validarTelefone(telefone) {
  const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return regex.test(telefone);
}

// Aplicar máscaras usando Inputmask
export function aplicarMascaras() {
  if (window.Inputmask) {
    Inputmask("(99) 99999-9999").mask(document.getElementById("telefoneCliente"));
    Inputmask("99.999.999/9999-99").mask(document.getElementById("cnpjCliente"));
  } else {
    console.warn("Inputmask não carregado.");
  }
}