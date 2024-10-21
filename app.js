const body = document.querySelector("body");
const form = document.getElementById("form")
const nombres = document.getElementById("nombres");
const apellidos = document.getElementById("apellidos");
const fechaNacimiento = document.getElementById("nacimiento");
const edad = document.getElementById("edad");
const dataEdad = document.getElementById("dataEdad");
dataEdad.innerHTML = edad.value;

const tipoDocumento = document.getElementById("tipoDocumento");
const numeroDocumento = document.getElementById("numeroDocumento");
const correo = document.getElementById("correo");
const password = document.getElementById("password");
const telefono = document.getElementById("telefono");
const genero = document.getElementById("genero");
const hobbies = document.querySelectorAll("input[type=radio]");
const habilidades = document.querySelectorAll("input[type=checkbox]");
const color = document.getElementById("color");
const inputs = document.querySelectorAll('input');
const selects = document.querySelectorAll('select');

const enviar = document.getElementById("enviar");
const limpiar = document.getElementById("limpiar");
const deshabilitar = document.getElementById("deshabilitar");
const editar = document.getElementById("edit");

let valorEdad;

let objResult = new Object();
let validate = false;
let textResult = "";

class Datos {
    constructor(nombres, apellidos, fechaNacimiento, edad, tipoDocumento, documento, correo, password, telefono, genero, hobbies, habilidades, color ) {
        this.nombres = nombres;
        //this.apellidos = apellidos;
        this.fechaNacimiento = fechaNacimiento;
        this.edad = edad;
        this.tipoDocumento = tipoDocumento;
        //this.documento = documento;
        this.correo = correo;
        this.password = password;
        //this.telefono = telefono;
        this.genero = genero;
        this.hobbies = hobbies;
        this.habilidades = habilidades;
    
        this.color = color;
    }

    validarNombre() {
        const regexName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
        const validacionNombre = regexName.exec(this.nombres);
        const textError = document.querySelector("#nombres ~ .error-message");
        const icon = document.querySelector("#nombres ~ .icon-check");
        const iconInvalid = document.querySelector("#nombres ~ .icon-x");

        if(validacionNombre) {
            textError.textContent = "nombre correcto..."
            textResult = "nombre correcto...";
            textError.classList.add("valid");
            textError.classList.remove("invalid");
            icon.classList.add("valid");
            iconInvalid.classList.remove("invalid");
            objResult.validate = true;
            objResult.textResult = textResult;
            validate = true;
        } else {
            textResult = "El nombre debe incluir minimo tres caracteres";
            textError.textContent = "El nombre debe incluir minimo tres caracteres";
            textError.classList.add("invalid");
            textError.classList.remove("valid")
            iconInvalid.classList.add("invalid");
            icon.classList.remove("valid");
            objResult.validate = false;
            objResult.textResult = textResult;
            validate = false;
        }
        console.log(JSON.stringify(objResult.textResult));
        return validate;
    }

    validarApellido() {
        const regexApellido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
        const validacionApellido = regexApellido.exec(this.apellidos);
        const textError = document.querySelector("#apellidos ~ .error-message");
        
        if(validacionApellido) {
            textResult = "apellido correcto :)";
            textError.textContent = "apellido correcto";
            textError.classList.add("valid");
            textError.classList.remove("invalid");
            icon.classList.add("valid");
            iconInvalid.classList.remove("invalid");
            objResult.validate = true;
            objResult.textResult = textResult;
            validate = true;
        } else {
            textResult = "El apellido debe incluir minimo tres caracteres :(";
            textError.textContent = "El apellido debe incluir minimo tres caracteres :(";
            textError.classList.add("invalid");
            textError.classList.remove("valid")
            iconInvalid.classList.add("invalid");
            icon.classList.remove("valid");
            objResult.validate = false;
            objResult.textResult = textResult;
            validate = false;
        }
        console.log(JSON.stringify(objResult.textResult));
        return validate;
    }

    validacionFecha() {
        const fechaAnho = new Date(this.fechaNacimiento);
        const fecha = new Date();
        //const textError = document.querySelector("#nacimiento ~ .error-message");

        if(!isNaN(fechaAnho)) {
            const calcularEdad = fecha.getFullYear() - fechaAnho.getFullYear();
            //textError.textContent = "fecha valida";
            //textError.classList.remove("active");
            valorEdad = calcularEdad;
            textResult = "Fecha valida :)";
            dataEdad.innerHTML = `fecha valida: ${valorEdad}`;
            edad.value = valorEdad;
            objResult.validate = true;
            objResult.textResult = textResult;
            validate = true;
        } else {
            //textError.textContent = "";
            //textError.classList.add("active");
            textResult = "Fecha no valida :(";
            dataEdad.innerHTML = "Fecha no valida.."
            objResult.validate = false;
            objResult.textResult = textResult;
            validate = false;
            console.log(JSON.stringify(objResult.textResult));
        }
        return validate;
    }

    validacionEdad() {
        const edad = this.edad;
        console.log(edad);
        const optionDisable = tipoDocumento.querySelector('option[value="2"]');

        if (edad < 18) {
            textResult = "Menor de edad <";
            objResult.validate = false;
            objResult.textResult = textResult;
            inputs.forEach(input => {
                if(input.id === "nacimiento") {
                    input.disabled = false;
                } else {
                    input.disabled = true;
                    input.classList.add("disabled");
                }
            selects.forEach(select => {
                select.disabled = true;
            });
            })

            validate = false;
        } else {
            textResult = "Mayor de edad >"
            optionDisable.style.display = 'none';
            objResult.validate = true;
            objResult.textResult = textResult;
            inputs.forEach(input => {
                input.disabled = false;
                input.classList.remove("disabled");
            })
            selects.forEach(select => {
                select.disabled = false;
            })
            validate = true;
        }
        console.log(JSON.stringify(objResult.textResult));
        return validate;
    }
    
    validacionTipoDocumento() {
        const tipoDocumentoEdad = this.edad;//edad.value
        const textErrorTipo = document.querySelector("#tipoDocumento ~ .error-message");

        const optionTarjetaIdentidad = tipoDocumento.querySelector('option[value="2"]')

        const optionDisable = tipoDocumento.querySelectorAll('option[value="select"], option[value="1"], option[value="2"]');

        if (tipoDocumentoEdad.value < 18) {
            optionDisable.forEach(option => {
                option.disabled = true;
            })
            textResult = "documento invalido"
            objResult.validate = true;
            objResult.textResult = textResult;
            validate = true;
        } else {
            optionDisable.forEach(option => {
                option.disabled = false;
                optionTarjetaIdentidad.disabled = true;
            })
            textResult = "documento Valido";
            objResult.validate = false;
            objResult.textResult = textResult;
            validate = false;
            
        }
        if(tipoDocumento.value === "select") {
                textErrorTipo.textContent = "Selecciona un tipo de documento :(";
                textErrorTipo.classList.add("invalid");
                textErrorTipo.classList.remove("valid");
                textResult = "Selecciona un tipo de documento :(";
                objResult.validate = false;
                objResult.textResult = textResult;
                validate = false;
            } else {
                textErrorTipo.textContent = "documento Seleccionado :)";
                textErrorTipo.classList.add("valid");
                textErrorTipo.classList.remove("invalid");
                textResult = "documento Seleccionado :)";
                objResult.validate = true;
                objResult.textResult = textResult;
                validate = true;
            }
        console.log(JSON.stringify(objResult.textResult));
        return validate;
    }

    validacionDocumento() {
        const regexDocumento = /^\d{8,10}$/;
        const validacionDocumento = regexDocumento.exec(this.documento);
        const textError = document.querySelector("#numeroDocumento ~ .error-message");
        

        if(validacionDocumento) {
            textError.textContent = "";
            textError.classList.remove("active");
            textResult = "documento correcto";
            objResult.validate = true;
            objResult.textResult = textResult;
            validate = true;
        } else {
            textError.textContent = "El documento debe incluir minimo 8 numeros y maximo 10 numeros";
            textError.classList.add("active");
            textResult = "El documento debe incluir minimo 8 numeros y maximo 10 numeros";
            objResult.validate = false;
            objResult.textResult = textResult;
            validate = false;
        }
        console.log(JSON.stringify(objResult.textResult));
        return validate;
    }

    validacionCorreo() {
        const regexCorreo = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
        const verificarCorreo = regexCorreo.exec(this.correo);
        const textErrorCorreo = document.querySelector("#correo ~ .error-message");
        const icon = document.querySelector("#correo ~ .icon-check");
        const iconInvalid = document.querySelector("#correo ~ .icon-x");

        if(verificarCorreo) {
            textErrorCorreo.textContent = "Correo valido";
            textErrorCorreo.classList.add("valid");
            textErrorCorreo.classList.remove("invalid");
            icon.classList.add("valid");
            iconInvalid.classList.remove("invalid");
            textResult = "Correo valido";
            objResult.validate = true;
            objResult.textResult = textResult;
            validate = true;
        } else {
            textErrorCorreo.textContent = "Ingresa un correo valido: ejemplo@correo.com";
            textErrorCorreo.classList.add("invalid");
            textErrorCorreo.classList.remove("valid");
            icon.classList.remove("valid");
            iconInvalid.classList.add("invalid");
            textResult = "Ingresa un correo valido: ejemplo@correo.com";
            objResult.validate = false;
            objResult.textResult = textResult;
            validate = false;
        }
        console.log(JSON.stringify(objResult.textResult));
        return validate;
    }

    validacionPassword() {
        const regexPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#\/]).{8,15}/;
        const verificarPassword = regexPassword.exec(this.password);
        const textErrorPassword = document.querySelector("#password ~ .error-message");
        const icon = document.querySelector("#password ~ .icon-check");
        const iconInvalid = document.querySelector("#password ~ .icon-x");

        if(verificarPassword) {
            textErrorPassword.textContent = "Contraseña valida";
            textErrorPassword.classList.add("valid");
            textErrorPassword.classList.remove("invalid");
            icon.classList.add("valid");
            iconInvalid.classList.remove("invalid");
            textResult = "Password correcto";
            objResult.validate = true;
            objResult.textResult = textResult;
            validate = true;
        } else {
            textErrorPassword.textContent = "la contraseña debe tener al menos 8 caracteres, una letra minuscula, una letra mayuscula, un numero y un caracter especial"
            textErrorPassword.classList.add("invalid");
            textErrorPassword.classList.remove("valid");
            icon.classList.remove("valid");
            iconInvalid.classList.add("invalid");
            textResult = "la contraseña debe tener al menos 8 caracteres, una letra minuscula, una letra mayuscula, un numero y un caracter especial";
            objResult.validate = false;
            objResult.textResult = textResult;
            validate = false;
        }
        console.log(JSON.stringify(objResult.textResult));
        return validate;
    }

    validacionTelefono() {
        const regexTelefono = /^\d{7,10}/;
        const verificarTelefono = regexTelefono.exec(this.telefono);
        const textError = document.querySelector("#telefono ~ .error-message");

        if(verificarTelefono) {
            textError.textContent = "";
            textError.classList.remove("active");
            textResult = "Telefono correcto";
            objResult.validate = true;
            objResult.textResult = textResult;
            validate = true;
        } else {
            textError.textContent = "Telefono incorrecto debe contener minimo 7 numeros y maximo 10 numeros";
            textError.classList.add("active");
            textResult = "Telefono incorrecto debe contener minimo 7 numeros y maximo 10 numeros";
            objResult.validate = false;
            objResult.textResult = textResult;
            validate = false;
        }
        console.log(JSON.stringify(objResult.textResult));
        return validate;
    }

    validacionGenero() {
        const textError = document.querySelector("#genero ~ .error-message");

        if(this.genero === "") {
            textError.textContent = "Selecciona tu genero";
            textError.classList.add("invalid");
            textError.classList.remove("valid");
            textResult = "Selecciona tu genero";
            objResult.validate = false;
            objResult.textResult = textResult;
            validate = false;
        } else {
            textError.textContent = "genero Seleccionado";
            textError.classList.remove("invalid");
            textError.classList.add("valid");
            textResult = "genero Seleccionado";
            objResult.validate = true;
            objResult.textResult = textResult;
            validate = true;
        }
        console.log(JSON.stringify(objResult.textResult));
        return validate;
    }

    validacionHobbies() {

        let validCheck = false;
        const textError = document.querySelector("#title-hobbies ~ .error-message");
        console.log(this.hobbies)
        this.hobbies.forEach(hobbies => {
            if(hobbies.checked) {
                validCheck = true;
            } 
        })

        if(validCheck) {
            textError.textContent = "hobbies seleccionado";
            textError.classList.remove("invalid");
            textError.classList.add("valid");
            textResult = "hobbie seleccionado :)";
            objResult.validate = true;
            objResult.textResult = textResult;
            validate = true;
        } else {
            textError.textContent = "Selecciona un hobbie :(";
            textError.classList.add("invalid");
            textError.classList.remove("valid");
            textResult = "Selecciona un hobbie :("
            objResult.validate = false;
            objResult.textResult = textResult;
            validate = false;
        }
        console.log(JSON.stringify(objResult.textResult));
        return validate;
    }

    validacionHabilidades() {
        let validCheck = false;
        const textError = document.querySelector("#title-habilidades ~ .error-message");
        console.log(this.habilidades);
        this.habilidades.forEach(habilidades => {
            if(habilidades.checked) {
                validCheck = true;
            }
        });

        if(validCheck) {
            textError.textContent = "habilidad seleccionada";
            textError.classList.remove("invalid");
            textError.classList.add("valid");
            textResult = "habilidad seleccionado";
            objResult.validate = true;
            objResult.textResult = textResult;
            validate = true;
        } else {
            textError.textContent = "Selecciona una habilidad";
            textError.classList.add("invalid");
            textError.classList.remove("valid");
            textResult = "Selecciona una habilidad";
            objResult.validate = false;
            objResult.textResult = textResult;
            validate = false;
        }
        console.log(JSON.stringify(objResult.textResult));
        return validate;
    }

    limpiarFormulario() {
        form.reset();
        const messages = document.querySelectorAll(".error-message");
        const icons = document.querySelectorAll(".icon-check");
        
        messages.forEach(message => {
            message.classList.remove("valid");
        });

        icons.forEach(icon => {
            icon.classList.remove("valid");
        });

        dataEdad.innerHTML = edad.value = 0;
    }

    deshabilitarForm() {
        const inputs = document.querySelectorAll("#form input");
        const selects = document.querySelectorAll("#form select");
        console.log(inputs);
        inputs.forEach(input => {
            input.disabled = true;
        })

        selects.forEach(select => {
            select.disabled = true;
        })
    }

    habilitarForm() {
        const inputs = document.querySelectorAll("#form input");
        const selects = document.querySelectorAll("#form select");

        inputs.forEach(input => {
            input.disabled = false;
        })

        selects.forEach(select => {
            select.disabled = false;
        })
    }

    editar() {
        const elements = document.querySelectorAll("#tipoDocumento, #genero");
        console.log(elements);
        elements.forEach(element => {
            element.disabled = true;
        })
    }

    cambiarColor() {
        let colorValue = this.color;
        body.style.backgroundColor = colorValue;
    }
}