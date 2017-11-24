var db;

//Función para crear base de datos, se ejecuta cada vez que se cargue la página
function createDB() {
	db = openDatabase('mydb', '1.0', 'planDB', 2 * 1024 * 1024);
	db.transaction(function (tx) {
	   tx.executeSql('CREATE TABLE IF NOT EXISTS USER (email varchar(30) , password varchar(10), name varchar(20));',[],null, errorHandler);
       tx.executeSql('CREATE TABLE IF NOT EXISTS DATE (idHora integer ,rango varchar(10));',[],null, errorHandler);
       tx.executeSql('CREATE TABLE IF NOT EXISTS TYPE_EVENT (idEvento integer,nombre varchar(10));',[],null, errorHandler);
       tx.executeSql('CREATE TABLE IF NOT EXISTS EVENT (idEvento int primary key,email varchar(30),fecha,idHora integer,idEvento integer,nombre,FOREIGN KEY (email) REFERENCES USER (email),FOREIGN KEY (idHora) REFERENCES DATE(idHora),FOREIGN KEY (idEvento) REFERENCES TYPE_EVENT (idEvento))',[],null, errorHandler);
	});
    
}
function insertCatalogs(){
    db.transaction(function (tx) {
        //Fechas
        tx.executeSql('INSERT INTO DATE (idHora, rango) VALUES (?, ?)',["1", "dia"],null, errorHandler);
        tx.executeSql('INSERT INTO DATE (idHora, rango) VALUES (?, ?)',["2", "tarde"],null, errorHandler);
        tx.executeSql('INSERT INTO DATE (idHora, rango) VALUES (?, ?)',["3", "noche"],null, errorHandler);
        //Eventos
        tx.executeSql('INSERT INTO TYPE_EVENT (idEvento, nombre) VALUES (?, ?)',["1", "XV años"],null, errorHandler);
        tx.executeSql('INSERT INTO TYPE_EVENT (idEvento, nombre) VALUES (?, ?)',["2", "Graduacion"],null, errorHandler);
        tx.executeSql('INSERT INTO TYPE_EVENT (idEvento, nombre) VALUES (?, ?)',["3", "Bautizo"],null, errorHandler);
        tx.executeSql('INSERT INTO TYPE_EVENT (idEvento, nombre) VALUES (?, ?)',["4", "Boda"],null, errorHandler);
        tx.executeSql('INSERT INTO TYPE_EVENT (idEvento, nombre) VALUES (?, ?)',["5", "Reunion Familiar"],null, errorHandler);
        tx.executeSql('INSERT INTO TYPE_EVENT (idEvento, nombre) VALUES (?, ?)',["6", "Reunion de Negocios"],null, errorHandler);
        tx.executeSql('INSERT INTO TYPE_EVENT (idEvento, nombre) VALUES (?, ?)',["7", "Otro"],null, errorHandler);

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
//incersion de eventos
function insertEvent(){
    //var password=document.getElementById("password").value; 
    //var email=document.getElementById("email").value;
    //var name=document.getElementById("name").value;
    //alert(name);
        //if(password=="" || email==""){
        //    alert("Ingrese valores en los campos de usuario");
        //}
        else{
            //Hacer validación para no registrar usurios ya existentes
            db.transaction(function (tx) {
            tx.executeSql('INSERT INTO USER (password, email, name) VALUES ("'+password+'", "'+email+'", "'+name+'")');
            });
            alert("insercion exitosa");
       }
}
function showDate(){
    db.transaction(
        function (transaction) {
            transaction.executeSql("SELECT * from date;", [], dateHandler, errorHandler);
        });
}
function showEventType(){
    db.transaction(
        function (transaction) {
            transaction.executeSql("SELECT * from date;", [], eventTypeHandler, errorHandler);
        });
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
            window.location.replace("home.html");
        //}
    }
}
//controlador de date
function dateHandler(transaction, results){
    var btn=document.createElement("Button");
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
    document.getElementById("lema-blanco").innerHTML="Hola "+data+" ,que quieres hacer hoy??";
}
//tira la tabla de usuario
function dropDatabase(){
    db.transaction(
    function (transaction) {
            transaction.executeSql('drop table user',[],loginHandler, errorHandler);        
             
    });
    alert("database dropped");
}
//tira la tabla de usuario
function dropCatalogs(){
    db.transaction(
    function (transaction) {      
            transaction.executeSql('drop table date',[],loginHandler, errorHandler);  
    });
    alert("catalogs dropped");
}