let ul = document.querySelector(`ul`)
function openmenu(){
   ul.classList.add(`open`)
   
}
function closemenu(){
   ul.classList.remove(`open`)
}let currentIndex = 0;



// Função para exibir a notícia publicada (apenas a mais recente)
function exibirNoticias() {
    let novalista = JSON.parse(localStorage.getItem('novalista')) || [];
    const newsSection = document.getElementById('news-section');
    newsSection.innerHTML = ''; // Limpa a seção antes de exibir a nova notícia

    if (novalista.length > 0) {
        const newsItem = novalista[0]; // Exibe apenas a primeira (única) notícia

        const newsDiv = document.createElement('div');
        newsDiv.classList.add('news-item');

        // Monta o HTML da notícia
        let newsHTML = `<h3>${newsItem.title}</h3><p>${newsItem.content}</p><small>Publicado em: ${newsItem.date}</small>`;
        if (newsItem.image) {
            newsHTML += `<img src="${newsItem.image}" class="news-image" alt="Imagem da notícia">`;
        }

        newsDiv.innerHTML = newsHTML;
        newsSection.appendChild(newsDiv);
    }
}

// Exibir a notícia ao carregar a página
document.addEventListener('DOMContentLoaded', exibirNoticias);

// post evento

document.addEventListener("DOMContentLoaded", function () {
    rendereventos();

    // Função para renderizar os eventos com botões de remoção
    function rendereventos() {
        // Limpa a lista para evitar duplicações ao renderizar
        const eventosContainer = document.getElementById("eventos");
        eventosContainer.innerHTML = "";

        // Carrega os eventos do localStorage
        const eventos = JSON.parse(localStorage.getItem("eventos")) || [];

        if (eventos.length === 0) {
            eventosContainer.innerHTML = "<p>Nenhum evento publicado.</p>";
        } else {
            // Cria o HTML para cada evento com um botão de remoção
            eventos.forEach((evento, index) => {
                const eventoDiv = document.createElement("div");
                eventoDiv.classList.add("evento");

                eventoDiv.innerHTML = `
            
                     <article class="eventos-item">
                     <img src="${evento.image}" alt="Projeto 1">
                     <h3>${evento.titulo}</h3>
                     <p><strong>Descrição:</strong> ${evento.descricao}</p>
                     <a href="#" class="button-leia-mais">Leia Mais</a>
                     </article>
                     
                `;

                eventosContainer.appendChild(eventoDiv);
            });
        }
    }

    // Função para remover um evento pelo índice
    window.removeevento = function (index) {
        let eventos = JSON.parse(localStorage.getItem("eventos")) || [];

        // Remove o evento do array e atualiza o localStorage
        eventos.splice(index, 1);
        localStorage.setItem("eventos", JSON.stringify(eventos));

        // Renderiza novamente os eventos atualizados
        rendereventos();
        alert("evento removido com sucesso!");
    };
});
// comentario

document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Coletar os valores do formulário
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    // Criar um novo elemento de comentário
    const commentSection = document.getElementById('commentList');
    const newComment = document.createElement('div');
    newComment.classList.add('comment-item');
    
    // Adicionar o conteúdo do comentário
    newComment.innerHTML = `
        <h4>${name}</h4>
        <p>${comment}</p>
        <small>Comentário adicionado agora mesmo</small>
    `;

    // Inserir o comentário na seção de comentários
    commentSection.appendChild(newComment);

    // Limpar o formulário
    document.getElementById('commentForm').reset();
});

function exibirEventos() {
    const eventosContainer = document.getElementById('eventosContainer');
    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];

    eventosContainer.innerHTML = ''; // Limpa a lista antes de exibir

    eventos.forEach((evento, index) => {
        const eventoDiv = document.createElement('div');
        eventoDiv.classList.add('eventos-item');

        // Monta o HTML do evento
        eventoDiv.innerHTML = `
            <img src="${evento.image}" alt="Imagem do Evento">
            <h3>${evento.titulo}</h3>
            <p>${evento.descricao}</p>
            <a href="${evento.link}" target="_blank" class="button-leia-mais">Leia Mais</a>
            <br><br>
            <button class="remove-btn" onclick="removerEvento(${index})">Remover</button>
        `;

        eventosContainer.appendChild(eventoDiv);
    });
}

// Função para remover um evento
function removerEvento(index) {
    let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    eventos.splice(index, 1);
    localStorage.setItem('eventos', JSON.stringify(eventos));
    exibirEventos(); // Atualiza a lista após a remoção
}

document.addEventListener('DOMContentLoaded', exibirEventos);


  const novidadeItem = document.createElement("div");
            novidadeItem.classList.add("novidade-item");

            novidadeItem.innerHTML = `
                <h3>${novidade.titulo}</h3>
                <p>${novidade.descricao}</p>
                ${novidade.imagem ? `<img src="${novidade.imagem}" alt="Imagem da novidade" style="width: 100%; max-width: 300px; margin-top: 10px;">` : ""}
                <button onclick="removerNovidade(${index})">Remover</button>
            `;

            novidadeList.appendChild(novidadeItem);
        });
    }

    // Função para remover uma novidade
    window.removerNovidade = function(index) {
        let novidades = JSON.parse(localStorage.getItem("novidades")) || [];
        novidades.splice(index, 1);
        localStorage.setItem("novidades", JSON.stringify(novidades));
        carregarNovidades();
    };

    carregarNovidades();
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio do formulário padrão

    // Coletar os dados do formulário
    const nome = document.getElementById('name').value;
    const telefone = document.getElementById('tel').value;
    const mensagem = document.getElementById('message').value;

    // Criar um objeto com os dados
    const contato = {
        nome: nome,
        telefone: telefone,
        mensagem: mensagem,
        data: new Date().toISOString() // Adiciona a data de envio
    };

    // Armazenar no localStorage
    let contatos = JSON.parse(localStorage.getItem('contatos')) || [];
    contatos.push(contato);
    localStorage.setItem('contatos', JSON.stringify(contatos));

    // Limpar o formulário após o envio
    document.getElementById('contactForm').reset();

    alert('Mensagem enviada com sucesso!'); // Mensagem de sucesso (opcional)
});


// novidade

document.addEventListener("DOMContentLoaded", () => {
    const novidadeList = document.getElementById("novidadeList");

    // Função para carregar e exibir novidades
    function carregarNovidades() {
        const novidades = JSON.parse(localStorage.getItem("novidades")) || [];
        novidadeList.innerHTML = "";

        novidades.forEach((novidade, index) => {
          