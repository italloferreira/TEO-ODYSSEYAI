// 1. Cole a URL do seu App Web implantado aqui 
const scriptURL = "https://script.google.com/macros/s/AKfycbxI74AqktcOr40s5EsygIkVganMoUtPQeEj8hVwfu1hz3_dle4cc-lFuNrAy72OLaDQ/exec";

// 2. Pega o formulário pelo ID 
const form = document.getElementById("myForm");
const statusMsg = document.getElementById("status");

// 3. Adiciona um "ouvinte" para o evento 'submit' 
form.addEventListener("submit", e => {
    // Impede o recarregamento padrão da página 
    e.preventDefault(); 
    
    statusMsg.textContent = "Enviando...";

    // 4. Usa o 'fetch' para enviar os dados 
    fetch(scriptURL, { 
        method: "POST", 
        body: new FormData(form) // Pega os dados do formulário 
    })
    .then(response => response.json()) // Espera a resposta do Apps Script
    .then(data => {
        console.log(data);
        if(data.result === "success") {
            statusMsg.textContent = "Enviado com sucesso!"; 
            form.reset(); // Limpa o formulário
        } else {
            throw new Error(data.message); // Joga o erro do Apps Script
        }
    })
    .catch(err => {
        console.error("Erro no fetch:", err);
        statusMsg.textContent = "Erro: " + err.message;
    });
});