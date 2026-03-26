const form = document.getElementById("formReserva");
const resultado = document.getElementById("resultado");
const lista = document.getElementById("listaReservas");

let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

function mostrarReservas() {
  lista.innerHTML = "";

  reservas.forEach((reserva, index) => {
    let item = document.createElement("li");

    item.innerHTML = `
      ${reserva.nome} - ${reserva.quarto} - ${reserva.total} Kz
      <button onclick="removerReserva(${index})">❌</button>
    `;

    lista.appendChild(item);
  });
}

function removerReserva(index) {
  reservas.splice(index, 1);
  localStorage.setItem("reservas", JSON.stringify(reservas));
  mostrarReservas();
}

mostrarReservas();

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let nome = document.getElementById("nome").value;
  let preco = parseInt(document.getElementById("quarto").value);
  let checkin = new Date(document.getElementById("checkin").value);
  let checkout = new Date(document.getElementById("checkout").value);

  let noites = (checkout - checkin) / (1000 * 60 * 60 * 24);

  if (noites <= 0) {
    resultado.textContent = "Datas inválidas!";
    return;
  }

  let total = noites * preco;

  let reserva = {
    nome,
    quarto: preco + " Kz/noite",
    total
  };

  reservas.push(reserva);
  localStorage.setItem("reservas", JSON.stringify(reservas));

  resultado.textContent = `Reserva confirmada! Total: ${total} Kz`;

  mostrarReservas();
  form.reset();
});

const whatsappBtn = document.getElementById("whatsappBtn");

whatsappBtn.addEventListener("click", function () {
  let mensagem = "Olá, gostaria de fazer uma reserva no Hotel MBalu";
  let numero = "949876388"; // 👉 coloca teu número aqui

  let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

  whatsappBtn.href = url;
});