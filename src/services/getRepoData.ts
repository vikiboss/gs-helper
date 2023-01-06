import { API_DATA, API_DATA_BAK } from '../constants'
import { request } from '../utils/request'

export async function getRepoData(filename: string): Promise<any> {
  try {
    const api = `${API_DATA}/${filename}`
    const { status, data } = await request.get<any>(api)
    return status === 200 ? data : null
  } catch {
    try {
      const api = `${API_DATA_BAK}/${filename}`
      const { status, data } = await request.get<any>(api)
      return status === 200 ? data : null
    } catch {
      return null
    }
  }
}
