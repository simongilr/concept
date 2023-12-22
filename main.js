const { app, BrowserWindow, autoUpdater } = require('electron')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('index.html')

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  createWindow()

  autoUpdater.checkForUpdatesAndNotify()

  app.on('activate', function () {
    if (mainWindow === null) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// Evento para manejar la instalación de actualizaciones
autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})
