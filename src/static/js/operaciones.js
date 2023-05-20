var ide = ''
var mail = ''

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
function borrar2() {
    var formulario2 = document.getElementById("formulario1");
    formulario2.reset();
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

                cell2 = filanueva.insertCell(1);
                cell2.innerHTML = infoForm.CEDULA;

                cell3 = filanueva.insertCell(2);
                cell3.innerHTML = infoForm.NOMBRE;

                cell4 = filanueva.insertCell(3);
                cell4.innerHTML = infoForm.APELLIDOS;

                cell5 = filanueva.insertCell(4);
                cell5.innerHTML = infoForm.NUMEROTELEFONO;


                cell6 = filanueva.insertCell(5);
                cell6.innerHTML = infoForm.CORREO;

                cell7 = filanueva.insertCell(6);
                cell7.innerHTML = infoForm.ASUNTO;

                cell8 = filanueva.insertCell(7);
                cell8.innerHTML = `   
         
                <div class="col-lg-6">
                <!-- boton modal 1 -->
                <button type="button" class="btn" onclick = "asign('${infoForm["ID"]}','${infoForm["CORREO"]}')"  data-bs-toggle="modal" data-bs-target="#exampleModal2">
                <img src="https://images.vexels.com/media/users/3/299488/isolated/preview/8c8c1857cbcf222280a12a7f5a122abc-icono-de-tecnologa-a-de-burbujas-de-chat-de-mensaje.png" width="30px">

               </button>
           </div>

            <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabe2" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 id="modal" class="modal-title" id="title">ENVIAR RESPUESTA </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <div class="form-group">
                    <label id = "title" for="exampleFormControlTextarea1">Escribe aqui tu mensaje</label>
                    <form action=""  id="lable"> 
                    <textarea class="form-control" id="mensaje" rows="7"></textarea>
                    </form>
                  </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" onclick= "send()"  id = "btncorreo" class="btn btn-primary">Enviar mensaje</button>
                    </div>
                </div>
            </div>
        </div>`;
            }

        })
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

    if (inputcelcius == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campos Vacios',
            footer: '<a href="">Necesitas ayuda?</a>',

        })
    } else {

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
}

function asign(id, correo) {
    ide = id;
    mail = correo;
}

async function send() {
    mensaje = document.getElementById("mensaje").value;

    var info = new FormData()

    info.append('id', ide)
    info.append('email', mail)
    info.append('answer', mensaje)

    let fetchData = {
        method: 'POST',
        body: info,
        headers: new Headers()
    }

    if (mensaje == "") {
        alert("campo vacio")
    } else {

        let data = await fetch('http://127.0.0.1:5000/update_email_request', fetchData)
            .then(res => res.json())
            .then(data => {

                Swal.fire({
                    icon: 'success',
                    title: 'Respuesta Enviada',
                    showConfirmButton: false,
                    timer: 1500,
                })



            })

    }

}

async function cargar() {
    const fileInput = document.getElementById('files');
    fileInput.onchange = () => {
        const selectedFile = fileInput.files[0];
        console.log(selectedFile);
    }


}