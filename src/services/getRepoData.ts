import request from '../utils/request';
import { API_REPO_DATA } from '../constants';

const getRepoData = async (filename: string): Promise<any> => {
  try {
    const api = `${API_REPO_DATA}/${filename}`;

    const { status, data } = await request.get<any>(api);

    return status === 200 ? data : null;
  } catch {
    return null;
  }
};

export default getRepoData;
