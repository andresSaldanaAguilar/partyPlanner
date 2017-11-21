var db;
function createDB() {
	db = openDatabase('mydb', '1.0', 'planDB', 2 * 1024 * 1024);
	db.transaction(function (tx) {
	   tx.executeSql('CREATE TABLE IF NOT EXISTS USER (password, email)');
	});
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

function errorHandler(transaction, error)
{
    // error.message is a human-readable string.
    // error.code is a numeric error code
    alert('Oops.  Error was '+error.message+' (Code '+error.code+')');
 
    // Handle errors here
    var we_think_this_error_is_fatal = true;
    if (we_think_this_error_is_fatal) return true;
    return false;
}
 
function dataHandler(transaction, results)
{
    // Handle the results
    if(results.rows==0){
    	alert("No hay coincidencias")
    }
    else
    for (var i=0; i<results.rows.length; i++) {
        // Each row is a standard JavaScript array indexed by
        // column names.
        var row = results.rows.item(i);
        string = string + row['email'] + " (Contraseña "+row['password']+")\n";
    }
    alert(string);
}


function searchDB(){
	var password=document.getElementById("contrasenia").value;
    db.transaction(
        function (transaction) {
            transaction.executeSql("SELECT * from user where password='"+password+"';",
                [], // array of values for the ? placeholders
                dataHandler, errorHandler);
    }
);
    
}
	/*
	db.transaction(function (tx) {
   	tx.executeSql('SELECT * FROM USER', [], function (tx, results) {
	      var len = results.rows.length, i;
	      for (i = 0; i < len; i++){
	         alert(results.rows.item(i).email);
	      }	
	   	}, null);
	});
	alert("lololo");
	*/
/*
	db.transaction(function (transaction) {
        transaction.executeSql("UPDATE people set shirt=? where name=?;",
            [ shirt, name ]); // array of values for the ? placeholders
    }, myTransactionErrorCallback, myTransactionSuccessCallback
);
*/