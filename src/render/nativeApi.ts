import { ElectronWindow } from "../types";
import { EXPOSEd_API_FROM_ELECTRON } from "../constants";

const nativeApi = (window as ElectronWindow)[EXPOSEd_API_FROM_ELECTRON];

export default nativeApi;
