/*ev es el objeto que desencadena el evento*/
var contador =1;
var PosicionesTabla = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var idObj;
var posicion;
var evnt;
var pos;
var email = sessionStorage.getItem('email');

//var numCuadro;
//Especifica que datos debemos arrastrar
function drag(ev) {
	//Especificamos tipo de datos a mover
    ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault(); //Evitamos que el navegador realice su comportamiento base
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
function clonar(ev,id){
	ev.preventDefault(); //Evitamos que el navegador realice su comportamiento base
	if(RevisarTabla(id)==0){
		var elementoArrastrado = document.getElementById(ev.dataTransfer.getData("text")); // Elemento arrastrado
		var elementoClonado = elementoArrastrado.cloneNode(true); // Se clona el elemento
			elementoClonado.id = elementoArrastrado.id +" "+contador; // Se cambia el id porque tiene que ser unico
				contador += 1;
				//alert(elementoClonado.id);
		ev.target.appendChild(elementoClonado); // Se añade el elemento clonado
		MarcarTabla(id,elementoArrastrado.id);
	}
  idObj=ev.dataTransfer.getData("text");
  posicion=id;
  evnt=ev;
  find();
}
//busca si existe algun objeto en la posicion
function find(){
	db.transaction(
  		function (transaction) {
					transaction.executeSql('SELECT * from object where posicion="'+posicion+'" and email="'+email+'";',
							[], // array of values for the ? placeholders
							saveObjHandler, errorHandler);
	});
}
//busca la posicion del objeto
function Button(posi){
  pos = posi.parentNode.id;
}
//inserta y actualiza los objetos
function insertObjData(p){
	db.transaction(
  		function (transaction) {
					transaction.executeSql('SELECT * from objectdata where idPos="'+pos+'" and email="'+email+'";',
							[], pullObjDataHandler, errorHandler);
	});
}
//manejador de datos de mesas
function pullObjDataHandler(transaction, results) {
  var platillo=document.getElementById("event").value;
  var mesero=document.getElementById("mesero").value;

  if(results.rows.length==0){
    db.transaction(function (tx) {
            tx.executeSql('INSERT INTO OBJECTDATA (email,idPos,mesero,platillo) VALUES ("'+email+'","'+pos+'", "'+mesero+'", "'+platillo+'");',[],null, errorHandler);
        });
    //alert("insercion exitosa");
  }
  else{
    db.transaction(function (tx) {
            tx.executeSql('UPDATE OBJECTDATA SET mesero="'+mesero+'", platillo="'+platillo+'" where idPos="'+pos+'" and email="'+email+'";',[],null, errorHandler);
    });
    //alert("actualizacion exitosa");
  }
}
//busca la info de las mesas
function findData(p){
	db.transaction(
  		function (transaction) {
					transaction.executeSql('SELECT * from objectdata where idPos="'+pos+'" and email="'+email+'";',
							[], pushObjDataHandler, errorHandler);
	});
}
//manejador de datos de mesas
function pushObjDataHandler(transaction, results) {
  var row = results.rows.item(0);
  document.getElementById("event").value=row['platillo'];
  document.getElementById("mesero").value=row['mesero'];
}
//busca si existe algun objeto en la posicion
function findAll(){
	db.transaction(
  		function (transaction) {
					transaction.executeSql('SELECT * from object where email="'+email+'";',
							[], pullObjHandler, errorHandler);
	});
}
//manejador de errores
function errorHandler(transaction, error){
    alert('Oops.  Error was '+error.message+' (Code '+error.code+')');
}
//guarda posicion e identificador de objeto
function saveObjHandler(transaction, results){
    if(results.rows.length==0){
      db.transaction(function (tx) {
              tx.executeSql('INSERT INTO OBJECT (email,id,posicion) VALUES ("'+email+'","'+idObj+'", "'+posicion+'");',[],null, errorHandler);
          });
      //alert("insercion exitosa");
    }
    else{
      db.transaction(function (tx) {
							tx.executeSql('UPDATE OBJECT SET id="'+idObj+'" where posicion="'+posicion+'" and email="'+email+'";',[],null, errorHandler);
			});
      //alert("actualizacion exitosa");
    }

}
//trae los objetos
function pullObjHandler(transaction, results) {
  if(results.rows.length!=0){
    var pos=[];
    var noObj=[];

    for (var i = 0; i < results.rows.length; i++) {
      var row = results.rows.item(i);
      pos[i]=row['posicion'];
      noObj[i]=row['id'];
    }
    for (var i = 0; i < pos.length; i++) {
      createObj(noObj[i],pos[i]);
    }
  }
}
//clona los objetos
function createObj(noObj,pos){
  var itm = document.getElementById(noObj);
  var cln = itm.cloneNode(true);
  document.getElementById(pos).appendChild(cln);
}

//insertar invitaos
function insertGuest(){
  var nombre=document.getElementById("nombre").value;
  db.transaction(function (tx) {
          tx.executeSql('INSERT INTO GUEST (email,idPos,nombre) VALUES ("'+email+'","'+pos+'", "'+nombre+'");',[],null, errorHandler);
      });
  //alert("insercion exitosa");
  findGuest();
}

function findGuest(){
	db.transaction(
  		function (transaction) {
					transaction.executeSql('SELECT * from guest where idPos="'+pos+'" and email="'+email+'";',
							[], showGuest, errorHandler);
	});
}

//trae los objetos
function showGuest(transaction, results) {
  var myNode = document.getElementById("carta");
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }

  if(results.rows.length!=0){
    var nombre=[];
    var posc=[];
    for (var i = 0; i < results.rows.length; i++) {
      var row = results.rows.item(i);
      nombre[i]=row['nombre'];
      posc[i]=row['idPos'];
    }
    for (var i = 0; i < posc.length; i++) {
      createGuest(nombre[i],posc[i]);
    }
  }
}

function createGuest(nombre,posc){
  var itm1 = document.createElement("BUTTON");
  var itmtxt1 = document.createTextNode("X");
  itm1.setAttribute("class", "btn btn-danger form-control col-2");
  itm1.setAttribute("onclick", "deleteGuest(this)");
  itm1.setAttribute("id", nombre);
  itm1.appendChild(itmtxt1);

  var itm2 = document.createElement("h4");
  itm2.setAttribute("class", "col-6");
  var itmtxt2 = document.createTextNode(nombre);
  itm2.appendChild(itmtxt2);

  var div = document.createElement("div");
  div.setAttribute("class", "row");
  div.setAttribute("style", "margin-top:5px;");
  div.appendChild(itm2);
  div.appendChild(itm1);

  var carta= document.getElementById("carta");
  carta.appendChild(div);
}

function deleteGuest(who){
  var id=who.id;
  db.transaction(
      function (transaction) {
          transaction.executeSql('DELETE from guest where nombre="'+id+'";',
              [], showGuest, errorHandler);
  });
  findGuest();
}

function reload(){
  location.reload();
}

//tira la tabla de objetos
function dropDatabaseObj(){
    db.transaction(
    function (transaction) {
            transaction.executeSql('drop table object',[],null, errorHandler);
            transaction.executeSql('drop table objectdata',[],null, errorHandler);
            transaction.executeSql('drop table guest',[],null, errorHandler);
    });
    alert("database dropped");
}

function eliminar(ev){
		var elementoArrastrado = document.getElementById(ev.dataTransfer.getData("text")); // Elemento arrastrado
		elementoArrastrado.parentNode.removeChild(elementoArrastrado); // Elimina el elemento
}

function MarcarTabla(idT,idA){
	if(idA=="drag1"){
		PosicionesTabla[idT]=1;
	}
	else if(idA=="drag2"){
		PosicionesTabla[idT]=2;
	}
	else if(idA=="drag3"){
		PosicionesTabla[idT]=3;
	}
	else if(idA=="drag5"){
		PosicionesTabla[idT]=5;
	}
	else if(idA=="drag6"){
		PosicionesTabla[idT]=6;
	}
	else if(idA=="drag7"){
		PosicionesTabla[idT]=7;
	}
}
function RevisarTabla(idT){

		return PosicionesTabla[idT];
}

function ConfTable(){


}

function openVentana(){
	$(".ventana").fadeIn(300);
}

function closeVentana(){
	$(".ventana").fadeOut(300);
}
