async function login() {
    let usuario, contraseña;
    usuario = document.getElementById("user").value;
    contraseña = document.getElementById("password").value;


    if (usuario == "" || contraseña == "") {
        alert('Campos vacios')

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
                        alert('Usuario no existe');
                        break;

                    case '1':
                        alert('La contraseña incorrecta');
                        break;

                    case '2':
                        alert('success');
                      window.location.href='http://127.0.0.1:5000/home'     
                      //window.location.assign('http://127.0.0.1:5000/home');
                      //window.location.assign('http://127.0.0.1:5000/home');
                        break;
                }
            })
    }

}

