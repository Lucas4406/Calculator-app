const { app, BrowserWindow, Menu, ipcMain, nativeTheme} = require('electron');
const path = require('path');
const url = require('url');
const { Tray, nativeImage } = require('electron')
icon = nativeImage.createFromPath(path.join(__dirname, 'icons', 'calc-icon.ico'));
process.env.NODE_ENV='develop';


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

let mainWindow;
function createWindow(){
  mainWindow=new BrowserWindow({
    width: 650,
    height: 800,
    icon: 'src/icons/calc-icon.ico',
    /* titleBarStyle:'hidden',
    titleBarOverlay: {
      color: '#FFFFFF',
      symbolColor: '#00FF6C',
    }, */
    frame:false,
    webPreferences:{
      preload: path.join(__dirname, 'backend', 'preload.js'),
    },
  })
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  const mainMenu=Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  /* ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  }) */
}

function createPublicWindow(){
  mainWindow=new BrowserWindow({
    width: 650,
    height: 800,
    icon: 'src/icons/calc-icon.ico',
    titleBarStyle:'hidden',
    titleBarOverlay: {
      color: '#FFFFFF',
      symbolColor: '#00FF6C',
    },
    webPreferences:{
      preload: path.join(__dirname, 'backend', 'preload.js'),
      devTools: false,
    },
  })
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  const mainMenu=Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
if(process.env.NODE_ENV === 'develop'){
  app.on('ready', createWindow);
}else{
  app.on('ready', createPublicWindow);
};

let tray=null



if(process.env.NODE_ENV === 'develop'){
  app.whenReady().then(() => {
    tray = new Tray(icon)
    const contextMenu = Menu.buildFromTemplate([
      { 
        label: 'Quit',
        click(){
          app.quit();
        }
      },
      {
        label: 'Toggle DevTools',
        click(){
          mainWindow.webContents.openDevTools();
        }
      }
    ])
    tray.setToolTip('calculator-app')
    tray.setContextMenu(contextMenu)
  })
}else{
  app.whenReady().then(() => {
    tray = new Tray(icon)
    const contextMenu = Menu.buildFromTemplate([
      { 
        label: 'Quit',
        click(){
          app.quit();
        }
      },
    ])
    tray.setToolTip('calculator-app')
    tray.setContextMenu(contextMenu)
  })
};


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});




app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
    console.log('hello')
  }
});


app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
  }
])

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

const mainMenuTemplate=[
  {
    label:'File',
    submenu:[
      {
        label: 'Color mode',
        accelerator: process.platform=='darwin' ? 'Command+G' : 'Ctrl+G',
        click(){
          backgroundColor();
        }
      },
      {
        label:'Quit',
        accelerator: process.platform=='darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];

if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        label: 'Toggle DevTools',
        accelerator: process.platform=='darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  })
};
