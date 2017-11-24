/*ev es el objeto que desencadena el evento*/
var contador =1;
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
function clonar(ev){
	ev.preventDefault(); //Evitamos que el navegador realice su comportamiento base
	var elementoArrastrado = document.getElementById(ev.dataTransfer.getData("text")); // Elemento arrastrado
	var elementoClonado = elementoArrastrado.cloneNode(true); // Se clona el elemento
			elementoClonado.id = "ElemClonado" + contador; // Se cambia el id porque tiene que ser unico
				contador += 1;	
		ev.target.appendChild(elementoClonado); // Se añade el elemento clonado
}
function eliminar(ev){
			var elementoArrastrado = document.getElementById(ev.dataTransfer.getData("text")); // Elemento arrastrado
			elementoArrastrado.parentNode.removeChild(elementoArrastrado); // Elimina el elemento
			ev.target.style.border = '';   // Quita el borde
}