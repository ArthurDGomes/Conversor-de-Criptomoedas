// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
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

    // Conversão
    convertBtn.addEventListener('click', async () => {
        const crypto = cryptoSelect.value;
        const amount = parseFloat(amountInput.value);

        if (!amount || amount <= 0) {
            alert('Informe uma quantidade válida!');
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

            const data = await response.json();

            if (response.ok) {
                resultArea.innerHTML = `
                    <div class="alert alert-success">
                        ${amount} ${crypto.toUpperCase()} = R$ ${data.result_brl} | USD ${data.result_usd}
                        <button class="btn btn-sm btn-outline-primary mt-2" onclick="toggleFavorite('${crypto}')">Favoritar / Remover Favorito</button>
                    </div>
                `;
                loadHistory();
                loadFavorites();
            } else {
                alert(data.mensagem || 'Erro na conversão');
            }

        } catch (error) {
            console.error('Erro na conversão:', error);
            alert('Erro na conversão');
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

            const data = await response.json();

            historyList.innerHTML = '';

            data.forEach(conv => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.innerText = `${conv.amount} ${conv.crypto.toUpperCase()} → R$ ${conv.result_brl} | USD ${conv.result_usd}`;
                historyList.appendChild(li);
            });
        } catch (error) {
            console.error('Erro ao carregar histórico:', error);
        }
    }

    // Carregar favoritos
    async function loadFavorites() {
        try {
            const response = await fetch('http://localhost:3000/api/favorites', {
                method: 'GET',
                headers: { 'Authorization': token }
            });

            const data = await response.json();

            favoritesList.innerHTML = '';

            data.forEach(fav => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';
                li.innerText = fav.crypto.toUpperCase();

                const btn = document.createElement('button');
                btn.className = 'btn btn-sm btn-danger';
                btn.innerText = 'Remover';
                btn.addEventListener('click', () => toggleFavorite(fav.crypto));

                li.appendChild(btn);
                favoritesList.appendChild(li);
            });
        } catch (error) {
            console.error('Erro ao carregar favoritos:', error);
        }
    }

    // Toggle favorito (adicionar ou remover)
    window.toggleFavorite = async (crypto) => {
        try {
            const response = await fetch('http://localhost:3000/api/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ crypto })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.mensagem || 'Favorito atualizado!');
                loadFavorites();
            } else {
                alert(data.mensagem || 'Erro ao atualizar favorito');
            }

        } catch (error) {
            console.error('Erro ao atualizar favorito:', error);
            alert('Erro ao atualizar favorito');
        }
    };

    // Inicial
    loadHistory();
    loadFavorites();
});
