async function login(){
    let usuario , contraseña;
    usuario = document.getElementsByName("user").value;
    contraseña = document.getElementsByName("password").value;


    if(usuario && contraseña){
        var info = new FormData();
        info.append('user', usuario)
        info.append('password', contraseña)
        

        let fetchData = {
            method: 'POST',
            body : info,
            Headers: new Headers()
            
        }

        let data = await fetch('http://127.0.0.1:5000/login', fetchData)
        .then(res => res.json())
        .then(data => {

            console.log(res)

        })

        
    } else{
        
    }





}