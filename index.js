const { app, BrowserWindow, autoUpdater } = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  // Verifica manualmente las actualizaciones
  autoUpdater.checkForUpdates().then((updateInfo) => {
    if (updateInfo.version) {
      // Aquí puedes mostrar una notificación o manejar la actualización de alguna manera
      console.log(`Nueva versión disponible: ${updateInfo.version}`);
      // Puedes agregar código para notificar al usuario o realizar acciones adicionales
    }
  });

  app.on('activate', function () {
    if (mainWindow === null) createWindow();
  });
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
  autoUpdater.quitAndInstall();
});

