const buttonJoc = document.getElementById("juegos");

buttonJoc.addEventListener("click", function (e) {
    getJoc();
});

export function getJoc(buscador) {
    fetch('./data/juegos.json')
        .then(response => response.json())
        .then((juegos) => {
            const container = document.getElementById("contenido");
            container.innerHTML = "";
            for (let joc of juegos) {
                let juego = joc.titol;
                  if(!buscador||String(juego.toUpperCase()).includes(String(buscador.toUpperCase())))
                container.innerHTML +=
                    `<div class="card mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                        <div class="col-md-4 film">
                           <img src="img/${joc.img}"  alt="...">
                         </div>
                         <div class="col-md-8">
                           <div class="card-body">
                             <h5 class="card-title">${joc.titol}</h5>
                             <p class="card-text">${joc.descripcion}</p>
                             <p class="card-text">${joc.any}</p>
                            </div>
                         </div>
                         </div>
                         </div>`;
            }
        })
    }