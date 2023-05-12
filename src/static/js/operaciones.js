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

        let response = await fetch('http://127.0.0.1:5000/login', fetchData)
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


function validacioncontactanos(){
    var numerodoc= document.getElementById("NumeroDocumento").value;
    var Nombre= document.getElementById("Nombre").value;
    var Apellido= document.getElementById("Apellido").value;
    var Correo= document.getElementById("Correo").value;
    var NumeroTelefono = document.getElementById("NumeroTelefono").value;
    var Asunto = document.getElementById("Asunto").value;

    if(numerodoc ==""|| Nombre == "" || Apellido == "" || Correo =="" || NumeroTelefono =="" || Asunto =="" || validacioncorreo() == false){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campos Vacios o incompletos',
            footer: '<a href="">Necesitas ayuda?</a>',
            container: 'myModal',
            
        })
    }
 else{
        Swal.fire({
            html: `<h1>Registro Exitoso!</h1>
            <p>Registro numero   <label id="numero"></label></p>
            <br>
            <a href="#">Necesitas ayuda?</a>
            `,
        });
    }


}

function tablausuarios() {
    let user;
    let infoForm={};


  let response  = ['Samir','Rojas','Respondido'];



    for(let x in response.data){
        infoForm["NOMBRE"] = response.data[x].NOMBRE    

        alert(response.data[x])



        
    

      
      tabla = document.getElementById("cuerpoclientes");
      filanueva = tabla.insertRow(tabla.length);

      cell1 = filanueva.insertCell(1);
      cell1.innerHTML = infoForm.NOMBRE;
      alert(NOMBRE)


    }

  

}

