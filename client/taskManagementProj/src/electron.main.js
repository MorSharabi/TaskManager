const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

const createWindow = () => {
  // set timeout to render the window not until the Angular
  // compiler is ready to show the project
  setTimeout(() => {
    // Create the browser window.
    win = new BrowserWindow({
      width: 800,
      height: 600,
      icon: "./src/favicon.ico",
    });

    // and load the app.
    win.loadURL("http://localhost:4200");

    // Emitted when the window is closed.
    win.on("closed", () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null;
    });
  }, 10000);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});
