async function login() {
    let usuario, contraseña;
    usuario = document.getElementById("user").value;
    contraseña = document.getElementById("password").value;


    if (usuario == "" || contraseña == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campos Vacios',
            footer: '<a href="">Necesitas ayuda?</a>',
            container: 'myModal',
            target: document.getElementById('myModal')

        })

    } else {
        (usuario && contraseña)

        data = new FormData();
        data.append('user', usuario);
        data.append('password', contraseña);

        let fetchData = {
            method: 'POST',
            body: data,
            headers: new Headers()
        }

        await fetch('http://127.0.0.1:5000/login', fetchData)
            .then(res => res.json())
            .then(response => {
                switch (response) {
                    case '0':
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'USUARIO NO EXISTE',
                            footer: '<a href="">Necesitas ayuda?</a>',
                            container: 'myModal',
                            target: document.getElementById('myModal')
                        })
                        document.getElementById("user").value = "";
                        document.getElementById("password").value = "";

                        break;

                    case '1':
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'CONTRASEÑA INCORRECTA    ',
                            footer: '<a href="">Necesitas ayuda?</a>',
                            container: 'myModal',
                            target: document.getElementById('myModal')
                        })
                        document.getElementById("user").value = "";
                        document.getElementById("password").value = "";

                        break;

                    case '2':
                        Swal.fire({
                            icon: 'success',
                            title: 'Ingreso exitoso!',
                            showConfirmButton: false,
                            timer: 1500,
                            target: document.getElementById('myModal')
                        })
                        window.location.href = 'http://127.0.0.1:5000/home'
                        break;
                }
            })
    }
}

function validacioncorreo() {
    var emailField = document.getElementById('Correo');
    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (validEmail.test(emailField.value)) {
        return true;
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese un correo valido',
            footer: '<a href="">Necesitas ayuda?</a>',

        })
        return false;
    }
}
function borrar() {
    var formulario = document.getElementById("formulario1");
    formulario.reset();


}
async function validacioncontactanos() {
    var _document = document.getElementById("NumeroDocumento").value;
    var names = document.getElementById("Nombre").value;
    var surnames = document.getElementById("Apellido").value;
    var email = document.getElementById("Correo").value;
    var phone = document.getElementById("NumeroTelefono").value;
    var affair = document.getElementById("Asunto").value;

    if (_document != "" && names != "" && surnames != "" && email != "" && phone != "" && affair != "" && validacioncorreo() == true) {
        data = new FormData();
        data.append('document', _document)
        data.append('names', names)
        data.append('surnames', surnames)
        data.append('phone', phone)
        data.append('email', email)
        data.append('affair', affair)

        let fetchData = {
            method: 'POST',
            body: data,
            headers: new Headers()
        }

        await fetch('http://127.0.0.1:5000/send_request', fetchData)
            .then(res => res.json())
            .then(response => {
                if (response) {
                    Swal.fire({
                        html: `<h1>Registro Exitoso!</h1>
                    <p>Se ha registrado su peticion</p>
                    `,
                    });
                    borrar()
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ha habido un error',
                        footer: '<p>Por favor vuelva a intentarlo</p>',
                        container: 'myModal',

                    })
                }
            })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campos Vacios o incompletos',
            footer: '<p>Verifica haber llenado todo</p>',
            container: 'myModal',

        })
    }
}

async function tablausuarios() {
    let infoForm = {};
    await fetch('http://127.0.0.1:5000/get_email_request')
        .then(res => res.json())
        .then(response => {
            for (let x in response) {

                infoForm["ID"] = response[x][0];
                infoForm["CEDULA"] = response[x][1];
                infoForm["NOMBRE"] = response[x][2];
                infoForm["APELLIDOS"] = response[x][3];
                infoForm["NUMEROTELEFONO"] = response[x][4];
                infoForm["CORREO"] = response[x][5];
                infoForm["ASUNTO"] = response[x][6];

                document.getElementById("tablaclientes").style.display = "block";
                document.getElementById("cuerpoclientes").innerHTML += "";


                tabla = document.getElementById("cuerpoclientes");
                filanueva = tabla.insertRow(tabla.length);

                cell1 = filanueva.insertCell(0);
                cell1.innerHTML = infoForm.ID;

                cell1 = filanueva.insertCell(1);
                cell1.innerHTML = infoForm.CEDULA;

                cell1 = filanueva.insertCell(2);
                cell1.innerHTML = infoForm.NOMBRE;

                cell1 = filanueva.insertCell(3);
                cell1.innerHTML = infoForm.APELLIDOS;


                cell1 = filanueva.insertCell(4);
                cell1.innerHTML = infoForm.NUMEROTELEFONO;


                cell1 = filanueva.insertCell(5);
                cell1.innerHTML = infoForm.CORREO;

                cell1 = filanueva.insertCell(6);
                cell1.innerHTML = infoForm.ASUNTO;

                cell8 = filanueva.insertCell(7);
                cell8.innerHTML = ` <button type="button" onclick = "abrir(this)" class="btn - btn-success" data-open="modal">...</button>
                    <div class="modal" id="modal">
                      <div class="modal-dialog">
                        <header class="modal-header">
                          <h1 id="title">Respuestas </h1>
                          <button onclick = "cerrar(this)" class="close-modal" aria-label="close modal" data-close>✕</button>
                        </header>
                        <section class="modal-content">MODaL LISTO</section>
                        <footer class="modal-footerMODAAL FOOTERfooter>
                      </div>
                    </div>
                    
                    `;
            }

        })
}

function abrir() {
    const openEls = document.querySelectorAll("[data-open]");
    const isVisible = "is-visible";
    for (const el of openEls) {
        el.addEventListener("click", function () {
            const modalId = this.dataset.open;
            document.getElementById(modalId).classList.add(isVisible);
        });
    }
    document.addEventListener("click", e => {
        if (e.target == document.querySelector(".modal.is-visible")) {
            document.querySelector(".modal.is-visible").classList.remove(isVisible);
        }
    });

    document.addEventListener("keyup", e => {
        if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
            document.querySelector(".modal.is-visible").classList.remove(isVisible);
        }
    });


}

async function redneuronal() {
    let inputcelcius = document.getElementById("inputcelcius").value;

    var info = new FormData();
    info.append('grados', inputcelcius)

    let fetchData = {
        method: 'POST',
        body: info,
        headers: new Headers()
    }

    let data = await fetch('http://127.0.0.1:5000/red_neuronal', fetchData)
        .then(res => res.json())
        .then(data => {
            for (let x in data) {
                document.getElementById("inputfarenheit").value = data[x];
                Swal.fire({
                    icon: 'success',
                    title: 'Conversion exitosa!',
                    showConfirmButton: false,
                    timer: 1500,
                })


            }


        })



}
