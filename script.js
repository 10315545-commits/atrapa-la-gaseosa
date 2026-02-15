function askOwnerLogin(){
  let pw = prompt("Contraseña Owner:");

  if(pw === password){
    loginOwner(pw);
  } else {
    activarTroll();
  }
}

