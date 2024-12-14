// Cambiar dinámicamente la URL base dependiendo del servidor
var miapi = window.location.hostname === "jacm.info" 
    ? "https://chrisgeekapi.click" 
    : "http://localhost:8080";

console.log("API Base URL:", miapi);
