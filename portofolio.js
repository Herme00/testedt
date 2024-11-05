let ul = document.querySelector(`ul`)
function openmenu(){
   ul.classList.add(`open`)
}
function closemenu(){
   ul.classList.remove(`open`)
}

document.addEventListener("DOMContentLoaded", () => {
    const eventoForm = document.getElementById("eventoForm");
    const listaEventos = document.getElementById("lista-eventos");

    // Função para carregar eventos do servidor
    async function carregarEventos() {
        try {
            const response = await fetch('/api/eventos'); // Endpoint para obter eventos
            const eventos = await response.json();

            listaEventos.innerHTML = ""; // Limpa a lista atual

            eventos.forEach((evento, index) => {
                const eventoItem = document.createElement("div");
                eventoItem.classList.add("evento-item");
                eventoItem.innerHTML = `
                    <div class="evento-info">
                        <h3>${evento.titulo}</h3>
                        <p><strong>Data:</strong> ${evento.data}</p>
                        <p><strong>Descrição:</strong> ${evento.descricao}</p>
                        <p><strong>Local:</strong> ${evento.local}</p>
                        <img src="${evento.imagem}" class="evento-imagem" alt="Imagem do evento">
                        
                    </div>
                `;
                listaEventos.appendChild(eventoItem);
            });
        } catch (error) {
            console.error('Erro ao carregar eventos:', error);
        }
    }

    // Chama a função para carregar eventos ao iniciar a página
    carregarEventos();

    // Adiciona evento ao formulário para publicar eventos
    eventoForm.addEventListener("submit", async function(event) {
        event.preventDefault(); // Impede o envio do formulário

        // Captura os valores dos inputs
        const titulo = document.getElementById("titulo").value;
        const data = document.getElementById("data").value;
        const descricao = document.getElementById("descricao").value;
        const local = document.getElementById("local").value;
        const imagemInput = document.getElementById("imagem");

        // Lê a imagem como URL base64
        const reader = new FileReader();
        reader.onload = async function(e) {
            const novoEvento = {
                titulo,
                data,
                descricao,
                local,
                imagem: e.target.result // URL base64 da imagem
            };

            try {
                // Envia o novo evento para o servidor
                const response = await fetch('/api/eventos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(novoEvento)
                });

                if (response.ok) {
                    alert("Evento postado com sucesso!");
                    eventoForm.reset();
                    carregarEventos(); // Recarrega a lista de eventos
                } else {
                    console.error("Erro ao postar evento:", response.statusText);
                }
            } catch (error) {
                console.error("Erro ao enviar dados:", error);
            }
        };

        reader.readAsDataURL(imagemInput.files[0]);
    });

    // Função para remover evento
    window.removerEvento = async function(eventoId) {
        try {
            const response = await fetch(`/api/eventos/${eventoId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert("Evento removido com sucesso!");
                carregarEventos(); // Recarrega a lista de eventos
            } else {
                console.error("Erro ao remover evento:", response.statusText);
            }
        } catch (error) {
            console.error("Erro ao remover evento:", error);
        }
    };
});
