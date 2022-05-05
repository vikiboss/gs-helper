import { ElectronWindow } from "../types";

const NativeApi = (window as ElectronWindow).NativeApi;

export default NativeApi;
