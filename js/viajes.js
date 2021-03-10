const buttonViaje = document.getElementById("viajes");

buttonViaje.addEventListener("click", function (e) {
    getViaje();
});

export function getViaje(buscador) {
    fetch('./data/viaje.json')
        .then(response => response.json())
        .then((viajes) => {
            const container = document.getElementById("contenido");
           
            container.innerHTML = "";
            for (let viaje of viajes) {
                let trip = viaje.lugar;
                if(!buscador||String(trip.toUpperCase()).includes(String(buscador.toUpperCase())))
                container.innerHTML +=
                    `<div class="card mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                        <div class="col-md-4 film">
                           <img src="img/${viaje.img}"  alt="...">
                         </div>
                         <div class="col-md-8">
                           <div class="card-body">
                             <h5 class="card-title">${viaje.lugar}</h5>
                             <p class="card-text">${viaje.descripcion}</p>
                           </div>
                         </div>
                         </div>
                         </div>`;
            }
        })
    }