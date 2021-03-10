//Aquí creo los usuarios fijos de la aplicación
let users = [
  {
    nombre: "Emilio",
    email: "emilio@gmail.com",
    img: "img/emilio.jpg",
    password: "1234",
    telefono: "643211324",
  },
  {
    nombre: "Raquel",
    email: "raquel@gmail.com",
    img: "img/raquel.jpg",
    password: "raquel44",
    telefono: "643211324",
  },
  {
    nombre: "Cristina",
    email: "cristina@gmail.com",
    img: "img/cristina.jpg",
    password: "cristina20",
    telefono: "643211324",
  },
  {
    nombre: "Alex",
    email: "alex@gmail.com",
    img: "img/alex.jpg",
    password: "alex31",
    telefono: "643211324",
  },
];
//Indice iniciado a 0 que al crear usuarios se va incrementando.
let indice = 0;
//Al cargar la página compruebo si hay usuarios, 
//si no hay ninguno guarda los usuarios fijos
window.onload = comprobar;
function comprobar() {
  if (localStorage.getItem("user") == null) {
    console.log("no tengo usuarios");
    GuardaUsuarios();
  }
}
//Con esta parte consigo que si el usuario pulsa enter al introducir sus datos de login
//pueda loguearse sin pulsar el botón
const btnPulsar = document.querySelector("#contrasena");
btnPulsar.addEventListener("keypress", pulsar);
function pulsar(e) {
  if (e.keyCode === 13 && !e.shiftKey) {
    e.preventDefault();
   getUsers();
  }
}
// Con esta parte el usuario se puede registrar pulsando intro en el ultimo dato introducido
const btnPulsarRegistro = document.querySelector("#tel");
btnPulsarRegistro.addEventListener("keypress", pulsar);
function pulsar(e) {
  if (e.keyCode === 13 && !e.shiftKey) {
    e.preventDefault();
   agregarUsuario();
  }
}
//Esta constante es la que me permite añadir nuevos usuarios cuando se hace click
const buttonAfegir = document.getElementById("afegir");

buttonAfegir.addEventListener("click", agregarUsuario);

//Esta función me permite validar si el email es correcto
function validarEmail(elemento) {
  var regex = /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+.)+[A-Z]{2,4}$/i;

  if (!regex.test(elemento)) {
    mostrarAlertMail();
    return false;
  } else {
    return true;
  }
}

//La siguiente función muestra un alert si el email es incorrecto
function mostrarAlertMail() {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Email incorrecto",
    showConfirmButton: true,
    timer: 5000,
  });
}

//La siguiente función evita que se introduzcan usuarios con el mismo e-mail
function evitarDuplicados(email) {
 let usuariosRegistrados = JSON.parse(localStorage.getItem("user"));
  for (let user of usuariosRegistrados) {
    if (user.email == email) {
      mostrarAlertMail2();
      return false;
    }
  }
  return true;
}

//La siguiente alerta muestra un aviso si el e-mail está duplicado
function mostrarAlertMail2() {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "El email introducido está duplicado",
    showConfirmButton: true,
    timer: 5000,
  });
}
//Función que chequea que el usuario no se haya dejado ningún dato
function checkFormulario() {
  let nombre = document.getElementById("newUser").value;
  let email = document.getElementById("mail").value;
  let password = document.getElementById("paso").value;
  let telefono = document.getElementById("tel").value;
  //comprobar si algun campo esta vacio
  if (nombre == "" || email == "" || password == "" || telefono == "") {
    mostrarAlertDatos();
    return false;
  } else {
    return true;
  }
}
//Alerta que se activa si falta algún dato en el registro
function mostrarAlertDatos() {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Faltan datos obligatorios",
    showConfirmButton: true,
    timer: 5000,
  });
}

//La siguiente constante es un array de rutas de las que saco la imagen de perfil
const url = [
  "https://thispersondoesnotexist.com/image",
  "http://lorempixel.com/200/200/",
  "https://thiscatdoesnotexist.com/",
  "https://thishorsedoesnotexist.com/",
  "https://source.unsplash.com/random",
  "http://placeimg.com/200/200/any",
  "https://loremflickr.com/320/240?random=1",
  "https://loremflickr.com/320/240?random=2",
  "https://loremflickr.com/320/240?random=3",
  "https://loremflickr.com/320/240?random=4",
  "https://loremflickr.com/320/240/dog",
  "https://loremflickr.com/g/320/240/paris",
  "https://loremflickr.com/320/240/brazil,rio",
  "https://loremflickr.com/320/240/paris,girl/all",
  "https://loremflickr.com/320/240",
  "img/user.png"
];
//La siguiente función accede a una ruta de la imagen de perfil de manera aleatoria
//de esta manera la imagen del usuario irá cambiando.
// function imagenAleatoria() {
//   let index = Math.floor(Math.random() * 16);
//   console.log(index);
//   ruta_imagen = url[index];
//   return ruta_imagen;
  
// }


//console.log(imagenAleatoria());
//La siguiente función agrega los nuevos usuarios despues de la validación
//También llama a otra función para guardar todos los usuarios en el localStorage
function agregarUsuario() {
  let nombre = document.getElementById("newUser").value;
  let email = document.getElementById("mail").value;
  let img = url[indice];
  //console.log("esta es mi imagen"+ img);
  let password = document.getElementById("paso").value;
  let telefono = document.getElementById("tel").value;
  if (checkFormulario() && evitarDuplicados(email) && validarEmail(email)) {
    let usuarios = {
      nombre: nombre,
      email: email,
      img: img,
      password: password,
      telefono: telefono,
    };
    users.push(usuarios);
   //He sustituido el indice random por un indice autoincrementable que se inicia
   //a cero al inicio, cuando llegue a 16 se reiniciará el contador.
    indice ++;
    if(indice == 16){
      indice = -1
      indice ++;
     }
     
    console.log("Este el indice de las imagenes",indice);
    mostrarAlert();
    GuardaUsuariosRegistrados();
    function GuardaUsuariosRegistrados(){
      let usuariosGuardados = JSON.parse(localStorage.getItem("user"));
    
      usuariosGuardados.push(usuarios);
    
      localStorage.setItem("user", JSON.stringify(usuariosGuardados));
    
    
    
    }
  
    //Alerta que informa de que el usuario se ha registrado correctamente
    function mostrarAlert() {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Usuario Registrado",
        showConfirmButton: true,
        timer: 4000,
      });
    }
  }
}
console.log(users);
// La siguiente constante es el botón que envia los datos del login para validarlos
const buttonAdd = document.getElementById("btn-enviar");
buttonAdd.addEventListener("click", function (e) {
  getUsers();
});

// La siguiente función valida si el usuario y la contraseña son correctos
// También llama a la función del Storage, especificamente la de Sesión
// Para después recuperar dichos datos
function getUsers() {
  //Función que recupera los datos del localStorage
  //sino los usuarios nuevos no se pueden loguear
  let usuarios = JSON.parse(localStorage.getItem("user"));
  const inputName = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;
  let usuario = usuarios.find((user) => user.nombre == inputName);
  if (usuario && usuario.password == contrasena) {
    saveUserInStorage();
    mostrarAlert();
    window.location.assign("./remember.html");
  } else {
    mostrarAlert2();
  }

  //Alerta para que el usuario verifique que se ha validado correctamente
  function mostrarAlert() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Usuario Validado",
      showConfirmButton: true,
      timer: 4000,
    });
  }
  //Alerta que indica que el usuario no está registrado o a puesto mal la contraseña
  function mostrarAlert2() {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "usuario no registrado o contraseña incorrecta",
      showConfirmButton: true,
      timer: 5000,
    });
  }

  //Función que guarda el usuario validado en el SessionStorage
  function saveUserInStorage() {
    // Comprovar en primer lloc si l'objecte Storage es troba definit al motor del navegador
    if (typeof Storage == "undefined") {
      alert("sessionStorage no soportado por el navegador");
    } else {
      // LocalStorage disponible
      // Guardar i extreure objectes json del Storage:
      let userObj = {
        name: document.getElementById("usuario").value,
        imagen: usuario.img,
      };
      sessionStorage.setItem("user", JSON.stringify(userObj));
      console.log("Datos guardados correctamente");
      //entrar();
    }
  }
}

//Función que me guarda todos los usuarios en el localStorage
function GuardaUsuarios() {
  if (typeof Storage == "undefined") {
    alert("Localstore no soportado por el navegador");
  } else {
    console.log("Estoy guardando usuarios");

    // LocalStorage disponible
    let userObj = users;

    localStorage.setItem("user", JSON.stringify(userObj));
  }
}

//La siguiente función me guarda los usarios que se van registrando
//de manera que no se sobreescriban
function GuardaUsuariosRegistrados(){
  let usuariosGuardados = JSON.parse(localStorage.getItem("user"));

  let usuariosNuevos = {
    img: userObjStorage.imagen,
    nombre: userObjStorage.name,
    texto: texto,
  };

  usuariosGuardados.push(usuariosNuevos);

  localStorage.setItem("datos", JSON.stringify(datosGuardados));

}
//Pequeña broma de aviso al usuario.. no podemos recuperar contraseñas o guardarlas
// Ya que aun no trabajamos del lado del servidor
const olvidado = document.getElementById("olvido");
olvidado.addEventListener("click", broma);
function broma() {
  Swal.fire({
    position: "center",
    icon: "info",
    title: "Pues pega bots!! JAJAJA...",
    showConfirmButton: true,
    timer: 5000,
  });
}

//Función que me cambia el contenido del botón de crear cuenta por el de login al pulsar
let inicio = document.getElementById("iniciar");
inicio.addEventListener("click", cambiar);
function cambiar() {
  if (inicio.textContent == "Crear Cuenta") {
    inicio.innerHTML = "Login";
  } else {
    inicio.innerHTML = "Crear Cuenta";
  }
}

