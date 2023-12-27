const { app, BrowserWindow, autoUpdater, ipcMain  } = require('electron');
const squirrelStartup = require('electron-squirrel-startup');

// Verifica si la aplicación se está ejecutando a través de Squirrel
if (squirrelStartup) {
  // Si la aplicación está en modo Squirrel, sale para evitar iniciar la aplicación
  app.quit();
}

console.log('Abrio el index');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    show: true
  });



  mainWindow.loadFile('index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  // ... Resto del código

});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// Configura la URL del feed de actualizaciones
autoUpdater.setFeedURL({
  url: 'https://github.com/simongilr/concept/releases/latest',
  provider: 'github',
  owner: 'simongilr',
  repo: 'concept',
  token: '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'
});

// Evento para manejar la instalación de actualizaciones
autoUpdater.on('update-downloaded', () => {

  console.log('EJECUTO PROCESO DE ACTUALIZACION');

  autoUpdater.quitAndInstall();
});


