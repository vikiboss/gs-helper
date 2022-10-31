import { EXPOSED_API_FROM_ELECTRON } from '../../constants';

import type { ElectronWindow } from '../../typings';

const nativeApi = (window as ElectronWindow)[EXPOSED_API_FROM_ELECTRON];

export default nativeApi;
