//Importamos todas las funciones que llaman a los json para poder iterar con ellas
import { getFilms } from "./films.js";
import { getHotel } from "./hotel.js";
import { getJoc } from "./juego.js";
import { getMusic } from "./music.js";
import { getRest } from "./restaurante.js";
import { getSeries } from "./series.js";
import { getViaje } from "./viajes.js";

//Esta pequeña linea nos llama a una función para recuperar al usuario guardado
//En el sessionStorage
const publicacion = document.getElementById("publicaciones");

window.onload = init;

function init() {
  getUserFromStorage();
  recuperarPublicacion();
  publicacion.addEventListener("click",borradoMensaje);
}

let userObjStorage = JSON.parse(sessionStorage.getItem("user"));
function getUserFromStorage() {
  console.log("estoy dentro");
  // Recupera l'item del storage i el transforma a un objecte JSON.

  console.log(userObjStorage);
  let container = document.getElementById("imagenUser");
  let fotoUsuario = document.getElementById("fotoUsuario");
  let foto2 = document.getElementById("foto2");
  let foto3 = document.getElementById("foto3");
  let foto4 = document.getElementById("foto4");
  container.innerHTML = ` <a href="#"class="imagen"><img class="imagen" src="${userObjStorage.imagen}" alt="user" /></a><br><p id="name">${userObjStorage.name}</p>`;
  fotoUsuario.innerHTML = `<a href="#">
  <img src="${userObjStorage.imagen}" alt="">
</a>`;
  foto2.innerHTML = `<a href="#">
<img src="${userObjStorage.imagen}" alt="">
</a>`;
  foto3.innerHTML = `<a href="#">
<img src="${userObjStorage.imagen}" alt="">
</a>`;
  foto4.innerHTML = `<a href="#">
<img src="${userObjStorage.imagen}" alt="">
</a>`;
}

//Esta constante accede al botón que recarga la página para volver a ver la pantalla inicial
const buttonRecargar = document.getElementById("principal");
buttonRecargar.addEventListener("click", recargar);

function recargar() {
  window.location.assign("./remember.html");
}

//Esta constante accede al boton que carga todos los usuarios de la página
//Los muestra en bantalla
const buttonAmigos = document.getElementById("amigos");

buttonAmigos.addEventListener("click", function (e) {
  cargarUsers();
});
function cargarUsers() {
  let users = JSON.parse(localStorage.getItem("user"));
  const contenedor = document.getElementById("contenido");

  contenedor.innerHTML = "";
  for (let use of users) {
    console.log(use.nombre);
    contenedor.innerHTML += `<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
  <div class="col-md-4 film">
     <img src="${use.img}" width="50%" alt="...">
   </div>
   <div class="col-md-8">
     <div class="card-body">
       <h5 class="card-title">${use.nombre}</h5>
       <p class="card-text">${use.email}</p>
      </div>
   </div>
   </div>
   </div>`;
  }
}
//La siguiente función me recupera las publicaciones al recargar la página
function recuperarPublicacion() {
  if (localStorage.getItem("datos") == null) {
    return false;
  } else {
    let ExtraerDatos = JSON.parse(localStorage.getItem("datos"));
    console.log("estos son los datos que tengo", ExtraerDatos);
 
//Esta parte la he añadido porque si no al borrar las publicaciones tambien se me borra..
    publicacion.innerHTML = `
    <div class="row">
            <div class="col-2 foto">
              <a href="#">
                <img src="img/raquel.jpg" alt="">
              </a>
            </div>
            <div class="col">
              <div class="post">
                <a href="#" class="nombre">Raquel Arqués Toro</a>
                <p class="texto"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat sed, ipsam rerum
                  dolore corporis possimus ea aliquid fugit nulla quibusdam?</p>
                <div class="caja-botones d-flex justify-content-between align-item-center">
                  <button><i class="far fa-thumbs-up"></i></button>
                  <p>15 <i class="far fa-thumbs-up"></i></p>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-10 offset-2">
              <div class="comentarios">
                <div class="row g-0 comentario">
                  <div id="foto2" class="col-1 foto">
                  <a href="#">
                  <img src="img/emilio.jpg" alt="">
                  </a></div>
                  <div class="col">
                    <form action="">
                      <textarea name="" id="" placeholder="comentario"></textarea>
                    </form>
                  </div>
                </div>

                <div class="row g-0 comentario">
                  <div class="col-1 foto">
                    <a href="#">
                      <img src="img/cristina.jpg" alt="">
                    </a>
                  </div>
                  <div class="col">
                    <p class="respuesta">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur soluta eius magni beatae
                      laborum quos pariatur odio a possimus molestias!
                    </p>
                    <a href="#" class="me-gusta">Me gusta</a>
                  </div>
                </div>

                <div class="row g-0 comentario">
                  <div class="col-1 foto">
                    <a href="#">
                      <img src="img/alex.jpg" alt="">
                    </a>
                  </div>
                  <div class="col">
                    <p class="respuesta">
                      Consequuntur soluta eius magni beatae laborum quos pariatur odio a possimus molestias!
                    </p>
                    <a href="#" class="me-gusta">Me gusta</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
    for (let publica of ExtraerDatos) {
      let contenido = `
    <div class="row">
              <div class="col-2 foto">
                <a href="#">
                  <img src="${publica.img}" alt="">
                </a>
              </div>
              <div class="col">
                <div class="post">
                  <a href="#" class="nombre">${publica.nombre}</a>
                  <p class="texto">${publica.texto}</p>
                  <div class="caja-botones d-flex justify-content-between align-item-center">
                    <button><i class="far fa-thumbs-up"></i></button>
                    <button style="font-size: 13px;
                    background-color: rgb(255, 136, 0);" class="borrar" id="${publica.id}">Borrar mensaje</button>
                    <p>15 <i class="far fa-thumbs-up"></i></p>
                  </div>
                </div>
              </div>
            </div>
    `;
    //La siguiente función me inserta el html antes del principio del siguiente dato.
      publicacion.insertAdjacentHTML("afterbegin", contenido);
    }
  }
}
//La siguiente constante nos llama al select de categorias
const categoria = document.getElementById("categoria");

//La siguiente variable nos accede al input buscador
let palabra = document.getElementById("buscar");

//A partir de aquí llamamos a todas las funciones para recuperar los datos
//Según las letras que introduzca el usuario
palabra.addEventListener("keyup", () => {
  let valorCategory = categoria.value;
  let buscadorPalabra = palabra.value;
  switch (valorCategory) {
    case "film":
      getFilms(buscadorPalabra);
      break;
    case "hotel":
      getHotel(buscadorPalabra);
      break;
    case "juegos":
      getJoc(buscadorPalabra);
      break;
    case "musica":
      getMusic(buscadorPalabra);
      break;
    case "restaurante":
      getRest(buscadorPalabra);
      break;
    case "serie":
      getSeries(buscadorPalabra);
      break;
    case "viaje":
      getViaje(buscadorPalabra);
      break;
    default:
      return false;
  }
});

//A continuación al pulsar sobre el botón publicar me llama al evento publicar.
const botonPublicar = document.getElementById("Publicar");
botonPublicar.addEventListener("click", publicar);
//Creo una id inicializada en 0, para luego poder emplearla para borrar los datos por ID.
let miIdUnica = 0;
function publicar(e) {
  e.preventDefault();

  let texto = document.getElementById("mensaje").value;

  guardaLocal();
  recuperarPublicacion();
  //La siguiente función me guarda los datos introducidos en el localStorage
  function guardaLocal() {
    let datosGuardados;
    if (localStorage.getItem("datos") == undefined) {
      datosGuardados = [];
    } else {
      datosGuardados = JSON.parse(localStorage.getItem("datos"));
    }

    let datosGuardar = {
      id: miIdUnica,
      img: userObjStorage.imagen,
      nombre: userObjStorage.name,
      texto: texto,
    };

    datosGuardados.push(datosGuardar);

    localStorage.setItem("datos", JSON.stringify(datosGuardados));
  }
  miIdUnica++;
}
//La siguiente parte hace que se borren todos los datos introducidos y su html
const borrado = document.getElementById("Borrar");
borrado.addEventListener("click", borrarPublicacion);
function borrarPublicacion() {
  localStorage.removeItem("datos");
  location.reload();
}

//Esta función solo me borra el mensaje indicado por su id.
function borradoMensaje(e){
let element = e.target;
if(element.classList.contains("borrar")){
 // console.log("He borrado todo");
 let identificador = element.id;
let datosIntroducidos = JSON.parse(localStorage.getItem("datos"));
datosIntroducidos = datosIntroducidos.filter(el=>el.id != identificador)
localStorage.setItem("datos",JSON.stringify(datosIntroducidos));
let padre = element.parentNode.parentNode.parentNode.parentNode;
padre.remove();
}
}