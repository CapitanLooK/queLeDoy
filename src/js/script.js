
//GLOBALES

//OBTENCION DATOS DE FORMULARIO
const formulario = document.getElementById("formGroup");
const nombre = formulario.nombre;
const tipo = formulario.tipo;
const edad = formulario.edad;
const tamanio = formulario.tamanio;
const peso = formulario.peso;
const marca = formulario.marca;
const datosResultado = document.getElementById("resultado");
const datosGuardado = document.getElementById("petData");
const fotos = document.getElementById("fotos");
const listaMascota = document.getElementById("listaMascota");
//FIN DE GLOBALES


//CARGA EN DOM
$(window).load(() => {
    if (localStorage.getItem("mascotas") !== null) {
        mostrarEnDom();
    }
})
//FIN DE DOM


//FUNCIONES DE CALCULO DE COMIDA

//CALCULO SEGUN TIPO Y EDAD
function cantidadTipoEdad(tipo, edad) {
    if (tipo == "gato" && edad == "cachorro") {
        return 70;
    }else if(tipo == "gato" && edad =="adulto"){
        return 10;
    }else if(tipo == "perro" && edad == "cachorro"){
        return 22;
    }else if(tipo == "perro" && edad == "adulto"){
        return 25;
    }
};


//CALCULO SEGUN TAMANIO    
function cantidadTamanio(tamanio) {
    switch (tamanio) {
        case "chico":
        return 0.7;
        
        case "mediano":
        return 0.73;

        case "grande":
        return 0.75;

        default:
            break;
    }
};


//CALCULO SEGUN MARCA
function cantidadMarca(marca){
    switch (marca) {
        case "proplan":
            return 1.5;
    
        case "eukanuba":

            return 1.5;
        
        case "vitalcan":
            
            return 1.45;

        case "royalcanin":
            
            return 1.5;

        case "excellent":
            
            return 1.45;

        case "dogchow":
            
            return 1.55;

        case "dogui":
            
            return 1.4;

        case "gati":
            
            return 1.4;

        case "raza":
            
            return 1.4;

        case "sabrositos":
            
            return 1.4;
    
        case "pedigree":
            
            return 1.5;

        case "whiskas":
            
            return 1.34;

        case "otros":
            
            return 1.3;

        default:
            break;
    }
}


//FUNCION QUE CALCULA LA CANTIDAD SEGUN LAS FUNCIONES ANTERIORES
function cantidad () {
    return Math.round(cantidadTipoEdad(tipo.value, edad.value) * cantidadTamanio(tamanio.value) * cantidadMarca(marca.value) * peso.value);
}


//SE PUSO COMO VARIABLE GLOBAL PARA TOMAR LA CANTIDAD
let cantidadComida = cantidad(tipo, edad, tamanio, marca, peso);
//FIN DE FUNCIONES DE CALCULO


//CLASES
//CLASE CON DATOS OBTENIDOS DEL FORMULARIO
class Mascota{
    constructor(nombre, tipo, edad, tamanio, peso, marca, cantidad){
        this.nombre = nombre;
        this.tipo = tipo;
        this.edad = edad;
        this.tamanio = tamanio;
        this.peso = peso;
        this.marca = marca;
        this.cantidad = cantidad;
    }
    
}


//RESPUESTA A LA CONSULTA SEGUN DATOS RELLENADOS EN FORMULARIO
formulario.addEventListener('submit', (e =>{
    
    e.preventDefault();
    validarFormulario();
    mostrar = new Mascota(nombre.value, tipo.value, edad.value, tamanio.value, peso.value, marca.value, cantidad(tipo, edad, tamanio, marca, peso));

    $("#resultado").append( `
        <div id="mostrar">
            <h3>${mostrar.nombre}</h3> 
            <p>Tipo: ${mostrar.tipo}</p> 
            <p>Edad: ${mostrar.edad}</p>
            <p>Tamano: ${mostrar.tamanio}</p>
            <p>Peso: ${mostrar.peso} Kg.</p>
            <p>Marca de Alimento: ${mostrar.marca}</p>
            <p>Cantidad de Alimento: ${cantidad(tipo, edad, tamanio, marca, peso)} gr.</p>
            <button class="save-btn" id="guardar"> Guardar Mascota </button>
            <button class="input-button" id="limpiarBusqueda">Limpiar Busqueda</button>
        </div>
            `).css({display: "flex"});
formulario.reset();
guardar();
limpiarBusqueda();
}));

//FIN DE RESPUESTA A LA CONSULTA


//FUNCIONES DE CREACION Y BOTONES

//FUNCION QUE VALIDA EL FORMULARIO PARA QUE NO QUEDEN CAMPOS VACIOS
function validarFormulario(){

    if (marca.value == "seleccionar") {
        alert("Por favor, Ingresa una marca");
        location.reload();
    }
}

//MOSTRAR EN DOM LO ALMACENADO EN LOCALSTORAGE
function mostrarEnDom(){
    //carga el objeto del localstorage
    let mostrarMascota = JSON.parse(localStorage.getItem("mascotas"));
    
    //muestra los datos cargados en el contenedor donde se la mascota en la pagina principal (modo desktop)
    $("#listaMascota").append(`
    <div class="box-api">
    <div>
    <h3>${mostrarMascota.nombre}</h3>
    <p>Tipo: ${mostrarMascota.tipo}</p>
    <p>Edad: ${mostrarMascota.edad}</p>
    <p>Tamano: ${mostrarMascota.tamanio}</p>
    <p>Peso: ${mostrarMascota.peso}Kg.</p>
    <p>Marca de Alimento: ${mostrarMascota.marca}</p>
    <p>Cantidad de Alimento: ${mostrarMascota.cantidad} gr.</p>
    <button id="eliminarLista"><i class="fas fa-trash-alt"></i></button>
    </div>
    <button id="cerrarLista"><i class="fas fa-times"></i></button>
    </div>`)

    //muestra los datos cargados en el icono de lista (modo celular)
    $('#petData').append(`
    <div class="pet-container">
    <div>
    <h3>${mostrarMascota.nombre}</h3>
    <p>Tipo: ${mostrarMascota.tipo}</p>
    <p>Edad: ${mostrarMascota.edad}</p>
    <p>Tamano: ${mostrarMascota.tamanio}</p>
    <p>Peso: ${mostrarMascota.peso}Kg.</p>
    <p>Marca de Alimento: ${mostrarMascota.marca}</p>
    <p>Cantidad de Alimento: ${mostrarMascota.cantidad} gr.</p>
    <button id="eliminarMascota"><i class="fas fa-trash-alt"></i></button>
    </div>
    </div>
`);
    //funciones de abrir cerrar lista y eliminar mascotas del local
    abrirLista();
    cerrarLista();
    eliminarMascotaLista();
    eliminarMascota();

}

//FUNCION DE LIMPIEZA DE BUSQUEDA
function limpiarBusqueda() {
    $('#limpiarBusqueda').click(() =>{
        $('#resultado').fadeOut("slow", () =>{
            datosResultado.innerHTML = ""
            location.reload();
        });
    });
}

//FUNCION QUE AGREGA MEDIANTE EL BOTON GUARDAR LOS DATOS AL LOCAL STORAGE Y VALIDA SI ESTA VACIO O CONTIENE DATOS.
function guardar() {
    $('#guardar').click(() =>{
        if (localStorage.getItem("mascotas") === null) {
            localStorage.setItem("mascotas", JSON.stringify(mostrar));
            location.reload();
            mostrarEnDom();
        } else{
            alert("Ya ingresaste una mascota, para agregar otra, elimina la existente");
            location.reload()
        }
    });
};

//FUNCION QUE ELIMINA MASCOTA DEL CONTENEDOR (DESKTOP) Y REMUEVE DEL LOCALSTORAGE
function eliminarMascota() {
    $('#eliminarMascota').click(() => {
        $('#petData').fadeOut("slow", () => {
            $('#petData').remove();
            localStorage.removeItem("mascotas");
        });
    }); 
};

//FUNCION QUE ELIMINA MASCOTA DE LA LISTA (RESPONSIVE) Y REMUEVE DEL LOCALSTORAGE
function eliminarMascotaLista() {
    $('#eliminarLista').click(() => {
        $('.box-api').fadeOut("slow", () => {
            $('#listaMascota').remove();
            localStorage.removeItem("mascotas");
        });
    });

};

//FUNCION QUE ABRE LA LISTA DE MASCOTA GUARDADA EN MODO RESPONSIVE
function abrirLista() {
    $("#lista").click(() => {
        fotos.innerHTML = "";
        $("#listaMascota").fadeIn("slow").css(({display: "flex"})
    )})
};

//FUNCION QUE CIERRA LA LISTA DE MASCOTA GUARDADA SIN ELIMINAR LA MISMA DEL LOCALSTORAGE
function cerrarLista() {
    $("#cerrarLista").click(() => {
        $("#listaMascota").fadeOut("slow")
    });
};

//MANEJO DE THE CAT API Y THE DOG API

//CARGA FOTOS RANDOM DE PERROS
$("#dp").click(() => {
    $("#listaMascota").fadeOut("slow");
    $.get('https://dog.ceo/api/breeds/image/random', (res) => {
        fotos.innerHTML = `
        <div class="box-api">
        <button id="cerrarFoto"><i class="fas fa-times"></i></button>
        <img src="${res.message}">
        </div>`;
        cerrarFotos();
        abrirLista();
    });
});

//CARGA FOTOS RANDOM DE GATOS
$("#cp").click(() => {
    $("#listaMascota").fadeOut("slow");
    $.get('https://api.thecatapi.com/v1/images/search', (res) => {
    fotos.innerHTML = `
    <div class="box-api">
    <button id="cerrarFoto"><i class="fas fa-times"></i></button>
    <img src="${res[0].url}">
    </div>`;
    cerrarFotos();
    abrirLista();
});
});

//FUNCION QUE CIERRA EL CONTENEDOR DE FOTOS

function cerrarFotos() {
    $("#cerrarFoto").click(() => {
        $(".box-api").fadeOut("slow", () => {
            fotos.innerHTML = "";
        })
    });
};

//FIN MANEJO DE API


//CORREO SMTP HELPER


//FIN CORREO SMTP HELPER