    //Declaracion de Headers

let headers = new Headers()
headers.append('Content-Type', 'application/json');//con esto indico que me comunicare con un formato json
headers.append('Accept', 'application/json');//con esto indico que me comunicare con un formato json
headers.append('Access-Control-Allow-Origin', 'https://backend-ipc.herokuapp.com');//con esto accedere a los cors
headers.append('Access-Control-Allow-Credentials', 'true');//con esto accedere a los cors
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');


// funcion para registrar usuarios
function CrearUsuario(){
    var nombre = document.getElementById("nombre");
    var genero = document.getElementById("genero");
    var usuario = document.getElementById("usuario");
    var correo = document.getElementById("correo");
    var contraseña = document.getElementById("contraseña");
    
    if(nombre.value=='' ){
        alert('Debe llenar todos los campos')
        return        
    }    
    
    if(genero.value=='' ){
        alert('Debe llenar todos los campos')
        return
    }
    if(usuario.value=='' ){
        alert('Debe llenar todos los campos')
        return
    }
    if(correo.value=='' ){
        alert('Debe llenar todos los campos')
        return
    }

    if(contraseña.value=='' ){
        alert('Debe llenar todos los campos')
        return
    }

    //Aca realizamos la peticion
    fetch('https://backend-ipc.herokuapp.com/registro',
    {
        method:'POST',
        headers,
        // El cuerpo, es decir los valores que vamos a mandar
        body: `{
                "name":"${nombre.value}",
                "gender":"${genero.value}",
                "username":"${usuario.value}",
                "email":"${correo.value}",
                "password":"${contraseña.value}"
                
                }`
    })
    .then(response => response.json())
    .then(
        result => {
            console.log('Success:', result);          
            nombre.value=''            
            genero.value=''
            usuario.value=''
            correo.value=''
            contraseña.value=''            
            alert('Usuario Creado')
          }
    )
    .catch(
        error => {
            console.error('Error:', error);
            nombre.value=''
            genero.value=''
            usuario.value=''
            correo.value=''
            contraseña.value=''
            alert('Hubo un error creando usuario')
          }
    )

//actulizar todos nuestros datos en tiempo real

}


    

function IniciarSesion(){
    let user= document.getElementById("luser");
    let pass= document.getElementById("lcontraseña");

    if(user.value=="admin" && pass.value=="admin@ipc1"){
        window.location.href='../Administrador/inicio_admin.html'       
        alert('Bienvenido Ing. Darwin Arevalo')
    }
    else {
        fetch(`https://backend-ipc.herokuapp.com/login/${user.value}/${pass.value}`)
    .then(response => response.json())
    .catch(err => {
        console.error('Error:', err)
        alert("Ocurrio un error, ver la consola")
    })
    // Manejando la data
    .then(data => {
        console.log(data.name)
        
        if(data.name=="false"){
            alert('Verifique sus Credenciales')
            pass.value='';
            usuario.value='';
        }else {
            alert(`Bienvenido ${data.name}`)
            window.location.href='../Pagina_Usuario/Inicio.html'
        }

      }
   )
    }
  
}
    

