


let ul = document.querySelector(`ul`)
function openmenu(){
   ul.classList.add(`open`)
   
}
function closemenu(){
   ul.classList.remove(`open`)
}
  
document.addEventListener("DOMContentLoaded", () => {
    const livroForm = document.getElementById("livroForm");
    const listaLivros = document.getElementById("lista-livros");

    // Carregar livros do servidor
    async function carregarLivros() {
        try {
            const response = await fetch('/api/livros'); // Endpoint para obter a lista de livros
            const livros = await response.json();

            listaLivros.innerHTML = ""; // Limpa a lista atual

            livros.forEach((livro, index) => {
                const livroItem = document.createElement("div");
                livroItem.classList.add("livro-item");
                livroItem.innerHTML = `
                    <div class="livro-info">
                        <h3>${livro.titulo}</h3>
                        <p><strong>Autor:</strong> ${livro.autor}</p>
                        <p><strong>Ano:</strong> ${livro.ano}</p>
                        <p class="livro-descricao">${livro.descricao}</p>
                        <a href="${livro.url}" target="_blank" class="livro-link">Acessar Livro</a>
                        
                    </div>
                `;
                listaLivros.appendChild(livroItem);
            });
        } catch (error) {
            console.error('Erro ao carregar livros:', error);
        }
    }

    // Chama a função para carregar livros ao iniciar a página
    carregarLivros();

    livroForm.addEventListener("submit", async function(event) {
        event.preventDefault(); // Impede o envio do formulário

        // Captura os valores dos inputs
        const titulo = document.getElementById("titulo").value;
        const autor = document.getElementById("autor").value;
        const ano = document.getElementById("ano").value;
        const descricao = document.getElementById("descricao").value;
        const urlLivro = document.getElementById("url").value;

        const novoLivro = { titulo, autor, ano, descricao, url: urlLivro };

        try {
            // Envia o novo livro para o servidor
            const response = await fetch('/api/livros', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoLivro)
            });

            if (response.ok) {
                alert("Livro adicionado com sucesso!");
                livroForm.reset();
                carregarLivros(); // Recarrega a lista de livros
            } else {
                console.error("Erro ao adicionar livro:", response.statusText);
            }
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
        }
    });

    // Função para remover livro
    window.removerLivro = async function(livroId) {
        try {
            const response = await fetch(`/api/livros/${livroId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert("Livro removido com sucesso!");
                carregarLivros(); // Recarrega a lista de livros
            } else {
                console.error("Erro ao remover livro:", response.statusText);
            }
        } catch (error) {
            console.error("Erro ao remover livro:", error);
        }
    };
});