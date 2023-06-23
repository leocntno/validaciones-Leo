export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoDeInput, input);
    }
}

const tipoDeErrores =[
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajesError = {
    nombre:{
        valueMissing: "El campo nombre no puede estar vacio."
    },
    email:{
        valueMissing: "El campo correo no puede estar vacio.",
        typeMismatch: "El correo no es valido."
    },
    password:{
        valueMissing: "El campo contraseña no puede estar vacio.",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento:{
        valueMissing: "El campo nacimiento no puede estar vacio.",
        customError: "Debes ser mayor de 18 años."
    },
    numero:{
        valueMissing: "Este campo no puede estar vacio.",
        patternMismatch: "El formato requerido es de 10 digitos."
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio.",
        patternMismatch: "La dirección debe contener de 10 a 40 caracteres."
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio.",
        patternMismatch: "La dirección debe contener de 10 a 40 caracteres."
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio.",
        patternMismatch: "La ciudad debe contener de 5 a 30 caracteres."
    },
    estado: {
        valueMissing: "Este campo no puede estar vacio.",
        patternMismatch: "La dirección debe contener de 5 a 30 caracteres."
    }
}

const validadores = {
    nacimiento: input => validarNacimiento(input)
};

function mostrarMensajeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if(input.validity[error]){
            /*console.log(tipoDeInput, error)
            console.log(input.validity[error]);
            console.log(mensajesError[tipoDeInput][error]);*/
            mensaje = mensajesError[tipoDeInput][error];
        }
    })
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date (input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes ser mayor de 18 años";
    }
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate());
    return fechaActual > diferenciaFechas;
}