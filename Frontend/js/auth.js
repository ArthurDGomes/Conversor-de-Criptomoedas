// js/auth.js

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    // Registro
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Validação: senhas iguais
            if (password !== confirmPassword) {
                alert('As senhas não coincidem!');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    alert('Cadastro realizado com sucesso!');
                    window.location.href = 'index.html';
                } else {
                    alert(data.mensagem || 'Erro ao cadastrar');
                }

            } catch (error) {
                console.error('Erro no cadastro:', error);
                alert('Erro ao cadastrar');
            }
        });
    }

    // Login
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    alert('Login realizado com sucesso!');
                    window.location.href = 'index.html';
                } else {
                    alert(data.mensagem || 'Erro ao fazer login');
                }

            } catch (error) {
                console.error('Erro no login:', error);
                alert('Erro ao fazer login');
            }
        });
    }
});
