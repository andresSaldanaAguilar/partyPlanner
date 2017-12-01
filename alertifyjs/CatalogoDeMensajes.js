function NoHayRegistro(){
	alertify.alert('Error', 'No hay coincidencias en registros', function(){ alertify.error('Registrese'); });
}
function IngreseDatosRegistro(){
	alertify.alert('Error', 'No ha ingresado datos para el registro', function(){ alertify.error('Vamos vale la pena.'); });
}
function IngreseDatosSesion(){
	alertify.alert('Error', 'Llene todos los campos para iniciar sesión.', function(){ alertify.error('Intentelo de nuevo.'); });
}
function SaludoInicioSesion(){
	alertify.success('Bienvenido');
}	
function HagamosUnaReservacion(){
	alertify.success('Hagamos una reservacion');
}
function ReservacionExitosa(email){
	alertify.alert('Reservación Exitosa', "Enviaremos la información de confirmación al siguiente email: "+email, function(){ alertify.message('Correo enviado'); });
}
function ValidaFecha(){
	alertify.error('Espere!\nAún no ingresa una fecha.');
}
function ActualizacionExitosa(email){
	alertify.alert('Actualización Exitosa', "Enviaremos la información actualizada al siguiente email: "+email, function(){ alertify.message('Correo enviado'); });
}
function LimpiamosSuReservacion(){
	alertify.error("Volvamos a empezar");
}
function PersonasPorMesa(){
	alertify.alert('Aviso', "Solo se permiten 8 personas por mesa.");
}
function NombrePersonaMesa(){
	alertify.alert('Aviso', "Debe ingresar un nombre para el invitado.");
}