// array que guarda datos tipo Json 
var aplicaciones = [];
// variable que toma el indice de la app para luego editarla 
var indiceApp = null;

//guardo el localstorage para usarlo
const localstorage = window.localStorage;

/*
	Si el localstorage es null entonces lo creamos ,
	 en caso contrario si ya existe lo consulta 
*/
if(localstorage.getItem('aplicaciones') == null)
{
	localstorage.setItem('aplicaciones',JSON.stringify(aplicaciones));
}else
{
	aplicaciones = JSON.parse(localstorage.getItem('aplicaciones'));
}

/*
	con esta funcion añadimos mediante el innerHTML nuevas tarjetas con los datos
	recolectados del array tipo JSON aplicaciones
*/
function agregarApp()
{
	document.getElementById('aplicaciones').innerHTML ='';
	aplicaciones.forEach((app,indice) => {
		let estrellas = '';
		for(let i = 0;i <  app.puntuacion; i++)
		{
			estrellas += '<i class="fas fa-star"></i>';
		}
		for(let i = 0;i <  (5 - app.puntuacion); i++)
		{
			estrellas += '<i class="far fa-star"></i>';
		}
		
		document.getElementById('aplicaciones').innerHTML += 
				`<div class="col-sm-6 col-md-4 col-xs-3 col-lg-2 mb-4">
					<div class="card shadow-lg">
						<div class="card edit-app" onclick="editarApp(${indice});" >
						  <img src="${app.urlImagen}" class="card-img-top" alt="...">
						  <div class="card-body">
						    <h5 class="card-title">${app.nombreAplicacion}</h5>
						    <p class="card-text">${app.desarrollador}</p>
						    <div>
						    	${estrellas}
						    </div>
						    <a href="#" class="btn btn-outline-danger btn-sm" onclick="eliminar(${indice});">
						   
						    	Eliminar
						    </a>
						  </div>
						</div>
					</div>
				</div>`;
	});
}
agregarApp();

for(let i = 1 ; i <=10; i++)
{
	document.getElementById('imagen-list').innerHTML +=
	`<option value="img/${i}.webp">Imagen #${i}</option>` 

}
function newApp()
{
	indiceApp = null; 

	document.getElementById('nombre').value        = null,
	document.getElementById('imagen-list').value   = null,
	document.getElementById('desarrollador').value = null,
	document.getElementById('calificacion').value  = null
	
	document.getElementById('btn-guardar').style.display = 'block';
	document.getElementById('btn-actualizar').style.display = 'none';;
}
function nuevaApp()
{
	const app = {
		nombreAplicacion :  document.getElementById('nombre').value,
		urlImagen: 			document.getElementById('imagen-list').value,
		desarrollador: 		document.getElementById('desarrollador').value,
		puntuacion : 		document.getElementById('calificacion').value
	}
	aplicaciones.push(app);
	localstorage.setItem('aplicaciones',JSON.stringify(aplicaciones));
	agregarApp();
	
        $("#exampleModal").modal("hide");
    
}

function editarApp(indice)
{
	// console.log('indice n:',indice);
	$("#exampleModal").modal("show");
	indiceApp = indice;
	let app = aplicaciones[indice];
	document.getElementById('nombre').value        = app.nombreAplicacion,
	document.getElementById('imagen-list').value   = app.urlImagen,
	document.getElementById('desarrollador').value = app.desarrollador,
	document.getElementById('calificacion').value  = app.puntuacion
	
	document.getElementById('btn-guardar').style.display = 'none';
	document.getElementById('btn-actualizar').style.display = 'block';
}

function actualizarApp()
{
	console.log(indiceApp );
	 aplicaciones[indiceApp] = {
		nombreAplicacion :  document.getElementById('nombre').value,
		urlImagen: 			document.getElementById('imagen-list').value,
		desarrollador: 		document.getElementById('desarrollador').value,
		puntuacion : 		document.getElementById('calificacion').value
	}
	
	localstorage.setItem('aplicaciones',JSON.stringify(aplicaciones));

	$("#exampleModal").modal("hide");
	agregarApp();
}


function eliminar(indice)
{
	// console.log(indice);
	aplicaciones.splice(indice,1);
	localstorage.setItem('aplicaciones',JSON.stringify(aplicaciones));
	agregarApp();
}