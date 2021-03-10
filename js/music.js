const buttonMusic = document.getElementById("musica");

buttonMusic.addEventListener("click", function (e) {
  getMusic();
});
export function getMusic(buscador) {
    fetch('./data/musica.json')
        .then(response => response.json())
            .then((musica) => {
                const container = document.getElementById("contenido");
                container.innerHTML="";
                for (let music of musica) {
                  let musica = music.titulo;
                  if(!buscador||String(musica.toUpperCase()).includes(String(buscador.toUpperCase())))
                        container.innerHTML +=
                        `<div class="card mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                        <div class="col-md-4 film">
                           <img src="img/${music.imagen}"  alt="...">
                         </div>
                         <div class="col-md-8">
                           <div class="card-body">
                             <h5 class="card-title">${music.titulo}</h5>
                             <p class="card-text">${music.artista}</p>
                             <audio controls><source src="./musica/${music.cancion}.mp3" type="audio/mp3">
                             </audio> <a href=".mp3" type="audio"></a>
                            </div>
                         </div>
                         </div>
                         </div>`;
                }
          })
        }