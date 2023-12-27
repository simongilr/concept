const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title),
  requestVariable: () => {ipcRenderer.send('request-variable')},
  on: (channel, func) => {
    const validChannels = ['response-variable'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  once: (channel, func) => {
    const validChannels = ['response-variable'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  }
})

contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: ipcRenderer,
  });

