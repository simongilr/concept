const requestButton = document.getElementById('requestBtn');
//const { electronAPI } = window;


requestButton.addEventListener('click', () => {
  // Lógica para solicitar la variable al proceso principal

  window.electronAPI.requestVariable();
});


// Asegúrate de tener un evento que escuche la respuesta del proceso principal
    window.electronAPI.on('response-variable', (value) => {
    // Muestra el valor en la consola
    console.log('Actualizacion : ', value);
    // También puedes realizar otras acciones con el valor recibido si es necesario
  });




