var db;
function createDB() {
	db = openDatabase('mydb', '1.0', 'planDB', 2 * 1024 * 1024);
	db.transaction(function (tx) {
	   tx.executeSql('CREATE TABLE IF NOT EXISTS USER (password, email)');
	});
	alert("creacion de bd exitosa");
}

function insertDB(){
	var password=document.getElementById("contrasenia").value;
	var email=document.getElementById("email").value;
	alert(password+email);
	db.transaction(function (tx) {
	   tx.executeSql('INSERT INTO USER (password, email) VALUES ("'+password+'", "'+email+'")');
	});
	alert("insercion exitosa");
}

function searchDB(){
	
}
