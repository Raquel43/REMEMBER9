const buttonSeries = document.getElementById("series");

buttonSeries.addEventListener("click", function (e) {
  getSeries();
});
export function getSeries(buscador) {
    fetch('./data/serie.json')
        .then(response => response.json())
            .then((series) => {
                const container = document.getElementById("contenido");
                container.innerHTML="";
                for (let serie of series) {
                  let seri = serie.titol;
                  if(!buscador||String(seri.toUpperCase()).includes(String(buscador.toUpperCase())))
                        container.innerHTML +=
                        `<div class="card mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                        <div class="col-md-4 film">
                           <img src="img/${serie.img}"  alt="...">
                         </div>
                         <div class="col-md-8">
                           <div class="card-body">
                             <h5 class="card-title">${serie.titol}</h5>
                             <p class="card-text">${serie.sinopsi}</p>
                            </div>
                         </div>
                         </div>
                         </div>`;
                }
          })
        }

   