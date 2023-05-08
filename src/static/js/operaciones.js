async function login(){
    let usuario , contraseña;
    usuario = document.getElementById("Userlogin").value;
    contraseña = document.getElementById("Passlogin").value;

    if(usuario && contraseña){
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
                        alert('no existe');        
                        
                        break;
                    
                    case '1':
                        alert('contraseña incorrecta');     
                        break;
                
                    case '2':
                        alert('success'); 
                        // http://127.0.0.1:5000/home     
                        break;
                }
            })
    }else{
        alert('Campos vacios')
    }
}