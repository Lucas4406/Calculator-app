const {contextBridge, ipcRenderer}=require('electron')
contextBridge.exposeInMainWorld('darkMode', {
    toggle: ()=> ipcRenderer.invoke('dark-mode:toggle'),
    system: () => ipcRenderer.invoke('dark-mode:system'),
})
const API = {
    window: {
        close: () => ipcRenderer.send("app/close"),
        minimize: () => ipcRenderer.send("app/minimize"),
        maximize: () => ipcRenderer.send("app/maximize")
    }
}
contextBridge.exposeInMainWorld("app",API)