import { app, BrowserWindow, clipboard, ipcMain as IPC, shell } from "electron";

import { IPCEvents } from "../../constants";
import { store } from "..";
import { changeUser, deleteUser } from "../handleUsers";
import getCurrentUser from "./getCurrentUser";
import getGachaUrl from "../../utils/getGachaUrl";
import getLocalGachaDatas from "../../utils/getLocalGachaDatas";
import handleGetGachaListByUrl from "./getGachaListByUrl";
import loginViaBBS from "./loginByBBS";
import openWindow from "./openWindow";

import doBBSSign from "../../services/doBBSSign";
import getBBSSignData from "../../services/getBBSSignData";
import getBBSSignInfo from "../../services/getBBSSignInfo";
import getCalenderList from "../../services/getCalenderList";
import getDailyNotes from "../../services/getDailyNotes";
import getGameRoleInfo from "../../services/getGameRoleInfo";
import getHitokoto from "../../services/getHitokoto";
import getMonthInfo from "../../services/getMonthInfo";
import getOwnedRoleList from "../../services/getOwnedRoleList";
import getPublicRoleList from "../../services/getPublicRoleList";

import type { AppInfo } from "../../typings";

const AppicationInfo: AppInfo = { name: app.getName(), version: app.getVersion() };

const bindIPC = (win: BrowserWindow) => {
  IPC.on(IPCEvents.closeApp, () => app.exit(0));
  IPC.on(IPCEvents.deleteUser, (_, uid: string) => deleteUser(uid));
  IPC.on(IPCEvents.hideApp, () => win.hide());
  IPC.on(IPCEvents.loginByBBS, loginViaBBS);
  IPC.on(IPCEvents.minimizeApp, () => win.minimize());
  IPC.on(IPCEvents.openLink, (_, url: string) => shell.openExternal(url));
  IPC.on(IPCEvents.openWindow, openWindow);
  IPC.on(IPCEvents.setStoreKey, (_, key: string, value: any) => store.set(key, value));
  IPC.on(IPCEvents.writeClipboardText, (_, text: string) => clipboard.writeText(text));

  IPC.handle(IPCEvents.changeUser, async (_, uid: string) => await changeUser(uid));
  IPC.handle(IPCEvents.doBBSSign, async () => await doBBSSign());
  IPC.handle(IPCEvents.getAppInfo, () => AppicationInfo);
  IPC.handle(IPCEvents.getBBSSignData, async () => await getBBSSignData());
  IPC.handle(IPCEvents.getBBSSignInfo, async () => await getBBSSignInfo());
  IPC.handle(IPCEvents.getCalenderList, async () => await getCalenderList());
  IPC.handle(IPCEvents.getCurrentUser, () => getCurrentUser());
  IPC.handle(IPCEvents.getDailyNotes, async () => await getDailyNotes());
  IPC.handle(IPCEvents.getLocalGachaDatas, () => getLocalGachaDatas());
  IPC.handle(IPCEvents.getGachaUrl, async () => await getGachaUrl());
  IPC.handle(IPCEvents.getGameRoleInfo, async () => await getGameRoleInfo());
  IPC.handle(IPCEvents.getHitokoto, async () => await getHitokoto());
  IPC.handle(IPCEvents.getMonthInfo, async (_, month?: number) => await getMonthInfo(month));
  IPC.handle(IPCEvents.getOwnedRoleList, async () => await getOwnedRoleList());
  IPC.handle(IPCEvents.getPublicRoleList, async () => await getPublicRoleList());
  IPC.handle(IPCEvents.getStoreKey, (_, key: string) => store.get(key));
  IPC.handle(IPCEvents.readClipboardText, () => clipboard.readText());
  IPC.handle(
    IPCEvents.getGachaListByUrl,
    async (_, url: string) => await handleGetGachaListByUrl(url)
  );
};

export default bindIPC;
