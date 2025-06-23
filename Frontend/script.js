function converter() {
  const moedaOrigem = document.getElementById('moedaOrigem').value.toUpperCase();
  const moedaDestino = document.getElementById('moedaDestino').value.toUpperCase();
  const valor = document.getElementById('valor').value;

  fetch('http://localhost:3000/api/conversions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: moedaOrigem, to: moedaDestino, amount: valor })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('resultado').innerText = 
      `Resultado: ${valor} ${moedaOrigem} = ${data.convertedAmount} ${moedaDestino}`;
  })
  .catch(err => {
    document.getElementById('resultado').innerText = 'Erro ao converter: ' + err.message;
  });
}