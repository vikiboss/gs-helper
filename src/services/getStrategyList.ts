import request from '../utils/request';
import { API_REPO_DATA } from '../constants';

const Api = `${API_REPO_DATA}/strategies.json`;

export interface StrategyItem {
  name: string,
  url: string,
  hightlight?: boolean;
  alt?: string
}

const getStrategyList = async (): Promise<StrategyItem[]> => {
  try {
    const { status, data } = await request.get<StrategyItem[]>(Api);
    return status === 200 ? data : [];
  } catch {
    return [];
  }
};

export default getStrategyList;
