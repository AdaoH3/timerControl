const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        frame: false, // Create a frameless window
        fullscreen: true, // Start in fullscreen mode
        webPreferences: {
            nodeIntegration: true, // Enable Node.js integration in renderer process
            contextIsolation: false, // For demonstration purposes; consider enabling context isolation
        }
    });

    // Load index.html
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src', 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Optional: Create a custom menu (set to null to remove default menu)
    const mainMenu = Menu.buildFromTemplate([]);
    Menu.setApplicationMenu(mainMenu);

    // Handle window close event
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// App ready event
app.on('ready', createWindow);

// App window-all-closed event
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// App activate event
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
