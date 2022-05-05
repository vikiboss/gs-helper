const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getAppInfo() {
    return ipcRenderer.invoke("get-app-info");
  }
});
