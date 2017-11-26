function closeSession(){
  sessionStorage.removeItem('nombre');
  sessionStorage.removeItem('email');
}

function verifySession(){
  if(sessionStorage.getItem('email')==null) {
    window.location.replace("login.html");
  }
}
