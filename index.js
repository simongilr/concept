const { app, BrowserWindow, autoUpdater, ipcMain  } = require('electron');
const path = require('node:path')

const squirrelStartup = require('electron-squirrel-startup');
let actualizacion = false;

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  })

  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  console.log('Entro a este punto');

  ipcMain.on('request-variable', (event) => {
    const myVariable = 'Test';
    event.reply('response-variable', actualizacion);
    console.log('actualizacion', actualizacion );
  });
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


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
  actualizacion = true;
});

