var db;

//Función para crear base de datos, se ejecuta cada vez que se cargue la página
function createDB() {
	db = openDatabase('mydb', '1.0', 'planDB', 2 * 1024 * 1024);
	db.transaction(function (tx) {
	   tx.executeSql('CREATE TABLE IF NOT EXISTS USER (email,password,name);',[],null, errorHandler);
     tx.executeSql('CREATE TABLE IF NOT EXISTS EVENT (email,fecha,hora,evento)',[],null, errorHandler);
		 tx.executeSql('CREATE TABLE IF NOT EXISTS OBJECT (email,id,posicion)',[],null, errorHandler);
		 tx.executeSql('CREATE TABLE IF NOT EXISTS OBJECTDATA (email,idPos,mesero,platillo)',[],null, errorHandler);
		 tx.executeSql('CREATE TABLE IF NOT EXISTS GUEST (email,idPos,nombre)',[],null, errorHandler);
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
            alert("Registro exitoso");
						window.location.replace("home.html");
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
