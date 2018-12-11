// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')

var _browserWindowOptions = {
  width: 1024,
  height: 768,
  show: false,
  webPreferences: {
    nodeIntegration: false
  }
}

var _urls = ["https://chicago.craigslist.org/", "https://chicago.craigslist.org/d/antiques/search/ata", "https://google.com",];

function createWindows() {
  var win1 = new BrowserWindow(_browserWindowOptions);
  var win2 = new BrowserWindow(_browserWindowOptions);

  win1.loadURL(_urls[0]);
  win1.webContents.once("did-finish-load", function () {
    win1.webContents.setZoomLevel(0);
    win1.setPosition(100, 100);
    win1.show();
  });

  setTimeout(function () {
    win2.loadURL(_urls[1]);  // change the index to [2] (google.com) to see that the issue doesn't happen for a URL with different domain
    win2.webContents.once("did-finish-load", function () {
      win2.webContents.setZoomLevel(0);
      win2.setPosition(350, 150);
      win2.show();

      setTimeout(function () {
        win1.webContents.setZoomLevel(5);  // setting zoom level here on win1 causes the zoom level to also change for win2 if win2's URL has the same domain
      }, 3000);
    })
  }, 5000);
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindows)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
