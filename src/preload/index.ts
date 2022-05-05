const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("NativeApi", {
  getAppInfo() {
    return ipcRenderer.invoke("get-app-info");
  }
});
