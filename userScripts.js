var db;

//Función para crear base de datos, se ejecuta cada vez que se cargue la página
function createDB() {
	db = openDatabase('mydb', '1.0', 'planDB', 2 * 1024 * 1024);
	db.transaction(function (tx) {
	   tx.executeSql('CREATE TABLE IF NOT EXISTS USER (email,password,name);',[],null, errorHandler);
       tx.executeSql('CREATE TABLE IF NOT EXISTS EVENT (email,fecha,hora,evento)',[],null, errorHandler);
	});

}
//Hacemos inserción en la base de datos con un registro
function insertUser(){
	var password=document.getElementById("password").value;
	var email=document.getElementById("email").value;
    var name=document.getElementById("name").value;
    alert(name);
        if(password=="" || email==""){
            alert("Ingrese valores en los campos de usuario");
        }
        else{
            //Hacer validación para no registrar usurios ya existentes
            db.transaction(function (tx) {
            tx.executeSql('INSERT INTO USER (password, email, name) VALUES ("'+password+'", "'+email+'", "'+name+'")');
            });
            alert("insercion exitosa");
       }
}

//controlador de errores sintacticos
function errorHandler(transaction, error){
    alert('Oops.  Error was '+error.message+' (Code '+error.code+')');
}
//logica de login
function loginHandler(transaction, results){
    var string="";
    //Si no hay coincidencias en la bd no redireccionamos
    if(results.rows.length==0){
    	alert("No hay coincidencias");
    }
    //Si encontramos el usuario en la bd entonces procedemos a redireccionar
    else{
        //for (var i=0; i<results.rows.length; i++) {
            var row = results.rows.item(0);
            string = string +"Usuario: "+ row['email'] + "\nContraseña: "+row['password'];
            alert(string);
            sessionStorage.setItem('nombre', row['name']);
            sessionStorage.setItem('email', row['email']);
            window.location.replace("home.html");
        //}
    }
}

//buscador de usuarios en la bd
function searchUser(){
	var password=document.getElementById("password").value;
    var email=document.getElementById("email").value;
    db.transaction(
        function (transaction) {
            transaction.executeSql("SELECT * from user where password='"+password+"' AND email='"+email+"';",
                [], // array of values for the ? placeholders
                loginHandler, errorHandler);
    });
}
//muestra la informacion del inicio
function menuInicio(){
    var data = sessionStorage.getItem('nombre');
    document.getElementById("lema-blanco").innerHTML="Hola "+data+", esperamos que estes teniendo un buen día.";
}
//tira la tabla de usuario
function dropDatabase(){
    db.transaction(
    function (transaction) {
            transaction.executeSql('drop table user',[],loginHandler, errorHandler);
             transaction.executeSql('drop table event',[],loginHandler, errorHandler);
    });
    alert("database dropped");
}
/* eventos */

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
    }
}

//incersion de eventos
function insertEvent(){
    var evento=document.getElementById("typeEvent").value;
    var fecha=document.getElementById("date").value;
    var horario= document.getElementById("hour").value;
    var platillo= document.getElementById("event").value;
    var invitado=document.getElementById("invitado").value;
    var email = sessionStorage.getItem('email');

    db.transaction(function (tx) {
            tx.executeSql('INSERT INTO EVENT (email,fecha,hora,evento) VALUES ("'+email+'", "'+fecha+'", "'+horario+'", "'+evento+'")',[],null, errorHandler);
        });

    alert("insercion exitosa: "+evento+" "+fecha+" "+horario+" "+platillo+" "+invitado);
}
