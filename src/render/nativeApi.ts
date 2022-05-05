import { ElectronWindow } from "../types";
import { EXPOSED_API_FROM_ELECTRON } from "../constants";

const nativeApi = (window as ElectronWindow)[EXPOSED_API_FROM_ELECTRON];

export default nativeApi;
