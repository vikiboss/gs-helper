import { request } from '../utils/request'

import type { BaseRes } from '@/types'

import { API_YS_CONTENT } from '@/constants'

interface ExtValue {
  name: string
  url: string
  uid?: number
  status?: string
}

/** CV 声优信息 */
export interface CV {
  /** 声优名字 */
  name: string
  /** 声优语言 */
  type: string
  /** 声优音频链接 */
  vos: string[]
}

/** 角色信息 */
export interface PublicRole {
  /** 名称 */
  name: string
  /** 角色头图 */
  icon: string
  /** 简介 */
  introduction: string
  /** 发布时间 */
  startTime: string
  /** 台词 */
  line: string
  /** 配音 CV */
  CVs: CV[]
}

interface Ext {
  arrtName: string
  keyId: number
  value: ExtValue[] | string
}

interface PublicRoleRaw {
  contentId: string
  channelId: string[]
  title: string
  author: string | null
  type: string | null
  tag: string | null
  intro: string | null
  url: string | null
  ext: Ext[]
  start_time: string
  id: string
}

export interface PublicRoleListData {
  total: number
  list: PublicRoleRaw[]
}

/** 将获取的信息处理成需要的信息字段 PublicRoleRaw => PublicRole */
export function getNeededRoleInfo(publicRoles: PublicRoleRaw[] = []): PublicRole[] {
  const res = []

  for (const role of publicRoles) {
    const publicRole: PublicRole = {
      name: role.title,
      icon: '',
      startTime: role.start_time,
      introduction: '',
      line: '',
      CVs: []
    }

    for (const e of role.ext) {
      const type = e.arrtName.split('-')[1] || ''
      if (type === '简介') {
        publicRole.introduction = (e.value as string)
          .replace(/<p(.*?)>/g, '')
          .replace(/<\/p>/g, '')
          .replace(/<br \/>/g, '')
          .replace(/\n/g, '')
          .replace(/&(.*?);/g, '')
      } else if (type === 'ICON') {
        publicRole.icon = (e.value as ExtValue[])[0]?.url
      } else if (type === '台词') {
        publicRole.line = (e.value as ExtValue[])[0]?.url
      } else if (type === '音频语言') {
        if (!publicRole.CVs.length) {
          publicRole.CVs = (e.value as string)
            .split('/')
            .map((f) => ({ name: '', type: f, vos: [] }))
        } else {
          const langs = (e.value as string).split('/')
          for (const [k, v] of langs.entries()) {
            publicRole.CVs[k].type = v
          }
        }
      } else if (type.startsWith('声优')) {
        const indexs = type.replace('声优', '').split('-')
        const i = Number(indexs[0]) - 1 || 0

        if (!publicRole.CVs[i]) {
          publicRole.CVs[i] = { name: '', type: '', vos: [] }
        }

        publicRole.CVs[i].name = publicRole.CVs[i].name
          ? publicRole.CVs[i].name
          : (e.value as string)
      } else if (type.startsWith('音频')) {
        const indexs = type.replace('音频', '').split('-')
        const i = Number(indexs[0]) - 1 || 0

        if (!publicRole.CVs[i]) {
          publicRole.CVs[i] = { name: '', type: '', vos: [] }
        }

        publicRole.CVs[i].vos.push(e.value as string)
      }
    }
    res.push(publicRole)
  }

  return res
}

export async function getPublicRoleList(): Promise<PublicRole[]> {
  const url = `${API_YS_CONTENT}/ysCn/getContentList`
  const params = { pageSize: 1000, pageNum: 1, channelId: 152 }

  const { status, data } = await request.get<BaseRes<PublicRoleListData>>(url, {
    params
  })

  if (status !== 200 || data?.retcode !== 0) {
    console.log('getPublicRoleList: ', data)
  }

  return getNeededRoleInfo(data.data.list)
}
