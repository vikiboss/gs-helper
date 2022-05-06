export const EXPOSED_API_FROM_ELECTRON = "nativeApi";
export const APP_NAME = "原神助手";

export const MAIN_WINDOW_WIDTH = 970;
export const MAIN_WINDOW_HEIGHT = 600;

export const MENU: Record<string, string> = {
  quit: "退出程序",
  open: `打开${APP_NAME}`,
  openDevTools: "Open DevTools"
};

export const IPC_EVENTS: Record<string, string> = {
  getAppInfo: "get-app-info",
  closeApp: "close-app",
  hideApp: "hide-app",
  minimizeApp: "minimize-app"
};
