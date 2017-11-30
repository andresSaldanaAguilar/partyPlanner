var email = sessionStorage.getItem('email');
//controlador de platillos que se muestran
function showMenu(){
    var myNode = document.getElementById("event");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    var horario=document.getElementById("hour").value;

    if(horario=="dia"){
        var opt = document.createElement("option");
        var textnode = document.createTextNode("Omelette a la Francesa");
        opt.appendChild(textnode);
        opt.setAttribute("id", "1");
        document.getElementById("event").appendChild(opt);

        var opt2 = document.createElement("option");
        var textnode2 = document.createTextNode("Chilaquiles con milanesa");
        opt2.appendChild(textnode2);
        opt2.setAttribute("id", "2");
        document.getElementById("event").appendChild(opt2);
        
        var opt3 = document.createElement("option");
        var textnode3 = document.createTextNode("Codito con crema y jamón");
        opt3.appendChild(textnode3);
        opt3.setAttribute("id", "3");
        document.getElementById("event").appendChild(opt3);

        var opt4 = document.createElement("option");
        var textnode4 = document.createTextNode("Codito a la Hawaiana");
        opt4.appendChild(textnode4);
        opt4.setAttribute("id", "4");
        document.getElementById("event").appendChild(opt4);

        var opt5 = document.createElement("option");
        var textnode5 = document.createTextNode("Tornillo a la Napolitana");
        opt5.appendChild(textnode5);
        opt5.setAttribute("id", "5");
        document.getElementById("event").appendChild(opt5);
    }
    else if(horario=="tarde"){
        var opt = document.createElement("option");
        var textnode = document.createTextNode("Milanesa a la vinagreta");
        opt.appendChild(textnode);
        opt.setAttribute("id", "1");
        document.getElementById("event").appendChild(opt);

        var opt2 = document.createElement("option");
        var textnode2 = document.createTextNode("Pollo envinado");
        opt2.appendChild(textnode2);
        opt2.setAttribute("id", "2");
        document.getElementById("event").appendChild(opt2);

        var opt3 = document.createElement("option");
        var textnode3 = document.createTextNode("Crema de Zanahoria");
        opt3.appendChild(textnode3);
        opt3.setAttribute("id", "3");
        document.getElementById("event").appendChild(opt3);

        var opt4 = document.createElement("option");
        var textnode4 = document.createTextNode("Lomo de cerdo a la pibil");
        opt4.appendChild(textnode4);
        opt4.setAttribute("id", "4");
        document.getElementById("event").appendChild(opt4);

        var opt5 = document.createElement("option");
        var textnode5 = document.createTextNode("Lomo de cerdo en adobo");
        opt5.appendChild(textnode5);
        opt5.setAttribute("id", "5");
        document.getElementById("event").appendChild(opt5);
    }
    else if(horario=="noche"){
        var opt = document.createElement("option");
        var textnode = document.createTextNode("Trufa escarchada");
        opt.appendChild(textnode);
        opt.setAttribute("id", "1");
        document.getElementById("event").appendChild(opt);

        var opt2 = document.createElement("option");
        var textnode2 = document.createTextNode("Frijoles");
        opt2.appendChild(textnode2);
        opt2.setAttribute("id", "2");
        document.getElementById("event").appendChild(opt2);

        var opt3 = document.createElement("option");
        var textnode3 = document.createTextNode("Ensalada verde a la vinagreta");
        opt3.appendChild(textnode3);
        opt3.setAttribute("id", "3");
        document.getElementById("event").appendChild(opt3);

        var opt4 = document.createElement("option");
        var textnode4 = document.createTextNode("Ensalada rusa");
        opt4.appendChild(textnode4);
        opt4.setAttribute("id", "4");
        document.getElementById("event").appendChild(opt4);

        var opt5 = document.createElement("option");
        var textnode5 = document.createTextNode("Arroz a la jardinera");
        opt5.appendChild(textnode5);
        opt5.setAttribute("id", "5");
        document.getElementById("event").appendChild(opt5);
    }
}
//buscador de usuarios en la bd
function searchEvent(){
    db.transaction(
        function (transaction) {
            transaction.executeSql('SELECT * from event where email="'+email+'";',
                [], // array of values for the ? placeholders
                eventHandler, errorHandler);
    });
}

function eventHandler(transaction, results){
    //mostramos el boton de crear evento si no existe
		var evento=document.getElementById("typeEvent").value;
		var fecha=document.getElementById("date").value;
		var horario= document.getElementById("hour").value;
		var email = sessionStorage.getItem('email');

		//si no hay registo, guardamos, sino, solo  actualizamos
    if(results.rows.length==0){
			db.transaction(function (tx) {
							tx.executeSql('INSERT INTO EVENT (email,fecha,hora,evento) VALUES ("'+email+'", "'+fecha+'", "'+horario+'", "'+evento+'")',[],null, errorHandler);
					});
            ReservacionExitosa(email);
    }
	else{

		db.transaction(function (tx) {
						tx.executeSql('UPDATE EVENT SET fecha="'+fecha+'",hora="'+horario+'",evento="'+evento+'" where email="'+email+'";',[],null, errorHandler);
		});
            ActualizacionExitosa(email);
	}

}

function showEventHandler(transaction, results){
    //mostramos el boton de crear evento si no existe
		var row = results.rows.item(0);
		document.getElementById("typeEvent").value=row['evento'];
		document.getElementById("date").value=row['fecha'];
		document.getElementById("hour").value=row['hora'];
}

function showEvent(){
	db.transaction(
			function (transaction) {
					transaction.executeSql('SELECT * from event where email="'+email+'";',
							[], // array of values for the ? placeholders
							showEventHandler, null);
	});
}
