const data = new Datos(nombres.value, fechaNacimiento.value, edad.value, tipoDocumento, correo.value, password.value, genero.value, hobbies, habilidades, color.value);

inputs.forEach(input => {
    input.addEventListener('blur', () => {
        switch(input.id) {
            case "nombres":
                data.nombres = nombres.value;
                data.validarNombre();
                break;
            case "nacimiento":
                data.fechaNacimiento = fechaNacimiento.value;
                data.validacionFecha();
                console.log(data);
                break;
            case "tipoDocumento":
                data.tipoDocumento = tipoDocumento;
                data.validacionTipoDocumento();
                break;
            case "correo":
                data.correo = correo.value;
                data.validacionCorreo();
                break;
            case "password":
                data.password = password.value;
                data.validacionPassword();
                break;
            default:
                console.log("No se encontro el id");
        }
    })
});

fechaNacimiento.addEventListener("mouseout", () => {
    data.fechaNacimiento = fechaNacimiento.value;
    
    const statusFecha = data.validacionFecha();
    console.log(statusFecha);

    data.edad = edad.value;
    data.validacionEdad();
    console.log(data);
});


let state = false;


editar.addEventListener("click", () => {
    data.editar();
})

color.addEventListener("mouseout", () => {
    data.color = color.value;
    data.cambiarColor();
})

form.addEventListener("submit", (event) => {
    event.preventDefault();

    data.habilitarForm();

    data.genero = genero.value;
    data.hobbies = hobbies;
    data.habilidades = habilidades;
    
    const validaciones = [
        data.validarNombre(),
        data.validacionFecha(),
        data.validacionEdad(),
        data.validacionTipoDocumento(),
        data.validacionCorreo(),
        data.validacionPassword(),
        data.validacionGenero(),
        data.validacionHobbies(),
        data.validacionHabilidades()
    ]
    console.log(validaciones)
    const allValid = validaciones.every(valid => valid === true);

    if (allValid) {
        alert("formulario enviado exitosamente");
        data.limpiarFormulario();
    } else {
        alert("Por favor, corrige los errores antes de enviar el formulario.");

    }
    console.log(allValid);
})