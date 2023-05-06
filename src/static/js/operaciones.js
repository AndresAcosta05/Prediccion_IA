async function login(){
    let usuario , contraseña;
    usuario = document.getElementById("loginUsuario").value;
    contraseña = document.getElementById("Passlogin").value;


    if(usuario && contraseña){
        var info = new FormData();
        info.append('loginUsuario', usuario)
        info.append('Passlogin', contraseña)
        

        let fetchData = {
            method: 'POST',
            body: data,
            headers: new Headers()
        }

        let data = await fetch('url del api', fetchData)
        .then(res => res.json())
        .then(data => {

        })

        
    } else{
        
    }
}