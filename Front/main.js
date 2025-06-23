// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Você precisa estar logado!");
        window.location.href = 'login.html';
        return;
    }

    const convertBtn = document.getElementById('convertBtn');
    const cryptoSelect = document.getElementById('cryptoSelect');
    const amountInput = document.getElementById('amountInput');
    const resultArea = document.getElementById('resultArea');
    const favoritesList = document.getElementById('favoritesList');
    const historyList = document.getElementById('historyList');
    const logoutBtn = document.getElementById('logoutBtn');

    // Clique no botão converter
    convertBtn.addEventListener('click', async () => {
        const crypto = cryptoSelect.value;
        const amount = parseFloat(amountInput.value);

        if (!amount || amount <= 0) {
            alert("Informe uma quantidade válida");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/conversions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ crypto, amount })
            });

            if (response.ok) {
                const data = await response.json();
                resultArea.innerHTML = `
                    <div class="alert alert-success">
                        ${amount} ${crypto.toUpperCase()} = R$ ${data.result_brl} | USD ${data.result_usd}
                    </div>
                `;

                // Atualizar histórico (você pode chamar uma função aqui)
                loadHistory();

            } else {
                alert("Erro ao converter");
            }
        } catch (error) {
            console.error("Erro:", error);
        }
    });

    // Logout
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });

    // Carregar histórico
    async function loadHistory() {
        try {
            const response = await fetch('http://localhost:3000/api/conversions', {
                method: 'GET',
                headers: { 'Authorization': token }
            });

            if (response.ok) {
                const data = await response.json();
                historyList.innerHTML = '';

                data.forEach(conv => {
                    const li = document.createElement('li');
                    li.className = 'list-group-item';
                    li.innerText = `${conv.amount} ${conv.crypto.toUpperCase()} → R$ ${conv.result_brl} | USD ${conv.result_usd}`;
                    historyList.appendChild(li);
                });
            }
        } catch (error) {
            console.error("Erro ao carregar histórico:", error);
        }
    }

    // Chamar loadHistory ao iniciar
    loadHistory();
});
