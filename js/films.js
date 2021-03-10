const buttonFilms = document.getElementById("pelis");

buttonFilms.addEventListener("click", function (e) {
  getFilms();
});
export function getFilms(buscador) {
    fetch('./data/film.json')
        .then(response => response.json())
            .then((films) => {
                const container = document.getElementById("contenido");
                container.innerHTML="";
                
                for (let film of films) {
                  let pelicula = film.titol;
                  if(!buscador||String(pelicula.toUpperCase()).includes(String(buscador.toUpperCase())))
                        container.innerHTML +=
                        `<div class="card mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                        <div class="col-md-4 film">
                           <img src="img/${film.img}">
                         </div>
                         <div class="col-md-8">
                           <div class="card-body">
                             <h5 class="card-title">${film.titol}</h5>
                             <p class="card-text">${film.ano}</p>
                             <p class="card-text">${film.sinopsi}</p>
                            </div>
                         </div>
                         </div>
                         </div>`;
                }
          })
        }

   