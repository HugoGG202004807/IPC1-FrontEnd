function createHeaders(keys) {
  var result = [];
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 65,
      align: "center",
      padding: 0
    });
  }
  return result;
}


//Declaracion de Headers

let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'https://backend-ipc.herokuapp.com');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');


function cargar(){
    let file = document.getElementById("carga").files[0];
    if (file) {
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            let cuerpo = {
                data:evt.target.result
            }

            console.log(JSON.stringify(cuerpo))
            fetch('https://backend-ipc.herokuapp.com/carga', {
            method: 'POST',
            headers,
            body: JSON.stringify(cuerpo),
            })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
                actualizar()//metodo que recargara todo mi pagina
            })
            .catch(error => {
                console.error('Error:', error);
            });

        }
        reader.onerror = function (evt) {
            
        }
    }
}

function eliminarpublicacion(libro,url){
    console.log(url)
    
    fetch('https://backend-ipc.herokuapp.com/eliminarpublicacion/'+url,{
        method:'DELETE'
    })
    .then(res => res.text())
    .then(res=> {
        alert(res)
        actualizar()
    })
    
}

function agregarlibro(){
  let type = document.getElementById("type");
  let url = document.getElementById("url");
  let date = document.getElementById("date");
  let category = document.getElementById("category")
  fetch('https://backend-ipc.herokuapp.com/crearpublicacion', {
    method: 'POST',
    headers,
    body: `{
        "type":"${type.value}",
        "url":"${url.value}",
        "date":"${date.value}",
        "category":"${category.value}"
      }`,
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
    actualizar()
    type.value=''
    url.value=''
    date.value=''
    category.value=''
  })
  .catch(error => {
    console.error('Error:', error);
  });

}
function actualizar(){
    document.getElementById("cardsc").innerHTML = '';
    let text="";
    fetch('https://backend-ipc.herokuapp.com/obtenerpublicaciones')
    .then(response => response.json())
    .then(data =>{
        var i;
        for(i=0;i<data.length;i++){
            text+= `<br>
                    <div class="col-sm-3 col-md-3 col-lg-3""  style="margin-top: 25px;float: left;">
                    <div class="card bg-light" style="width: auto;">
                    <img class="card-img-top" src="${data[i].url}" alt="Card image cap">
                    <div class="card-body">
                        <h4 class="card-title">${data[i].type}</h4>
                        <h5 class="card-title">${data[i].category}</h5>
                        <p class="card-text">${data[i].date}</p>
                        <button href="#" class="btn btn btn-danger" onclick="eliminarpublicacion('${data[i].url}')">Eliminar</button>
                    </div>
                    </div>
                    </div>
                    <br>`
            console.log(data[i].type,'prueba')
        }
        document.getElementById("cardsc").innerHTML = text;
    });
  
  
  }

  // Carga de Usuarios

  let text="";
  fetch('https://backend-ipc.herokuapp.com/obtenerpublicaciones')
  .then(response => response.json())
  .then(data =>{
      var i;
      for(i=0;i<data.length;i++){
          text+= `<br>
                  <div class="col-sm-3 col-md-3 col-lg-3" style="margin-top: 25px;border-style: dotted;">
                  <div class="card bg-light" style="width: auto;">
                  <img class="card-img-top" src="${data[i].imagen}" alt="Card image cap">
                  <div class="card-body">
                      <h4 class="card-title">${data[i].titulo}</h4>
                      <h5 class="card-title">${data[i].autor}</h5>
                      <p class="card-text">${data[i].descripcion}</p>
                      <button href="#" class="btn btn btn-danger" onclick="eliminarpublicacion('${data[i].url}')">Eliminar</button>
                  </div>
                  </div>
                  </div>
                  <br>`
          console.log(data[i].type,'prueba')
      }
      document.getElementById("cardsc").innerHTML = text;
  });

