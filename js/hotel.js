const buttonHotel = document.getElementById("hotel");

buttonHotel.addEventListener("click", function (e) {
    getHotel();
});

export function getHotel(buscador) {
    fetch('./data/hotel.json')
        .then(response => response.json())
        .then((hoteles) => {
            const container = document.getElementById("contenido");
            container.innerHTML = "";
            for (let hotel of hoteles) {
                let hotelito = hotel.nombre;
                if(!buscador || String(hotelito.toUpperCase()).includes(String(buscador.toUpperCase())))
                container.innerHTML +=
                      `<div class="card mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                        <div class="col-md-4 film">
                           <img src="img/${hotel.img}"  alt="...">
                         </div>
                         <div class="col-md-8">
                           <div class="card-body">
                             <h5 class="card-title">${hotel.nombre}</h5>
                             <p class="card-text">${hotel.descripcion}</p>
                             <p class="card-text">${hotel.direccion}</p>
                             <a href="${hotel.telefono}">${hotel.telefono}</a>
                            </div>
                         </div>
                         </div>
                         </div>`;
            }
        })
    }