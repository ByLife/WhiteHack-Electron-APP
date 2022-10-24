const { app, session ,BrowserWindow} = require('electron')
const path = require('path')

var App = app;

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

App.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  const filter = {
    urls: ['*://classic.minecraft.net/*']
  };
  session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
      details.requestHeaders['Origin'] = null;
      details.headers['Origin'] = null;
      callback({ requestHeaders: details.requestHeaders })
  });
})

App.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})