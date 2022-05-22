const {contextBridge, ipcRenderer}=require('electron')
contextBridge.exposeInMainWorld('darkMode', {
    toggle: ()=> ipcRenderer.invoke('dark-mode:toggle'),
    system: () => ipcRenderer.invoke('dark-mode:system')
})

/* contextBridge.exposeInMainWorld('buttons' , {
    minimize:() => ipcRenderer.invoke('minimize-window'),
    maximize:() => ipcRenderer.invoke('maximize-window'),
    close:() => ipcRenderer.invoke('close-window'),
}) */