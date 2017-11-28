/*ev es el objeto que desencadena el evento*/
var contador =1;
var PosicionesTabla = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
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
				alert(elementoClonado.id);
		ev.target.appendChild(elementoClonado); // Se añade el elemento clonado
		MarcarTabla(id,elementoArrastrado.id);
	}
}
function eliminar(ev){
		var elementoArrastrado = document.getElementById(ev.dataTransfer.getData("text")); // Elemento arrastrado
		elementoArrastrado.parentNode.removeChild(elementoArrastrado); // Elimina el elemento
			alert(elementoArrastrado.parentNode.id);
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
	alert(PosicionesTabla);

}

function openVentana(){
	$(".ventana").slideDown(300);
}

function closeVentana(){
	$(".ventana").slideUp(300);
}
