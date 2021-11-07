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

function convertirdata(libro){
  var data ={
    "Titulo":libro.titulo,
    "Autor":libro.autor,
    "Descripcion":libro.descripcion
  }

  return data

}

function crearpdf(){
  
  fetch('http://34.67.203.10:5000/obtenerlibros')
  .then(response => response.json())
  .then(data=>{
    //Declarando los headers
    let headers = createHeaders([
      "Titulo",
      "Autor",
      "Descripcion"
    ]);
    // Insertamos la data
    let datos=[]
    for(let i =0;i<data.length;i++){
      datos.push(Object.assign({},convertirdata(data[i])))
    }
    console.log(datos)
    var contentJsPdf = {
      headers,
      datos
  };
    var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
    doc.table(75, 1, datos, headers, { autoSize: false });
    doc.save("ejemplo.pdf")
  })
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
            fetch('http://localhost:5000/carga', {
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



function eliminarpublicacion(url){
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