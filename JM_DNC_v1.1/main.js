const { ipcMain, dialog, Menu } = require('electron')
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const fs = require('fs')
const path = require('path')
const url = require('url')

require('electron-reload')(__dirname);

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 600,
        backgroundColor: "#ccc",
        // fullscreen: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    mainWindow.loadFile('loading.html');

    setTimeout(() => mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    })),3000);

    // mainWindow.loadURL(url.format({
    //     pathname: path.join(__dirname, 'index.html'),
    //     protocol: 'file:',
    //     slashes: true
    // }))

    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function() {
        mainWindow = null
    })
}
app.allowRendererProcessReuse=false

app.on('ready', createWindow)
app.on('window-all-closed', function() {
    app.quit();
})

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow()
    }
})

Menu.setApplicationMenu(null);

// #region fileOpen, fileSave
ipcMain.handle('fileOpen', async (event) => {
    const { filePaths } = await dialog.showOpenDialog({
        properties: ["openFile"],
    });
    const path = filePaths[0];
    const contents = fs.readFileSync(path, 'utf-8');
    mainWindow.webContents.send('fileOpenCode', {path, contents});
});

ipcMain.handle('compareFileOpen', async (event) => {
    const { filePaths } = await dialog.showOpenDialog({
        properties: ["openFile"],
    });
    const path = filePaths[0];
    const contents = fs.readFileSync(path, 'utf-8');
    mainWindow.webContents.send('compareFileOpenCode', {path, contents});
});

ipcMain.handle('fileSave', async (event) => {
    await dialog.showSaveDialog({}).then((result) => {
        var path = result.filePath;
        mainWindow.webContents.send('fileSaveCode', {path});
    });
});

//#endregion fileOpen, fileSave

//#region exitBtn
ipcMain.handle('exitBtn', (event) => {
    app.quit();
});
//#endregion