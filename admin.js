let ul = document.querySelector(`ul`)
function openmenu(){
   ul.classList.add(`open`)
}
function closemenu(){
   ul.classList.remove(`open`)
}
  
  // Seleciona o formulário de adição de notícias
  const noticiaform = document.getElementById('noticiaform');
  const newsSection = document.getElementById('news-section');

  // Função para converter a imagem em base64
  function getBase64(file, callback) {
      const reader = new FileReader();
      reader.onload = function() {
          callback(reader.result);
      };
      reader.readAsDataURL(file);
  }

  // Função para exibir a notícia publicada (apenas uma)
  function exibirNoticias() {
      let novalista = JSON.parse(localStorage.getItem('novalista')) || [];
      newsSection.innerHTML = ''; // Limpa a seção antes de exibir a nova notícia

      if (novalista.length > 0) {
          const newsItem = novalista[0]; // Exibe apenas a primeira (única) notícia

          const newsDiv = document.createElement('div');
          newsDiv.classList.add('news-item');

          // Monta o HTML da notícia
          let newsHTML = `<h3 class="news-title">${newsItem.title}</h3><p class="news-content">${newsItem.content}</p><small>Publicado em: ${newsItem.date}</small>`;
          if (newsItem.image) {
              newsHTML += `<img src="${newsItem.image}" class="news-image" alt="Imagem da notícia">`;
          }

          newsDiv.innerHTML = newsHTML;
          newsSection.appendChild(newsDiv);
      }
  }

  // Exibir a notícia ao carregar a página
  document.addEventListener('DOMContentLoaded', exibirNoticias);

  // Função para salvar a notícia no LocalStorage
  noticiaform.addEventListener('submit', function(event) {
      event.preventDefault();

      // Obtém os valores dos campos do formulário
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
      const imageInput = document.getElementById('image');
      const date = new Date().toLocaleString(); // Data e hora da publicação

      // Validação simples
      if (!title || !content) {
          alert('Por favor, preencha todos os campos obrigatórios.');
          return;
      }

      // Cria um objeto de notícia
      const newsItem = { title, content, date, image: '' };

      // Função para salvar a notícia
      function salvanoticia() {
          // Limpa o LocalStorage para garantir que só exista uma notícia
          localStorage.removeItem('novalista');

          // Cria uma nova lista com a nova notícia
          let novalista = [];
          novalista.push(newsItem);

          // Armazena a nova lista no LocalStorage
          localStorage.setItem('novalista', JSON.stringify(novalista));

          // Limpa os campos do formulário
          noticiaform.reset();

          // Exibe a nova notícia
          exibirNoticias();

          // Alerta o usuário
          alert('Notícia publicada com sucesso!');
          
          try {
            localStorage.setItem("chave", "valor");
        } catch (e) {
            if (e.name === "QuotaExceededError") {
                alert("O armazenamento está cheio. Por favor, limpe alguns dados.");
            }
        }
        
      }

      // Se uma imagem for carregada, converta-a em base64
      if (imageInput.files.length > 0) {
          getBase64(imageInput.files[0], function(base64Image) {
              newsItem.image = base64Image;
              salvanoticia();
          });
      } else {
          salvanoticia();
      }
  });
   
