import request from '../utils/request'
import { API_REPO_DATA, API_REPO_DATA_BAK } from '../constants'

const getRepoData = async (filename: string): Promise<any> => {
  try {
    const api = `${API_REPO_DATA}/${filename}`
    const { status, data } = await request.get<any>(api)
    return status === 200 ? data : null
  } catch {
    try {
      const api = `${API_REPO_DATA_BAK}/${filename}`
      const { status, data } = await request.get<any>(api)
      return status === 200 ? data : null
    } catch {
      return null
    }
  }
}

export default getRepoData
