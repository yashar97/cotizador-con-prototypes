

//constructores
class Seguro {
    constructor(marca, year, tipo) {
        this.marca = marca;
        this.year = year;
        this.tipo = tipo;
    }
}

//primer prototype para Seguro
Seguro.prototype.cotizarSeguro = function() {
    
    let cantidad;
    const base = 2000;

    switch(this.marca) {
        case "1":
            cantidad = base * 1.15;
            break;
        case "2":
            cantidad = base * 1.05;
            break;
        case "3":
            cantidad = base * 1.35;
            break;
        default:
            break;
    }

    //leemos el año
    const diferencia = new Date().getFullYear() - this.year;
    
    //cada año que la diferencia es mayor el costo se reduce en un 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    /*
        si el seguro es basico se multiplica por un 30% mas
        si el seguro es completo se multiplica por un 50% mas
    */

    if(this.tipo === "basico") {
        cantidad *= 1.30;
    }else {
        cantidad *= 1.50;
    }

    return cantidad;
}


//variables
const year = document.querySelector('#year');
const formulario = document.querySelector('#cotizar-seguro');

//eventos
formulario.addEventListener('submit', leerDatosSeguro);
document.addEventListener('DOMContentLoaded', () => {
    const max = new Date().getFullYear();
    const min = max - 22;
    
    for(let i = max; i > min; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }
});

//funciones
function leerDatosSeguro(e) {
    e.preventDefault();
    
    //leemos los datos de los inputs
    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    if(marca === "" || year === "" || tipo === "") {
        mostrarMensaje("Todos los campos son obligatorios", "error");
        
    }else {
        mostrarMensaje("Cotizando...", "correcto");

        const seguro = new Seguro(marca, year, tipo);
        const resultado = seguro.cotizarSeguro();
        
        mostrarResultado(resultado);
        
    }
}

function mostrarResultado(resultado) {
    const existe = document.querySelector('.resultado');
    if(existe) {
        existe.remove();
    }
    const lugarInsertar = document.querySelector('#resultado')
    const divResultado = document.createElement('div');
    divResultado.classList.add('mt-10', "resultado");
    divResultado.innerHTML = `
    <p>El total a pagar por el seguro es de $${resultado}</p>
    `;
    const spinner = document.querySelector('#cargando');
    spinner.style.display = "block";
    
    setTimeout(() => {
        spinner.style.display = "none";
        lugarInsertar.appendChild(divResultado);
    }, 2000);
}

function mostrarMensaje(mensaje, tipo) {
    const div = document.createElement('div');
    const existe = document.querySelector('.resultado');
    if(existe) {
        existe.remove();
    }

    if(tipo === "error") {
        div.classList.add('error', 'mt-10');
        div.textContent = mensaje;
    }else {
        div.classList.add('correcto', 'mt-10');
        div.textContent = mensaje;
    }

    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 2000);
}



